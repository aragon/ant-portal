import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import StoredList from '../../StoredList/StoredList'
import { MINUTE } from '../../utils/date-utils'
import { useWallet, Web3Provider } from '../../providers/Wallet'
import { networkEnvironment } from '../../environment'
import { ContractTransaction } from 'ethers'
import {
  Activities,
  Activity,
  ActivityActionType,
  ActivityFinalStatus,
  ActivityStatus,
} from './types'
import { useActivityToast } from './useActivityToast'

const TIMEOUT_DURATION = 10 * MINUTE

const networkType = networkEnvironment.legacyNetworkType

type ActivityContextState = {
  activities: Activities
  updateActivities: (cb: (activities: Activities) => Activities) => void
}

const ActivityContext = React.createContext<ActivityContextState | null>(null)

function getStoredList(account: string) {
  return new StoredList<Activity>(`activity:${networkType}:${account}`)
}

async function getActivityFinalStatus(
  ethers: Web3Provider,
  activityDetails: {
    createdAt: number
    transactionHash: string
    status: ActivityStatus
  }
): Promise<ActivityFinalStatus> {
  const { createdAt, transactionHash, status } = activityDetails

  if (status !== 'pending') {
    return status
  }

  const now = Date.now()

  // Get the transaction status once mined
  const getTransactionStatus: Promise<'confirmed' | 'failed'> = ethers
    .getTransaction(String(transactionHash))
    .then((tx) => {
      // tx is null if no tx was found
      if (!tx) {
        throw new Error('No transaction found')
      }
      return tx.wait().then((receipt) => {
        return receipt.blockNumber ? 'confirmed' : 'failed'
      })
    })
    .catch(() => {
      return 'failed'
    })

  // Timeout after 10 minutes
  const timeout = new Promise<'timeout'>((resolve) => {
    if (now - createdAt > TIMEOUT_DURATION) {
      return 'timeout'
    }
    setTimeout(() => {
      resolve('timeout')
    }, TIMEOUT_DURATION - (now - createdAt))
  })

  return Promise.race([getTransactionStatus, timeout])
}

function ActivityProvider({ children }: { children: ReactNode }): JSX.Element {
  const [activities, setActivities] = useState<Activities>([])
  const showActivityToast = useActivityToast()
  const storedList = useRef() as MutableRefObject<StoredList<Activity>>
  const wallet = useWallet()
  const { account, ethers } = wallet

  // Update the activities, ensuring the activities
  // are updated in the stored list and in the state.
  const updateActivities = useCallback(
    (cb: (activities: Activities) => Activities) => {
      const newActivities = cb(activities)
      setActivities(newActivities)
      if (storedList.current) {
        storedList.current.update(newActivities)
      }
    },
    [activities, storedList]
  )

  // Update the status of a single activity,
  // using its transaction hash.
  const updateActivityStatus = useCallback(
    (hash, status) => {
      updateActivities((activities: Activities) =>
        activities.map((activity) => {
          if (activity.transactionHash !== hash) {
            return activity
          }
          return { ...activity, read: false, status }
        })
      )
    },
    [updateActivities]
  )

  const updateActivitiesFromStorage = useCallback(() => {
    if (!storedList.current) {
      return
    }

    const activitiesFromStorage = storedList.current.getItems()

    // We will diff activities from storage and activites from state to prevent loops in the useEffect below
    const activitiesChanged =
      activities.length !== activitiesFromStorage.length ||
      activitiesFromStorage.filter(
        ({ transactionHash }) =>
          activities.findIndex(
            (activity) => activity.transactionHash === transactionHash
          ) === -1
      ).length > 0

    if (activitiesChanged) {
      setActivities(activitiesFromStorage)
    }
  }, [activities, storedList])

  // Triggered every time the account changes
  useEffect(() => {
    if (!account) {
      return
    }

    let cancelled = false
    storedList.current = getStoredList(account)
    updateActivitiesFromStorage()

    if (ethers) {
      activities.forEach(async (activity) => {
        const status = await getActivityFinalStatus(ethers, activity)

        if (!cancelled && status !== activity.status) {
          showActivityToast(activity, status)
          updateActivityStatus(activity.transactionHash, status)
        }
      })
    }

    return () => {
      cancelled = true
    }
  }, [
    account,
    activities,
    ethers,
    updateActivitiesFromStorage,
    updateActivityStatus,
    storedList,
    showActivityToast,
  ])

  const contextValue = {
    activities,
    updateActivities,
  }

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  )
}

ActivityProvider.propTypes = {
  children: PropTypes.node,
}

function useActivity(): {
  activities: Activities
  unreadCount: number
  pendingCount: number
  hasPending: boolean
  markActivitiesRead: () => void
  addActivity: (
    tx: ContractTransaction,
    type: ActivityActionType,
    description: string
  ) => ContractTransaction
  clearActivities: () => void
  removeActivity: (hash: string) => void
  getActivityByHash: (hash: string) => Activity | null
} {
  const { updateActivities, activities } = useContext(ActivityContext)!

  // Mark the current user’s activities as read
  const markActivitiesRead = useCallback(() => {
    updateActivities((activities: Activities) =>
      activities.map((activity) => ({ ...activity, read: true }))
    )
  }, [updateActivities])

  // Total number of unread activities
  const unreadCount = useMemo(() => {
    return activities.reduce((count, { read }) => count + Number(!read), 0)
  }, [activities])

  // Total number of pending activities
  const pendingCount = useMemo(() => {
    return activities.reduce(
      (count, { status }) => count + Number(status === 'pending'),
      0
    )
  }, [activities])

  // Determine whether there are any pending activities in the list
  const hasPending = useMemo(() => {
    return pendingCount > 0
  }, [pendingCount])

  // Add a single activity.
  const addActivity = useCallback(
    (tx: ContractTransaction, type: ActivityActionType, description = '') => {
      updateActivities((activities: Activities) => [
        ...activities,
        {
          createdAt: Date.now(),
          description,
          from: tx.from,
          nonce: tx.nonce,
          read: false,
          status: 'pending',
          type,
          to: tx.to,
          transactionHash: tx.hash,
        },
      ])

      return tx
    },
    [updateActivities]
  )

  // Clear all non pending activities − we don’t clear
  // pending because we’re awaiting state change.
  const clearActivities = useCallback(() => {
    updateActivities((activities: Activities) =>
      activities.filter((activity) => activity.status === 'pending')
    )
  }, [updateActivities])

  // Clear a single activity
  const removeActivity = useCallback(
    (hash: string) => {
      updateActivities((activities: Activities) =>
        activities.filter((activity) => activity.transactionHash !== hash)
      )
    },
    [updateActivities]
  )

  // Clear a single activity
  const getActivityByHash = useCallback(
    (hash: string) =>
      activities.find(({ transactionHash }) => transactionHash === hash) ||
      null,

    [activities]
  )

  return {
    activities,
    markActivitiesRead,
    unreadCount,
    addActivity,
    clearActivities,
    removeActivity,
    hasPending,
    pendingCount,
    getActivityByHash,
  }
}

export { ActivityProvider, useActivity }
