$(document).ready(function() {
    var defaultStatus = null;

    listStatusTable();
    getDefaultStatus();
    listAllJobs();
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

function listAllJobs() {
    $.ajax({
        url: "repos/getAllJobs.php",
        dataType: "json",
        success: function(results) {
            $('.joblisting body').empty();
            if (results.length  == 0 || results == null) {
                var empty = '<tr><td colspan="5" class="text-center"><td>No jobs</td></tr>';
                $('.joblisting').find('tbody tr').remove();
                $('.joblisting').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr>' + getActionBox(result['id']);
                    line += '<td>' + result['name'] + '</td>';
                    line += '<td>' + result['photo'] + '</td>';
                    line +=  listCommentsById(result['id']);
                    line += '<td>' + result['status'] + '</td></tr>';
                    $('.joblisting tbody').append(line);
                }
            }
        }
    })
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

function listCommentsById(id) {
    var result = '<td>&nbsp;</td>';
    return result;
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
            closeEditStatus();
            listStatusTable();
        }
    })
}

// job section (not modal)

function saveJobStatus() {
    var id = $('.editJobId').val();
    var name = $('.editJobName').val();
    var photo = $('.editJobPhoto').val();
    var status = $('.editJobStatus').val();
    $.ajax({
        url: "repos/updateJob.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "photo": photo,
            "status": status
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
            updateEditJobModalStatus();
            var name = result[0].name;
            var photo = result[0].photo;
            var status = result[0].status;
            $('.editJobName').val(name);
            $('.editJobPhoto').val(photo);
            $('.editJobStatus').val(status);
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