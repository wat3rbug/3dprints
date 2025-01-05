$(document).ready(function() {

    updateEditJobModalStatus();
    listAllJobs();

    $('.addJob').on('click', function() {
        addJob();
    });
});

function closeEditJob() {
    $('.editJob').modal('hide');
}

function listAllJobs() {
    $.ajax({
        url: "repos/getAllJobs.php",
        dataType: "json",
        success: function(results) {
            $('.joblisting tbody').empty();
            if (results.length  == 0 || results == null) {
                var empty = '<tr><td colspan="5" class="text-center">No Data</td>No jobs</td></tr>';
                $('.joblisting').find('tbody tr').remove();
                $('.joblisting').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr>' + getActionBox(result['id']);
                    line += '<td>' + result['name'] + '</td>';
                    line += '<td><a href="' + result['url'] + '" target="_blank">' + result['url'] + '</a></td>';
                    line += '<td>' + result['photo'] + '</td>';
                    line +=  '<td>' + listCommentsById(result['id'], result['comments']) + '</td>';
                    line += '<td>' + result['status'] + '</td></tr>';
                    $('.joblisting tbody').append(line);
                }
            }
        }
    });
}

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
    });
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
    });
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
    });
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
    });
}

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