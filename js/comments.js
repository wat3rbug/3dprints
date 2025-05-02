$(document).ready(function() {
    $('.addComment').on('click', function() {
        addComment();
    });
});

function addComment() {
    var job = $('.commentJobId').val();
    var comment = $('.addCommentBox').val();
    $.ajax({
        url: "repos/createComment.php",
        type: "post",
        data: {
            "job": job,
            "comment": comment
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
    listStatusTable();
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
                var line = '<tr><td colspan="2" class="text-center">No comments</td></tr>';
                $('.commentsTable').append(line);
            } else {
                for(i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr><td>' + result.comment_date + '</td>';
                    line += '<td>' + result.comment + '</td></tr>';
                    $('.commentsTable').append(line);
                }
            }
        }
    });
}
