$(document).ready(function() {

    $('.addVendorBtn').on('click', function() {
        addVendor();
    });
});

function addVendor() {
    var name = $('.addVendorName').val();
    var url = $('.addVendorUrl').val();
    $('.addVendorName').val('');
    $('.addVendorUrl').val('');
    $.ajax({
        url: "repos/create/createVendor.php",
        type: "post",
        data: {
            "name": name,
            "url": url
        },
        success: function(results) {
            reloadTables();
        }
    })
}

function loadVendorTable() {
    $.ajax({
        url: "repos/getAllVendors.php",
        dataType: "json",
        success: function(results) {
            $('.vendortable tbody').empty();
            if (results == null || results.length == 0) {
                var row = '<tr><td colspan="3" class="text-center">';
                row += 'No Vendors</td></tr>';
                $('.vendortable').append(row);
            } else {
                for (i = 0; i < results.length; i++) {
                    var row = '<tr><td>' + getVendorActionBtns(results[i]['id']);
                    row += '</td><td>' + results[i]['name'] + '</td>';
                    row += '<td>' + results[i]['url'] + '</td></tr>';
                    $('.vendortable').append(row);
                }
            }
        }
    });
}

function removeVendor(id) {
    $.ajax({
        url: "repos/delete/deleteVendor.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            reloadTables();
        }
    })
}

function updateVendor() {
    $('.editVendor').modal('hide');
    var id = $('.editVendorId').val();
    var name = $('.editVendorName').val();
    var url = $('.editVendorUrl').val();
    cleanEditVendorModal();
    $.ajax({
        url: "repos/update/updateVendor.php",
        type: "post",
        data: {
            "id": id,
            "name" : name,
            "url": url
        },
        success: function(results) {
            reloadTables();
        }
    });
}

function closeEditVendor() {
    $('.editVendor').modal('hide');
    cleanEditVendorModal();
}

function editVendor(id) {
    $.ajax({
        url: "repos/getVendorById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                $('.editVendor').modal('show');
                $('.editVendorId').val(results[0]['id']);
                $('.editVendorName').val(results[0]['name']);
                $('.editVendorUrl').val(results[0]['url']);
            }
        }
    })
}

function getVendorActionBtns(id) {
    var row = '<button class="btn btn-link" title="remove vendor"';
    row +=' onclick="removeVendor(' + id + ')" ><span class="glyphicon glyphicon-remove">';
    row += '</span></button>&nbsp;';
    row += '<button class="btn btn-link" title="edit vendor"';
    row += 'onclick="editVendor(' + id + ')" ><span class="glyphicon glyphicon-pencil">';
    row += '</span></button>&nbsp;';
    return row;
}

function cleanEditVendorModal() {
    $('.editVendorId').val('');
    $('.editVendorName').val('');
    $('.editVendorUrl').val('');
}


