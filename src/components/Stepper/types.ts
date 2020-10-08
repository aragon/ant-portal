export type StepStatus =
  | 'waiting'
  | 'prompting'
  | 'working'
  | 'success'
  | 'error'
  | 'waiting'

export type StepDescriptions = Record<StepStatus, string>

export interface StepItem {
  title: string
  handleSign: (renderProps: {
    setPrompting: () => void
    setWorking: () => void
    setError: () => void
    setSuccess: () => void
    setHash: (hash: string) => void
  }) => void
  descriptions?: StepDescriptions
}

export type StepItems = StepItem[]
