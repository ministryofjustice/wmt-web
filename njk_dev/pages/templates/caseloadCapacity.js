const capacityData = {
  headings: [
    '2021-12-03T06:56:00.250Z',
    '2021-12-04T06:56:00.250Z',
    '2021-12-05T06:56:00.250Z',
    '2021-12-06T06:56:00.250Z',
    '2021-12-07T06:56:00.250Z',
    '2021-12-08T06:56:00.250Z',
    '2021-12-09T06:56:00.250Z',
    '2021-12-10T06:56:00.250Z',
    '2021-12-11T06:56:00.250Z',
    '2021-12-12T06:56:00.250Z',
    '2021-12-13T06:56:00.250Z',
    '2021-12-14T06:56:00.250Z',
    '2021-12-15T06:56:00.250Z',
    '2021-12-16T06:56:00.250Z',
    '2021-12-17T06:56:00.250Z',
    '2021-12-18T06:56:00.250Z',
    '2021-12-19T06:56:00.250Z',
    '2021-12-20T06:56:00.250Z',
    '2021-12-21T06:56:00.250Z',
    '2021-12-22T06:56:00.253Z',
    '2021-12-23T06:56:00.243Z',
    '2021-12-24T06:56:00.243Z',
    '2021-12-25T06:56:00.250Z',
    '2021-12-26T06:56:00.250Z',
    '2021-12-27T06:56:00.250Z',
    '2021-12-28T06:56:00.250Z',
    '2021-12-29T06:56:00.253Z',
    '2021-12-30T06:56:00.243Z',
    '2021-12-31T06:56:00.243Z',
  ],
  rows: [
    {
        label: 'Probation Delivery Unit 385 Capacity',
        values: [102,97,101,101,102,97,101,101,102,102,97,101,101,102,97,102,97,101,101,102,97,101,102,97,101,101,102,97,101]
    },
    {
        label: 'Probation Delivery Unit 385 Reduction Hours',
        values: [562.7,562.7,560.8,561.0,562.7,562.7,560.8,561.0,562.7,562.7,562.7,560.8,561.0,562.7,562.7,562.7,562.7,560.8,561.0,562.7,562.7,560.8,562.7,562.7,560.8,561.0,562.7,562.7,560.8]
    },
    {
        label: 'Probation Delivery Unit 385 Reduction Hours Percentage',
        values: [16,16,16,15,16,16,16,15,16,16,16,16,15,16,16,16,16,16,15,16,16,16,16,16,16,15,16,16,16]
    },
  ]
}

const stringifyCapacityData = function (capacity) {
    const capacityData = Object.assign({}, capacity)
    return JSON.stringify(capacityData)
}
  
