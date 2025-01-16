// cases is an array of Scenario Objects
// Each Scenario Object contains 3 arrays of case total objects
// 1 for community cases, 1 for custody and another for licence
// each c will be dealing with a different row
// within each row the cases are dealt with in case type (community, licence, custody) and case tier order
// there is a separate for loop for each case total array
// in the body of these loops the totals for that particular type and tier will be dealt with
// for example

const inputCaseData = function (ws, cases, typeTierGroupLength, tiersPerType) {
  let rowStart = 5
  let columnStart = 25

  for (const c of cases) {
    inputMainBodyFormulas(ws, rowStart)
    inputOffenderManagerData(ws, c, rowStart)
    // WMT0160: Change tiersPerType for community cases
    let casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.communityCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
      columnStart = columnStart + typeTierGroupLength
    }

    casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.licenceCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
      columnStart = columnStart + typeTierGroupLength
    }

    casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === 0)
    casesForThisTier = casesForThisTier[0]
    setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
    columnStart = columnStart + typeTierGroupLength

    for (let i = tiersPerType - 1; i >= 1; i--) {
      casesForThisTier = c.custodyCaseNumbers.filter(thisCase => thisCase.tier === i)
      casesForThisTier = casesForThisTier[0]
      setTierTotals(ws, rowStart, columnStart, casesForThisTier, false)
      columnStart = columnStart + typeTierGroupLength
    }
    // reports to go here
    ws.cell(rowStart, columnStart).number(c.sdrTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 1).number(c.sdrConversionsTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 2).number(c.paromsTotal).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 3).number(c.armsCommunity).style(this.styles.editableStyle)
    ws.cell(rowStart, columnStart + 4).number(c.armsLicense).style(this.styles.editableStyle)
    columnStart = 25
    rowStart = rowStart + 1
  }
  inputBottomTotals(ws, rowStart)
}

// Input Offender Manager Name, Grade to the left side of the produced spreadsheet
const inputOffenderManagerData = function (ws, offenderManager, row) {
  ws.cell(row, 1).string(offenderManager.division).style(this.styles.editableStyle)
  ws.cell(row, 2).string(offenderManager.ldu).style(this.styles.editableStyle)
  ws.cell(row, 3).string(offenderManager.team).style(this.styles.editableStyle)
  ws.cell(row, 4).string(offenderManager.name).style(this.styles.editableStyle)
  ws.cell(row, 5).string(offenderManager.grade).style(this.styles.editableStyle)
  ws.cell(row, 7).number(offenderManager.nominalTarget).style(this.styles.editableStyle)
  ws.cell(row, 8).number(offenderManager.contractedHours).style(this.styles.editableStyle)
  ws.cell(row, 9).number(offenderManager.defaultContractedHours).style(this.styles.editableStyle)
  ws.cell(row, 10).number(offenderManager.reductionHours).style(this.styles.editableStyle)
  ws.cell(row, 11).number(offenderManager.cms).style(this.styles.nonEditableCaseStyle)
  ws.cell(row, 13).number(offenderManager.gs).style(this.styles.nonEditableCaseStyle)
}

const totalPointsFormula = function (row, startColumn, endColumn, typeTierGroupLength) {
  let formula = '=SUM('
  for (let i = startColumn; i <= endColumn; i = i + typeTierGroupLength) {
    const columnName = getColumnName(i)
    formula += `$${columnName}$4*${columnName}${row},`
  }
  formula = formula.substring(0, formula.length - 1)
  formula += ')'
  return formula
}

const totalCasesFormula = function (row, startColumn, endColumn, typeTierGroupLength) {
  let formula = '=SUM('
  for (let i = startColumn; i <= endColumn; i = i + typeTierGroupLength) {
    const columnName = getColumnName(i)
    formula += `${columnName}${row},`
  }
  formula = formula.substring(0, formula.length - 1)
  formula += ')'
  return formula
}

