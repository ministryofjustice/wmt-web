$.fn.dataTable.moment = function ( format, locale ) {
  var types = $.fn.dataTable.ext.type;

  // Add type detection
  types.detect.unshift( function ( d ) {
      return moment( d, format, locale, true ).isValid() ?
          'moment-'+format :
          null;
  } );

  // Add sorting method - use an integer for the sorting
  types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
      return moment( d, format, locale, true ).unix();
  };
};

$(document).ready(function() {
    $.fn.dataTable.moment( 'DD-MM-YYYY');
    $('.js-data-table').dataTable({
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