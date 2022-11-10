//var data

$(document).ready(function() {
    $('.js-data-table').DataTable({
      paging: true,
      "pageLength": 100,
      searching: true,
      info: false,
      order: [[4, 'asc']],
      "aaSorting": [],
      columnDefs: [{
        targets: [],
        orderable: false
      }
      ]
    });
});