// Add formulas to Cells C to U (Data below "Total Cases" Column to "Current % Capacity" Column in produced spreadsheet)
const inputMainBodyFormulas = function (ws, row) {
  ws.cell(row, 6).formula(totalCasesFormula(row, 24, 419, 4)).style(this.styles.nonEditableCaseStyle) // Total Cases
  ws.cell(row, 12).formula('=IFERROR((K' + row + '/V' + row + '),0)').style(this.styles.percentageStyle) // CMS %
  ws.cell(row, 14).formula('=IFERROR((M' + row + '/T' + row + '),0)').style(this.styles.percentageStyle) // GS %
  ws.cell(row, 15).formula('=PE' + row + '*$PE$4').style(this.styles.nonEditableCaseStyle) // SDR Points
  ws.cell(row, 16).formula('=PF' + row + '*$PF$4').style(this.styles.nonEditableCaseStyle) // FDR Points
  ws.cell(row, 17).formula('=PG' + row + '*$PG$4').style(this.styles.nonEditableCaseStyle) // Parom Points
  ws.cell(row, 18).formula('=PH' + row + '*$PH$4').style(this.styles.nonEditableCaseStyle) // ARMS Comm Points
  ws.cell(row, 19).formula('=PI' + row + '*$PI$4').style(this.styles.nonEditableCaseStyle) // ARMS Licence Points
  ws.cell(row, 20).formula(totalPointsFormula(row, 24, 419, 4)).style(this.styles.nonEditableCaseStyle) // Total Caseload Points
  ws.cell(row, 21).formula('=SUM(K' + row + ',M' + row + ',O' + row + ':T' + row + ')').style(this.styles.nonEditableCaseStyle) // Overall Total Points
  ws.cell(row, 22).formula('=IFERROR(ROUNDDOWN(((G' + row + ' * (H' + row + '/I' + row + '))*((H' + row + '-J' + row + ')/H' + row + ')),0),0)').style(this.styles.roundedStyle) // Available Points
  ws.cell(row, 23).formula('=U' + row + '-V' + row).style(this.styles.roundedStyle) // Remaining Points
  ws.cell(row, 24).formula('=IFERROR(U' + row + '/V' + row + ',0)').style(this.styles.percentageStyle) // Current % Capacity
}

const inputBottomTotals = function (ws, row) {
  const dataEndRow = row - 1
  ws.cell(row, 1).string('Total / Average').style(this.styles.totalAverageStyle)
  ws.cell(row, 2).style(this.styles.totalAverageStyle)
  ws.cell(row, 3).style(this.styles.totalAverageStyle)
  ws.cell(row, 4).style(this.styles.totalAverageStyle)
  ws.cell(row, 5).style(this.styles.totalAverageStyle)
  ws.cell(row, 6).formula('=SUM($F$' + 5 + ':F' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 7).formula('=AVERAGE($G$' + 5 + ':G' + dataEndRow + ')').style(this.styles.averageStyle)
  ws.cell(row, 8).formula('=SUM($H$' + 5 + ':H' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 9).formula('=SUM($I$' + 5 + ':I' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 10).formula('=SUM($J$' + 5 + ':J' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 11).formula('=SUM($K$' + 5 + ':K' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 12).formula('=IFERROR((K' + row + '/W' + row + '),0)').style(this.styles.cmsGsPercentageStyle)
  ws.cell(row, 13).formula('=SUM($M$' + 5 + ':M' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 14).formula('=IFERROR((M' + row + '/v' + row + '),0)').style(this.styles.cmsGsPercentageStyle)
  ws.cell(row, 15).formula('=SUM($O$' + 5 + ':O' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 16).formula('=SUM($P$' + 5 + ':P' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 17).formula('=SUM($Q$' + 5 + ':Q' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 18).formula('=SUM($R$' + 5 + ':R' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 19).formula('=SUM($S$' + 5 + ':S' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 20).formula('=SUM($T$' + 5 + ':T' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 21).formula('=SUM($U$' + 5 + ':U' + dataEndRow + ')').style(this.styles.sumStyle)
  ws.cell(row, 22).formula('=SUM($V$' + 5 + ':V' + dataEndRow + ')').style(this.styles.roundedSumStyle)
  ws.cell(row, 23).formula('=SUM($W$' + 5 + ':W' + dataEndRow + ')').style(this.styles.roundedSumStyle)
  ws.cell(row, 24).formula('=IFERROR(T' + row + '/U' + row + ',0)').style(this.styles.averagePercentageStyle)
  ws.cell(row, 25).formula('=SUM($Y$' + 5 + ':Y' + dataEndRow + ')').style(this.styles.sumStyle)

  for (let i = 26; i < 426; i++) {
    let formula = '=SUM('
    const col = getColumnName(i - 1)
    formula += `$${col}5:${col}${dataEndRow}`
    ws.cell(row, i).formula(formula + ')').style(this.styles.sumStyle)
  }
}

const setTierTotals = function (ws, rowStart, columnStart, casesForThisTier, t2a) {
  ws.cell(rowStart, columnStart).number(casesForThisTier.totalCases).style(this.styles.editableStyle)
  ws.cell(rowStart, columnStart + 1).number(casesForThisTier.warrantsTotal).style(this.styles.editableStyle)
  ws.cell(rowStart, columnStart + 2).number(casesForThisTier.UPW).style(this.styles.editableStyle)
  ws.cell(rowStart, columnStart + 3).number(casesForThisTier.overdueTerminationsTotal).style(this.styles.editableStyle)
}

module.exports = function (ws, scenarioData, typeTierGroupLength, tiersPerType, styles) {
  this.styles = styles
  inputCaseData(ws, scenarioData, typeTierGroupLength, tiersPerType)
}

function getColumnName (index) {
  let columnName = ''
  while (index >= 0) {
    columnName = String.fromCharCode((index % 26) + 65) + columnName
    index = Math.floor(index / 26) - 1
  }
  return columnName
}
