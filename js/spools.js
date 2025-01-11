$(document).ready(function() {
    listAllSpools();

    $('.addSpool').on('click', function() {
        addSpool();
    });

    getSpoolColorCounts();
    getSpoolSizeCounts();
    getSpoolTypeCounts();
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
                bar += '<div class="progress-bar bg-info" role="progressbar" ';
                bar += 'style="width: ' + percent + '%" aria-valuenow="' + percent + '" ';
                bar += 'aria-valuemin="0" aria-valuemax="100"></div></div>';
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
                bar += 'aria-valuemin="0" aria-valuemax="100"></div></div>';
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
                bar += 'aria-valuemin="0" aria-valuemax="100"></div></div>';
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
        url: "repos/addSpool.php",
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
                    line += '<td>' + result['color'] + '</td>';
                    line += '<td>' + result['spooltype'] + '</td>';
                    line += '<td>' + result['size'] + '</td></tr>';
                    $('.spoollisting tbody').append(line);
                }
            }
        }
    });
}

function getActionBox(id) {
    var box = '<td style="width: 65px"><button type="button" class="btn btn-link" onclick="removeSpool(';
    box += id + ')"><span class="glyphicon glyphicon-remove"></span></button>';
    box += '<button type="button" class="btn btn-link" onclick="editSpool(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-pencil"></span></td>';
    return box;
}

function removeSpool(id) {
    $.ajax({
        url: "repos/removeSpoolById.php",
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
