const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const getWorloadPoints = require('../../app/services/data/get-workload-points')

const workloadPointsUrl = '/admin/workload-points'
let workloadPoints, pageTitle, pageSubtitle, link, prefix, tierA3, tierA2, tierA1, tierA0, tierB3, tierB2, tierB1, tierB0, tierC3, tierC2, tierC1, tierC0, tierD3, tierD2, tierD1, tierD0
let sdr, fdr, parom, overdue, warrants, upw, armsComm, armsLic
let nominalTargetPO, nominalTargetPSO
let contractedHoursPO, contractedHoursPSO, contractedHoursSPO
let editButton, saveButton, saveNotice, successMessage

describe('View / edit Workload Points', () => {
  before(async function () {
    workloadPoints = await getWorloadPoints(false)
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    await browser.url(workloadPointsUrl)
  })

  describe('should navigate to the admin workload points screen', () => {
    it('with the correct breadcrumbs and headings', async () => {
      await browser.url(workloadPointsUrl)
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageTitle, 'Workload Points page title should be "Workload Points"').to.equal('Workload Points')
      expect(pageSubtitle, 'Workload Points page subtitle should be "Admin"').to.equal('Admin')
      await browser.pause(5000)
    })

    it('with the correct tabs which become selected correctly', async () => {
      await browser.url(workloadPointsUrl)
      link = await $('[href="#custody"]')
      await link.click()
      await browser.pause(5000)
      prefix = '#cus-'
      tierA3 = await $(prefix + 'a3')
      tierA2 = await $(prefix + 'a2')
      tierA1 = await $(prefix + 'a1')
      tierA0 = await $(prefix + 'a0')
      tierB3 = await $(prefix + 'b3')
      tierB2 = await $(prefix + 'b2')
      tierB1 = await $(prefix + 'b1')
      tierB0 = await $(prefix + 'b0')
      tierC3 = await $(prefix + 'c3')
      tierC2 = await $(prefix + 'c2')
      tierC1 = await $(prefix + 'c1')
      tierC0 = await $(prefix + 'c0')
      tierD3 = await $(prefix + 'd3')
      tierD2 = await $(prefix + 'd2')
      tierD1 = await $(prefix + 'd1')
      tierD0 = await $(prefix + 'd0')

      tierA3 = await tierA3.getValue()
      tierA2 = await tierA2.getValue()
      tierA1 = await tierA1.getValue()
      tierA0 = await tierA0.getValue()
      tierB3 = await tierB3.getValue()
      tierB2 = await tierB2.getValue()
      tierB1 = await tierB1.getValue()
      tierB0 = await tierB0.getValue()
      tierC3 = await tierC3.getValue()
      tierC2 = await tierC2.getValue()
      tierC1 = await tierC1.getValue()
      tierC0 = await tierC0.getValue()
      tierD3 = await tierD3.getValue()
      tierD2 = await tierD2.getValue()
      tierD1 = await tierD1.getValue()
      tierD0 = await tierD0.getValue()

      expect(parseInt(tierA3), 'Custody Tier A3 Weighting should be ' + workloadPoints.cusA3).to.be.equal(workloadPoints.cusA3)
      expect(parseInt(tierA2), 'Custody Tier A2 Weighting should be ' + workloadPoints.cusA2).to.be.equal(workloadPoints.cusA2)
      expect(parseInt(tierA1), 'Custody Tier A1 Weighting should be ' + workloadPoints.cusA1).to.be.equal(workloadPoints.cusA1)
      expect(parseInt(tierA0), 'Custody Tier A0 Weighting should be ' + workloadPoints.cusA0).to.be.equal(workloadPoints.cusA0)
      expect(parseInt(tierB3), 'Custody Tier B3 Weighting should be ' + workloadPoints.cusB3).to.be.equal(workloadPoints.cusB3)
      expect(parseInt(tierB2), 'Custody Tier B2 Weighting should be ' + workloadPoints.cusB2).to.be.equal(workloadPoints.cusB2)
      expect(parseInt(tierB1), 'Custody Tier B1 Weighting should be ' + workloadPoints.cusB1).to.be.equal(workloadPoints.cusB1)
      expect(parseInt(tierB0), 'Custody Tier B0 Weighting should be ' + workloadPoints.cusB0).to.be.equal(workloadPoints.cusB0)
      expect(parseInt(tierC3), 'Custody Tier C3 Weighting should be ' + workloadPoints.cusC3).to.be.equal(workloadPoints.cusC3)
      expect(parseInt(tierC2), 'Custody Tier C2 Weighting should be ' + workloadPoints.cusC2).to.be.equal(workloadPoints.cusC2)
      expect(parseInt(tierC1), 'Custody Tier C1 Weighting should be ' + workloadPoints.cusC1).to.be.equal(workloadPoints.cusC1)
      expect(parseInt(tierC0), 'Custody Tier C0 Weighting should be ' + workloadPoints.cusC0).to.be.equal(workloadPoints.cusC0)
      expect(parseInt(tierD3), 'Custody Tier D3 Weighting should be ' + workloadPoints.cusD3).to.be.equal(workloadPoints.cusD3)
      expect(parseInt(tierD2), 'Custody Tier D2 Weighting should be ' + workloadPoints.cusD2).to.be.equal(workloadPoints.cusD2)
      expect(parseInt(tierD1), 'Custody Tier D1 Weighting should be ' + workloadPoints.cusD1).to.be.equal(workloadPoints.cusD1)
      expect(parseInt(tierD0), 'Custody Tier D0 Weighting should be ' + workloadPoints.cusD0).to.be.equal(workloadPoints.cusD0)

      // Licence
      link = await $('[href="#license"]')
      await link.click()
      await browser.pause(5000)
      prefix = '#lic-'
      tierA3 = await $(prefix + 'a3')
      tierA2 = await $(prefix + 'a2')
      tierA1 = await $(prefix + 'a1')
      tierA0 = await $(prefix + 'a0')
      tierB3 = await $(prefix + 'b3')
      tierB2 = await $(prefix + 'b2')
      tierB1 = await $(prefix + 'b1')
      tierB0 = await $(prefix + 'b0')
      tierC3 = await $(prefix + 'c3')
      tierC2 = await $(prefix + 'c2')
      tierC1 = await $(prefix + 'c1')
      tierC0 = await $(prefix + 'c0')
      tierD3 = await $(prefix + 'd3')
      tierD2 = await $(prefix + 'd2')
      tierD1 = await $(prefix + 'd1')
      tierD0 = await $(prefix + 'd0')

      tierA3 = await tierA3.getValue()
      tierA2 = await tierA2.getValue()
      tierA1 = await tierA1.getValue()
      tierA0 = await tierA0.getValue()
      tierB3 = await tierB3.getValue()
      tierB2 = await tierB2.getValue()
      tierB1 = await tierB1.getValue()
      tierB0 = await tierB0.getValue()
      tierC3 = await tierC3.getValue()
      tierC2 = await tierC2.getValue()
      tierC1 = await tierC1.getValue()
      tierC0 = await tierC0.getValue()
      tierD3 = await tierD3.getValue()
      tierD2 = await tierD2.getValue()
      tierD1 = await tierD1.getValue()
      tierD0 = await tierD0.getValue()

      expect(parseInt(tierA3), 'Licence Tier A3 Weighting should be ' + workloadPoints.licA3).to.be.equal(workloadPoints.licA3)
      expect(parseInt(tierA2), 'Licence Tier A2 Weighting should be ' + workloadPoints.licA2).to.be.equal(workloadPoints.licA2)
      expect(parseInt(tierA1), 'Licence Tier A1 Weighting should be ' + workloadPoints.licA1).to.be.equal(workloadPoints.licA1)
      expect(parseInt(tierA0), 'Licence Tier A0 Weighting should be ' + workloadPoints.licA0).to.be.equal(workloadPoints.licA0)
      expect(parseInt(tierB3), 'Licence Tier B3 Weighting should be ' + workloadPoints.licB3).to.be.equal(workloadPoints.licB3)
      expect(parseInt(tierB2), 'Licence Tier B2 Weighting should be ' + workloadPoints.licB2).to.be.equal(workloadPoints.licB2)
      expect(parseInt(tierB1), 'Licence Tier B1 Weighting should be ' + workloadPoints.licB1).to.be.equal(workloadPoints.licB1)
      expect(parseInt(tierB0), 'Licence Tier B0 Weighting should be ' + workloadPoints.licB0).to.be.equal(workloadPoints.licB0)
      expect(parseInt(tierC3), 'Licence Tier C3 Weighting should be ' + workloadPoints.licC3).to.be.equal(workloadPoints.licC3)
      expect(parseInt(tierC2), 'Licence Tier C2 Weighting should be ' + workloadPoints.licC2).to.be.equal(workloadPoints.licC2)
      expect(parseInt(tierC1), 'Licence Tier C1 Weighting should be ' + workloadPoints.licC1).to.be.equal(workloadPoints.licC1)
      expect(parseInt(tierC0), 'Licence Tier C0 Weighting should be ' + workloadPoints.licC0).to.be.equal(workloadPoints.licC0)
      expect(parseInt(tierD3), 'Licence Tier D3 Weighting should be ' + workloadPoints.licD3).to.be.equal(workloadPoints.licD3)
      expect(parseInt(tierD2), 'Licence Tier D2 Weighting should be ' + workloadPoints.licD2).to.be.equal(workloadPoints.licD2)
      expect(parseInt(tierD1), 'Licence Tier D1 Weighting should be ' + workloadPoints.licD1).to.be.equal(workloadPoints.licD1)
      expect(parseInt(tierD0), 'Licence Tier D0 Weighting should be ' + workloadPoints.licD0).to.be.equal(workloadPoints.licD0)

      // Community
      link = await $('[href="#community"]')
      await link.click()
      await browser.pause(5000)
      prefix = '#comm-'
      tierA3 = await $(prefix + 'a3')
      tierA2 = await $(prefix + 'a2')
      tierA1 = await $(prefix + 'a1')
      tierA0 = await $(prefix + 'a0')
      tierB3 = await $(prefix + 'b3')
      tierB2 = await $(prefix + 'b2')
      tierB1 = await $(prefix + 'b1')
      tierB0 = await $(prefix + 'b0')
      tierC3 = await $(prefix + 'c3')
      tierC2 = await $(prefix + 'c2')
      tierC1 = await $(prefix + 'c1')
      tierC0 = await $(prefix + 'c0')
      tierD3 = await $(prefix + 'd3')
      tierD2 = await $(prefix + 'd2')
      tierD1 = await $(prefix + 'd1')
      tierD0 = await $(prefix + 'd0')

      tierA3 = await tierA3.getValue()
      tierA2 = await tierA2.getValue()
      tierA1 = await tierA1.getValue()
      tierA0 = await tierA0.getValue()
      tierB3 = await tierB3.getValue()
      tierB2 = await tierB2.getValue()
      tierB1 = await tierB1.getValue()
      tierB0 = await tierB0.getValue()
      tierC3 = await tierC3.getValue()
      tierC2 = await tierC2.getValue()
      tierC1 = await tierC1.getValue()
      tierC0 = await tierC0.getValue()
      tierD3 = await tierD3.getValue()
      tierD2 = await tierD2.getValue()
      tierD1 = await tierD1.getValue()
      tierD0 = await tierD0.getValue()

      expect(parseInt(tierA3), 'Community Tier A3 Weighting should be ' + workloadPoints.commA3).to.be.equal(workloadPoints.commA3)
      expect(parseInt(tierA2), 'Community Tier A2 Weighting should be ' + workloadPoints.commA2).to.be.equal(workloadPoints.commA2)
      expect(parseInt(tierA1), 'Community Tier A1 Weighting should be ' + workloadPoints.commA1).to.be.equal(workloadPoints.commA1)
      expect(parseInt(tierA0), 'Community Tier A0 Weighting should be ' + workloadPoints.commA0).to.be.equal(workloadPoints.commA0)
      expect(parseInt(tierB3), 'Community Tier B3 Weighting should be ' + workloadPoints.commB3).to.be.equal(workloadPoints.commB3)
      expect(parseInt(tierB2), 'Community Tier B2 Weighting should be ' + workloadPoints.commB2).to.be.equal(workloadPoints.commB2)
      expect(parseInt(tierB1), 'Community Tier B1 Weighting should be ' + workloadPoints.commB1).to.be.equal(workloadPoints.commB1)
      expect(parseInt(tierB0), 'Community Tier B0 Weighting should be ' + workloadPoints.commB0).to.be.equal(workloadPoints.commB0)
      expect(parseInt(tierC3), 'Community Tier C3 Weighting should be ' + workloadPoints.commC3).to.be.equal(workloadPoints.commC3)
      expect(parseInt(tierC2), 'Community Tier C2 Weighting should be ' + workloadPoints.commC2).to.be.equal(workloadPoints.commC2)
      expect(parseInt(tierC1), 'Community Tier C1 Weighting should be ' + workloadPoints.commC1).to.be.equal(workloadPoints.commC1)
      expect(parseInt(tierC0), 'Community Tier C0 Weighting should be ' + workloadPoints.commC0).to.be.equal(workloadPoints.commC0)
      expect(parseInt(tierD3), 'Community Tier D3 Weighting should be ' + workloadPoints.commD3).to.be.equal(workloadPoints.commD3)
      expect(parseInt(tierD2), 'Community Tier D2 Weighting should be ' + workloadPoints.commD2).to.be.equal(workloadPoints.commD2)
      expect(parseInt(tierD1), 'Community Tier D1 Weighting should be ' + workloadPoints.commD1).to.be.equal(workloadPoints.commD1)
      expect(parseInt(tierD0), 'Community Tier D0 Weighting should be ' + workloadPoints.commD0).to.be.equal(workloadPoints.commD0)

      // Other
      link = await $('[href="#other"]')
      await link.click()
      await browser.pause(5000)
      sdr = await $('#sdr')
      fdr = await $('#sdrConversion')
      parom = await $('#parom')
      overdue = await $('#weightingOverdue')
      warrants = await $('#weightingWarrants')
      upw = await $('#weightingUpw')
      armsComm = await $('#weightingArmsCommunity')
      armsLic = await $('#weightingArmsLicense')

      nominalTargetPO = await $('#nominalTargetPo')
      nominalTargetPSO = await $('#nominalTargetPso')

      contractedHoursPO = await $('#defaultContractedHoursPo')
      contractedHoursPSO = await $('#defaultContractedHoursPso')
      contractedHoursSPO = await $('#defaultContractedHoursSpo')

      sdr = await sdr.getValue()
      fdr = await fdr.getValue()
      parom = await parom.getValue()
      overdue = await overdue.getValue()
      warrants = await warrants.getValue()
      upw = await upw.getValue()
      armsComm = await armsComm.getValue()
      armsLic = await armsLic.getValue()

      nominalTargetPO = await nominalTargetPO.getValue()
      nominalTargetPSO = await nominalTargetPSO.getValue()

      contractedHoursPO = await contractedHoursPO.getValue()
      contractedHoursPSO = await contractedHoursPSO.getValue()
      contractedHoursSPO = await contractedHoursSPO.getValue()

      expect(parseInt(sdr), 'SDR Weighting should be ' + workloadPoints.sdr).to.be.equal(workloadPoints.sdr)
      expect(parseInt(fdr), 'FDR Weighting should be ' + workloadPoints.sdrConversion).to.be.equal(workloadPoints.sdrConversion)
      expect(parseInt(parom), 'PAROM Weighting should be ' + workloadPoints.parom).to.be.equal(workloadPoints.parom)
      expect(parseInt(overdue), 'Overdue Weighting should be ' + workloadPoints.weightingOverdue).to.be.equal(workloadPoints.weightingOverdue)
      expect(parseInt(warrants), 'Warrants Weighting should be ' + workloadPoints.weightingWarrants).to.be.equal(workloadPoints.weightingWarrants)
      expect(parseInt(upw), 'UPW Weighting should be ' + workloadPoints.weightingUpw).to.be.equal(workloadPoints.weightingUpw)
      expect(parseInt(armsComm), 'ARMS Community Weighting should be ' + workloadPoints.weightingArmsCommunity).to.be.equal(workloadPoints.weightingArmsCommunity)
      expect(parseInt(armsLic), 'ARMS Licence Weighting should be ' + workloadPoints.weightingArmsLicense).to.be.equal(workloadPoints.weightingArmsLicense)

      expect(parseInt(nominalTargetPO), 'Nominal Target PO Weighting should be ' + workloadPoints.nominalTargetPo).to.be.equal(workloadPoints.nominalTargetPo)
      expect(parseInt(nominalTargetPSO), 'Nominal Target PSO Weighting should be ' + workloadPoints.nominalTargetPso).to.be.equal(workloadPoints.nominalTargetPso)
      expect(parseInt(contractedHoursPO), 'Contracted Hours PO Weighting should be ' + workloadPoints.defaultContractedHoursPo).to.be.equal(workloadPoints.defaultContractedHoursPo)
      expect(parseInt(contractedHoursPSO), 'Contracted Hours PSO Weighting should be ' + workloadPoints.defaultContractedHoursPso).to.be.equal(workloadPoints.defaultContractedHoursPso)
      expect(parseInt(contractedHoursSPO), 'Contracted Hours SPO Weighting should be ' + workloadPoints.defaultContractedHoursSpo).to.be.equal(workloadPoints.defaultContractedHoursSpo)
    })

    it('with the correct behaviour for the edit and save buttons', async () => {
      await browser.url(workloadPointsUrl)

      editButton = await $('#edit-button')
      await editButton.click()

      saveNotice = await $('#save-notice')
      saveNotice = await saveNotice.getText()
      expect(saveNotice, 'Save notice should contain "Saving changes made here"').to.contain('Saving changes made here')

      saveButton = await $('#save-button')
      await saveButton.click()

      successMessage = await $('.govuk-notification-banner__heading')
      successMessage = await successMessage.getText()

      expect(successMessage, 'Success message should equal "You have successfully updated the workload points!"').to.equal('You have successfully updated the workload points!')
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
