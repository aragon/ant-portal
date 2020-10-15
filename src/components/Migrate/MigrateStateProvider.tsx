import { BigNumber } from 'ethers'
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { ConversionStage, TokenConversionType } from './types'

type MigrateStateProviderProps = {
  conversionType: TokenConversionType
  children: ReactNode
}

type MigrateStateContext = {
  conversionStage: ConversionStage
  conversionType: TokenConversionType
  convertAmount: BigNumber | null
  continueToSigning: () => void
  goToEntering: () => void
  updateConvertAmount: (amount: BigNumber | null) => void
}

const UseMigrateStateContext = React.createContext<MigrateStateContext | null>(
  null
)

function MigrateStateProvider({
  children,
  conversionType,
}: MigrateStateProviderProps): JSX.Element {
  const [conversionStage, setConversionStage] = useState<
    MigrateStateContext['conversionStage']
  >('entering')

  const [convertAmount, setConvertAmount] = useState<
    MigrateStateContext['convertAmount']
  >(null)

  const continueToSigning = useCallback(() => setConversionStage('signing'), [])
  const goToEntering = useCallback(() => setConversionStage('entering'), [])
  const updateConvertAmount = useCallback(
    (amount) => setConvertAmount(amount),
    []
  )

  const contextValue = useMemo(
    (): MigrateStateContext => ({
      conversionStage,
      conversionType,
      continueToSigning,
      convertAmount,
      updateConvertAmount,
      goToEntering,
    }),
    [
      conversionStage,
      conversionType,
      continueToSigning,
      convertAmount,
      updateConvertAmount,
      goToEntering,
    ]
  )

  return (
    <UseMigrateStateContext.Provider value={contextValue}>
      {children}
    </UseMigrateStateContext.Provider>
  )
}

function useMigrateState(): MigrateStateContext {
  return useContext(UseMigrateStateContext) as MigrateStateContext
}

export { MigrateStateProvider, useMigrateState }
