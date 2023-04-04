const aTotal = {
  a3: 13,
  a2: 12,
  a1: 11,
  a0: 10,
  b3: 23,
  b2: 22,
  b1: 21,
  b0: 20,
  c3: 33,
  c2: 32,
  c1: 31,
  c0: 30,
  d3: 43,
  d2: 42,
  d1: 31,
  d0: 40,
  untiered: 444,
  overall: 110,
}

const baseData = {
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],

        // OPTION 1 - TEAM LEVEL (1 table)
        /*
        organisationLevel: 'team',
        // organisationLevel: 'LDU',

        caseloadDetails: [
          {
            // displayName: 'Overall'
            displayName: 'Display Name',

            totalSummary: 'Summary of total',
            array: [
              {
                name: 'Example name',
                linkId: 'Link1',
                grade: 'SPO',
                a3: 13,
                a2: 12,
                a1: 11,
                a0: 10,
                b3: 23,
                b2: 22,
                b1: 21,
                b0: 20,
                c3: 33,
                c2: 32,
                c1: 31,
                c0: 30,
                d3: 43,
                d2: 42,
                d1: 31,
                d0: 40,
                untiered: 111,
                totalCases: 4,
              },
            ],
          }
        ],
        /* */

        // OPTION 2 - OTHER LEVEL (2 tables, dependent on display name)
        /* */
        organisationLevel: 'LDU',

        caseloadDetails: [
          {
            // TABLE OPTION 1 - OVERALL
            displayName: 'Overall',

            totalSummary: [
              {
                name: 'Total',

                communityTotalCases: 19,
                licenseTotalCases: 21,
                custodyTotalCases: 22,
                totalCases: 110
              },
              {
                name: 'Not total',

                communityTotalCases: 9,
                licenseTotalCases: 1,
                custodyTotalCases: 2,
                totalCases: 12
              }
            ],
            totalsRow: {
              totalCommunity: 3,
              totalLicense: 13,
              totalCustody: 14,
              totalTotalCases: 33
            },
            detailsPercentages: 'Summary of total',
            array: {
              detailsPercentages: [
                {
                  name: 'Example name',
                  grades: [
                    {
                      linkId: 'Link1',
                      grade: 'SPO',
                      a3: 13,
                      a2: 12,
                      a1: 11,
                      a0: 10,
                      b3: 23,
                      b2: 22,
                      b1: 21,
                      b0: 20,
                      c3: 33,
                      c2: 32,
                      c1: 31,
                      c0: 30,
                      d3: 43,
                      d2: 42,
                      d1: 31,
                      d0: 40,
                      untiered: 333,
                      totalCases: 4,
                    },
                  ],
                }
              ],
              percentageTotals: {
                PO: {
                  a3: 13,
                  a2: 12,
                  a1: 11,
                  a0: 10,
                  b3: 23,
                  b2: 22,
                  b1: 21,
                  b0: 20,
                  c3: 33,
                  c2: 32,
                  c1: 31,
                  c0: 30,
                  d3: 43,
                  d2: 42,
                  d1: 31,
                  d0: 40,
                  untiered: 444,
                  totalCases: 4,
                }
              }
            },
          },
          {
            // TABLE OPTION 2 - NOT OVERALL
            displayName: 'Not Overall',

            array: {
              details: [
                {
                  name: 'Example name2',
                  grades: [
                    {
                      linkId: 'Link1',
                      grade: 'SPO',
                      a3: 13,
                      a2: 12,
                      a1: 11,
                      a0: 10,
                      b3: 23,
                      b2: 22,
                      b1: 21,
                      b0: 20,
                      c3: 33,
                      c2: 32,
                      c1: 31,
                      c0: 30,
                      d3: 43,
                      d2: 42,
                      d1: 31,
                      d0: 40,
                      untiered: 555,
                      totalCases: 4,
                    },
                  ],
                }
              ],
              totals: {
                PO: {
                  a3: 13,
                  a2: 12,
                  a1: 11,
                  a0: 10,
                  b3: 23,
                  b2: 22,
                  b1: 21,
                  b0: 20,
                  c3: 33,
                  c2: 32,
                  c1: 31,
                  c0: 30,
                  d3: 43,
                  d2: 42,
                  d1: 31,
                  d0: 40,
                  untiered: 777,
                  totalCases: 4,
                }
              },
              detailsPercentages: [
                {
                  name: 'Example name3',
                  grades: [
                    {
                      linkId: 'Link1',
                      grade: 'SPO',
                      a3: 13,
                      a2: 12,
                      a1: 11,
                      a0: 10,
                      b3: 23,
                      b2: 22,
                      b1: 21,
                      b0: 20,
                      c3: 33,
                      c2: 32,
                      c1: 31,
                      c0: 30,
                      d3: 43,
                      d2: 42,
                      d1: 31,
                      d0: 40,
                      untiered: 666,
                      totalCases: 4,
                    },
                  ],
                }
              ],
              percentageTotals: {
                PO: {
                  a3: 13,
                  a2: 12,
                  a1: 11,
                  a0: 10,
                  b3: 23,
                  b2: 22,
                  b1: 21,
                  b0: 20,
                  c3: 33,
                  c2: 32,
                  c1: 31,
                  c0: 30,
                  d3: 43,
                  d2: 42,
                  d1: 31,
                  d0: 40,
                  untiered: 888,
                  totalCases: 4,
                }
              }
            },
          }
        ],
        /* */

        childOrganisationLevelDisplayText: 'team',
        childOrganisationLevel: 'team',

        // canExportCaseload: true,
        // isNationalExport: true,
        canExportCaseload: false,
        isNationalExport: false,
        exportAreaTitle: 'Notional Area',

        linkId: 'Link1',
        screen: 'Screen 1',
}

function getNjkData() {
  // This is invalid JSON but the code gets away with it
  baseData.caseloadDetails[0].array.totals = aTotal
  return baseData
}

const njkData = getNjkData()

module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'caseload.njk',
    njkData
}
