$(document).ready(function() {
    reloadTables();
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
                var nodata = "<tr><td colspan='3' class='text-center'>No Details</td></tr>";
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
    // probably need selector loads here
}