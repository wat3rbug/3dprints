$(document).ready(function() {
    loadPrinterTable();
    loadPrinterStatusDropDown();
    cleanModals();

    $('.addPrinterBtn').on('click', function() {
        addPrinter();
    });
});

function loadPrinterTable() {
    $.ajax({
        url: "/repos/getAllPrinters.php",
        dataType: "json",
        success: function(results) {
            $('#printers tbody').empty();
            if (results == null || results.length == 0) {
                var empty = '<tr><td colspan="7" class="text-center">No printers</td></tr>';
                $('#printers tbody').append(empty);
            } else {
                for (i = 0; i < results.length; i++) {
                    var printer = results[i];
                    $('#printers tbody').append(makePrinterRow(printer));
                }
            }
        }
    });
}

function loadPrinterStatusDropDown() {
    $.ajax({
        url: "/repos/getAllPrinterStatus.php",
        dataType: "json",
        success: function(results) {
            if (results != null && results.length > 0) {
                $('.printerstatus').empty();
                $('editPrinterStatus').empty();
                for (i = 0; i < results.length; i++) {
                    var status = results[i];
                    var option = '<option value="' + status['id'];
                    option += '">' + status['status'] + '</option>';
                    $('.printerstatus').append(option);
                    $('.editPrinterStatus').append(option);
                }
            }
        }
    });
}

function makePrinterRow(printer) {
    var row = '<tr><td style="width: 65px; padding:2px">' + makeActionBtns(printer) + '</td>';
    row += '<td>' + printer['name'] + '</td>';
    row += '<td>' + printer['manufacturer'] + '</td>';
    row += '<td>' + printer['model'] + '</td>';
    row += '<td>' + isMulticolor(printer) + '</td>';
    row += '<td>' + printer['status'] + '</td>';
    if (printer['pic'] == null || printer['pic'] == "") {
        row += '<td class="text-center">N/A</td>';
    } else {
        row += '<td><img height="200" width="200" src="pics/' + printer['pic'] + '"></td>';
    }
    return row += '</tr>';
}

function isMulticolor(printer) {
    if (printer['multicolor'] == "0") {
        return "No";
    } else {
        return "Yes";
    }
}

function makeActionBtns(printer) {
    var cell = getDeleteBtn(printer);
    cell += getEditBtn(printer);
    return cell;
}

function getDeleteBtn(printer) {
    var btn = '<button class="btn btn-link" style="padding: 2px" title="Delete Printer"';
    btn += 'onclick="deletePrinter(' + printer.id + ')"><span class="';
    btn += 'glyphicon glyphicon-remove"></span></button>';
    return btn;
}

function getEditBtn(printer) {
    var btn = '<button class="btn btn-link" style="padding: 2px" title="Edit Printer"';
    btn += 'onclick="editPrinter(' + printer.id + ')"><span class="';
    btn += 'glyphicon glyphicon-pencil"></span></button>';
    return btn;
}

function addPrinter() {
    var name = $('.addPrinterName').val();
    var mfr =$('.addPrinterMfr').val();
    var model = $('.addPrinterMdl').val();
    var multicolor = $('#addPrinterMulti').is(':checked') == "true"? "1" : "0";
    var status = $('.printerstatus').val();
    var pic = $('.addrinterPic').val();
    // do the picture stuff here
    $.ajax({
        url: "/repos/addPrinter.php",
        type: "post",
        data: {
            "name": name,
            "manufacturer": mfr,
            "model": model,
            "multicolor": multicolor,
            "status": status,
            "pic": pic
        },
        success: function(results) {
            loadPrinterTable();
            cleanModals();
        }
    });
}

function editPrinter(id) {
    var YES = 1;
    $.ajax({
        url: "/repos/getPrinterById.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                var printer = results[0];
                $('.editPrinter').modal('show');
                $('.editPrinterId').val(printer['id']);
                $('.editPrinterName').val(printer['name']);
                $('.editPrinterMfr').val(printer['manufacturer']);
                $('.editPrinterPicFrame').attr("src=" + printer['pic']);
                $('.editPrinterPic').val(printer['pic']);
                $('.editPrinterStatus').val(printer['status']);
                if (printer['multicolor'] == YES) {
                    $('.editPrinterMulti').prop(':checked');
                } else {
                    $('.editPrinterMulti').prop('checked', false);
                }
                $('.editPrinterMdl').val(printer['model']);
            }
        }
    });
}

function closeEditPrinter() {
    $('.editPrinter').modal('hide');
    cleanModals();
}

function updatePrinter() {
    $('.editPrinter').modal('hide');
    var id = $('.editPrinterId').val();
    var name = $('.editPrinterName').val();
    var make = $('.editPrinterMfr').val();
    var model = $('.editPrinterMdl').val();
    var multicolor = $('.editPrinterMulti').is('checked') == true ? 0 : 1;
    var status = $('.editPrinterStatus').val();
    //$('.editPrinterPicFrame').attr("src=" + printer['pic']);
    var pic = $('.editPrinterPic').val();
    $.ajax({
        url: "/repos/updatePrinter.php",
        type: "post",
        data: {
            "id": id,
            "name": name,
            "manufacturer": make,
            "model": model,
            "multicolor": multicolor,
            "status": status
        },
        success: function(results) {
            $('.editPrinter').modal('hide');
            loadPrinterTable();
            cleanModals();
        }
    });
}

function deletePrinter(id) {
    $.ajax({
        url: "/repos/deletePrinter.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            loadPrinterTable();
        }
    })
}

function cleanModals() {
    $('.editPrinterId').val('');
    $('.editPrinterName').val('');
    $('.editPrinterMfr').val('');
    $('.editPrinterMdl').val('');
    $('.editPrinterMulti').prop('checked', false); 
    $('.editPrinterStatus').val('');
    //$('.editPrinterPicFrame').attr("src=" + printer['pic']);
    $('.addPrinterPic').val('');
    $('.addPrinterId').val('');
    $('.addPrinterName').val('');
    $('.addPrinterMfr').val('');
    $('.addPrinterMdl').val('');
    $('.addPrinterMulti').prop('checked', false); 
    $('.addPrinterStatus').val('');
    //$('.editPrinterPicFrame').attr("src=" + printer['pic']);
    $('.addPrinterPic').val('');
}