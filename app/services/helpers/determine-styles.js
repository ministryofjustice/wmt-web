module.exports.determineCaseStyle = function (header, styles) {
  let styleToApply
  switch (header) {
    case 'Com Untiered':
    case 'Com D0':
    case 'Com D1':
    case 'Com D2':
    case 'Com D3':
    case 'Com C0':
    case 'Com C1':
    case 'Com C2':
    case 'Com C3':
    case 'Com B0':
    case 'Com B1':
    case 'Com B2':
    case 'Com B3':
    case 'Com A0':
    case 'Com A1':
    case 'Com A2':
    case 'Com A3':
    case 'Com D0S':
    case 'Com D1S':
    case 'Com D2S':
    case 'Com D3S':
    case 'Com C0S':
    case 'Com C1S':
    case 'Com C2S':
    case 'Com C3S':
    case 'Com B0S':
    case 'Com B1S':
    case 'Com B2S':
    case 'Com B3S':
    case 'Com A0S':
    case 'Com A1S':
    case 'Com A2S':
    case 'Com A3S':
      styleToApply = styles.commStyle
      break
    case 'Lic Untiered':
    case 'Lic D0':
    case 'Lic D1':
    case 'Lic D2':
    case 'Lic D3':
    case 'Lic C0':
    case 'Lic C1':
    case 'Lic C2':
    case 'Lic C3':
    case 'Lic B0':
    case 'Lic B1':
    case 'Lic B2':
    case 'Lic B3':
    case 'Lic A0':
    case 'Lic A1':
    case 'Lic A2':
    case 'Lic A3':
    case 'Lic D0S':
    case 'Lic D1S':
    case 'Lic D2S':
    case 'Lic D3S':
    case 'Lic C0S':
    case 'Lic C1S':
    case 'Lic C2S':
    case 'Lic C3S':
    case 'Lic B0S':
    case 'Lic B1S':
    case 'Lic B2S':
    case 'Lic B3S':
    case 'Lic A0S':
    case 'Lic A1S':
    case 'Lic A2S':
    case 'Lic A3S':
      styleToApply = styles.licStyle
      break
    case 'Cus Untiered':
    case 'Cus D0':
    case 'Cus D1':
    case 'Cus D2':
    case 'Cus D3':
    case 'Cus C0':
    case 'Cus C1':
    case 'Cus C2':
    case 'Cus C3':
    case 'Cus B0':
    case 'Cus B1':
    case 'Cus B2':
    case 'Cus B3':
    case 'Cus A0':
    case 'Cus A1':
    case 'Cus A2':
    case 'Cus A3':
    case 'Cus D0S':
    case 'Cus D1S':
    case 'Cus D2S':
    case 'Cus D3S':
    case 'Cus C0S':
    case 'Cus C1S':
    case 'Cus C2S':
    case 'Cus C3S':
    case 'Cus B0S':
    case 'Cus B1S':
    case 'Cus B2S':
    case 'Cus B3S':
    case 'Cus A0S':
    case 'Cus A1S':
    case 'Cus A2S':
    case 'Cus A3S':
      styleToApply = styles.cusStyle
      break
    default:
      styleToApply = styles.caseStyle
      break
  }
  return styleToApply
}

module.exports.determineWeightingStyle = function (columnNo, styles) {
  let styleToApply
  // const commRange = { start: 26, end: 93 }
  // const licRange = { start: 94, end: 161 }
  // const cusRange = { start: 162, end: 229 }
  // const reportsRange = { start: 434, end: 438 }

  // there are 130 columns in the excel sheet for each range
  const commRange = { start: 25, end: 155 }
  const licRange = { start: 156, end: 286 }
  const cusRange = { start: 287, end: 417 }
  const reportsRange = { start: 418, end: 425 }

  if (columnNo >= commRange.start && columnNo <= commRange.end) {
    styleToApply = styles.commStyle
  } else if (columnNo >= licRange.start && columnNo <= licRange.end) {
    styleToApply = styles.licStyle
  } else if (columnNo >= cusRange.start && columnNo <= cusRange.end) {
    styleToApply = styles.cusStyle
  } else if (columnNo >= reportsRange.start && columnNo <= reportsRange.end) {
    styleToApply = styles.reportsStyle
  } else {
    styleToApply = styles.caseStyle
  }
  return styleToApply
}
