const dateFormatter = require('../../app/services/date-formatter')

const replaceSpaces = / /g
const timestamp = dateFormatter.formatDate(new Date(), 'DD MM YYYY THH mm').toString()

module.exports.TEAM_CASELOAD_RESULT = {
  title: 'Test Team',
  caseloadDetails: {
    overallCaseloadDetails: [
      { linkId: 2767, name: 'John Smith', grade: 'PO', untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, totalCases: 189, caseType: 'COMMUNITY' },
      { linkId: 2771, name: 'Tony Test', grade: 'PO', untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, totalCases: 189, caseType: 'COMMUNITY' }
    ],
    custodyCaseloadDetails: [],
    communityCaseloadDetails: [],
    licenseCaseloadDetails: []
  }
}

module.exports.TEAM_CASELOAD_CSV = {
  filename: ('Test_Team_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
    '"Offender Manager Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
    '"John Smith","PO",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,0,189\n' +
    '"Tony Test","PO",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,0,189\n\n\n' +
    'CUSTODY\n' +
    '"Offender Manager Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n\n\n' +
    'COMMUNITY\n' +
    '"Offender Manager Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n\n\n' +
    'LICENSE\n' +
    '"Offender Manager Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"'
}

module.exports.ARMS_EXPORT_CSV = {
  filename: ('Test_Arms_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Assessment Date","CRN","Offender Manager Name","Offender Manager Grade","Sentence Type","Sentence or Release Date","Completion Date"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","4-10-2018","CASEREF30134","A.N. Offender Manager CMBY478NPSM","PO","Licence","14-9-2018","21-9-2018"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","9-10-2018","CASEREF30154","A.N. Offender Manager CMBY478NPSM","PO","Community","22-2-2017","22-8-2017"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","28-9-2018","CASEREF30098","A.N. Offender Manager CMBE297NPSM","PO","Community","1-1-1800","1-10-1800"\n' +
    '"NPS North West","Cumbria","Rehabilitation","10-9-2018","CASEREF30027","A.N. Offender Manager N01B324NPSM","PO","Community","25-7-2018","01-01-2019"\n' +
    '"NPS North West","Cumbria","Rehabilitation","19-9-2018","CASEREF30065","A.N. Offender Manager N01B324NPSM","PO","Community","16-12-2016","16-12-2020"'
}

module.exports.T2A_EXPORT_CSV = {
  filename: ('Test_Arms_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","CRN","Offender Manager Name","Grade Code","Event Number","Allocation Date","NSI Outcome Code","NSI Outcome Description"\n' +
    '"NPS East of England","Essex South","EXS-SEE and Southend OM2","E312593","N56B266 ","PO","1","15-10-2020","ROL01","ROL01"\n' +
    '"NPS East of England","Essex South","EXS-SEE and Southend OM2","E312604","N56B441 ","PO","2","30-12-2020","ROL01","ROL01"\n' +
    '"NPS East of England","Essex South","EXS-SEE and Southend OM2","E345090","N56B267 ","PO","1","26-9-2020","ROL01","ROL01"\n' +
    '"NPS East of England","Essex South","EXS-SEE and Southend OM1","E220534","N56B249 ","PO","1","26-9-2020","ROL01","ROL01"\n' +
    '"NPS East of England","Essex South","EXS-SEE and Southend OM1","E324828","N56B252 ","PO","2","25-2-2021","ROL01","ROL01"'
}

module.exports.ARMS_EXPORT_RESULT = {
  title: 'ARMS Export',
  armsExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    assessmentDate: '4-10-2018',
    CRN: 'CASEREF30134',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    sentencetype: 'Licence',
    releaseDate: '14-9-2018',
    completedDate: '21-9-2018'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    assessmentDate: '9-10-2018',
    CRN: 'CASEREF30154',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '22-2-2017',
    completedDate: '22-8-2017'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    assessmentDate: '28-9-2018',
    CRN: 'CASEREF30098',
    omName: 'A.N. Offender Manager CMBE297NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '1-1-1800',
    completedDate: '1-10-1800'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    assessmentDate: '10-9-2018',
    CRN: 'CASEREF30027',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '25-7-2018',
    completedDate: '01-01-2019'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    assessmentDate: '19-9-2018',
    CRN: 'CASEREF30065',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    sentencetype: 'Community',
    releaseDate: '16-12-2016',
    completedDate: '16-12-2020'
  }]
}

module.exports.T2A_EXPORT_RESULT = {
  title: 'ARMS Export',
  armsExportDetails:
  [{
    regionName: 'NPS East of England',
    regionId: 39,
    lduName: 'Essex South',
    lduId: 806,
    teamName: 'EXS-SEE and Southend OM2',
    teamId: 5121,
    CRN: 'E312593',
    workload_owner_id: 26012,
    omName: 'N56B266 ',
    omCode: 'PO',
    Event_No: '1',
    Allocation_Date: '15-10-2020',
    NSI_Outcome_Cd: 'ROL01',
    NSI_Outcome_Desc: 'ROL01'
  },
  {
    regionName: 'NPS East of England',
    regionId: 39,
    lduName: 'Essex South',
    lduId: 806,
    teamName: 'EXS-SEE and Southend OM2',
    teamId: 5121,
    CRN: 'E312604',
    workload_owner_id: 28125,
    omName: 'N56B441 ',
    omCode: 'PO',
    Event_No: '2',
    Allocation_Date: '30-12-2020',
    NSI_Outcome_Cd: 'ROL01',
    NSI_Outcome_Desc: 'ROL01'
  },
  {
    regionName: 'NPS East of England',
    regionId: 39,
    lduName: 'Essex South',
    lduId: 806,
    teamName: 'EXS-SEE and Southend OM2',
    teamId: 5121,
    CRN: 'E345090',
    workload_owner_id: 26027,
    omName: 'N56B267 ',
    omCode: 'PO',
    Event_No: '1',
    Allocation_Date: '26-9-2020',
    NSI_Outcome_Cd: 'ROL01',
    NSI_Outcome_Desc: 'ROL01'
  },
  {
    regionName: 'NPS East of England',
    regionId: 39,
    lduName: 'Essex South',
    lduId: 806,
    teamName: 'EXS-SEE and Southend OM1',
    teamId: 5142,
    CRN: 'E220534',
    workload_owner_id: 25854,
    omName: 'N56B249 ',
    omCode: 'PO',
    Event_No: '1',
    Allocation_Date: '26-9-2020',
    NSI_Outcome_Cd: 'ROL01',
    NSI_Outcome_Desc: 'ROL01'
  },
  {
    regionName: 'NPS East of England',
    regionId: 39,
    lduName: 'Essex South',
    lduId: 806,
    teamName: 'EXS-SEE and Southend OM1',
    teamId: 5142,
    CRN: 'E324828',
    workload_owner_id: 25893,
    omName: 'N56B252 ',
    omCode: 'PO',
    Event_No: '2',
    Allocation_Date: '25-2-2021',
    NSI_Outcome_Cd: 'ROL01',
    NSI_Outcome_Desc: 'ROL01'
  }]
}

module.exports.PERCENTAGE_WORKLOAD_EXPORT_RESULT = {
  title: 'Percentage Workload Breakdown Export',
  percentageWorkloadExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    capacity: '100%',
    caseContribution: '99%',
    cmsContribution: '98%',
    gsContribution: '97%',
    armsContribution: '96%',
    paromsContribution: '95%',
    sdrContribution: '94%',
    fdrContribution: '93%',
    contractedHours: 37,
    reductionHours: 10
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    omName: 'A.N. Offender Manager CMBY478NPSM',
    omGrade: 'PO',
    capacity: '99%',
    caseContribution: '98%',
    cmsContribution: '97%',
    gsContribution: '96%',
    armsContribution: '95%',
    paromsContribution: '94%',
    sdrContribution: '93%',
    fdrContribution: '92%',
    contractedHours: 36,
    reductionHours: 9
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'NPS - Carlisle 1',
    omName: 'A.N. Offender Manager CMBE297NPSM',
    omGrade: 'PO',
    capacity: '98%',
    caseContribution: '97%',
    cmsContribution: '96%',
    gsContribution: '95%',
    armsContribution: '94%',
    paromsContribution: '93%',
    sdrContribution: '92%',
    fdrContribution: '91%',
    contractedHours: 35,
    reductionHours: 8
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    capacity: '97%',
    caseContribution: '96%',
    cmsContribution: '95%',
    gsContribution: '94%',
    armsContribution: '93%',
    paromsContribution: '92%',
    sdrContribution: '91%',
    fdrContribution: '90%',
    contractedHours: 34,
    reductionHours: 7
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cumbria',
    teamName: 'Rehabilitation',
    omName: 'A.N. Offender Manager N01B324NPSM',
    omGrade: 'PO',
    capacity: '96%',
    caseContribution: '95%',
    cmsContribution: '94%',
    gsContribution: '93%',
    armsContribution: '92%',
    paromsContribution: '91%',
    sdrContribution: '90%',
    fdrContribution: '89%',
    contractedHours: 33,
    reductionHours: 6
  }]
}

module.exports.PERCENTAGE_WORKLOAD_EXPORT_CSV = {
  filename: ('Test_Percentage_Workload_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Offender Manager Name","Offender Manager Grade","Contracted Hours","Reduction Hours","Capacity","Case Contribution","CMS Contribution","GS Contribution","ARMS Contribution","PAROMS Contribution","SDR Contribution","FDR Contribution"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","A.N. Offender Manager CMBY478NPSM","PO",37,10,"100%","99%","98%","97%","96%","95%","94%","93%"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","A.N. Offender Manager CMBY478NPSM","PO",36,9,"99%","98%","97%","96%","95%","94%","93%","92%"\n' +
    '"NPS North West","Cumbria","NPS - Carlisle 1","A.N. Offender Manager CMBE297NPSM","PO",35,8,"98%","97%","96%","95%","94%","93%","92%","91%"\n' +
    '"NPS North West","Cumbria","Rehabilitation","A.N. Offender Manager N01B324NPSM","PO",34,7,"97%","96%","95%","94%","93%","92%","91%","90%"\n' +
    '"NPS North West","Cumbria","Rehabilitation","A.N. Offender Manager N01B324NPSM","PO",33,6,"96%","95%","94%","93%","92%","91%","90%","89%"'
}

module.exports.CASE_DETAILS_EXPORT_CSV = {
  filename: ('Test_Case_Details_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Tier Code","Row Type","CRN","Case Type","Offender Manager Name","Grade Code"\n' +
  '"NPS North West","Cheshire","Crewe NPS OMU","D2","N","CASEREF5448","COMMUNITY","A.N. Offender Manager N01CA1U","DMY"\n' +
  '"NPS North West","Cheshire","Warrington NPS OMU","B1","N","CASEREF67","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"\n' +
    '"NPS North West","Cheshire","Warrington NPS OMU","C1","N","CASEREF2413","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"\n' +
    '"NPS North West","Cheshire","Warrington NPS OMU","C1","N","CASEREF2479","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"\n' +
    '"NPS North West","Cheshire","Warrington NPS OMU","C1","N","CASEREF6008","COMMUNITY","A.N. Offender Manager CHSZ943NPSM","PO"'
}

module.exports.CASE_DETAILS_EXPORT_RESULT = {
  title: 'Case Details Export',
  caseDetailsExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Crewe NPS OMU',
    tierCode: 'D2',
    rowType: 'N',
    caseReferenceNo: 'CASEREF5448',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager N01CA1U',
    gradeCode: 'DMY'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'B1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF67',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'C1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF2413',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'C1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF2479',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Cheshire',
    teamName: 'Warrington NPS OMU',
    tierCode: 'C1',
    rowType: 'N',
    caseReferenceNo: 'CASEREF6008',
    caseType: 'COMMUNITY',
    offenderManagerName: 'A.N. Offender Manager CHSZ943NPSM',
    gradeCode: 'PO'
  }]
}

