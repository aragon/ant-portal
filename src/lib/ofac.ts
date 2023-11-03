import { BlockList } from '../abi/types/BlockList'
import { promiseWithTimeout, runAndRetry } from './promise-utils'

export function validateOfac(
  address: string,
  blockListContract: BlockList
): Promise<void> {
  if (isAddressSanctioned(address)) {
    return Promise.reject(
      new Error(
        'Your Ethereum address is not allowed to interact with the redemption smart contract'
      )
    )
  }

  return isAddressSanctionedOnChain(address, blockListContract)
    .then((sanctioned) => {
      if (sanctioned) {
        throw new Error(
          'Your Ethereum address is not allowed to interact with the redemption smart contract'
        )
      }

      return fetchMyCountryCode()
    })
    .then((myIp) => {
      if (
        Object.keys(sanctionedCountries).includes(
          myIp.countryCode.toUpperCase()
        )
      ) {
        const countryName =
          sanctionedCountries[myIp.countryCode] || myIp.countryName
        throw new Error(
          'Your country (' +
            countryName +
            ') is not allowed to interact with the redemption smart contract'
        )
      }
    })
}

export function isAddressSanctioned(address: string): boolean {
  if (!address) return false
  address = address.toLowerCase()

  return sanctionedAddresses.includes(address)
}

export function isAddressSanctionedOnChain(
  address: string,
  blockListContract: BlockList
): Promise<boolean> {
  return blockListContract.isBlocklisted(address)
}

export function isHomeCountrySanctioned(): Promise<boolean> {
  return fetchMyCountryCode().then((myIp) => {
    return Object.keys(sanctionedCountries).includes(
      myIp.countryCode.toUpperCase()
    )
  })
}

export function getHomeCountryName(): Promise<string> {
  return fetchMyCountryCode().then((myIp) => myIp.countryName)
}

// Internal

