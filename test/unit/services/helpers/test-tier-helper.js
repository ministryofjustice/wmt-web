const expect = require('chai').expect
const tierHelper = require('../../../../app/services/helpers/tier-helper')

const EXPECTED_TIER_TYPES = { ONE: 'A3', TWO: 'A2', THREE: 'A1', FOUR: 'A0', FIVE: 'B3', SIX: 'B2', SEVEN: 'B1', EIGHT: 'B0', NINE: 'C3', TEN: 'C2', ELEVEN: 'C1', TWELVE: 'C0', THIRTEEN: 'D3', FOURTEEN: 'D2', FIFTEEN: 'D1', SIXTEEN: 'D0' }

describe('services/helpers/tier-helper', function () {
  describe('getTierType', function () {
    it('should return tier type \'A3\' for a given tier number 1', function () {
      expect(tierHelper.getTierType(1)).to.equal(EXPECTED_TIER_TYPES.ONE)
    })
    it('should return tier type \'A2\' for a given tier number 2', function () {
      expect(tierHelper.getTierType(2)).to.equal(EXPECTED_TIER_TYPES.TWO)
    })
    it('should return tier type \'A1\' for a given tier number 3', function () {
      expect(tierHelper.getTierType(3)).to.equal(EXPECTED_TIER_TYPES.THREE)
    })
    it('should return tier type \'A0\' for a given tier number 4', function () {
      expect(tierHelper.getTierType(4)).to.equal(EXPECTED_TIER_TYPES.FOUR)
    })
    it('should return tier type \'B3\' for a given tier number 5', function () {
      expect(tierHelper.getTierType(5)).to.equal(EXPECTED_TIER_TYPES.FIVE)
    })
    it('should return tier type \'B2\' for a given tier number 6', function () {
      expect(tierHelper.getTierType(6)).to.equal(EXPECTED_TIER_TYPES.SIX)
    })
    it('should return tier type \'B1\' for a given tier number 7', function () {
      expect(tierHelper.getTierType(7)).to.equal(EXPECTED_TIER_TYPES.SEVEN)
    })
    it('should return tier type \'B0\' for a given tier number 8', function () {
      expect(tierHelper.getTierType(8)).to.equal(EXPECTED_TIER_TYPES.EIGHT)
    })
    it('should return tier type \'C3\' for a given tier number 9', function () {
      expect(tierHelper.getTierType(9)).to.equal(EXPECTED_TIER_TYPES.NINE)
    })
    it('should return tier type \'C2\' for a given tier number 10', function () {
      expect(tierHelper.getTierType(10)).to.equal(EXPECTED_TIER_TYPES.TEN)
    })
    it('should return tier type \'C1\' for a given tier number 11', function () {
      expect(tierHelper.getTierType(11)).to.equal(EXPECTED_TIER_TYPES.ELEVEN)
    })
    it('should return tier type \'C0\' for a given tier number 12', function () {
      expect(tierHelper.getTierType(12)).to.equal(EXPECTED_TIER_TYPES.TWELVE)
    })
    it('should return tier type \'D3\' for a given tier number 13', function () {
      expect(tierHelper.getTierType(13)).to.equal(EXPECTED_TIER_TYPES.THIRTEEN)
    })
    it('should return tier type \'D2\' for a given tier number 14', function () {
      expect(tierHelper.getTierType(14)).to.equal(EXPECTED_TIER_TYPES.FOURTEEN)
    })
    it('should return tier type \'D1\' for a given tier number 15', function () {
      expect(tierHelper.getTierType(15)).to.equal(EXPECTED_TIER_TYPES.FIFTEEN)
    })
    it('should return tier type \'D0\' for a given tier number 16', function () {
      expect(tierHelper.getTierType(16)).to.equal(EXPECTED_TIER_TYPES.SIXTEEN)
    })
  })
})
