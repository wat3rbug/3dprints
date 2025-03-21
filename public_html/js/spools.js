$(document).ready(function() {
    listAllSpools();

    $('.addSpool').on('click', function() {
        addSpool();
    });

    getSpoolColorCounts();
    getSpoolSizeCounts();
    getSpoolTypeCounts();
    getSpoolCountByMonth();
});

function getSpoolColorCounts() {
    $.ajax({
        url: "repos/getSpoolColorCounts.php",
        dataType: "json",
        success: function(results) {
            var total = 0;
            for(i = 0; i < results.length; i++) {
                total += results[i]['count'];
            }
            $('.spoolcolor').empty();
            for (i = 0; i < results.length; i++) {
                var line = results[i];
                var percent = (line['count'] / total * 100);
                var bar = line['color'] + '<div class="progress">';
                bar += '<div class="progress-bar" role="progressbar" ';
                bar += 'style="width: ' + percent + '%" aria-valuenow="' + line['count'] + '" ';
                bar += 'aria-valuemin="0" aria-valuemax="' + total + '">' + line['count'] + '</div></div>';
                $('.spoolcolor').append(bar);
            }
        }
    })
}

function getSpoolSizeCounts() {
    $.ajax({
        url: "repos/getSpoolSizeCounts.php",
        dataType: "json",
        success: function(results) {
            var total = 0;
            for(i = 0; i < results.length; i++) {
                total += results[i]['count'];
            }
            $('.spoolsize').empty();
            for (i = 0; i < results.length; i++) {
                var line = results[i];
                var percent = (line['count'] / total * 100);
                var bar = line['size'] + '<div class="progress">';
                bar += '<div class="progress-bar bg-info" role="progressbar" ';
                bar += 'style="width: ' + percent + '%" aria-valuenow="' + percent + '" ';
                bar += 'aria-valuemin="0" aria-valuemax="100">' +line['count'] + '</div></div>';
                $('.spoolsize').append(bar);
            }
        }
    })
}

function getSpoolTypeCounts() {
    $.ajax({
        url: "repos/getSpoolTypeCounts.php",
        dataType: "json",
        success: function(results) {
            var total = 0;
            for(i = 0; i < results.length; i++) {
                total += results[i]['count'];
            }
            $('.spooltype').empty();
            for (i = 0; i < results.length; i++) {
                var line = results[i];
                var percent = (line['count'] / total * 100);
                var bar = line['spooltype'] + '<div class="progress">';
                bar += '<div class="progress-bar bg-info" role="progressbar" ';
                bar += 'style="width: ' + percent + '%" aria-valuenow="' + percent + '" ';
                bar += 'aria-valuemin="0" aria-valuemax="100">' + line['count'] + '</div></div>';
                $('.spooltype').append(bar);
            }
        }
    })
}

function editSpool(id) {
    $.ajax({
        url: "repos/getSpoolById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length != 0) {
                var spool = results[0];
                $('.editSpoolColor').val(spool['color']);
                $('.editSpoolId').val(spool['id']);
                $('.editSpoolTypeSelect').val(spool['type']);
                $('.editSpoolSize').val(spool['size']);
                $('.editSpool').modal('show');
            }
        }
    })
}

function addSpool() {
    var color = $('.addSpoolColor').val();
    var type = $('.addSpoolTypeSelect').val();
    var size = $('.addSpoolSize').val();
    $.ajax({
        url: "repos/createSpool.php",
        type: "post",
        data: {
            "color": color,
            "type": type,
            "size": size
        },
        success: function(results) {
            $('.addSpoolColor').val('');
            $('.addSpoolTypeSelect').val('');
            $('.addSpoolSize').val('');
            listAllSpools();
        }
    })
}

function listAllSpools() {
    $.ajax({
        url: "repos/getAllSpools.php",
        dataType: "json",
        success: function(results) {
            $('.spoollisting tbody').empty();
            if (results.length  == 0 || results == null) {
                var empty = '<tr><td colspan="4" class="text-center">No Spools</td>No jobs</td></tr>';
                $('.spoollisting').find('tbody tr').remove();
                $('.spoollisting').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var result = results[i];
                    var line = '<tr>' + getActionBox(result['id']);
                    line += '<td>' + getColorLink(result) + '</td>';
                    line += '<td>' + result['spooltype'] + '</td>';
                    line += '<td>' + result['size'] + '</td></tr>';
                    $('.spoollisting tbody').append(line);
                }
            }
        }
    });
}

function getColorLink(dataset) {
    var cell = '<a href="orders.html#spool_' + dataset['id'];
    cell += '" title="' + dataset['color'] + ' details">' + dataset['color'];
    cell += '</a>';
    return cell;

}

function getActionBox(id) {
    var box = '<td style="width: 85px">';
    box += '<button type="button" class="btn btn-link btn-sm" title="Delete Spool" style="border:none; padding: 2px" ';
    box += 'onclick="removeSpool(' + id + ')"><span class="glyphicon glyphicon-remove"></span></button>';
    box += '<button type="button" class="btn btn-link btn-sm"  title="Edit Spool" style="border:none; padding: 2px" ';
    box += 'onclick="editSpool(' + id + ')" ><span class="glyphicon glyphicon-pencil"></span></button>';
    box += '<button type="button" class="btn btn-link btn-sm" title="Empty Spool" style="border:none; padding: 2px" ';
    box += 'onclick="emptySpool(' + id + ')"><span class="glyphicon glyphicon-trash"></span></button></td>';
    return box;
}

function emptySpool(id) {
    $.ajax({
        url: "repos/emptySpool.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            listAllSpools();
        }
    })
}
function removeSpool(id) {
    $.ajax({
        url: "repos/deleteSpool.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            listAllSpools();
        }
    })
}

function saveSpool() {
    var color = $('.editSpoolColor').val();
    var id = $('.editSpoolId').val();
    var type = $('.editSpoolTypeSelect').val();
    var size = $('.editSpoolSize').val();
    $.ajax({
        url: "repos/updateSpool.php",
        type: "post",
        data: {
            "id": id,
            "color": color,
            "type": type,
            "size" : size
        },
        success: function(results) {
            listAllSpools();
            listSpoolTypeInsert();
            $('.editSpoolColor').val('');
            $('.editSpoolId').val('');
            $('.editSpoolTypeSelect').val('');
            $('.editSpoolSize').val('');
            $('.editSpool').modal('hide');
        }
    });
}

function closeEditSpool() {
    $('.editSpoolColor').val('');
    $('.editSpoolId').val('');
    $('.editSpoolTypeSelect').val('');
    $('.editSpoolSize').val('');
    $('.editSpool').modal('hide');
}

function getSpoolCountByMonth() {
    $.ajax({
        url: "repos/getSpoolsByMonth.php",
        dataType: "json",
        success: function(results) {

            var longest = 0;
            results.forEach(function(count){
                if (count.count > longest) longest = count.count;
            });
            results.forEach(function(count){
                var line = '<div class="progress">';
                line += getBarForMonthCount(longest, count);
                line += '</div>';
                $('.countgroup').append(line);
            });
        }
    });
}
function getBarForMonthCount(longest, count) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 
        'Dec'];
    var row = '<div class="progress-bar bg-success" role="progressbar"';
    row += 'aria-valuenow="' + count.count + '" aria-valuemax="';
    row += longest + '" style="width: ' + count.count / longest * 100 
    row += '%">' + count.count + ' - ' + months[count.month - 1] + ' ' 
    row += count.year + '</div>';
    return row;
}
