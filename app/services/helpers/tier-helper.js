const TierType = require('../../constants/tier-type')

module.exports.getTierType = function (tierNumber) {
  let tier
  switch (tierNumber) {
    case 1:
      tier = TierType.ONE
      break
    case 2:
      tier = TierType.TWO
      break
    case 3:
      tier = TierType.THREE
      break
    case 4:
      tier = TierType.FOUR
      break
    case 5:
      tier = TierType.FIVE
      break
    case 6:
      tier = TierType.SIX
      break
    case 7:
      tier = TierType.SEVEN
      break
    case 8:
      tier = TierType.EIGHT
      break
    case 9:
      tier = TierType.NINE
      break
    case 10:
      tier = TierType.TEN
      break
    case 11:
      tier = TierType.ELEVEN
      break
    case 12:
      tier = TierType.TWELVE
      break
    case 13:
      tier = TierType.THIRTEEN
      break
    case 14:
      tier = TierType.FOURTEEN
      break
    case 15:
      tier = TierType.FIFTEEN
      break
    case 16:
      tier = TierType.SIXTEEN
      break
    case 17:
      tier = TierType.SEVENTEEN
      break
    case 18:
      tier = TierType.EIGHTEEN
      break
    case 19:
      tier = TierType.NINETEEN
      break
    case 20:
      tier = TierType.TWENTY
      break
    case 21:
      tier = TierType.TWENTYONE
      break
    case 22:
      tier = TierType.TWENTYTWO
      break
    case 23:
      tier = TierType.TWENTYTHREE
      break
    case 24:
      tier = TierType.TWENTYFOUR
      break
    case 25:
      tier = TierType.TWENTYFIVE
      break
    case 26:
      tier = TierType.TWENTYSIX
      break
    case 27:
      tier = TierType.TWENTYSEVEN
      break
    case 28:
      tier = TierType.TWENTYEIGHT
      break
    case 29:
      tier = TierType.TWENTYNINE
      break
    case 30:
      tier = TierType.THIRTY
      break
    case 31:
      tier = TierType.THIRTYONE
      break
    case 32:
      tier = TierType.THIRTYTWO
      break
  }
  return tier
}
