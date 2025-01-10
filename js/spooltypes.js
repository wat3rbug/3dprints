$(document).ready(function() {
    
    listSpoolTypeTable();

    $('.addSpoolType').on('click', function() {
        addSpoolType();
    })
});

function addSpoolType() {
    var type = $('.newStatus').val();
    $.ajax({
        url: "repos/addSpoolType.php",
        type: "post",
        data: {
            "type": type
        },
        success: function(results) {
            $('.newStatus').val('');
            listSpoolTypeTable();
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
        url: "repos/removeSpoolType.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            listSpoolTypeTable();
        }
    })
}