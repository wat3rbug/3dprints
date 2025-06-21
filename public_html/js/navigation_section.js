
$(document).ready(function() {

    $('.nav-tabs').empty();
    $('.nav-tabs').append(getTabs());
});

function getTabs() {
    var tabs = { index:"Active Print Ideas",
         completed:"Completed Prints", 
         spools:"Spool History", 
         orders:"Orders",
         printers: "Printers"};
    var request_raw = window.location.pathname;
    // this is brittle, go from back to front for index of /
    // last index of .
    var request = request_raw.substring(1, request_raw.indexOf('.'));
    Object.entries(tabs).forEach(([key, value]) => {
    var newTab = '<li class="nav-item"><a class="nav-link';
    if (key == request) {
        newTab +=' active"';
    }
    newTab += ' id="' + key + '-tab" data-toggle="tab"';
    newTab += ' role="tab" aria-control-"' + key + '" href="';
    newTab += key + '.html">' + value + '</a></li>';
    $('.nav-tabs').append(newTab);
    });
}