module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'reduction-archive-data.njk',
    njkData: {
      // NOTE: All the data comes from AJAX calls so we cannot replicate here
      // Someopf the AJAX class are due to being able to expand rows,
      // but the reason for the initial data being fetched using AJAX is beyond me
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],
      }
}