module.exports.CMS_EXPORT_CSV = {
  filename: ('Test_CMS_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Contact Region Name","Contact Probation Delivery Unit","Contact Team Name","Contact Date","Contact Name","Contact Grade","OM Region Name","OM Probation Delivery Unit","OM Team Name","CRN","OM Name","OM Grade","Contact Type Description","Contact Code","Contact Points","OM Points"\n' +
  '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","24-9-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1000","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - High","CMS30",18,-18\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","24-9-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1001","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - High","CMS30",18,-18\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","24-9-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1002","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - High","CMS30",18,-18\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","4-10-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1003","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - Low","CMS30",5,-5\n' +
    '"NPS North West","Lancashire NW","Blackpool OMU C - NPS","4-10-2018","A.N. Offender Manager N01D068NPSQ","PSO","NPS North West","Lancashire NW","Blackpool OMU C - NPS","CASEREF1004","A.N. Offender Manager LCSE771NPSM","PO","CMS - Case Related Communication - Low","CMS30",5,-5'
}

module.exports.CMS_EXPORT_RESULT = {
  title: 'Case Details Export',
  cmsExportDetails:
  [{
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '24-9-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1659864416,
    caseRefNo: 'CASEREF1000',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - High',
    contactCode: 'CMS30',
    contactPoints: 18,
    omPoints: -18
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '24-9-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1659864416,
    caseRefNo: 'CASEREF1001',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - High',
    contactCode: 'CMS30',
    contactPoints: 18,
    omPoints: -18
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '24-9-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1659864416,
    caseRefNo: 'CASEREF1002',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - High',
    contactCode: 'CMS30',
    contactPoints: 18,
    omPoints: -18
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '4-10-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1660958873,
    caseRefNo: 'CASEREF1003',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - Low',
    contactCode: 'CMS30',
    contactPoints: 5,
    omPoints: -5
  },
  {
    contactRegionName: 'NPS North West',
    contactLduName: 'Lancashire NW',
    contactTeamName: 'Blackpool OMU C - NPS',
    contactDate: '4-10-2018',
    contactName: 'A.N. Offender Manager N01D068NPSQ',
    contactGradeCode: 'PSO',
    omRegionName: 'NPS North West',
    omLduName: 'Lancashire NW',
    omTeamName: 'Blackpool OMU C - NPS',
    contactId: 1660958873,
    caseRefNo: 'CASEREF1004',
    omName: 'A.N. Offender Manager LCSE771NPSM',
    omGradeCode: 'PO',
    contactDescription: 'CMS - Case Related Communication - Low',
    contactCode: 'CMS30',
    contactPoints: 5,
    omPoints: -5
  }]
}

module.exports.GS_EXPORT_CSV = {
  filename: ('Test_Group_Supervision_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Contact Date","CRN","Offender Manager Name","Offender Manager Grade","Contact Type Description","Contact Code","Points"\n' +
  '"NPS North West","Lancashire SE","NPS - Burnley 1","10-10-2018","GS2000","A.N. Offender Manager N01B320NPSM","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 1","10-10-2018","GS2001","A.N. Offender Manager N01B320NPSM","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 2","10-10-2018","GS2002","A.N. Offender Manager N01C411NPSN","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 2","10-10-2018","GS2003","A.N. Offender Manager N01B911NPSM","PO","GS Employment session NS","NGS006",-15\n' +
    '"NPS North West","Lancashire SE","NPS - Burnley 2","10-10-2018","GS2004","A.N. Offender Manager N01C411NPSN","PO","GS Employment session NS","NGS006",-15'
}

module.exports.GS_EXPORT_RESULT = {
  title: 'Group Supervision Export',
  gsExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 1',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2000',
    contactId: 1660883167,
    omName: 'A.N. Offender Manager N01B320NPSM',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 1',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2001',
    contactId: 1660858807,
    omName: 'A.N. Offender Manager N01B320NPSM',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 2',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2002',
    contactId: 1661654096,
    omName: 'A.N. Offender Manager N01C411NPSN',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 2',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2003',
    contactId: 1660908486,
    omName: 'A.N. Offender Manager N01B911NPSM',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Burnley 2',
    contactDate: '10-10-2018',
    caseRefNo: 'GS2004',
    contactId: 1660902791,
    omName: 'A.N. Offender Manager N01C411NPSN',
    omGradeCode: 'PO',
    contactDescription: 'GS Employment session NS',
    contactCode: 'NGS006',
    points: -15
  }]
}

