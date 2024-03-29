$(document).ready(function () {
  search = document.getElementById('rawQuery').value
  if (search) {
    search = JSON.parse(search)
  }

  let options = []
  if (search['multi-search-field']) {
    search['multi-search-field'].forEach(function (option) {
      options.push(new Option(option, option, false, true))
    })
  }

  $('#multi-search-field').select2({
    ajax: {
      url: '/archive-search-lists',
      dataType: 'json',
      delay: 750,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page
        };
      },
      processResults: function (data, params) {
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;
  
        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    placeholder: 'Select an Offender Manager, Team or Probation Delivery Unit',
    minimumInputLength: 1
  })

  options.forEach(function (option) {
    $('#multi-search-field').append(option)
  })
})
