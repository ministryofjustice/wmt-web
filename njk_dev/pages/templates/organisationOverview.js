module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'overview.njk',
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
              gradeCode: 'SPO',
              capacityPercentage: 110,
              availablePoints: 4,
              totalPoints: 33,
              remainingPoints: -22,
              contractedHours: 37,
              reductionHours: 2.5,
              totalCases: 3,
            },
            {
              name: 'Item 2',
              gradeCode: 'PO',
              capacityPercentage: 123,
              availablePoints: -3,
              totalPoints: 44,
              remainingPoints: 2,
              contractedHours: 40,
              reductionHours: 22.3,
              totalCases: 4,
            },
            {
              name: 'Item 3',
              gradeCode: 'P1',
              capacityPercentage: 97,
              availablePoints: -22,
              totalPoints: 44,
              remainingPoints: -1,
              contractedHours: 40,
              reductionHours: 1.1,
              totalCases: 4,
            },
            {
              name: 'Item 4',
              gradeCode: 'P1',
              capacityPercentage: 3,
              availablePoints: -1,
              totalPoints: 44,
              remainingPoints: -11,
              contractedHours: 40,
              reductionHours: 4.2,
              totalCases: 4,
            },
          ],
          totals: {
            gradeCode: 'SPO',
            totalCapacityPercentage: 1,
            totalAvailablePoints: 3,
            totalPoints: 11,
            totalRemainingPoints: 1,
            totalContractedHours: 3,
            totalReduction: 11,
            totalTotalCases: 11
          }
        }
      }
}
