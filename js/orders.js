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

function reloadTables() {
    loadVendorTable();
    loadOrderTable();
    // probably need selector loads here
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
                    row += '<td>' + result['vendor'] + '</td>';
                    row += '<td>' + result['ordered'] + '</td>';
                    row += '<td>' + result['shipped'] + '</td>';
                    row += '<td>' + result['received'] + '</td>';
                    $('.orderlisting tbody').append(row);
                }
            }
        }
    });
}

function getOrderActionBtns(dataset) {
    var cell = '<button class="btn btn-link" title="remove order"';
    cell += ' onclick="removeOrder(' + dataset['id'] + ')">';
    cell += '<span class="glyphicon glyphicon-remove"></span>';
    cell += '</button><button type="button" class="btn btn-link"';
    cell += 'title="edit order" onclick="editOrder(' + dataset['id'];
    cell += ')"><span class="glyphicon glyphicon-pencil"></span>';
    cell += '</button>';
    return cell;
}

function cleanOrderModal() {

}

function editOrder(id) {

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