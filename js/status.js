$(document).ready(function() {
    var defaultStatus = null;

    updateEditJobModalStatus();
    listStatusTable();
    getDefaultStatus();
    listAllJobs();

    $('.addJob').on('click', function() {
        addJob();
    });

    $('.addStatus').on('click', function() {
        addStatus();
    });

    $('.addComment').on('click', function() {
        addComment();
    });
});

function listStatusTable() {
    $.ajax({
        url: "repos/getAllStatus.php",
        dataType: "json",
        success: function(results) {
            $('.statusgroup').empty();
            if (results.length  == 0 || results == null) {
                $('.joblisting').find('body').empty();
            } else {
                for (i = 0; i < results.length; i++) {
                    var line = results[i];
                    result = lineitem(line);
                    $('.jobstatus body').append(result);
                }
            }
        }
    });
}

function addStatus() {
    var name = $('.newStatus').val();
    $.ajax({
        url: "repos/createStatus.php",
        type: "post",
        data: {
            "name": name
        },
        success: function() {
            $('.newStatus').val('');
            listStatusTable();
        }
    })
}

function listAllJobs() {
    $.ajax({
        url: "repos/getAllJobs.php",
        dataType: "json",
        success: function(results) {
            $('.joblisting tbody').empty();
            if (results.length  == 0 || results == null) {
                var empty = '<tr><td colspan="5" class="text-center"><td>No jobs</td></tr>';
                $('.joblisting').find('tbody tr').remove();
                $('.joblisting').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr>' + getActionBox(result['id']);
                    line += '<td>' + result['name'] + '</td>';
                    line += '<td><a href="' + result['url'] + '" target="_blank">' + result['url'] + '</a></td>';
                    line += '<td>' + result['photo'] + '</td>';
                    line +=  listCommentsById(result['id']);
                    line += '<td>' + result['status'] + '</td></tr>';
                    $('.joblisting tbody').append(line);
                }
            }
        }
    })
}

function addComment() {
    var job = $('.commentJobId').val();
    var comment = $('.addCommentBox').val();
    var author = $('.addAuthor').val();
    $.ajax({
        url: "repos/addComment.php",
        type: "post",
        data: {
            "job": job,
            "comment": comment,
            "author": author
        },
        success: function(results) {
            closeComments();
            viewComments(job);
        }
    })
}

function clearComments() {
    $('.commentJobId').val('');
    $('.addCommentBox').val('');
    $('.addAuthor').val('');
}

function closeComments() {
    $('.viewComments').modal('hide');
    clearComments();
}

function viewComments(id) {
    $('.viewComments').modal('show');
    $.ajax({
        url: "repos/getCommentsByJob.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('.commentJobId').val(id);
            $('.commentsTable').find('tbody tr').remove();
            if (results == null || results.length == 0) {
                var line = '<tr><td colspan="3" class="text-center">No comments</td></tr>';
                $('.commentsTable').append(line);
            } else {
                for(i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr><td>' + result.comment_date + '</td>';
                    line += '<td>' + result.comment + '</td>';
                    line += '<td>' + result.originator + '</td></tr>';
                    $('.commentsTable').append(line);
                }
            }
        }
    })
}

function listCommentsById(id) {
    var block = '<td><button type="button" class="btn btn-link" ';
    block += 'onclick="viewComments(' + id + ')">';
    block += '<span class="glyphicon glyphicon-info-sign"></span></button>';
    block += '</td>';
    return block;
}

function lineitem(item) {
    var input = '<li class="list-group-item"><div class="button-group">';
    input += '<button type="button" class="btn btn-link" onclick="removeStatus(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-remove"></span></button>';
    input += '<button type="button" class="btn btn-link" onclick="editStatus(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-pencil"></span>';
    input += '</button>&nbsp;' + item['status'] + '</div></li>';
    $('.statusgroup').append(input);
}

