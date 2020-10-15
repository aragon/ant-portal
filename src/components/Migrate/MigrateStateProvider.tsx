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
  goToSigning: () => void
  goToForm: () => void
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
  >('form')

  const [convertAmount, setConvertAmount] = useState<
    MigrateStateContext['convertAmount']
  >(null)

  const goToSigning = useCallback(() => setConversionStage('signing'), [])
  const goToForm = useCallback(() => setConversionStage('form'), [])
  const updateConvertAmount = useCallback(
    (amount) => setConvertAmount(amount),
    []
  )

  const contextValue = useMemo(
    (): MigrateStateContext => ({
      conversionStage,
      conversionType,
      goToSigning,
      convertAmount,
      updateConvertAmount,
      goToForm,
    }),
    [
      conversionStage,
      conversionType,
      goToSigning,
      convertAmount,
      updateConvertAmount,
      goToForm,
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
