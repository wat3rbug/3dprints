$(document).ready(function() {

    loadOrderVendorSelectors();
    $('.addVendorBtn').on('click', function() {
        addVendor();
    });

    loadOnTimeTable();
});

function addVendor() {
    var name = $('.addVendorName').val();
    var url = $('.addVendorUrl').val();
    $('.addVendorName').val('');
    $('.addVendorUrl').val('');
    $.ajax({
        url: "repos/createVendor.php",
        type: "post",
        data: {
            "name": name,
            "url": url
        },
        success: function(results) {
            reloadTables();
            loadOrderVendorSelectors();
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
                    row += '<td><a target="_blank" title="' + results[i]['name'];
                    row += '" href="' + results[i]['url'] + '">' + results[i]['name'] + '</a></td></tr>';
                    $('.vendortable').append(row);
                }
            }
        }
    });
}

function removeVendor(id) {
    $.ajax({
        url: "repos/deleteVendor.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            reloadTables();
            loadOrderVendorSelectors();
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
        url: "repos/updateVendor.php",
        type: "post",
        data: {
            "id": id,
            "name" : name,
            "url": url
        },
        success: function(results) {
            reloadTables();
            loadOrderVendorSelectors();
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
    var row = '<button class="btn btn-link" title="remove vendor" style="border: none"';
    row +=' onclick="removeVendor(' + id + ')" ><span class="glyphicon glyphicon-remove">';
    row += '</span></button>';
    row += '<button class="btn btn-link" title="edit vendor" style="border: none"';
    row += 'onclick="editVendor(' + id + ')" ><span class="glyphicon glyphicon-pencil">';
    row += '</span></button>';
    return row;
}

function cleanEditVendorModal() {
    $('.editVendorId').val('');
    $('.editVendorName').val('');
    $('.editVendorUrl').val('');
}

function loadOrderVendorSelectors() {
    $.ajax({
        url: "repos/getAllVendors.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                $('.addOrderVendor').empty();
                for (i = 0; i < results.length; i++) {
                    var vendor = results[i];
                    var option = '<option value="' + vendor['id'] + '">';
                    option += vendor['name'] + '</option>';
                    $('.addOrderVendor').append(option); 
                }
            }
        }
    });
}

function loadOnTimeTable() {
    $.ajax({
        url: "/repos/getOnTimePercentage.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                $('.ontime').empty();
                var vendors = [];
                for(i = 0; i < results.length; i++) {
                    if (!vendors.includes(results[i]['vendor'])) {
                        vendors.push(results[i]['vendor']);
                    }
                }
                for (i = 0; i < vendors.length; i++) {
                    var base = results.filter(x => x.vendor == vendors[i]);
                    var percentraw = base[0]['count'] / base[1]['count'] * 100;
                    var percent = percentraw.toFixed(1);
                    $('.ontime').append('<p><b>' + percent + '%</b> - ' + base[0]['vendor'] + '</p>');
                }
            }
        }
    });


}

