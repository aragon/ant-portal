import { TokenName } from './types'
import antV1TokenSvg from './assets/aragon-v1-token.svg'
import antV2TokenSvg from './assets/aragon-v2-token.svg'
import anjTokenSvg from './assets/anj-token.svg'

export const tokenInfo: Record<
  TokenName,
  { suffix: string; graphic: string }
> = {
  antV1: {
    suffix: 'ANTv1',
    graphic: antV1TokenSvg,
  },
  antV2: {
    suffix: 'ANTv2',
    graphic: antV2TokenSvg,
  },
  anj: {
    suffix: 'ANJ',
    graphic: anjTokenSvg,
  },
  opt: {
    suffix: 'Option',
    graphic: anjTokenSvg,
  },
}
