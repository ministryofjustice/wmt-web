$(document).ready(function() {
    $('.js-data-table').DataTable({
      fixedHeader: true,
      paging: false,
      searching: false,
      info: false,
      "aaSorting": [],
      "order": [[ 0, "asc" ]],
      columnDefs: [{
        targets: [],
        orderable: false
      }
      ]
    });
  });