$(document).ready(function() {
   
    listStatusTable();
 
    $('.addStatus').on('click', function() {
        addStatus();
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
            updateEditJobModalStatus();
            listStatusTable();
        }
    })
}

function listCommentsById(id, comments) {
    var block = '<button type="button" class="btn btn-link" title="View comments" onclick="viewComments(' + id + ')">';
    block += comments + '</button>&nbsp;';
    return block;
}

function lineitem(item) {
    var input = '<li class="list-group-item"><div class="button-group">';
    input += '<button type="button" class="btn btn-link" title="Delete Status" style="border:none; padding: 2px;" ';
    input += 'onclick="removeStatus(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-remove"></span></button>';
    input += '<button type="button" class="btn btn-link" title="Edit Status" style="border:none; padding: 2px;" ';
    input += 'onclick="editStatus(' + item['id'] + ')" ><span class="glyphicon glyphicon-pencil"></span>';
    input += '</button>&nbsp;' + item['status'] + '</div></li>';
    $('.statusgroup').append(input);
}

function getActionBox(id) {
    var box = '<td style="width: 85px"><button type="button" style="border:none; padding:2px" class="btn btn-link btn-sm" ';
    box += 'onclick="removeJob(' + id + ')" title="Delete Job">';
    box += '<span class="glyphicon glyphicon-remove"></span></button>';
    box += '<button class="btn btn-link btn-sm" style="border:none; padding:2px" type="button" title="Edit Job" onclick="editJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-pencil"></span></button>';
    box += '<button type="button" class="btn btn-link btn-sm" style="border:none; padding:2px" title="Complete Job" onclick="completeJob(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-ok"></span></button>';
    box += '</td>';
    return box;
}

function removeStatus(id) {
    $.ajax({
        url: "repos/deleteStatus.php",
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
