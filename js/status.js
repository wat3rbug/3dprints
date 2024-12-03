$(document).ready(function() {
    var defaultStatus = null;

    listStatusTable();
    getDefaultStatus();
    listAllJobs();
});

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

function listCommentsById(id) {
    var result = '<td>&nbsp;</td>';
    return result;
}

function getActionBox(id) {
    var box = '<td><button type="button" class="btn btn-link" onclick="removeJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-remove"></span></button>';
    box += '<button class="btn btn-link" type="button" onclick="editJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-pencil"></span></button>';
    box += '</td>';
    return box;
}

function removeJob(id) {
    alert("removing job " + id);
}
function editJob(id) {
    alert("editing " + id);
}

function editStatus(id) {
    $.ajax({
        url: "repos/getStatusById.php",
        type: "post",
        data: {
            statId: id
        },
        success: function(result) {
            $('.editStatusName').val(result['status']);
            $('editStatId').val(id);
        }
    });
    $('.editStatus').modal('show');
}

function closeEditStatus() {
    $('.editStatus').modal('hide');
}

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

function lineitem(item) {
    var input = '<li class="list-group-item"><div class="button-group">';
    input += '<button type="button" class="btn btn-link" onclick="removeStatus(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-remove"></span></button>';
    input += '<button type="button" class="btn btn-link" onclick="editStatus(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-pencil"></span>';
    input += '</button>&nbsp;' + item['status'] + '</div></li>';
    $('.statusgroup').append(input);
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