import { isAddressSanctioned } from './ofac'

describe('OFAC', () => {
  describe('Ethereum addresses', () => {
    it('Returns false when not an address', () => {
      expect(isAddressSanctioned('')).toEqual(false)
      expect(isAddressSanctioned('0x')).toEqual(false)
      expect(isAddressSanctioned('0x0')).toEqual(false)

      expect(
        isAddressSanctioned('0x0000000000000000000000000000000000000000')
      ).toEqual(false)
      expect(isAddressSanctioned('hello')).toEqual(false)
      expect(isAddressSanctioned('test')).toEqual(false)

      expect(
        isAddressSanctioned('F60dD140cFf0706bAE9Cd734Ac3ae76AD9eBC32A')
      ).toEqual(false)
      expect(
        isAddressSanctioned('EFE301d259F525cA1ba74A7977b80D5b060B3ccA')
      ).toEqual(false)
    })

    it('Returns true for sanctioned addresses', () => {
      expect(
        isAddressSanctioned('0xD691F27f38B395864Ea86CfC7253969B409c362d')
      ).toEqual(true)
      expect(
        isAddressSanctioned('0xCC84179FFD19A1627E79F8648d09e095252Bc418')
      ).toEqual(true)
      expect(
        isAddressSanctioned('0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D')
      ).toEqual(true)
      expect(
        isAddressSanctioned('0x983a81ca6FB1e441266D2FbcB7D8E530AC2E05A2')
      ).toEqual(true)
      expect(
        isAddressSanctioned('0x94Be88213a387E992Dd87DE56950a9aef34b9448')
      ).toEqual(true)
      expect(
        isAddressSanctioned('0x797d7ae72ebddcdea2a346c1834e04d1f8df102b')
      ).toEqual(true)
      expect(
        isAddressSanctioned('0x5cab7692D4E94096462119ab7bF57319726Eed2A')
      ).toEqual(true)
    })

    it('Returns true for sanctioned addresses, regardless of them being lowercase', () => {
      expect(
        isAddressSanctioned(
          '0xD691F27f38B395864Ea86CfC7253969B409c362d'.toLowerCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0xCC84179FFD19A1627E79F8648d09e095252Bc418'.toLowerCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D'.toLowerCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x983a81ca6FB1e441266D2FbcB7D8E530AC2E05A2'.toLowerCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x94Be88213a387E992Dd87DE56950a9aef34b9448'.toLowerCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x797d7ae72ebddcdea2a346c1834e04d1f8df102b'.toLowerCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x5cab7692D4E94096462119ab7bF57319726Eed2A'.toLowerCase()
        )
      ).toEqual(true)
    })

    it('Returns true for sanctioned addresses, regardless of them being uppercase', () => {
      expect(
        isAddressSanctioned(
          '0xD691F27f38B395864Ea86CfC7253969B409c362d'.toUpperCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0xCC84179FFD19A1627E79F8648d09e095252Bc418'.toUpperCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D'.toUpperCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x983a81ca6FB1e441266D2FbcB7D8E530AC2E05A2'.toUpperCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x94Be88213a387E992Dd87DE56950a9aef34b9448'.toUpperCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x797d7ae72ebddcdea2a346c1834e04d1f8df102b'.toUpperCase()
        )
      ).toEqual(true)
      expect(
        isAddressSanctioned(
          '0x5cab7692D4E94096462119ab7bF57319726Eed2A'.toUpperCase()
        )
      ).toEqual(true)
    })
  })
})