module.exports.SUSPENDED_LIFER_CSV = {
  filename: ('Test_Suspended_Lifer_Export ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region Name","Probation Delivery Unit","Team Name","Tier Code","Row Type","CRN","Case Type","Offender Manager Name","Grade Code","In Custody?","Register Level","Register Category","Register Category Description","Registration Date"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N144966","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF01","Lifer - IPP","28/02/2019"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N145304","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","19/12/1990"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N146588","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","28/05/1999"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N148080","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","14/02/2019"\n' +
  '"NPS North West","Lancashire SE","NPS - Blackburn 2","D2","Suspended Lifer","N148392","LICENSE","Test Forename 511 Test Surname 511","PSO","No","L2","LF03","Lifer - Life Imprisonment","14/02/2019"'
}

module.exports.SUSPENDED_LIFER_EXPORT_RESULT = {
  title: 'Suspended Lifers Export',
  suspendedLiferExportDetails:
  [{
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N144966',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF01',
    registerCategoryDescription: 'Lifer - IPP',
    registrationDate: '28/02/2019'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N145304',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '19/12/1990'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N146588',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '28/05/1999'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N148080',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '14/02/2019'
  },
  {
    regionName: 'NPS North West',
    lduName: 'Lancashire SE',
    teamName: 'NPS - Blackburn 2',
    tierCode: 'D2',
    rowType: 'Suspended Lifer',
    caseReferenceNo: 'N148392',
    caseType: 'LICENSE',
    offenderManagerName: 'Test Forename 511 Test Surname 511',
    gradeCode: 'PSO',
    inCustody: 'No',
    registerLevel: 'L2',
    registerCategory: 'LF03',
    registerCategoryDescription: 'Lifer - Life Imprisonment',
    registrationDate: '14/02/2019'
  }]
}

module.exports.LDU_CASELOAD_RESULT = {
  title: 'Probation Delivery Unit 2',
  subTitle: 'Probation Delivery Unit',
  caseloadDetails:
  {
    overallCaseloadDetails:
  {
    details:
  [{
    linkId: 71,
    name: 'Team 2',
    grades:
    [{
      grade: 'PO',
      a3: 1,
      a2: 2,
      a1: 3,
      a0: 4,
      b3: 5,
      b2: 6,
      b1: 7,
      b0: 8,
      c3: 9,
      c2: 10,
      c1: 11,
      c0: 12,
      d3: 13,
      d2: 14,
      d1: 15,
      d0: 16,
      untiered: 0,
      totalCases: 207
    },
    {
      grade: 'PSO',
      a3: 5,
      a2: 10,
      a1: 15,
      a0: 20,
      b3: 25,
      b2: 30,
      b1: 35,
      b0: 40,
      c3: 45,
      c2: 50,
      c1: 45,
      c0: 40,
      d3: 35,
      d2: 30,
      d1: 25,
      d0: 20,
      untiered: 2,
      totalCases: 138
    }]
  }],
    totals:
    {
      PO:
    {
      grade: 'PO',
      a3: 1,
      a2: 2,
      a1: 3,
      a0: 4,
      b3: 5,
      b2: 6,
      b1: 7,
      b0: 8,
      c3: 9,
      c2: 10,
      c1: 11,
      c0: 12,
      d3: 13,
      d2: 14,
      d1: 15,
      d0: 16,
      untiered: 0,
      totalCases: 207,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a3: 5,
        a2: 10,
        a1: 15,
        a0: 20,
        b3: 25,
        b2: 30,
        b1: 35,
        b0: 40,
        c3: 45,
        c2: 50,
        c1: 45,
        c0: 40,
        d3: 35,
        d2: 30,
        d1: 25,
        d0: 20,
        untiered: 2,
        totalCases: 138,
        numberOfType: 1
      }
    },
    detailsPercentages:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a3: 45,
        a2: 70,
        a1: 60,
        a0: 50,
        b3: 75,
        b2: 50,
        b1: 37,
        b0: 25,
        c3: 50,
        c2: 50,
        c1: 50,
        c0: 50,
        d3: 25,
        d2: 25,
        d1: 25,
        d0: 25,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a3: 55,
        a2: 30,
        a1: 40,
        a0: 50,
        b3: 25,
        b2: 50,
        b1: 62,
        b0: 75,
        c3: 50,
        c2: 50,
        c1: 50,
        c0: 50,
        d3: 25,
        d2: 25,
        d1: 25,
        d0: 25,
        untiered: 40,
        totalCases: 40
      }]
    }],
    percentageTotals:
    {
      PO:
    {
      grade: 'PO',
      a3: 45,
      a2: 70,
      a1: 60,
      a0: 50,
      b3: 75,
      b2: 50,
      b1: 37,
      b0: 25,
      c3: 50,
      c2: 50,
      c1: 50,
      c0: 50,
      d3: 25,
      d2: 25,
      d1: 25,
      d0: 25,
      untiered: 60,
      totalCases: 60,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a3: 55,
        a2: 30,
        a1: 40,
        a0: 50,
        b3: 25,
        b2: 50,
        b1: 62,
        b0: 75,
        c3: 50,
        c2: 50,
        c1: 50,
        c0: 50,
        d3: 25,
        d2: 25,
        d1: 25,
        d0: 25,
        untiered: 40,
        totalCases: 40,
        numberOfType: 1
      }
    }
  },
    communityCaseloadDetails:
    {
      details:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a3: 9,
        a2: 7,
        a1: 6,
        a0: 5,
        b3: 30,
        b2: 20,
        b1: 15,
        b0: 10,
        c3: 5,
        c2: 2,
        c1: 3,
        c0: 11,
        d3: 1,
        d2: 3,
        d1: 3,
        d0: 12,
        untiered: 0,
        totalCases: 63
      },
      {
        grade: 'PSO',
        a3: 11,
        a2: 3,
        a1: 4,
        a0: 15,
        b3: 10,
        b2: 20,
        b1: 25,
        b0: 30,
        c3: 5,
        c2: 2,
        c1: 3,
        c0: 11,
        d3: 3,
        d2: 9,
        d1: 9,
        d0: 36,
        untiered: 0,
        totalCases: 42
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a3: 9,
        a2: 7,
        a1: 6,
        a0: 5,
        b3: 30,
        b2: 20,
        b1: 15,
        b0: 10,
        c3: 5,
        c2: 2,
        c1: 3,
        c0: 11,
        d3: 1,
        d2: 3,
        d1: 3,
        d0: 12,
        untiered: 0,
        totalCases: 63,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 11,
          a2: 3,
          a1: 4,
          a0: 15,
          b3: 10,
          b2: 20,
          b1: 25,
          b0: 30,
          c3: 5,
          c2: 2,
          c1: 3,
          c0: 11,
          d3: 3,
          d2: 9,
          d1: 9,
          d0: 36,
          untiered: 0,
          totalCases: 42,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 71,
        name: 'Team 2',
        grades:
        [{
          grade: 'PO',
          a3: 10,
          a2: 20,
          a1: 30,
          a0: 40,
          b3: 50,
          b2: 60,
          b1: 70,
          b0: 80,
          c3: 90,
          c2: 100,
          c1: 90,
          c0: 80,
          d3: 70,
          d2: 60,
          d1: 50,
          d0: 40,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a3: 90,
          a2: 80,
          a1: 70,
          a0: 60,
          b3: 50,
          b2: 40,
          b1: 30,
          b0: 20,
          c3: 10,
          c2: 0,
          c1: 10,
          c0: 20,
          d3: 30,
          d2: 40,
          d1: 50,
          d0: 60,
          untiered: 0,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a3: 10,
        a2: 20,
        a1: 30,
        a0: 40,
        b3: 50,
        b2: 60,
        b1: 70,
        b0: 80,
        c3: 90,
        c2: 100,
        c1: 90,
        c0: 80,
        d3: 70,
        d2: 60,
        d1: 50,
        d0: 40,
        untiered: 0,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 90,
          a2: 80,
          a1: 70,
          a0: 60,
          b3: 50,
          b2: 40,
          b1: 30,
          b0: 20,
          c3: 10,
          c2: 0,
          c1: 10,
          c0: 20,
          d3: 30,
          d2: 40,
          d1: 50,
          d0: 60,
          untiered: 0,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    custodyCaseloadDetails:
    {
      details:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a3: 1,
        a2: 0,
        a1: 2,
        a0: 3,
        b3: 0,
        b2: 0,
        b1: 0,
        b0: 1,
        c3: 2,
        c2: 6,
        c1: 8,
        c0: 0,
        d3: 7,
        d2: 0,
        d1: 1,
        d0: 1,
        untiered: 3,
        totalCases: 69
      },
      {
        grade: 'PSO',
        a3: 0,
        a2: 1,
        a1: 0,
        a0: 0,
        b3: 1,
        b2: 1,
        b1: 1,
        b0: 0,
        c3: 0,
        c2: 0,
        c1: 0,
        c0: 9,
        d3: 0,
        d2: 7,
        d1: 0,
        d0: 0,
        untiered: 2,
        totalCases: 46
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a3: 1,
        a2: 0,
        a1: 2,
        a0: 3,
        b3: 0,
        b2: 0,
        b1: 0,
        b0: 1,
        c3: 2,
        c2: 6,
        c1: 8,
        c0: 0,
        d3: 7,
        d2: 0,
        d1: 1,
        d0: 1,
        untiered: 3,
        totalCases: 69,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 0,
          a2: 1,
          a1: 0,
          a0: 0,
          b3: 1,
          b2: 1,
          b1: 1,
          b0: 0,
          c3: 0,
          c2: 0,
          c1: 0,
          c0: 9,
          d3: 0,
          d2: 7,
          d1: 0,
          d0: 0,
          untiered: 2,
          totalCases: 46,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 71,
        name: 'Team 2',
        grades:
        [{
          grade: 'PO',
          a3: 100,
          a2: 0,
          a1: 100,
          a0: 100,
          b3: 0,
          b2: 0,
          b1: 0,
          b0: 100,
          c3: 100,
          c2: 100,
          c1: 100,
          c0: 0,
          d3: 100,
          d2: 0,
          d1: 100,
          d0: 100,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a3: 0,
          a2: 100,
          a1: 0,
          a0: 0,
          b3: 100,
          b2: 100,
          b1: 100,
          b0: 0,
          c3: 0,
          c2: 0,
          c1: 0,
          c0: 100,
          d3: 0,
          d2: 100,
          d1: 0,
          d0: 0,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a3: 100,
        a2: 0,
        a1: 100,
        a0: 100,
        b3: 0,
        b2: 0,
        b1: 0,
        b0: 100,
        c3: 100,
        c2: 100,
        c1: 100,
        c0: 0,
        d3: 100,
        d2: 0,
        d1: 100,
        d0: 100,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 0,
          a2: 100,
          a1: 0,
          a0: 0,
          b3: 100,
          b2: 100,
          b1: 100,
          b0: 0,
          c3: 0,
          c2: 0,
          c1: 0,
          c0: 100,
          d3: 0,
          d2: 100,
          d1: 0,
          d0: 0,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    licenseCaseloadDetails:
    {
      details:
    [{
      linkId: 71,
      name: 'Team 2',
      grades:
      [{
        grade: 'PO',
        a3: 8,
        a2: 2,
        a1: 4,
        a0: 5,
        b3: 6,
        b2: 7,
        b1: 8,
        b0: 9,
        c3: 10,
        c2: 20,
        c1: 30,
        c0: 1,
        d3: 2,
        d2: 3,
        d1: 5,
        d0: 0,
        untiered: 15,
        totalCases: 75
      },
      {
        grade: 'PSO',
        a3: 2,
        a2: 8,
        a1: 1,
        a0: 5,
        b3: 4,
        b2: 3,
        b1: 2,
        b0: 1,
        c3: 10,
        c2: 20,
        c1: 30,
        c0: 7,
        d3: 0,
        d2: 0,
        d1: 1,
        d0: 2,
        untiered: 10,
        totalCases: 50
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a3: 8,
        a2: 2,
        a1: 4,
        a0: 5,
        b3: 6,
        b2: 7,
        b1: 8,
        b0: 9,
        c3: 10,
        c2: 20,
        c1: 30,
        c0: 1,
        d3: 2,
        d2: 3,
        d1: 5,
        d0: 0,
        untiered: 15,
        totalCases: 75,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 2,
          a2: 8,
          a1: 1,
          a0: 5,
          b3: 4,
          b2: 3,
          b1: 2,
          b0: 1,
          c3: 10,
          c2: 20,
          c1: 30,
          c0: 7,
          d3: 0,
          d2: 0,
          d1: 1,
          d0: 2,
          untiered: 10,
          totalCases: 50,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 71,
        name: 'Team 2',
        grades:
        [{
          grade: 'PO',
          a3: 70,
          a2: 30,
          a1: 60,
          a0: 40,
          b3: 80,
          b2: 20,
          b1: 15,
          b0: 45,
          c3: 25,
          c2: 35,
          c1: 90,
          c0: 100,
          d3: 80,
          d2: 20,
          d1: 0,
          d0: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a3: 30,
          a2: 70,
          a1: 40,
          a0: 60,
          b3: 20,
          b2: 80,
          b1: 85,
          b0: 55,
          c3: 75,
          c2: 65,
          c1: 10,
          c0: 0,
          d3: 20,
          d2: 80,
          d1: 100,
          d0: 100,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a3: 70,
        a2: 30,
        a1: 60,
        a0: 40,
        b3: 80,
        b2: 20,
        b1: 15,
        b0: 45,
        c3: 25,
        c2: 35,
        c1: 90,
        c0: 100,
        d3: 80,
        d2: 20,
        d1: 0,
        d0: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 30,
          a2: 70,
          a1: 40,
          a0: 60,
          b3: 20,
          b2: 80,
          b1: 85,
          b0: 55,
          c3: 75,
          c2: 65,
          c1: 10,
          c0: 0,
          d3: 20,
          d2: 80,
          d1: 100,
          d0: 100,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    overallTotalSummary:
    [{
      name: 'Team 2',
      linkId: 71,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    }],
    custodyTotalSummary: 115,
    communityTotalSummary: 105,
    licenseTotalSummary: 125
  }
}

module.exports.LDU_CASELOAD_CSV = {
  filename: ('Test_LDU_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Team 2",115,105,125,345\n\n\n' +
  'CUSTODY\n' +
  '"Team Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Team 2","PO",1,0,2,3,0,0,0,1,2,6,8,0,7,0,1,1,3,69\n' +
  '"Team 2","PSO",0,1,0,0,1,1,1,0,0,0,0,9,0,7,0,0,2,46\n\n\n' +
  'COMMUNITY\n' +
  '"Team Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Team 2","PO",9,7,6,5,30,20,15,10,5,2,3,11,1,3,3,12,0,63\n' +
  '"Team 2","PSO",11,3,4,15,10,20,25,30,5,2,3,11,3,9,9,36,0,42\n\n\n' +
  'LICENSE\n' +
  '"Team Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Team 2","PO",8,2,4,5,6,7,8,9,10,20,30,1,2,3,5,0,15,75\n' +
  '"Team 2","PSO",2,8,1,5,4,3,2,1,10,20,30,7,0,0,1,2,10,50\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Team Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Team 2","PO","45.00%","70.00%","60.00%","50.00%","75.00%","50.00%","37.00%","25.00%","50.00%","50.00%","50.00%","50.00%","25.00%","25.00%","25.00%","25.00%","60.00%","60.00%"\n' +
  '"Team 2","PSO","55.00%","30.00%","40.00%","50.00%","25.00%","50.00%","62.00%","75.00%","50.00%","50.00%","50.00%","50.00%","25.00%","25.00%","25.00%","25.00%","40.00%","40.00%"'
}

module.exports.REGION_CASELOAD_RESULT = {
  title: 'Region 2',
  subTitle: 'Region',
  caseloadDetails:
  {
    overallCaseloadDetails:
  {
    details:
  [{
    linkId: 70,
    name: 'Probation Delivery Unit 2',
    grades:
    [{
      grade: 'PO',
      a3: 5,
      a2: 4,
      a1: 3,
      a0: 2,
      b3: 1,
      b2: 1,
      b1: 2,
      b0: 4,
      c3: 8,
      c2: 16,
      c1: 32,
      c0: 0,
      d3: 20,
      d2: 40,
      d1: 80,
      d0: 60,
      untiered: 18,
      totalCases: 207
    },
    {
      grade: 'PSO',
      a3: 1,
      a2: 2,
      a1: 5,
      a0: 4,
      b3: 3,
      b2: 1,
      b1: 1,
      b0: 2,
      c3: 3,
      c2: 5,
      c1: 8,
      c0: 13,
      d3: 21,
      d2: 34,
      d1: 55,
      d0: 89,
      untiered: 12,
      totalCases: 138
    }]
  }],
    totals:
    {
      PO:
    {
      grade: 'PO',
      a3: 5,
      a2: 4,
      a1: 3,
      a0: 2,
      b3: 1,
      b2: 1,
      b1: 2,
      b0: 4,
      c3: 8,
      c2: 16,
      c1: 32,
      c0: 0,
      d3: 20,
      d2: 40,
      d1: 80,
      d0: 60,
      untiered: 18,
      totalCases: 207,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a3: 1,
        a2: 2,
        a1: 5,
        a0: 4,
        b3: 3,
        b2: 1,
        b1: 1,
        b0: 2,
        c3: 3,
        c2: 5,
        c1: 8,
        c0: 13,
        d3: 21,
        d2: 34,
        d1: 55,
        d0: 89,
        untiered: 12,
        totalCases: 138,
        numberOfType: 1
      }
    },
    detailsPercentages:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a3: 50,
        a2: 90,
        a1: 40,
        a0: 30,
        b3: 100,
        b2: 70,
        b1: 40,
        b0: 25,
        c3: 25,
        c2: 100,
        c1: 0,
        c0: 65,
        d3: 35,
        d2: 20,
        d1: 45,
        d0: 80,
        untiered: 60,
        totalCases: 60
      },
      {
        grade: 'PSO',
        a3: 50,
        a2: 10,
        a1: 60,
        a0: 70,
        b3: 0,
        b2: 30,
        b1: 60,
        b0: 75,
        c3: 75,
        c2: 0,
        c1: 100,
        c0: 35,
        d3: 65,
        d2: 80,
        d1: 55,
        d0: 20,
        untiered: 40,
        totalCases: 40
      }]
    }],
    percentageTotals:
    {
      PO:
    {
      grade: 'PO',
      a3: 50,
      a2: 90,
      a1: 40,
      a0: 30,
      b3: 100,
      b2: 70,
      b1: 40,
      b0: 25,
      c3: 25,
      c2: 100,
      c1: 0,
      c0: 65,
      d3: 35,
      d2: 20,
      d1: 45,
      d0: 80,
      untiered: 60,
      totalCases: 60,
      numberOfType: 1
    },
      PSO:
      {
        grade: 'PSO',
        a3: 50,
        a2: 10,
        a1: 60,
        a0: 70,
        b3: 0,
        b2: 30,
        b1: 60,
        b0: 75,
        c3: 75,
        c2: 0,
        c1: 100,
        c0: 35,
        d3: 65,
        d2: 80,
        d1: 55,
        d0: 20,
        untiered: 40,
        totalCases: 40,
        numberOfType: 1
      }
    }
  },
    communityCaseloadDetails:
    {
      details:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a3: 0,
        a2: 1,
        a1: 1,
        a0: 2,
        b3: 3,
        b2: 5,
        b1: 8,
        b0: 13,
        c3: 21,
        c2: 34,
        c1: 55,
        c0: 89,
        d3: 144,
        d2: 233,
        d1: 377,
        d0: 610,
        untiered: 0,
        totalCases: 63
      },
      {
        grade: 'PSO',
        a3: 610,
        a2: 377,
        a1: 233,
        a0: 144,
        b3: 89,
        b2: 55,
        b1: 34,
        b0: 21,
        c3: 13,
        c2: 8,
        c1: 5,
        c0: 3,
        d3: 2,
        d2: 1,
        d1: 1,
        d0: 0,
        untiered: 0,
        totalCases: 42
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a3: 0,
        a2: 1,
        a1: 1,
        a0: 2,
        b3: 3,
        b2: 5,
        b1: 8,
        b0: 13,
        c3: 21,
        c2: 34,
        c1: 55,
        c0: 89,
        d3: 144,
        d2: 233,
        d1: 377,
        d0: 610,
        untiered: 0,
        totalCases: 63,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 610,
          a2: 377,
          a1: 233,
          a0: 144,
          b3: 89,
          b2: 55,
          b1: 34,
          b0: 21,
          c3: 13,
          c2: 8,
          c1: 5,
          c0: 3,
          d3: 2,
          d2: 1,
          d1: 1,
          d0: 0,
          untiered: 0,
          totalCases: 42,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 70,
        name: 'Probation Delivery Unit 2',
        grades:
        [{
          grade: 'PO',
          a3: 55,
          a2: 60,
          a1: 65,
          a0: 70,
          b3: 75,
          b2: 80,
          b1: 85,
          b0: 90,
          c3: 95,
          c2: 100,
          c1: 0,
          c0: 10,
          d3: 20,
          d2: 30,
          d1: 40,
          d0: 100,
          untiered: 0,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a3: 45,
          a2: 40,
          a1: 35,
          a0: 30,
          b3: 25,
          b2: 20,
          b1: 15,
          b0: 10,
          c3: 5,
          c2: 0,
          c1: 100,
          c0: 90,
          d3: 80,
          d2: 70,
          d1: 60,
          d0: 0,
          untiered: 0,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a3: 55,
        a2: 60,
        a1: 65,
        a0: 70,
        b3: 75,
        b2: 80,
        b1: 85,
        b0: 90,
        c3: 95,
        c2: 100,
        c1: 0,
        c0: 10,
        d3: 20,
        d2: 30,
        d1: 40,
        d0: 100,
        untiered: 0,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 45,
          a2: 40,
          a1: 35,
          a0: 30,
          b3: 25,
          b2: 20,
          b1: 15,
          b0: 10,
          c3: 5,
          c2: 0,
          c1: 100,
          c0: 90,
          d3: 80,
          d2: 70,
          d1: 60,
          d0: 0,
          numberOfType: 1
        }
      }
    },
    custodyCaseloadDetails:
    {
      details:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a3: 3,
        a2: 2,
        a1: 1,
        a0: 0,
        b3: 4,
        b2: 5,
        b1: 6,
        b0: 1,
        c3: 4,
        c2: 0,
        c1: 8,
        c0: 5,
        d3: 1,
        d2: 4,
        d1: 3,
        d0: 6,
        untiered: 3,
        totalCases: 69
      },
      {
        grade: 'PSO',
        a3: 1,
        a2: 4,
        a1: 0,
        a0: 9,
        b3: 6,
        b2: 1,
        b1: 4,
        b0: 0,
        c3: 8,
        c2: 0,
        c1: 1,
        c0: 4,
        d3: 1,
        d2: 1,
        d1: 1,
        d0: 2,
        untiered: 2,
        totalCases: 46
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a3: 3,
        a2: 2,
        a1: 1,
        a0: 0,
        b3: 4,
        b2: 5,
        b1: 6,
        b0: 1,
        c3: 4,
        c2: 0,
        c1: 8,
        c0: 5,
        d3: 1,
        d2: 4,
        d1: 3,
        d0: 6,
        untiered: 3,
        totalCases: 69,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 1,
          a2: 4,
          a1: 0,
          a0: 9,
          b3: 6,
          b2: 1,
          b1: 4,
          b0: 0,
          c3: 8,
          c2: 0,
          c1: 1,
          c0: 4,
          d3: 1,
          d2: 1,
          d1: 1,
          d0: 2,
          untiered: 2,
          totalCases: 46,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 70,
        name: 'Probation Delivery Unit 2',
        grades:
        [{
          grade: 'PO',
          a3: 30,
          a2: 20,
          a1: 40,
          a0: 100,
          b3: 0,
          b2: 55,
          b1: 10,
          b0: 25,
          c3: 15,
          c2: 10,
          c1: 1,
          c0: 99,
          d3: 18,
          d2: 24,
          d1: 90,
          d0: 98,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a3: 70,
          a2: 80,
          a1: 60,
          a0: 0,
          b3: 100,
          b2: 45,
          b1: 90,
          b0: 75,
          c3: 85,
          c2: 90,
          c1: 99,
          c0: 1,
          d3: 82,
          d2: 76,
          d1: 10,
          d0: 2,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a3: 30,
        a2: 20,
        a1: 40,
        a0: 100,
        b3: 0,
        b2: 55,
        b1: 10,
        b0: 25,
        c3: 15,
        c2: 10,
        c1: 1,
        c0: 99,
        d3: 18,
        d2: 24,
        d1: 90,
        d0: 98,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 70,
          a2: 80,
          a1: 60,
          a0: 0,
          b3: 100,
          b2: 45,
          b1: 90,
          b0: 75,
          c3: 85,
          c2: 90,
          c1: 99,
          c0: 1,
          d3: 82,
          d2: 76,
          d1: 10,
          d0: 2,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    licenseCaseloadDetails:
    {
      details:
    [{
      linkId: 70,
      name: 'Probation Delivery Unit 2',
      grades:
      [{
        grade: 'PO',
        a3: 1,
        a2: 8,
        a1: 9,
        a0: 9,
        b3: 1,
        b2: 9,
        b1: 0,
        b0: 7,
        c3: 1,
        c2: 9,
        c1: 1,
        c0: 1,
        d3: 1,
        d2: 9,
        d1: 1,
        d0: 4,
        untiered: 15,
        totalCases: 75
      },
      {
        grade: 'PSO',
        a3: 1,
        a2: 9,
        a1: 6,
        a0: 4,
        b3: 1,
        b2: 9,
        b1: 7,
        b0: 0,
        c3: 1,
        c2: 9,
        c1: 7,
        c0: 4,
        d3: 1,
        d2: 9,
        d1: 7,
        d0: 5,
        untiered: 10,
        totalCases: 50
      }]
    }],
      totals:
      {
        PO:
      {
        grade: 'PO',
        a3: 1,
        a2: 8,
        a1: 9,
        a0: 9,
        b3: 1,
        b2: 9,
        b1: 0,
        b0: 7,
        c3: 1,
        c2: 9,
        c1: 1,
        c0: 1,
        d3: 1,
        d2: 9,
        d1: 1,
        d0: 4,
        untiered: 15,
        totalCases: 75,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 1,
          a2: 9,
          a1: 6,
          a0: 4,
          b3: 1,
          b2: 9,
          b1: 7,
          b0: 0,
          c3: 1,
          c2: 9,
          c1: 7,
          c0: 4,
          d3: 1,
          d2: 9,
          d1: 7,
          d0: 5,
          untiered: 10,
          totalCases: 50,
          numberOfType: 1
        }
      },
      detailsPercentages:
      [{
        linkId: 70,
        name: 'Probation Delivery Unit 2',
        grades:
        [{
          grade: 'PO',
          a3: 85,
          a2: 80,
          a1: 75,
          a0: 70,
          b3: 65,
          b2: 60,
          b1: 55,
          b0: 50,
          c3: 45,
          c2: 40,
          c1: 35,
          c0: 25,
          d3: 20,
          d2: 15,
          d1: 10,
          d0: 0,
          untiered: 60,
          totalCases: 60
        },
        {
          grade: 'PSO',
          a3: 15,
          a2: 20,
          a1: 25,
          a0: 30,
          b3: 35,
          b2: 40,
          b1: 45,
          b0: 50,
          c3: 55,
          c2: 50,
          c1: 65,
          c0: 70,
          d3: 75,
          d2: 80,
          d1: 85,
          d0: 90,
          untiered: 40,
          totalCases: 40
        }]
      }],
      percentageTotals:
      {
        PO:
      {
        grade: 'PO',
        a3: 85,
        a2: 80,
        a1: 75,
        a0: 70,
        b3: 65,
        b2: 60,
        b1: 55,
        b0: 50,
        c3: 45,
        c2: 40,
        c1: 35,
        c0: 25,
        d3: 20,
        d2: 15,
        d1: 10,
        d0: 0,
        untiered: 60,
        totalCases: 60,
        numberOfType: 1
      },
        PSO:
        {
          grade: 'PSO',
          a3: 15,
          a2: 20,
          a1: 25,
          a0: 30,
          b3: 35,
          b2: 40,
          b1: 45,
          b0: 50,
          c3: 55,
          c2: 50,
          c1: 65,
          c0: 70,
          d3: 75,
          d2: 80,
          d1: 85,
          d0: 90,
          untiered: 40,
          totalCases: 40,
          numberOfType: 1
        }
      }
    },
    overallTotalSummary:
    [{
      name: 'Probation Delivery Unit 2',
      linkId: 70,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    }],
    custodyTotalSummary: 115,
    communityTotalSummary: 105,
    licenseTotalSummary: 125
  }
}

module.exports.REGION_CASELOAD_CSV = {
  filename: ('Test_Region_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Probation Delivery Unit 2",115,105,125,345\n\n\n' +
  'CUSTODY\n' +
  '"Probation Delivery Unit Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO",3,2,1,0,4,5,6,1,4,0,8,5,1,4,3,6,3,69\n' +
  '"Probation Delivery Unit 2","PSO",1,4,0,9,6,1,4,0,8,0,1,4,1,1,1,2,2,46\n\n\n' +
  'COMMUNITY\n' +
  '"Probation Delivery Unit Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO",0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,0,63\n' +
  '"Probation Delivery Unit 2","PSO",610,377,233,144,89,55,34,21,13,8,5,3,2,1,1,0,0,42\n\n\n' +
  'LICENSE\n' +
  '"Probation Delivery Unit Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO",1,8,9,9,1,9,0,7,1,9,1,1,1,9,1,4,15,75\n' +
  '"Probation Delivery Unit 2","PSO",1,9,6,4,1,9,7,0,1,9,7,4,1,9,7,5,10,50\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Probation Delivery Unit Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Probation Delivery Unit 2","PO","50.00%","90.00%","40.00%","30.00%","100.00%","70.00%","40.00%","25.00%","25.00%","100.00%","0.00%","65.00%","35.00%","20.00%","45.00%","80.00%","60.00%","60.00%"\n' +
  '"Probation Delivery Unit 2","PSO","50.00%","10.00%","60.00%","70.00%","0.00%","30.00%","60.00%","75.00%","75.00%","0.00%","100.00%","35.00%","65.00%","80.00%","55.00%","20.00%","40.00%","40.00%"'
}

module.exports.NATIONAL_CASELOAD_RESULT = {
  title: 'HMPPS',
  subTitle: 'National',
  caseloadDetails: {
    overallCaseloadDetails: {
      details: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 36,
              a2: 42,
              a1: 36,
              a0: 42,
              b3: 54,
              b2: 84,
              b1: 78,
              b0: 180,
              c3: 198,
              c2: 216,
              c1: 234,
              c0: 252,
              d3: 270,
              d2: 288,
              d1: 306,
              d0: 324,
              untiered: 42,
              totalCases: 2682
            },
            {
              grade: 'PSO',
              a3: 24,
              a2: 28,
              a1: 24,
              a0: 28,
              b3: 36,
              b2: 56,
              b1: 52,
              b0: 120,
              c3: 132,
              c2: 144,
              c1: 156,
              c0: 168,
              d3: 180,
              d2: 192,
              d1: 204,
              d0: 216,
              untiered: 28,
              totalCases: 1788
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 18,
              a2: 21,
              a1: 18,
              a0: 21,
              b3: 27,
              b2: 42,
              b1: 39,
              b0: 90,
              c3: 99,
              c2: 108,
              c1: 117,
              c0: 126,
              d3: 135,
              d2: 144,
              d1: 153,
              d0: 162,
              untiered: 21,
              totalCases: 1341
            },
            {
              grade: 'PSO',
              a3: 12,
              a2: 14,
              a1: 12,
              a0: 14,
              b3: 18,
              b2: 28,
              b1: 26,
              b0: 60,
              c3: 66,
              c2: 72,
              c1: 78,
              c0: 84,
              d3: 90,
              d2: 96,
              d1: 102,
              d0: 108,
              untiered: 14,
              totalCases: 894
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 18,
              a2: 21,
              a1: 18,
              a0: 21,
              b3: 27,
              b2: 42,
              b1: 39,
              b0: 90,
              c3: 99,
              c2: 108,
              c1: 117,
              c0: 126,
              d3: 135,
              d2: 144,
              d1: 153,
              d0: 162,
              untiered: 21,
              totalCases: 1341
            },
            {
              grade: 'PSO',
              a3: 12,
              a2: 14,
              a1: 12,
              a0: 14,
              b3: 18,
              b2: 28,
              b1: 26,
              b0: 60,
              c3: 66,
              c2: 72,
              c1: 78,
              c0: 84,
              d3: 90,
              d2: 96,
              d1: 102,
              d0: 108,
              untiered: 14,
              totalCases: 894
            }
          ]
        }
      ],
      totals: {
        PO: {
          grade: 'PO',
          a3: 72,
          a2: 84,
          a1: 72,
          a0: 84,
          b3: 108,
          b2: 168,
          b1: 156,
          b0: 360,
          c3: 396,
          c2: 432,
          c1: 468,
          c0: 504,
          d3: 540,
          d2: 576,
          d1: 612,
          d0: 648,
          untiered: 84,
          totalCases: 5364,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 48,
          a2: 56,
          a1: 48,
          a0: 56,
          b3: 72,
          b2: 112,
          b1: 104,
          b0: 240,
          c3: 264,
          c2: 288,
          c1: 312,
          c0: 336,
          d3: 360,
          d2: 384,
          d1: 408,
          d0: 432,
          untiered: 56,
          totalCases: 3576,
          numberOfType: 3
        }
      },
      detailsPercentages: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        }
      ],
      percentageTotals: {
        PO: {
          grade: 'PO',
          a3: 60,
          a2: 60,
          a1: 60,
          a0: 60,
          b3: 60,
          b2: 60,
          b1: 60,
          b0: 60,
          c3: 60,
          c2: 60,
          c1: 60,
          c0: 60,
          d3: 60,
          d2: 60,
          d1: 60,
          d0: 60,
          untiered: 60,
          totalCases: 60,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 40,
          a2: 40,
          a1: 40,
          a0: 40,
          b3: 40,
          b2: 40,
          b1: 40,
          b0: 40,
          c3: 40,
          c2: 40,
          c1: 40,
          c0: 40,
          d3: 40,
          d2: 40,
          d1: 40,
          d0: 40,
          untiered: 40,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    communityCaseloadDetails: {
      details: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 18,
              a2: 24,
              a1: 12,
              a0: 6,
              b3: 24,
              b2: 36,
              b1: 24,
              b0: 60,
              c3: 66,
              c2: 72,
              c1: 78,
              c0: 84,
              d3: 90,
              d2: 96,
              d1: 102,
              d0: 108,
              untiered: 12,
              totalCases: 912
            },
            {
              grade: 'PSO',
              a3: 12,
              a2: 16,
              a1: 8,
              a0: 4,
              b3: 16,
              b2: 24,
              b1: 16,
              b0: 40,
              c3: 44,
              c2: 48,
              c1: 52,
              c0: 56,
              d3: 60,
              d2: 64,
              d1: 68,
              d0: 72,
              untiered: 8,
              totalCases: 608
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 9,
              a2: 12,
              a1: 6,
              a0: 3,
              b3: 12,
              b2: 18,
              b1: 12,
              b0: 30,
              c3: 33,
              c2: 36,
              c1: 39,
              c0: 42,
              d3: 45,
              d2: 48,
              d1: 51,
              d0: 54,
              untiered: 6,
              totalCases: 456
            },
            {
              grade: 'PSO',
              a3: 6,
              a2: 8,
              a1: 4,
              a0: 2,
              b3: 8,
              b2: 12,
              b1: 8,
              b0: 20,
              c3: 22,
              c2: 24,
              c1: 26,
              c0: 28,
              d3: 30,
              d2: 32,
              d1: 34,
              d0: 36,
              untiered: 4,
              totalCases: 304
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 9,
              a2: 12,
              a1: 6,
              a0: 3,
              b3: 12,
              b2: 18,
              b1: 12,
              b0: 30,
              c3: 33,
              c2: 36,
              c1: 39,
              c0: 42,
              d3: 45,
              d2: 48,
              d1: 51,
              d0: 54,
              untiered: 6,
              totalCases: 456
            },
            {
              grade: 'PSO',
              a3: 6,
              a2: 8,
              a1: 4,
              a0: 2,
              b3: 8,
              b2: 12,
              b1: 8,
              b0: 20,
              c3: 22,
              c2: 24,
              c1: 26,
              c0: 28,
              d3: 30,
              d2: 32,
              d1: 34,
              d0: 36,
              untiered: 4,
              totalCases: 304
            }
          ]
        }
      ],
      totals: {
        PO: {
          grade: 'PO',
          a3: 36,
          a2: 48,
          a1: 24,
          a0: 12,
          b3: 48,
          b2: 72,
          b1: 48,
          b0: 120,
          c3: 132,
          c2: 144,
          c1: 156,
          c0: 168,
          d3: 180,
          d2: 192,
          d1: 204,
          d0: 216,
          untiered: 24,
          totalCases: 1824,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 24,
          a2: 32,
          a1: 16,
          a0: 8,
          b3: 32,
          b2: 48,
          b1: 32,
          b0: 80,
          c3: 88,
          c2: 96,
          c1: 104,
          c0: 112,
          d3: 120,
          d2: 128,
          d1: 136,
          d0: 144,
          untiered: 16,
          totalCases: 1216,
          numberOfType: 3
        }
      },
      detailsPercentages: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        }
      ],
      percentageTotals: {
        PO: {
          grade: 'PO',
          a3: 60,
          a2: 60,
          a1: 60,
          a0: 60,
          b3: 60,
          b2: 60,
          b1: 60,
          b0: 60,
          c3: 60,
          c2: 60,
          c1: 60,
          c0: 60,
          d3: 60,
          d2: 60,
          d1: 60,
          d0: 60,
          untiered: 60,
          totalCases: 60,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 40,
          a2: 40,
          a1: 40,
          a0: 40,
          b3: 40,
          b2: 40,
          b1: 40,
          b0: 40,
          c3: 40,
          c2: 40,
          c1: 40,
          c0: 40,
          d3: 40,
          d2: 40,
          d1: 40,
          d0: 40,
          untiered: 40,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    custodyCaseloadDetails: {
      details: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 12,
              a2: 12,
              a1: 24,
              a0: 24,
              b3: 6,
              b2: 30,
              b1: 36,
              b0: 60,
              c3: 66,
              c2: 72,
              c1: 78,
              c0: 84,
              d3: 90,
              d2: 96,
              d1: 102,
              d0: 108,
              untiered: 18,
              totalCases: 918
            },
            {
              grade: 'PSO',
              a3: 8,
              a2: 8,
              a1: 16,
              a0: 16,
              b3: 4,
              b2: 20,
              b1: 24,
              b0: 40,
              c3: 44,
              c2: 48,
              c1: 52,
              c0: 56,
              d3: 60,
              d2: 64,
              d1: 68,
              d0: 72,
              untiered: 12,
              totalCases: 612
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 6,
              a2: 6,
              a1: 12,
              a0: 12,
              b3: 3,
              b2: 15,
              b1: 18,
              b0: 30,
              c3: 33,
              c2: 36,
              c1: 39,
              c0: 42,
              d3: 45,
              d2: 48,
              d1: 51,
              d0: 54,
              untiered: 9,
              totalCases: 459
            },
            {
              grade: 'PSO',
              a3: 4,
              a2: 4,
              a1: 8,
              a0: 8,
              b3: 2,
              b2: 10,
              b1: 12,
              b0: 20,
              c3: 22,
              c2: 24,
              c1: 26,
              c0: 28,
              d3: 30,
              d2: 32,
              d1: 34,
              d0: 36,
              untiered: 6,
              totalCases: 306
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 6,
              a2: 6,
              a1: 12,
              a0: 12,
              b3: 3,
              b2: 15,
              b1: 18,
              b0: 30,
              c3: 33,
              c2: 36,
              c1: 39,
              c0: 42,
              d3: 45,
              d2: 48,
              d1: 51,
              d0: 54,
              untiered: 9,
              totalCases: 459
            },
            {
              grade: 'PSO',
              a3: 4,
              a2: 4,
              a1: 8,
              a0: 8,
              b3: 2,
              b2: 10,
              b1: 12,
              b0: 20,
              c3: 22,
              c2: 24,
              c1: 26,
              c0: 28,
              d3: 30,
              d2: 32,
              d1: 34,
              d0: 36,
              untiered: 6,
              totalCases: 306
            }
          ]
        }
      ],
      totals: {
        PO: {
          grade: 'PO',
          a3: 24,
          a2: 24,
          a1: 48,
          a0: 48,
          b3: 12,
          b2: 60,
          b1: 72,
          b0: 120,
          c3: 132,
          c2: 144,
          c1: 156,
          c0: 168,
          d3: 180,
          d2: 192,
          d1: 204,
          d0: 216,
          untiered: 36,
          totalCases: 1836,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 16,
          a2: 16,
          a1: 32,
          a0: 32,
          b3: 8,
          b2: 40,
          b1: 48,
          b0: 80,
          c3: 88,
          c2: 96,
          c1: 104,
          c0: 112,
          d3: 120,
          d2: 128,
          d1: 136,
          d0: 144,
          untiered: 24,
          totalCases: 1224,
          numberOfType: 3
        }
      },
      detailsPercentages: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 60,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 40,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        }
      ],
      percentageTotals: {
        PO: {
          grade: 'PO',
          a3: 60,
          a2: 60,
          a1: 60,
          a0: 60,
          b3: 60,
          b2: 60,
          b1: 60,
          b0: 60,
          c3: 60,
          c2: 60,
          c1: 60,
          c0: 60,
          d3: 60,
          d2: 60,
          d1: 60,
          d0: 60,
          untiered: 60,
          totalCases: 60,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 40,
          a2: 40,
          a1: 40,
          a0: 40,
          b3: 40,
          b2: 40,
          b1: 40,
          b0: 40,
          c3: 40,
          c2: 40,
          c1: 40,
          c0: 40,
          d3: 40,
          d2: 40,
          d1: 40,
          d0: 40,
          untiered: 40,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    licenseCaseloadDetails: {
      details: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 6,
              a2: 6,
              a1: 0,
              a0: 12,
              b3: 24,
              b2: 18,
              b1: 18,
              b0: 60,
              c3: 66,
              c2: 72,
              c1: 78,
              c0: 84,
              d3: 90,
              d2: 96,
              d1: 102,
              d0: 108,
              untiered: 12,
              totalCases: 852
            },
            {
              grade: 'PSO',
              a3: 4,
              a2: 4,
              a1: 0,
              a0: 8,
              b3: 16,
              b2: 12,
              b1: 12,
              b0: 40,
              c3: 44,
              c2: 48,
              c1: 52,
              c0: 56,
              d3: 60,
              d2: 64,
              d1: 68,
              d0: 72,
              untiered: 8,
              totalCases: 568
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 3,
              a2: 3,
              a1: 0,
              a0: 6,
              b3: 12,
              b2: 9,
              b1: 9,
              b0: 30,
              c3: 33,
              c2: 36,
              c1: 39,
              c0: 42,
              d3: 45,
              d2: 48,
              d1: 51,
              d0: 54,
              untiered: 6,
              totalCases: 426
            },
            {
              grade: 'PSO',
              a3: 2,
              a2: 2,
              a1: 0,
              a0: 4,
              b3: 8,
              b2: 6,
              b1: 6,
              b0: 20,
              c3: 22,
              c2: 24,
              c1: 26,
              c0: 28,
              d3: 30,
              d2: 32,
              d1: 34,
              d0: 36,
              untiered: 4,
              totalCases: 284
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 3,
              a2: 3,
              a1: 0,
              a0: 6,
              b3: 12,
              b2: 9,
              b1: 9,
              b0: 30,
              c3: 33,
              c2: 36,
              c1: 39,
              c0: 42,
              d3: 45,
              d2: 48,
              d1: 51,
              d0: 54,
              untiered: 6,
              totalCases: 426
            },
            {
              grade: 'PSO',
              a3: 2,
              a2: 2,
              a1: 0,
              a0: 4,
              b3: 8,
              b2: 6,
              b1: 6,
              b0: 20,
              c3: 22,
              c2: 24,
              c1: 26,
              c0: 28,
              d3: 30,
              d2: 32,
              d1: 34,
              d0: 36,
              untiered: 4,
              totalCases: 284
            }
          ]
        }
      ],
      totals: {
        PO: {
          grade: 'PO',
          a3: 12,
          a2: 12,
          a1: 0,
          a0: 24,
          b3: 48,
          b2: 36,
          b1: 36,
          b0: 120,
          c3: 132,
          c2: 144,
          c1: 156,
          c0: 168,
          d3: 180,
          d2: 192,
          d1: 204,
          d0: 216,
          untiered: 24,
          totalCases: 1704,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 8,
          a2: 8,
          a1: 0,
          a0: 16,
          b3: 32,
          b2: 24,
          b1: 24,
          b0: 80,
          c3: 88,
          c2: 96,
          c1: 104,
          c0: 112,
          d3: 120,
          d2: 128,
          d1: 136,
          d0: 144,
          untiered: 16,
          totalCases: 1136,
          numberOfType: 3
        }
      },
      detailsPercentages: [
        {
          linkId: 15354,
          name: 'Region 1',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 0,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 0,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15355,
          name: 'Region 2',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 0,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 0,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        },
        {
          linkId: 15356,
          name: 'Region 3',
          grades: [
            {
              grade: 'PO',
              a3: 60,
              a2: 60,
              a1: 0,
              a0: 60,
              b3: 60,
              b2: 60,
              b1: 60,
              b0: 60,
              c3: 60,
              c2: 60,
              c1: 60,
              c0: 60,
              d3: 60,
              d2: 60,
              d1: 60,
              d0: 60,
              untiered: 60,
              totalCases: 60
            },
            {
              grade: 'PSO',
              a3: 40,
              a2: 40,
              a1: 0,
              a0: 40,
              b3: 40,
              b2: 40,
              b1: 40,
              b0: 40,
              c3: 40,
              c2: 40,
              c1: 40,
              c0: 40,
              d3: 40,
              d2: 40,
              d1: 40,
              d0: 40,
              untiered: 40,
              totalCases: 40
            }
          ]
        }
      ],
      percentageTotals: {
        PO: {
          grade: 'PO',
          a3: 60,
          a2: 60,
          a1: 0,
          a0: 60,
          b3: 60,
          b2: 60,
          b1: 60,
          b0: 60,
          c3: 60,
          c2: 60,
          c1: 60,
          c0: 60,
          d3: 60,
          d2: 60,
          d1: 60,
          d0: 60,
          untiered: 60,
          totalCases: 60,
          numberOfType: 3
        },
        PSO: {
          grade: 'PSO',
          a3: 40,
          a2: 40,
          a1: 0,
          a0: 40,
          b3: 40,
          b2: 40,
          b1: 40,
          b0: 40,
          c3: 40,
          c2: 40,
          c1: 40,
          c0: 40,
          d3: 40,
          d2: 40,
          d1: 40,
          d0: 40,
          untiered: 40,
          totalCases: 40,
          numberOfType: 3
        }
      }
    },
    overallTotalSummary:
    [{
      name: 'Region 1',
      linkId: 63,
      totalCases: 690,
      custodyTotalCases: 230,
      communityTotalCases: 210,
      licenseTotalCases: 250
    },
    {
      name: 'Region 2',
      linkId: 64,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    },
    {
      name: 'Region 3',
      linkId: 65,
      totalCases: 345,
      custodyTotalCases: 115,
      communityTotalCases: 105,
      licenseTotalCases: 125
    }],
    custodyTotalSummary: 460,
    communityTotalSummary: 420,
    licenseTotalSummary: 500
  }
}

