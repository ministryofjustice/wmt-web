module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'averaged-caseload-data.njk',
    njkData: {
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],
        canExport: true,
        results: [
          {
            startDateSortBy: 123,
            startDate: '12th April',
            endDateSortBy: 123,
            endDate: '13th April',
            regionName: 'Region 1',
            lduName: 'LDU 1',
            teamName: 'Team 1',
            omName: 'Of Man 1',
            grade: 'SPO',
            totalCases: 123,
            capacity: 33,
            contractedHours: 37,
            hoursReduction: 6,
            cmsPoints: 3,
            cmsPercentage: 22,
            gsPoints: 33,
            gsPercentage: 34,
          },
          {
            startDateSortBy: 124,
            startDate: '13th April',
            endDateSortBy: 124,
            endDate: '14th April',
            regionName: 'Region 2',
            lduName: 'LDU 2',
            teamName: 'Team 2',
            omName: 'Of Man 2',
            grade: 'PO',
            totalCases: 22,
            capacity: 4,
            contractedHours: 6,
            hoursReduction: 22,
            cmsPoints: 44,
            cmsPercentage: 3,
            gsPoints: 4,
            gsPercentage: 6,
          },
          {
            startDateSortBy: 122,
            startDate: '11th April',
            endDateSortBy: 122,
            endDate: '12th April',
            regionName: 'Region 3',
            lduName: 'LDU 3',
            teamName: 'Team 3',
            omName: 'Of Man 3',
            grade: 'SPO',
            totalCases: 23,
            capacity: 5,
            contractedHours: 77,
            hoursReduction: 21,
            cmsPoints: 53,
            cmsPercentage: 7,
            gsPoints: 5,
            gsPercentage: 7,
          },
        ],
    }
}