import {
  StepHandleSignProps,
  StepItem,
  StepItems,
} from './components/Stepper/types'

export const MOCK_HASH =
  '0xaa1eff68a2d66769c0bf51f28ed4d9c7723805d2c253ecfc898d31977e8c92b7'

export async function mockPromiseLatency(ms: number): Promise<boolean> {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms))
}

const mockStepItem: StepItem = {
  title: 'Initiate ANT migration',
  handleSign: async ({
    setSuccess,
    setWorking,
    setError,
    setHash,
  }: StepHandleSignProps): Promise<void> => {
    try {
      setWorking()
      await mockPromiseLatency(3000)

      setHash(MOCK_HASH)
      setSuccess()
    } catch (err) {
      console.error(err)
      setError()
    }
  },
}

export function getMockSteps(count = 1): StepItems {
  return Array(count).fill(mockStepItem)
}
