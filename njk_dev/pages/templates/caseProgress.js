const caseProgressListData = [
  {
    name : 'Ex 1',
    communityLast16Weeks: 2,
    licenseLast16Weeks: 3,
    totalCases: 4,
    warrantsTotal: 5,
    unpaidWorkTotal: 6,
    overdueTerminationsTotal: 7,
  },
  {
    name : 'Ex 2',
    communityLast16Weeks: 21,
    licenseLast16Weeks: 31,
    totalCases: 41,
    warrantsTotal: 51,
    unpaidWorkTotal: 61,
    overdueTerminationsTotal: 71,
  },
]

const stringifyProgressData = function (progress) {
    const progressData = Object.assign([], progress)
    return JSON.stringify(progressData)
}
  
module.exports = {
    // This filename is relative to the nunjucks directories (configured elsewhere).
    // From nunjucks node_loaders.getSource: "Only allow the current directory [anything in the above path] and anything underneath it to be searched"
    njkName: 'case-progress.njk',
    njkData: {
        subNav: [ {
          active: true,
          title: 'A Subnav Heading'
        } ],
        caseProgressList: caseProgressListData,
        stringifiedCaseProgressList: stringifyProgressData(caseProgressListData),
        date: '2021-12-28T06:56:00.250Z',
        workloadType: 'PROBATION',
        organisationLevel: 'hmpps',
        onOffenderManager: true
      }
}