function getActionBox(id) {
    var box = '<td><button type="button" class="btn btn-link" onclick="removeJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-remove"></span></button>';
    box += '<button class="btn btn-link" type="button" onclick="editJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-pencil"></span></button>';
    box += '<button type="button" class="btn btn-link" onclick="completeJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-ok"></span></button>';
    box += '</td>';
    return box;
}

function closeEditJob() {
    $('.editJob').modal('hide');
}

// status section (not edit)

function removeStatus(id) {
    $.ajax({
        url: "repos/removeStatusById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(result) {
            updateEditJobModalStatus();
            listStatusTable();
        }
    })
}

function closeEditStatus() {
    $('.editStatus').modal('hide');
}

function getDefaultStatus() {
    $.ajax({
        url: "repos/getDefaultStatus.php",
        dataType: "json",
        success: function(result) {
            defaultStatus = result['status'];
        }
    })
}

// edit status modal section

function editStatus(id) {
    $.ajax({
        url: "repos/getStatusById.php",
        type: "post",
        dataType: "json",
        data: {
            statId: id
        },
        success: function(result) {
            var name = result[0].status;
            $('.editStatName').val(name);
            $('.editStatId').val(id);
        }
    });
    $('.editStatus').modal('show');
}

function saveStatus() {
    var id = $('.editStatId').val();
    var name = $('.editStatName').val();
    $.ajax({
        url: "repos/updateStatus.php",
        type: "post",
        data: {
            "id": id,
            "name": name
        },
        success: function(results) {
            updateEditJobModalStatus();
            closeEditStatus();
            listStatusTable();
        }
    })
}

// job section (not modal)

function addJob() {
    var name = $('.addJobName').val();
    var photo = $('.addJobPhoto').val();
    var url = $('.addJobURL').val();
    $.ajax({
        url: "repos/addJob.php",
        type: "post",
        data: {
            "name": name,
            "photo": photo,
            "url": url
        },
        success: function(results) {
            listAllJobs();
            clearAddJob();
        }
    })
}

function clearAddJob() {
    $('.addJobName').val('');
    $('.addJobPhoto').val('');
    $('.addJobURL').val('');
}

function saveJobStatus() {
    var id = $('.editJobId').val();
    var name = $('.editJobName').val();
    var photo = $('.editJobPhoto').val();
    var joburl = $('.editJobURL').val();
    var status = $('.editJobStatus').val();
    $.ajax({
        url: "repos/updateJob.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "photo": photo,
            "status": status,
            "url": joburl
        },
        success: function(results) {
            closeEditJob();
            $('.joblisting body').empty();
            listAllJobs();
        }
    })
}

function completeJob(id) {
    $.ajax({
        url: "repos/completeJob.php",
        data: {
            "id": id
        },
        type: "post",
        success: function(results) {
            $('.joblisting body').empty();
            listAllJobs();
        }
    })
}

function removeJob(id) {
    $.ajax({
        url: "repos/removeJobById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(result) {
            listAllJobs();
        }
    })
}

// edit job modal section

function editJob(id) {
    $.ajax({
        url: "repos/getJobById.php",
        type: "post",
        dataType: "json",
        data: {
            jobId: id
        },
        success: function(result) {
            var name = result[0].name;
            var photo = result[0].photo;
            var status = result[0].status;
            var joburl = result[0].url;
            $('.editJobName').val(name);
            $('.editJobPhoto').val(photo);
            $('.editJobStatus').val(status);
            $('.editJobURL').val(joburl);
            $('.editJobId').val(id);
        }
    });
    $('.editJob').modal('show');
}

function updateEditJobModalStatus() {
    $.ajax({
        url: "repos/getAllStatus.php",
        dataType: "json",
        success: function(results) {
            $('.editJobStatus').empty();
            for (i = 0; i < results.length; i++) {
                var status = results[i];
                var line = '<option value="' + status['id'] + '">' 
                line += status['status'] + '</option>';
                $('.editJobStatus').append(line);
            }
        }
    });
}