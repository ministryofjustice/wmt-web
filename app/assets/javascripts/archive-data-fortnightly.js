$(document).ready(function() {
    $('.js-data-table').DataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      "aaSorting": [],
      "ordering": false
    });

    
    
});

function printData() {
  var table = $('.js-data-table').DataTable();
  var data = table.rows({
    filter: 'applied'
  }).data();
}