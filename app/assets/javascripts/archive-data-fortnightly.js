$(document).ready(function() {
    $('.js-data-table').DataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      order: [[0, 'asc']],
      "aaSorting": [],
      columnDefs: [{
        "width": "20%", 
        "targets": 1,
        orderable: true
      }
      ]
    });

    
    
});

function printData() {
  var table = $('.js-data-table').DataTable();
  var data = table.rows({
    filter: 'applied'
  }).data();
}