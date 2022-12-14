$.fn.dataTable.setupDateSort = function ( format ) {
  var types = $.fn.dataTable.ext.type;

  // Add type detection
  types.detect.unshift( function ( d ) {
    return new Date(d) != 'Invalid Date' ?
      'sort-'+format :
      null;
  } );

  // Add sorting method - use an integer for the sorting
  types.order[ 'sort-'+format+'-pre' ] = function ( d ) {
      return new Date(d).getTime();
  };
};

$(document).ready(function() {
    $.fn.dataTable.setupDateSort( 'DD-MM-YYYY');
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