$(document).ready(function() {

});



function getTypeActionBox(id) {
    var box = '<td><button type="button" class="btn btn-link" onclick="removeSpoolType(';
    box += id + ')"><span class="glyphicon glyphicon-remove"></span></button>';
    box += '<button type="button" class="btn btn-link" onclick="editSpoolType(' + id + ')" >';
    box += '<span class="glyphicon glyphicon-ok"></span></td>';
    return box;
}
