import { rgba } from 'polished'

const shadowTint = '#1a2130'

export const shadowDepth = {
  close: `0px 1px 2px ${rgba(shadowTint, 0.1)}, 0px 4px 10px ${rgba(
    shadowTint,
    0.03
  )}`,
  medium: `0px 2px 4px ${rgba(shadowTint, 0.03)}, 0px 10px 20px ${rgba(
    shadowTint,
    0.06
  )}`,
  far: `0px 5px 10px ${rgba(shadowTint, 0.01)}, 0px 15px 50px ${rgba(
    shadowTint,
    0.075
  )}`,
}