module.exports.NATIONAL_CASELOAD_CSV = {
  filename: ('Test_National_Caseload ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: 'OVERALL\n' +
  '"name","custodyCases","communityCases","licenseCases","totalCases"\n' +
  '"Region 1",230,210,250,690\n' +
  '"Region 2",115,105,125,345\n' +
  '"Region 3",115,105,125,345\n\n\n' +
  'CUSTODY\n' +
  '"Region Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Region 1","PO",12,12,24,24,6,30,36,60,66,72,78,84,90,96,102,108,18,918\n' +
  '"Region 1","PSO",8,8,16,16,4,20,24,40,44,48,52,56,60,64,68,72,12,612\n' +
  '"Region 2","PO",6,6,12,12,3,15,18,30,33,36,39,42,45,48,51,54,9,459\n' +
  '"Region 2","PSO",4,4,8,8,2,10,12,20,22,24,26,28,30,32,34,36,6,306\n' +
  '"Region 3","PO",6,6,12,12,3,15,18,30,33,36,39,42,45,48,51,54,9,459\n' +
  '"Region 3","PSO",4,4,8,8,2,10,12,20,22,24,26,28,30,32,34,36,6,306\n\n\n' +
  'COMMUNITY\n' +
  '"Region Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Region 1","PO",18,24,12,6,24,36,24,60,66,72,78,84,90,96,102,108,12,912\n' +
  '"Region 1","PSO",12,16,8,4,16,24,16,40,44,48,52,56,60,64,68,72,8,608\n' +
  '"Region 2","PO",9,12,6,3,12,18,12,30,33,36,39,42,45,48,51,54,6,456\n' +
  '"Region 2","PSO",6,8,4,2,8,12,8,20,22,24,26,28,30,32,34,36,4,304\n' +
  '"Region 3","PO",9,12,6,3,12,18,12,30,33,36,39,42,45,48,51,54,6,456\n' +
  '"Region 3","PSO",6,8,4,2,8,12,8,20,22,24,26,28,30,32,34,36,4,304\n\n\n' +
  'LICENSE\n' +
  '"Region Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Region 1","PO",6,6,0,12,24,18,18,60,66,72,78,84,90,96,102,108,12,852\n' +
  '"Region 1","PSO",4,4,0,8,16,12,12,40,44,48,52,56,60,64,68,72,8,568\n' +
  '"Region 2","PO",3,3,0,6,12,9,9,30,33,36,39,42,45,48,51,54,6,426\n' +
  '"Region 2","PSO",2,2,0,4,8,6,6,20,22,24,26,28,30,32,34,36,4,284\n' +
  '"Region 3","PO",3,3,0,6,12,9,9,30,33,36,39,42,45,48,51,54,6,426\n' +
  '"Region 3","PSO",2,2,0,4,8,6,6,20,22,24,26,28,30,32,34,36,4,284\n\n\n' +
  'OVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' +
  '"Region Name","Grade","A3","A2","A1","A0","B3","B2","B1","B0","C3","C2","C1","C0","D3","D2","D1","D0","Untiered","Overall"\n' +
  '"Region 1","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%"\n' +
  '"Region 1","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%"\n' +
  '"Region 2","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%"\n' +
  '"Region 2","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%"\n' +
  '"Region 3","PO","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%","60.00%"\n' +
  '"Region 3","PSO","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%","40.00%"'
}

module.exports.OM_OVERVIEW_RESULT = {
  breadcrumbs:
  [{ title: 'John Smith' },
    { title: 'Team 1' },
    { title: 'Test Cluster' }],
  title: 'John Smith',
  overviewDetails: {
    grade: 'PO',
    teamId: 1611,
    teamName: 'Team 1',
    availablePoints: 190,
    totalPoints: 200,
    cases: 60,
    contractedHours: 37,
    reduction: 4,
    defaultContractedHoursPo: 37,
    defaultContractedHoursPso: 37,
    defaultContractedHoursSpo: 0,
    capacity: 105.3,
    lduCluster: 'Test Cluster',
    regionName: 'NPS Test Region',
    cmsAdjustmentPoints: -121,
    cmsPercentage: -3.85718839655722
  }
}

module.exports.OM_OVERVIEW_CSV = {
  filename: ('John_Smith_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team Name","Grade Code","Capacity Percentage","Total Cases","Contracted Hours","Reduction Hours","CMS Points","CMS Percentage"' +
  '\n"NPS Test Region","Test Cluster","Team 1","PO","105.3%",60,37,4,-121,"-3.9%"'
}

module.exports.TEAM_OVERVIEW_RESULT = {
  breadcrumbs: [{
    title: 'Team 1',
    link: '/probation/team/95',
    active: undefined
  },
  {
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/85',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/43',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails:
  [{
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: -176,
    cmsPercentage: -6.379122870605292
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 121,
    cmsPercentage: 19.803600654664486
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 167,
    cmsPercentage: 29.246935201401055
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  }],
  title: 'Team 1',
  subTitle: 'Team'
}

module.exports.TEAM_OVERVIEW_CSV = {
  filename: ('Team_1_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,-176,"-6.4%"' +
  '\n"Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,121,"19.8%"' +
  '\n"Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,167,"29.2%"' +
  '\n"Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,-9,"-0.5%"'
}

module.exports.LDU_OVERVIEW_RESULT = {
  breadcrumbs: [{
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/85',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/43',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails:
  [{
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: -176,
    cmsPercentage: -6.379122870605292
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 121,
    cmsPercentage: 19.803600654664486
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 224,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 117.89473684210525,
    remainingPoints: -34,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 215,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 113.1578947368421,
    remainingPoints: -25,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 202,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 106.3157894736842,
    remainingPoints: -12,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: -9,
    cmsPercentage: -0.5096262740656852
  }],
  title: 'Probation Delivery Unit 1',
  subTitle: 'Probation Delivery Unit'
}

module.exports.LDU_OVERVIEW_CSV = {
  filename: ('LDU_Cluster_1_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,-176,"-6.4%"' +
  '\n"Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,121,"19.8%"' +
  '\n"Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 4","Courtney Larry","PO","117.9%",190,224,-34,37.5,6,69,-9,"-0.5%"' +
  '\n"Probation Delivery Unit 1","Team 4","Marcin Martin","PSO","113.2%",190,215,-25,37.5,6,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 4","Jane Doe","PO","106.3%",190,202,-12,37.5,4,69,-9,"-0.5%"' +
  '\n"Probation Delivery Unit 1","Team 4","Tony Test","PSO","105.8%",190,201,-11,37.5,3,69,0,"0.0%"' +
  '\n"Probation Delivery Unit 1","Team 4","John Smith","PO","117.4%",190,223,-33,37.5,3,69,-9,"-0.5%"'
}

module.exports.REGION_OVERVIEW_RESULT = {
  breadcrumbs:
  [{
    title: 'Region 1',
    link: '/probation/region/43',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails: [{
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 224,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 117.89473684210525,
    remainingPoints: -34,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 215,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 113.1578947368421,
    remainingPoints: -25,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 202,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 106.3157894736842,
    remainingPoints: -12,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  }],
  title: 'Region 1',
  subTitle: 'Region'
}

module.exports.REGION_OVERVIEW_CSV = {
  filename: ('Region_1_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Courtney Larry","PO","117.9%",190,224,-34,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Marcin Martin","PSO","113.2%",190,215,-25,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Jane Doe","PO","106.3%",190,202,-12,37.5,4,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Tony Test","PSO","105.8%",190,201,-11,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","John Smith","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"'
}

module.exports.NATIONAL_OVERVIEW_RESULT = {
  breadcrumbs: [{ title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails: [{
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 216,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 113.68421052631578,
    remainingPoints: -26,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 222,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PO',
    capacityPercentage: 116.8421052631579,
    remainingPoints: -32,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 224,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 117.89473684210525,
    remainingPoints: -34,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 202,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 106.3157894736842,
    remainingPoints: -12,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 215,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PSO',
    capacityPercentage: 113.1578947368421,
    remainingPoints: -25,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 4',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PSO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PSO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 209,
    contractedHours: 37.5,
    reductionHours: 4,
    gradeCode: 'PO',
    capacityPercentage: 110.00000000000001,
    remainingPoints: -19,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 200,
    contractedHours: 37.5,
    reductionHours: 2,
    gradeCode: 'PSO',
    capacityPercentage: 105.26315789473684,
    remainingPoints: -10,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 2',
    lduCluster: 'Probation Delivery Unit 2',
    teamName: 'Team 2',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 217,
    contractedHours: 37.5,
    reductionHours: 3,
    gradeCode: 'PO',
    capacityPercentage: 114.21052631578948,
    remainingPoints: -27,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Courtney Larry',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 214,
    contractedHours: 37.5,
    reductionHours: 2,
    gradeCode: 'PO',
    capacityPercentage: 112.63157894736841,
    remainingPoints: -24,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Marcin Martin',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 223,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PSO',
    capacityPercentage: 117.36842105263159,
    remainingPoints: -33,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 204,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 107.36842105263158,
    remainingPoints: -14,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Tony Test',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 208,
    contractedHours: 37.5,
    reductionHours: 1,
    gradeCode: 'PSO',
    capacityPercentage: 109.47368421052633,
    remainingPoints: -18,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  },
  {
    regionName: 'Region 3',
    lduCluster: 'Probation Delivery Unit 3',
    teamName: 'Team 3',
    offenderManager: 'Jane Doe',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 201,
    contractedHours: 37.5,
    reductionHours: 2,
    gradeCode: 'PO',
    capacityPercentage: 105.78947368421052,
    remainingPoints: -11,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  }],
  title: 'HMPPS',
  subTitle: 'National'
}

module.exports.NATIONAL_OVERVIEW_CSV = {
  filename: ('HMPPS_Overview ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team Name","Offender Manager","Grade Code","Capacity Percentage","Capacity Points","Total Points Used","Remaining Points","Contracted Hours","Reduction Hours","Total Cases","CMS Points","CMS Percentage"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO","115.3%",190,219,-29,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Tony Test","PSO","113.7%",190,216,-26,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Jane Doe","PO","116.8%",190,222,-32,37.5,1,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Marcin Martin","PSO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 1","Courtney Larry","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Courtney Larry","PO","117.9%",190,224,-34,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Jane Doe","PO","106.3%",190,202,-12,37.5,4,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Marcin Martin","PSO","113.2%",190,215,-25,37.5,6,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","John Smith","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 1","Probation Delivery Unit 1","Team 4","Tony Test","PSO","105.8%",190,201,-11,37.5,3,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Jane Doe","PO","117.4%",190,223,-33,37.5,3,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Tony Test","PSO","117.4%",190,223,-33,37.5,4,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","John Smith","PO","110.0%",190,209,-19,37.5,4,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Marcin Martin","PSO","105.3%",190,200,-10,37.5,2,69,0,"0.0%"' +
  '\n"Region 2","Probation Delivery Unit 2","Team 2","Courtney Larry","PO","114.2%",190,217,-27,37.5,3,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Courtney Larry","PO","112.6%",190,214,-24,37.5,2,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Marcin Martin","PSO","117.4%",190,223,-33,37.5,1,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","John Smith","PO","107.4%",190,204,-14,37.5,6,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Tony Test","PSO","109.5%",190,208,-18,37.5,1,69,0,"0.0%"' +
  '\n"Region 3","Probation Delivery Unit 3","Team 3","Jane Doe","PO","105.8%",190,201,-11,37.5,2,69,0,"0.0%"'
}

module.exports.PERCENTAGE_FORMAT_TEST = {
  breadcrumbs: [{ title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  overviewDetails: [{
    regionName: 'Region 1',
    lduCluster: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    totalCases: 69,
    availablePoints: 190,
    totalPoints: 219,
    contractedHours: 37.5,
    reductionHours: 6,
    gradeCode: 'PO',
    capacityPercentage: 115.26315789473685,
    remainingPoints: -29,
    cmsAdjustmentPoints: 0,
    cmsPercentage: 0
  }]

}

module.exports.TEAM_REDUCTIONS_RESULT = {
  breadcrumbs: [{
    title: 'Team 1',
    link: '/probation/team/240',
    active: undefined
  },
  {
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/218',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/146',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO'
  }],
  title: 'Team 1',
  subTitle: 'Team'
}

module.exports.TEAM_REDUCTIONS_CSV = {
  filename: ('Team_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",'
}

module.exports.TEAM_EXPIRING_REDUCTIONS_RESULT = {
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO',
    managerResponsible: 'Joe Bloggs'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO',
    managerResponsible: 'Frank Jones'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO',
    managerResponsible: 'Mary Brown'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO',
    managerResponsible: 'Jane Green'
  }]
}

module.exports.TEAM_EXPIRING_REDUCTIONS_CSV = {
  filename: ('Team_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes","Manager Responsible"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",,"Joe Bloggs"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",,"Frank Jones"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",,"Mary Brown"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",,"Jane Green"'
}

module.exports.LDU_REDUCTIONS_RESULT = {
  breadcrumbs:
  [{
    title: 'Probation Delivery Unit 1',
    link: '/probation/ldu/218',
    active: undefined
  },
  {
    title: 'Region 1',
    link: '/probation/region/146',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO'
  }],
  title: 'Probation Delivery Unit 1',
  subTitle: 'Probation Delivery Unit'
}

module.exports.LDU_REDUCTIONS_CSV = {
  filename: ('LDU_Cluster_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",'
}

module.exports.REGION_REDUCTIONS_RESULT = {
  breadcrumbs:
  [{
    title: 'Region 1',
    link: '/probation/region/146',
    active: undefined
  },
  { title: 'HMPPS', link: '/probation/hmpps/0', active: undefined }],
  reductionNotes:
  [{
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Disability',
    amount: 5,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'ACTIVE',
    additionalNotes: null,
    gradeCode: 'PO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Long Term Sickness Absence',
    amount: 2,
    startDate: '26 02 2018, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'SCHEDULED',
    additionalNotes: null,
    gradeCode: 'SPO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 1,
    startDate: '03 12 2016, 16:15',
    endDate: '28 11 2016, 16:15',
    status: 'ARCHIVED',
    additionalNotes: null,
    gradeCode: 'PSO'
  },
  {
    regionName: 'Region 1',
    lduName: 'Probation Delivery Unit 1',
    teamName: 'Team 1',
    offenderManager: 'John Smith',
    contractedHours: 37,
    reason: 'Phased Return to Work',
    amount: 2,
    startDate: '28 11 2016, 16:15',
    endDate: '26 11 2027, 16:15',
    status: 'DELETED',
    additionalNotes: null,
    gradeCode: 'PO'
  }],
  title: 'Region 1',
  subTitle: 'Region'
}

module.exports.REGION_REDUCTIONS_CSV = {
  filename: ('Region_1_Reductions_Notes ' + timestamp + '.csv').replace(replaceSpaces, '_'),
  csv: '"Region","Probation Delivery Unit","Team","Offender Manager","Grade Code","Contracted Hours","Reason","Hours","Start Date","End Date","Status","Additional Notes"\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Disability",5,"28 11 2016, 16:15","26 11 2027, 16:15","ACTIVE",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","SPO",37,"Long Term Sickness Absence",2,"26 02 2018, 16:15","26 11 2027, 16:15","SCHEDULED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PSO",37,"Phased Return to Work",1,"03 12 2016, 16:15","28 11 2016, 16:15","ARCHIVED",\n' +
  '"Region 1","Probation Delivery Unit 1","Team 1","John Smith","PO",37,"Phased Return to Work",2,"28 11 2016, 16:15","26 11 2027, 16:15","DELETED",'
}

module.exports.GROUPED_ARCHIVE_CSV = {
  filename: '',
  csv: '"Start Date","End Date","Region","Probation Delivery Unit","Team","Offender Manager","Grade","Total Cases","Total Points","SDR Points","SDR Conversion Points","PAROMS Points","Nominal Target","Contracted Hours","Reductions","Available Points","Capacity","CMS Points","CMS %","GS Points","GS %","ARMS Total Cases","No of Workloads"\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 1","PO",28,2034,0,0,0,2176,"37.0","0.0",2176,"93.5%",0,"0.0%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 1","PO",29,2048,0,0,0,2176,"37.0","0.0",2176,"94.1%",0,"0.0%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 1","PO",29,2088,0,0,0,2176,"37.0","0.0",2176,"96.0%",0,"0.0%",0,"0.0%",1,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 1","PO",30,2170,0,0,0,2176,"37.0","0.0",2176,"99.7%",0,"0.0%",0,"0.0%",1,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 1","PO",30,2177,0,0,0,2176,"37.0","0.0",2176,"100.0%",0,"0.0%",0,"0.0%",1,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 1","PO",30,2090,0,0,0,2176,"37.0","0.0",2176,"96.0%",0,"0.0%",0,"0.0%",1,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 1","PO",31,2242,0,0,0,2176,"37.0","0.0",2176,"103.0%",18,"0.8%",0,"0.0%",1,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 2","PO",22,1395,0,0,0,2176,"37.0","0.0",2176,"64.1%",-9,"-0.4%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 2","PO",23,1535,0,0,0,2176,"37.0","0.0",2176,"70.5%",-9,"-0.4%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 2","PO",23,1592,0,0,0,2176,"37.0","0.0",2176,"73.2%",0,"0.0%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 2","PO",24,1623,0,0,0,2176,"37.0","0.0",2176,"74.6%",0,"0.0%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 2","PO",25,1618,0,0,0,2176,"37.0","0.0",2176,"74.4%",0,"0.0%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 2","PO",25,1645,0,0,0,2176,"37.0","0.0",2176,"75.6%",0,"0.0%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 2","PO",26,1685,0,0,0,2176,"37.0","0.0",2176,"77.4%",0,"0.0%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 3","PO",32,2083,0,0,0,2176,"37.0","6.0",1823,"114.3%",-71,"-3.9%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 3","PO",32,2283,0,0,0,2176,"37.0","6.0",1823,"125.2%",-47,"-2.6%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 3","PO",32,2475,0,0,216,2176,"37.0","6.0",1823,"135.8%",-21,"-1.2%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 3","PO",31,2440,0,0,240,2176,"37.0","6.0",1823,"133.8%",-18,"-1.0%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 3","PO",31,2436,0,0,240,2176,"37.0","6.0",1823,"133.6%",-22,"-1.2%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 3","PO",30,2300,0,0,240,2176,"37.0","6.0",1823,"126.2%",0,"0.0%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 3","PO",31,2286,0,0,120,2176,"37.0","6.0",1823,"125.4%",0,"0.0%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 4","PO",21,1303,0,0,0,2176,"37.0","8.9",1652,"78.9%",-41,"-2.5%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 4","PO",24,1458,0,0,0,2176,"37.0","8.9",1652,"88.3%",-22,"-1.3%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 4","PO",24,1443,0,0,0,2176,"37.0","8.9",1652,"87.3%",14,"0.8%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 4","PO",24,1455,0,0,0,2176,"37.0","8.9",1652,"88.1%",59,"3.6%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 4","PO",24,1481,0,0,0,2176,"37.0","8.9",1652,"89.6%",85,"5.1%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 4","PO",24,1501,0,0,0,2176,"37.0","8.9",1652,"90.9%",105,"6.4%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 4","PO",23,1483,0,0,0,2176,"37.0","8.9",1652,"89.8%",94,"5.7%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 5","PSO",27,1018,0,0,0,2176,"37.0","0.0",2176,"46.8%",-20,"-0.9%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 5","PSO",27,1003,0,0,0,2176,"37.0","0.0",2176,"46.1%",-35,"-1.6%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 5","PSO",27,1011,0,0,0,2176,"37.0","0.0",2176,"46.5%",-27,"-1.2%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 5","PSO",27,1011,0,0,0,2176,"37.0","0.0",2176,"46.5%",-27,"-1.2%",0,"0.0%",0,4\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 5","PSO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 5","PSO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 5","PSO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 6","PO",7,305,0,0,0,2176,"22.0","0.0",1293,"23.6%",0,"0.0%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 6","PO",9,371,0,0,0,2176,"22.0","0.0",1293,"28.7%",0,"0.0%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 6","PO",10,411,0,0,0,2176,"22.0","0.0",1293,"31.8%",-4,"-0.3%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 6","PO",10,413,0,0,0,2176,"22.0","0.0",1293,"31.9%",-9,"-0.7%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 6","PO",13,552,0,0,0,2176,"22.0","0.0",1293,"42.7%",-11,"-0.9%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 6","PO",13,661,0,0,0,2176,"22.0","0.0",1293,"51.1%",-13,"-1.0%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 6","PO",13,700,0,0,0,2176,"22.0","0.0",1293,"54.1%",-18,"-1.4%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 7","PSO",2,23,0,0,0,2176,"0.0","0.0",0,"0.0%",0,"0.0%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,755,0,0,0,2176,"11.1","0.0",652,"115.8%",29,"4.4%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,770,0,0,0,2176,"11.1","0.0",652,"118.1%",44,"6.7%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,798,0,0,0,2176,"11.1","0.0",652,"122.4%",27,"4.1%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,809,0,0,0,2176,"11.1","0.0",652,"124.1%",27,"4.1%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,807,0,0,0,2176,"11.1","0.0",652,"123.8%",25,"3.8%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,782,0,0,0,2176,"11.1","0.0",652,"119.9%",0,"0.0%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 8","PO",9,782,0,0,0,2176,"11.1","0.0",652,"119.9%",0,"0.0%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 9","PO",33,2001,0,0,0,2176,"37.0","0.0",2176,"92.0%",-59,"-2.7%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 9","PO",32,1899,0,0,0,2176,"37.0","0.0",2176,"87.3%",-60,"-2.8%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 9","PO",32,1889,0,0,0,2176,"37.0","0.0",2176,"86.8%",-60,"-2.8%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 9","PO",32,1844,0,0,0,2176,"37.0","0.0",2176,"84.7%",-65,"-3.0%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 9","PO",31,1720,0,0,0,2176,"37.0","0.0",2176,"79.0%",-57,"-2.6%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 9","PO",31,1678,0,0,0,2176,"37.0","0.0",2176,"77.1%",-60,"-2.8%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 9","PO",31,1694,0,0,0,2176,"37.0","0.0",2176,"77.8%",-44,"-2.0%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 10","PO",30,2006,0,0,96,2176,"37.0","0.0",2176,"92.2%",0,"0.0%",0,"0.0%",0,5\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 10","PO",30,2051,0,0,120,2176,"37.0","0.0",2176,"94.3%",0,"0.0%",0,"0.0%",0,5\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 10","PO",30,2177,0,0,120,2176,"37.0","0.0",2176,"100.0%",0,"0.0%",0,"0.0%",0,5\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 10","PO",30,2238,0,0,120,2176,"37.0","0.0",2176,"102.8%",0,"0.0%",0,"0.0%",0,5\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 10","PO",31,2269,0,0,72,2176,"37.0","0.0",2176,"104.3%",0,"0.0%",0,"0.0%",0,5\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 10","PO",31,2221,0,0,24,2176,"37.0","0.0",2176,"102.1%",0,"0.0%",0,"0.0%",0,5\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 10","PO",31,2317,0,0,120,2176,"37.0","0.0",2176,"106.5%",0,"0.0%",0,"0.0%",0,1\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1","OM 11","PO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1","OM 11","PO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1","OM 11","PO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1","OM 11","PO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1","OM 11","PO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1","OM 11","PO",1,50,0,0,0,2176,"37.0","0.0",2176,"2.3%",0,"0.0%",0,"0.0%",0,1\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1","OM 11","PO",0,0,0,0,0,0,0,0,0,"0.00%",0,"0.00%",0,"0.00%",0,0'
}

module.exports.GROUPED_ARCHIVE_CSV_TEAM = {
  filename: '',
  csv: '"Start Date","End Date","Region","Probation Delivery Unit","Team","Total Cases","Total Points","SDR Points","SDR Conversion Points","PAROMS Points","Nominal Target","Contracted Hours","Reductions","Available Points","Capacity","CMS Points","CMS %","GS Points","GS %","ARMS Total Cases"\n' +
  '"04-01-2021","10-01-2021","Region 1","PDU 1","Team 1",211,12922,0,0,96,21760,"292.1","14.9",16300,"79.3%",-170,"-1.0%",0,"0.0%",0\n' +
  '"11-01-2021","17-01-2021","Region 1","PDU 1","Team 1",217,13441,0,0,120,21760,"292.1","14.9",16300,"82.5%",-129,"-0.8%",0,"0.0%",0\n' +
  '"18-01-2021","24-01-2021","Region 1","PDU 1","Team 1",219,13905,0,0,336,21760,"292.1","14.9",16300,"85.3%",-71,"-0.4%",0,"0.0%",1\n' +
  '"25-01-2021","31-01-2021","Region 1","PDU 1","Team 1",214,13823,0,0,360,21325,"284.7","14.9",15865,"87.1%",-27,"-0.2%",0,"0.0%",1\n' +
  '"01-02-2021","07-02-2021","Region 1","PDU 1","Team 1",195,13084,0,0,312,19584,"255.1","14.9",14124,"92.6%",21,"0.1%",0,"0.0%",1\n' +
  '"08-02-2021","14-02-2021","Region 1","PDU 1","Team 1",195,12911,0,0,264,20019,"262.5","14.9",14559,"88.7%",32,"0.2%",0,"0.0%",1\n' +
  '"15-02-2021","21-02-2021","Region 1","PDU 1","Team 1",197,13212,0,0,240,19584,"255.1","14.9",14124,"93.5%",50,"0.4%",0,"0.0%",1'
}
