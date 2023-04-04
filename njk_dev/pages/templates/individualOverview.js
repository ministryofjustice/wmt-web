module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'individual-overview.njk',
    njkData: {
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],
        showExportReductions: false,
        showExportOverview: true,
        // organisationLevel: 'team',
        organisationLevel: 'LDU',
        childOrganisationLevelDisplayText: 'team',
        workloadType: 'Doda',
        childOrganisationLevel: 'Whatever',
        overviewDetails: {
          teamName: 'Item 1',
          grade: 'SPO',
          capacity: 112,
          cases: 4,
          contractedHours: 37.5,
          reduction: 3,
        },
      }
}