module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'capacity.njk',
    njkData: {
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],
        capacity: capacityData,
        stringifiedCapacity: stringifyCapacityData(capacityData),
        organisationLevel: 'offender-manager',
        caseDetails: [
          {
            tierCode: 'B2',
            rowType: 'Row Type 1',
            caseReferenceNo: '1234',
            caseType: 'CaseType 1'
          },
          {
            tierCode: 'A0',
            rowType: 'Row Type 2',
            caseReferenceNo: '5678',
            caseType: 'CaseType 2'
          },
        ],
        childOrganisationLevelDisplayText: 'Offender Manager',
        /* */
        // OPTION 2 - TEAM LEVEL
        /*
        organisationLevel: 'team',
        canExportOutstanding: false,
        capacityBreakdown: [
          {
            name: 'Name One',
            grade: 'SPO',
            capacityPercentage: 113,
            capacity: 123,
            totalCases: 3,
            totalT2aCases: 3,
            totalTotalT2aCases: 1,
            totalARMS: 3,
            totalParoms: 3,
            totalSdrConversions: 3,
            totalSDRs: 3,
            totalGs: 3,
            totalGSPoints: 3,
            totalCMS: 3,
            totalCMSPoints: 3,
            linkId: 'Link1',
            armsTotalCases: 2,
            paroms: 0,
            sdrConversions: 4,
            sdrs: -1,
            gsPercentage: 17,
            gsPoints: 37,
            cmsPercentage: 22,
            cmsPoints: 44,
          },
          {
            name: 'Name Two',
            grade: 'SPO',
            capacityPercentage: 44,
            capacity: 33,
            totalCases: 3,
            totalT2aCases: 3,
            totalTotalT2aCases: 1,
            totalARMS: 3,
            totalParoms: 3,
            totalSdrConversions: 3,
            totalSDRs: 3,
            totalGs: 3,
            totalGSPoints: 3,
            totalCMS: 3,
            totalCMSPoints: 3,
            linkId: 'Link1',
            armsTotalCases: 2,
            paroms: 0,
            sdrConversions: 4,
            sdrs: -1,
            gsPercentage: 17,
            gsPoints: 37,
            cmsPercentage: 22,
            cmsPoints: 44,
          }
        ],
        outstandingReports: [
          {
            name: 'Name One',
            grade: 'PSO',
            ow: 3,
            upw: 4,
            ot: 5,
            sl: 6,
            sso: 7,
            linkId: 'Link1',
          },
          {
            name: 'Totals',
            totalOW: 2,
            totalUPW: 3,
            totalOT: 4,
            totalSL: 5,
            totalSSO: 6,
          },
        ],
        childOrganisationLevelDisplayText: 'Team',
        /* */
        // OPTION 3 - REGION/LDU LEVEL
        /* 
        organisationLevel: 'region',
        capacityBreakdown: [
          {
            name: 'Name One',
            capacity: 12,
            totalCases: 12,
            totalTotalT2aCases: 12,
            totalARMS: 12,
            totalParoms: 12,
            totalSdrConversions: 12,
            totalSDRs: 12,
            totalGs: 12,
            totalGSPoints: 12,
            totalCMS: 12,
            totalCMSPoints: 12,
            grades: [
              {
                grade: 'SPO',
                capacityPercentage: 113,
                totalCases: 7,
                totalT2aCases: 1,
                armsTotalCases: 2,
                paroms: 0,
                sdrConversions: 4,
                sdrs: -1,
                gsPercentage: 17,
                gsPoints: 37,
                cmsPercentage: 22,
                cmsPoints: 44,
              },
              {
                grade: 'B2',
                capacityPercentage: 103,
                totalCases: 37,
                totalT2aCases: 31,
                armsTotalCases: 32,
                paroms: 30,
                sdrConversions: 34,
                sdrs: -31,
                gsPercentage: 317,
                gsPoints: 337,
                cmsPercentage: 82,
                cmsPoints: 144,
              },
            ],
          }
        ],
        outstandingReports: [
          {
            name: 'Name One',
            totalOW: 2,
            totalUPW: 3,
            totalOT: 4,
            totalSL: 5,
            totalSSO: 6,
            linkId: 'Link2',
            grades: [
              {
                grade: 'PSO',
                ow: 3,
                upw: 4,
                ot: 5,
                sl: 6,
                sso: 7,
              },
              {
                grade: 'PO',
                ow: 13,
                upw: 14,
                ot: 15,
                sl: 16,
                sso: 17,
              },
            ],
          }
        ],
        childOrganisationLevelDisplayText: 'LDU',
        /* */
        // OPTION 4 - HMPPS LEVEL
        /* 
        organisationLevel: 'hmpps',
        capacityBreakdown: [
          {
            name: 'Name One 1',
            grades: [
              {
                grade: 'SPO',
                capacityPercentage: 113,
                totalCases: 7,
                totalT2aCases: 1,
                armsTotalCases: 2,
                paroms: 0,
                sdrConversions: 4,
                sdrs: -1,
                gsPercentage: 17,
                gsPoints: 37,
                cmsPercentage: 22,
                cmsPoints: 44,
              },
              {
                grade: 'B2',
                capacityPercentage: 103,
                totalCases: 37,
                totalT2aCases: 31,
                armsTotalCases: 32,
                paroms: 30,
                sdrConversions: 34,
                sdrs: -31,
                gsPercentage: 317,
                gsPoints: 337,
                cmsPercentage: 82,
                cmsPoints: 144,
              },
              {
                grade: 'SPB',
                capacityPercentage: 92,
                totalCases: 7,
                totalT2aCases: 1,
                armsTotalCases: 2,
                paroms: 0,
                sdrConversions: 4,
                sdrs: -1,
                gsPercentage: 17,
                gsPoints: 37,
                cmsPercentage: 22,
                cmsPoints: 44,
              },
            ],
          }
        ],
        capacityBreakdownTotals: {
          name: 'Totals',
          capacity: 12,
          totalCases: 12,
          totalTotalT2aCases: 12,
          totalARMS: 12,
          totalParoms: 12,
          totalSdrConversions: 12,
          totalSDRs: 12,
          totalGs: 12,
          totalGSPoints: 12,
          totalCMS: 12,
          totalCMSPoints: 12,
        },
        outstandingReports: [
          {
            name: 'Name One',
            linkId: 'Link2',
            grades: [
              {
                grade: 'PSO',
                ow: 3,
                upw: 4,
                ot: 5,
                sl: 6,
                sso: 7,
              },
              {
                grade: 'PO',
                ow: 13,
                upw: 14,
                ot: 15,
                sl: 16,
                sso: 17,
              },
            ],
          }
        ],
        outstandingReportsTotals: {
          name: 'Totals',
          totalOW: 2,
          totalUPW: 3,
          totalOT: 4,
          totalSL: 5,
          totalSSO: 6,
        },
        childOrganisationLevelDisplayText: 'REGION',
        /* */

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
