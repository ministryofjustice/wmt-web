module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'omic-overview.njk',
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
          rows: [
            {
              name: 'Item 1',
              totalCases: 3,
              custodyPoints: 4,
              licencePoints: 4,
            },
            {
              name: 'Item 2',
              totalCases: 4,
              custodyPoints: 32,
              licencePoints: 32,
              },
              {
                name: 'Item 3',
                totalCases: 11,
                custodyPoints: 2,
                licencePoints: 2,
              },
            ],
          totals: {
            gradeCode: 'SPO',
            totalTotalCases: 11,
            totalCustodyPoints: 12,
            totalLicencePoints: 14,
          }
        }
      }
}