const sanctionedAddresses = [
  '0x01e2919679362dFBC9ee1644Ba9C6da6D6245BB1',
  '0x03893a7c7463AE47D46bc7f091665f1893656003',
  '0x04DBA1194ee10112fE6C3207C0687DEf0e78baCf',
  '0x05E0b5B40B7b66098C2161A5EE11C5740A3A7C45',
  '0x07687e702b410Fa43f4cB4Af7FA097918ffD2730',
  '0x0836222F2B2B24A3F36f98668Ed8F0B38D1a872f',
  '0x08723392Ed15743cc38513C4925f5e6be5c17243',
  '0x08b2eFdcdB8822EfE5ad0Eae55517cf5DC544251',
  '0x09193888b3f38C82dEdfda55259A82C0E7De875E',
  '0x098B716B8Aaf21512996dC57EB0615e2383E2f96',
  '0x0E3A09dDA6B20aFbB34aC7cD4A6881493f3E7bf7',
  '0x0Ee5067b06776A89CcC7dC8Ee369984AD7Db5e06',
  '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc',
  '0x1356c899D8C9467C7f71C195612F8A395aBf2f0a',
  '0x169AD27A470D064DEDE56a2D3ff727986b15D52B',
  '0x178169B423a011fff22B9e3F3abeA13414dDD0F1',
  '0x179f48c78f57a3a78f0608cc9197b8972921d1d2',
  '0x1967d8af5bd86a497fb3dd7899a020e47560daaf',
  '0x19aa5fe80d33a56d56c78e82ea5e50e5d80b4dff',
  '0x1E34A77868E19A6647b1f2F47B51ed72dEDE95DD',
  '0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a',
  '0x22aaA7720ddd5388A3c0A3333430953C68f1849b',
  '0x23173fE8b96A4Ad8d2E17fB83EA5dcccdCa1Ae52',
  '0x23773E65ed146A459791799d01336DB287f25334',
  '0x242654336ca2205714071898f67E254EB49ACdCe',
  '0x2573BAc39EBe2901B4389CD468F2872cF7767FAF',
  '0x26903a5a198D571422b2b4EA08b56a37cbD68c89',
  '0x2717c5e28cf931547B621a5dddb772Ab6A35B701',
  '0x2FC93484614a34f26F7970CBB94615bA109BB4bf',
  '0x2f389ce8bd8ff92de3402ffce4691d17fc4f6535',
  '0x2f50508a8a3d323b91336fa3ea6ae50e55f32185',
  '0x308ed4b7b49797e1a98d3818bff6fe5385410370',
  '0x330bdFADE01eE9bF63C209Ee33102DD334618e0a',
  '0x35fB6f6DB4fb05e6A4cE86f2C93691425626d4b1',
  '0x39D908dac893CBCB53Cc86e0ECc369aA4DeF1A29',
  '0x3AD9dB589d201A710Ed237c829c7860Ba86510Fc',
  '0x3Cffd56B47B7b41c56258D9C7731ABaDc360E073',
  '0x3aac1cC67c2ec5Db4eA850957b967Ba153aD6279',
  '0x3cbded43efdaf0fc77b9c55f6fc9988fcc9b757d',
  '0x3e37627dEAA754090fBFbb8bd226c1CE66D255e9',
  '0x3efa30704d2b8bbac821307230376556cf8cc39e',
  '0x407CcEeaA7c95d2FE2250Bf9F2c105aA7AAFB512',
  '0x43fa21d92141BA9db43052492E0DeEE5aa5f0A93',
  '0x4736dCf1b7A3d580672CcE6E7c65cd5cc9cFBa9D',
  '0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936',
  '0x48549a34ae37b12f6a30566245176994e17c6b4a',
  '0x4f47bc496083c727c5fbe3ce9cdf2b0f6496270c',
  '0x502371699497d08D5339c870851898D6D72521Dd',
  '0x530a64c0ce595026a4a556b703644228179e2d57',
  '0x538Ab61E8A9fc1b2f93b3dd9011d662d89bE6FE6',
  '0x53b6936513e738f44FB50d2b9476730C0Ab3Bfc1',
  '0x5512d943ed1f7c8a43f3435c85f7ab68b30121b0',
  '0x57b2B8c82F065de8Ef5573f9730fC1449B403C9f',
  '0x58E8dCC13BE9780fC42E8723D8EaD4CF46943dF2',
  '0x5A14E72060c11313E38738009254a90968F58f51',
  '0x5a7a51bfb49f190e5a6060a5bc6052ac14a3b59f',
  '0x5cab7692D4E94096462119ab7bF57319726Eed2A',
  '0x5efda50f22d34F262c29268506C5Fa42cB56A1Ce',
  '0x5f48c2a71b2cc96e3f0ccae4e39318ff0dc375b2',
  '0x5f6c97C6AD7bdd0AE7E0Dd4ca33A4ED3fDabD4D7',
  '0x610B717796ad172B316836AC95a2ffad065CeaB4',
  '0x653477c392c16b0765603074f157314Cc4f40c32',
  '0x67d40EE1A85bf4a4Bb7Ffae16De985e8427B6b45',
  '0x6Bf694a291DF3FeC1f7e69701E3ab6c592435Ae7',
  '0x6acdfba02d390b97ac2b2d42a63e85293bcc160e',
  '0x6be0ae71e6c41f2f9d0d1a3b8d0f75e6f6a0b46e',
  '0x6f1ca141a28907f78ebaa64fb83a9088b02a8352',
  '0x722122dF12D4e14e13Ac3b6895a86e84145b6967',
  '0x723B78e67497E85279CB204544566F4dC5d2acA0',
  '0x72a5843cc08275C8171E582972Aa4fDa8C397B2A',
  '0x743494b60097A2230018079c02fe21a7B687EAA5',
  '0x746aebc06d2ae31b71ac51429a19d54e797878e9',
  '0x756C4628E57F7e7f8a459EC2752968360Cf4D1AA',
  '0x76D85B4C0Fc497EeCc38902397aC608000A06607',
  '0x776198CCF446DFa168347089d7338879273172cF',
  '0x77777feddddffc19ff86db637967013e6c6a116c',
  '0x797d7ae72ebddcdea2a346c1834e04d1f8df102b',
  '0x7Db418b5D567A4e0E8c59Ad71BE1FcE48f3E6107',
  '0x7F19720A857F834887FC9A7bC0a0fBe7Fc7f8102',
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0x7FF9cFad3877F21d41Da833E2F775dB0569eE3D9',
  '0x8281Aa6795aDE17C8973e1aedcA380258Bc124F9',
  '0x833481186f16Cece3f1Eeea1a694c42034c3a0dB',
  '0x83E5bC4Ffa856BB84Bb88581f5Dd62A433A25e0D',
  '0x84443CFd09A48AF6eF360C6976C5392aC5023a1F',
  '0x8576acc5c05d6ce88f4e49bf65bdf0c62f91353c',
  '0x8589427373D6D84E98730D7795D8f6f8731FDA16',
  '0x88fd245fEdeC4A936e700f9173454D1931B4C307',
  '0x901bb9583b24d97e995513c6778dc6888ab6870e',
  '0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF',
  '0x931546D9e66836AbF687d2bc64B30407bAc8C568',
  '0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf',
  '0x94Be88213a387E992Dd87DE56950a9aef34b9448',
  '0x94C92F096437ab9958fC0A37F09348f30389Ae79',
  '0x961c5be54a2ffc17cf4cb021d863c42dacd47fc1',
  '0x97b1043abd9e6fc31681635166d430a458d14f9c',
  '0x983a81ca6FB1e441266D2FbcB7D8E530AC2E05A2',
  '0x9AD122c22B14202B4490eDAf288FDb3C7cb3ff5E',
  '0x9c2bc757b66f24d60f016b6237f8cdd414a879fa',
  '0x9f4cda013e354b8fc285bf4b9a60460cee7f7ea9',
  '0xA160cdAB225685dA1d56aa342Ad8841c3b53f291',
  '0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D',
  '0xB20c66C4DE72433F3cE747b58B86830c459CA911',
  '0xBA214C1c1928a32Bffe790263E38B4Af9bFCD659',
  '0xCC84179FFD19A1627E79F8648d09e095252Bc418',
  '0xCEe71753C9820f063b38FDbE4cFDAf1d3D928A80',
  '0xD21be7248e0197Ee08E0c20D4a96DEBdaC3D20Af',
  '0xD4B88Df4D29F5CedD6857912842cff3b20C8Cfa3',
  '0xD5d6f8D9e784d0e26222ad3834500801a68D027D',
  '0xD691F27f38B395864Ea86CfC7253969B409c362d',
  '0xD692Fd2D0b2Fbd2e52CFa5B5b9424bC981C30696',
  '0xD82ed8786D7c69DC7e052F7A542AB047971E73d2',
  '0xd882cfc20f52f2599d84b8e8d58c7fb62cfe344b',
  '0xDD4c48C0B24039969fC16D1cdF626eaB821d3384',
  '0xDF3A408c53E5078af6e8fb2A85088D46Ee09A61b',
  '0xEFE301d259F525cA1ba74A7977b80D5b060B3ccA',
  '0xF60dD140cFf0706bAE9Cd734Ac3ae76AD9eBC32A',
].map((addr) => addr.toLowerCase())

