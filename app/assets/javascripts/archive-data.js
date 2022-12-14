$(document).ready(function() {
    $('#daily-caseload-table').DataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      order: [[0, 'asc']],
      "aaSorting": [],
      columnDefs: [{
        targets: [],
        orderable: false
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