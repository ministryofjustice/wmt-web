module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'capacity.njk',
    njkData: {
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],
        childOrganisationLevelDisplayText: 'Team',
      //  childOrganisationLevelDisplayText: 'LDU',
        workloadType: 'Doda',
        childOrganisationLevel: 'Whatever',
        overviewDetails: {
          rows: [
            {
              name: 'Group 1',
              totalCases: 3,
              custodyPoints: 4,
              licencePoints: 5,
              linkId: '11'
            },
            {
              name: 'Group 2',
              totalCases: 13,
              custodyPoints: 14,
              licencePoints: 15,
              linkId: '22'
            },
            {
              name: 'Group 3',
              totalCases: 23,
              custodyPoints: 24,
              licencePoints: 25,
              linkId: '3'
            }
          ],
          totals: {
            totalTotalCases: 1,
            totalCustodyPoints: 3,
            totalLicencePoints: 11
          }
        }
      }
}