type IpCountryInfo = {
  ip: string
  countryCode: string
  countryName: string
}
const MAX_RETRIES = 5
function fetchMyCountryCode(): Promise<IpCountryInfo> {
  let retries = 0

  return runAndRetry({
    func() {
      const idx = Math.random() * 3
      let promise: Promise<IpCountryInfo>

      if (idx >= 2) {
        promise = getFreeIpApiInfo().then((info) => ({
          ip: info.ipAddress,
          countryCode: info.countryCode,
          countryName: info.countryName,
        }))
      } else if (idx >= 1) {
        promise = getCountryIsInfo().then((info) => ({
          ip: info.ip,
          countryCode: info.country,
          countryName: sanctionedCountries[info.country] || '',
        }))
      } else {
        promise = getIpApiInfo().then((info) => ({
          ip: info.ip,
          countryCode: info.country_code,
          countryName: info.country_name,
        }))
      }

      return promiseWithTimeout(promise, 3000)
    },
    onFail: () => retries++,
    shouldRetry: () => retries <= MAX_RETRIES,
    waitOnErrorInterval: 1000,
  }).catch(() => {
    throw new Error(
      'Could not determine whether your country is eligible to use the contract'
    )
  })
}

// FREE IP INFO
type FreeIpApiInfo = {
  ipVersion: number
  ipAddress: string
  latitude: number
  longitude: number
  countryName: string
  countryCode: string
  timeZone: string
  zipCode: string
  cityName: string
  regionName: string
  continent: string
  continentCode: string
}
function getFreeIpApiInfo(): Promise<FreeIpApiInfo> {
  return fetch('https://freeipapi.com/api/json')
    .then((res) => res.json())
    .then((res: FreeIpApiInfo) => {
      if (!res.countryCode)
        throw new Error('Could not determine your home country')
      return res
    })
}

// COUNTRY.IS
type CountryIsInfo = {
  ip: string
  country: string
}
function getCountryIsInfo(): Promise<CountryIsInfo> {
  return fetch('https://api.country.is')
    .then((res) => res.json())
    .then((res: CountryIsInfo) => {
      if (!res.country) throw new Error('Could not determine your home country')
      return res
    })
}

// IP API.CO

type IpApiInfo = {
  asn: string
  city: string
  continent_code: string
  country: string
  country_area: number
  country_calling_code: string
  country_capital: string
  country_code: string
  country_code_iso3: string
  country_name: string
  country_population: number
  country_tld: string
  currency: string
  currency_name: string
  in_eu: true
  ip: string
  languages: string
  latitude: number
  longitude: number
  network: string
  org: string
  postal: string
  region: string
  region_code: string
  timezone: string
  utc_offset: string
  version: string
}
function getIpApiInfo(): Promise<IpApiInfo> {
  return fetch('https://ipapi.co/json')
    .then((res) => res.json())
    .then((res: IpApiInfo) => {
      if (!res.country_code)
        throw new Error('Could not determine your home country')
      return res
    })
}

const sanctionedCountries: Record<string, string> = {
  AF: 'Afghanistan',
  BY: 'Belarus',
  MM: 'Burma', // Myanmar
  CF: 'Central African Republic',
  CU: 'Cuba',
  CD: 'Democratic Republic of the Congo',
  ET: 'Ethiopia',
  IR: 'Iran',
  IQ: 'Iraq',
  LB: 'Lebanon',
  LY: 'Libya',
  ML: 'Mali',
  NI: 'Nicaragua',
  KP: 'North Korea',
  SO: 'Somalia',
  SS: 'South Sudan',
  SY: 'Syria',
  VE: 'Venezuela',
  YE: 'Yemen',
  ZW: 'Zimbabwe',
}
