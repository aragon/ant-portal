export type ActivityFinalStatus = 'confirmed' | 'failed' | 'timeout'

export type ActivityStatus = ActivityFinalStatus | 'pending'

export type ActivityActionType =
  | 'upgradeANT'
  | 'approveANT'
  | 'redeemANJ'
  | 'approveANJ'

export type Activity = {
  createdAt: number
  description: string
  from: string
  nonce: number
  read: boolean
  status: ActivityStatus
  type: ActivityActionType
  to?: string
  transactionHash: string
}

export type Activities = Activity[]
