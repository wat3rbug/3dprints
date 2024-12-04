
$(document).ready(function() {

});

function listCommentsById(id) {
    var block = '<td><button type="button" class="btn btn-link" ';
    block += 'onclick="viewComments("' + id + ')"><span ';
    block += 'class="glyphicon glyphicon-info"></span></button>';
    return block;
}