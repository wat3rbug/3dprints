$(document).ready(function() {
    
    listSpoolTypeTable();
    listSpoolTypeInsert();

    $('.addSpoolType').on('click', function() {
        addSpoolType();
    })
});

function listSpoolTypeInsert() {
    $.ajax({
        url: "repos/getAllSpoolTypes.php",
        dataType: "json",
        success: function(results) {
            $('.addSpoolTypeSelect').empty();
            $('.editSpoolTypeSelect').empty();
            if (results != null && results.length != 0) {
                for (i = 0; i < results.length; i++) {
                    var spooltype = results[i];
                    var option = '<option value="' + spooltype['id'];
                    option += '">' + spooltype['spooltype'] + '</option>';
                    $('.addSpoolTypeSelect').append(option);
                    $('.editSpoolTypeSelect').append(option);
                }
            } 
        }
    })
}

function addSpoolType() {
    var type = $('.newStatus').val();
    $.ajax({
        url: "repos/create/createSpoolType.php",
        type: "post",
        data: {
            "type": type
        },
        success: function(results) {
            $('.newStatus').val('');
            listSpoolTypeTable();
            listSpoolTypeInsert();
        }
    })
}

function listSpoolTypeTable() {
    $.ajax({
        url: "repos/getAllSpoolTypes.php",
        dataType: "json",
        success: function(results) {
            $('.spooltypegroup').empty();
            if (results.length == 0 || results == null) {
                $('.spooltypegroup').empty();
                var line = '<li class="list-group-item">No spool types</li>'
                $('.spooltypegroup').append(line);
            } else {
                for (i = 0; i < results.length; i++) {
                    var line = results[i];
                    result = lineitem(line);
                    $('.spooltypegroup body').append(result);
                }
            }
        }
    });
}

function lineitem(item) {
    var input = '<li class="list-group-item"><div class="button-group">';
    input += '<button type="button" class="btn btn-link" onclick="removeSpoolType(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-remove"></span></button>';
    input += '<button type="button" class="btn btn-link" onclick="editSpoolType(' + item['id'] + ')" >';
    input += '<span class="glyphicon glyphicon-pencil"></span>';
    input += '</button>&nbsp;' + item['spooltype'] + '</div></li>';
    $('.spooltypegroup').append(input);
}

function removeSpoolType(id) {
    $.ajax({
        url: "repos/delete/deleteSpoolType.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            listSpoolTypeTable();
            listSpoolTypeInsert();
        }
    })
}

function closeEditSpoolType() {
    $('.editSpoolType').modal('hide');
}

function editSpoolType(id) {
    $.ajax({
        url: "repos/getSpoolTypeById.php",
        type: "post",
        dataType: "json",
        data: {
            "id": id
        },
        success: function(result) {
            var name = result[0].spooltype;
            $('.editSpoolTypeName').val(name);
            $('.editSpoolTypeId').val(id);
        }
    });
    $('.editSpoolType').modal('show');
}

function saveSpoolType() {
    var id = $('.editSpoolTypeId').val();
    var name = $('.editSpoolTypeName').val();
    $.ajax({
        url: "repos/update/updateSpoolType.php",
        type: "post",
        data: {
            "id": id,
            "name": name
        },
        success: function(results) {
            cleanEditSpoolType();
            closeEditSpoolType();
            listSpoolTypeTable();
            listSpoolTypeInsert();
        }
    })
}

function cleanEditSpoolType() {
    $('.editSpoolTypeId').val('');
    $('.editSpoolTypeName').val('');
}