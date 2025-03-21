$(document).ready(function() {


    $('.nav-link').on("click", function() {
        var link = $(this).attr("href");
        window.location.replace(link);
    });

    getCompletedJobs();
});

function getCompletedJobs() {
    $.ajax({
        url: "repos/getAllCompletedJobs.php",
        dataType: "json",
        success: function(results) {
            $('.joblisting tbody').empty();
            if (results.length == 0 || results == null) {
                var empty = '<tr><td colspan="4" class="text-center">No Data</td></tr>';
                $('.joblisting').find('tbody tr').remove();
                $('.joblisting').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr>';
                    line += '<td style="width: 65px"><button class="btn btn-link btn-sm" style="border:none; padding:2px" ';
                    line += 'onclick="undo(' + result['id'] + ')" title="Undo completion"><span class="glyphicon glyphicon-refresh">';
                    line += '</span></button>';
                    line += '<button class="btn btn-link btn-sm" style="border:none; padding:2px" onclick="copy(' + result['id'];
                    line += ')" title="Duplicate as new task"><span class="glyphicon glyphicon-duplicate"></span></button></td>';
                    line += '<td>' + result['name'] + '</td>';
                    line += '<td><a href="' + result['url'] + '" target="_blank">' +result['url'] + '</a></td>';
                    if (result['photo'] == null || result['photo'] == "") {
                        line += '<td>&nbsp;</td>';  
                    } else {
                        line += '<td>' + results['photo'] + '</td>';
                    }
                    line += '<td><button class="btn btn-link btn-sm" style="border:none; padding:2px" type="button" onclick="viewComments(' + result['id'] + ')">'+ result['comments'] +'</button></td>';
                    line += '</tr>';
                    $('.joblisting tbody').append(line);
                }
            }
        }
    })
}
function copy(id) {
    $.ajax({
        url: "repos/copyJob.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            window.location.href= "index.html";
        }
    });
}

function undo(id) {
    $.ajax({
        url: "repos/undoJob.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            getCompletedJobs();
        }
    });
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
    });
}

function closeComments() {
    $('.viewComments').modal('hide');

}