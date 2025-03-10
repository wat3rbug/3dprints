$(document).ready(function() {
    reloadTables();

    $('.orderBtn').on('click', function(){
        cleanOrderModal();
        $('.addOrder').modal('show');
    });
});

/**
 * The overal function to load the edit order modal.
 * It includes about the type and color of spool as 
 * well as when various events occurred.  
 * @param  id The id of the order as noted in the database.
 */
function getOrderDetails(id) {
    $.ajax({
        url: "repos/getOrderDetails.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            $('.orderdetails tbody').remove();
            if (results == null || results.length == 0) {
                var nodata = "<tr><td colspan='5' class='text-center'>No Details</td></tr>";
                $('.orderdetails tbody').append(nodata); 
            } else {
                var data = getDetailRow(results[0]);          
                $('.orderdetails tbody').append(data); 
                $('.editShipped').val(results[0]['shipped']);
                $('.editOrdered').val(results[0]['ordered']);
                $('.editReceived').val(results[0]['received']);
            }
        }
    })
}

/**
 * Simple function to write out the spool details for the
 * selector.
 * @param result is the dataset row used for displaying results.
 * @returns A row on the order detail modal for the spool.
 */
function getDetailRow(result) {
    var data = '<tr><td>' + result['color'] + '</td>';
    data += '<td>' + result['type'] + '</td>';
    data += '<td>' + result['size'] + '</td></tr>';
    return data;
}

/**
 * This function takes the order criteria, dates only,
 * and updates the database and then reloaded the tables.
 */
function updateOrder() {
    var shipped = $('.editShipped').val();
    var ordered = $('.editOrdered').val();
    var received = $('.editReceived').val();
    var vendor = $('.editVendor').val();
}

function createOrder() {
    var color = $('.addOrderColor').val();
    var vendor = $('.addOrderVendor').val();
    var spool = $('.addOrderType').val();
    var size = $('.addOrderSize').val();
    $.ajax({
        url: "repos/createOrder.php",
        type: "post",
        data: {
            "color": color,
            "vendor": vendor,
            "type": spool,
            "size": size
            
        },
        success: function(results) {
            cleanOrderModal();
            reloadTables();
            $('.addOrder').modal('hide');
        }
    });
}

function reloadTables() {
    loadVendorTable();
    loadOrderTable();
    loadOrderSelectors();
}

function loadOrderTable() {
    $.ajax({
        url: "repos/getAllOrders.php",
        dataType: "json",
        success: function(results) {
            $('.orderlisting tbody').empty();
            if (results == null || results.length == 0) {
                var nodata = '<tr><td class="text-center" colspan="6">';
                nodata += 'No orders</td></tr>';
                $('.orderlisting tbody').append(nodata);
            } else {
                for (i = 0; i < results.length; i++) {
                    var result = results[i];
                    var row = '<tr><td>' + getOrderActionBtns(result) + '</td>';
                    row += '<td>' + getSpoolDetails(result) + '</td>';
                    row += '<td>' + formatNullableDate(result['vendor']) + '</td>';
                    row += '<td>' + formatNullableDate(result['ordered']) + '</td>';
                    row += '<td>' + formatNullableDate(result['shipped']) + '</td>';
                    row += '<td>' + formatNullableDate(result['received']) + '</td>';
                    $('.orderlisting tbody').append(row);
                }
            }
        }
    });
}

function getSpoolDetails(order) {
    var detail = order['color'] + ' - ' + order['spooltype'];
    return detail;

}

function formatNullableDate(current) {
    if (current) return current;
    else return "N/A";
}

function getOrderActionBtns(dataset) {
    var cell = '<button class="btn btn-link" title="remove order"';
    cell += ' onclick="removeOrder(' + dataset['id'] + ')">';
    cell += '<span class="glyphicon glyphicon-remove"></span>';
    cell += '</button><button type="button" class="btn btn-link"';
    cell += 'title="edit order" onclick="editOrder(' + dataset['id'];
    cell += ')"><span class="glyphicon glyphicon-pencil"></span>';
    cell += '</button>' + getShipBtn(dataset) + getRcvBtn(dataset);
    return cell;
}

function getShipBtn(dataset) {
    var btn = '<button class="btn btn-link';
    if (dataset['shipped'] != null) {
        btn += ' disabled"';
    } 
    btn += ' title="Item shipped" onclick="shipped(';
    btn += dataset['id'] + ')">';
    btn += '<span class="glyphicon glyphicon-send"></span></button>';
    return btn;
}

function getRcvBtn(dataset) {
    var btn = '<button class="btn btn-link';
    if (dataset['received'] != null) {
        btn += ' disabled"';
    } 
    btn += ' title="Item received" onclick="received(';
    btn += dataset['id'] + ')">';
    btn += '<span class="glyphicon glyphicon-home"></span></button>';
    return btn;
}
function received(id) {
    $.ajax({
        url: "repos/orderReceived.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            reloadTables();
        }
    })
}

function shipped(id) {
    $.ajax({
        url: "repos/orderShipped.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            reloadTables();
        }
    })
}

function cleanEditOrderModal() {

}

function editOrder(id) {
    $.ajax({
        url: "repos/getOrderById.php",
        type: "post",
        dataType: "json",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                var order = results[0];
                cleanEditOrderModal();
                $('.editOrderId').val(order['id']);
                $('.editOrderSize').val(order['size']);
                $('.editOrderType').val(order['type']);
                $('.edirOrderColor').val(order['color']);
                $('.editOrder').modal('show');
            }
        }
    })
}

function removeOrder(id) {
    $.ajax({
        url: "repos/deleteOrder.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            cleanOrderModal();
            reloadTables();
            $('.addOrder').modal('hide');
        }
    });
}

function cleanOrderModal() {
    $('.addOrderColor').val('');
    $('.addOrderSize').val('');
    $('.addOrderType').val('');
}

function closeAddOrder() {
    cleanOrderModal();
    $('.addOrder').modal('hide');
}

function loadOrderSelectors() {
    $.ajax({
        url: "repos/getAllSpoolTypes.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                $('.addOrderType').empty();
                for (i = 0; i < results.length; i++) {
                    var spool = results[i];
                    var option = '<option value="' + spool['id'] + '">';
                    option += spool['spooltype'] + '</option>';
                    $('.addOrderType').append(option); 
                }
            }
        }
    });
}