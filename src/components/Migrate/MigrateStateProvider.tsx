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
  continueToSigning: () => void
}

const UseMigrateStateContext = React.createContext<MigrateStateContext | null>(
  null
)

function MigrateStateProvider({
  children,
  conversionType,
}: MigrateStateProviderProps): JSX.Element {
  const [conversionStage, setConversionStage] = useState<ConversionStage>(
    'signing'
  )

  const continueToSigning = useCallback(() => setConversionStage('signing'), [])

  const contextValue = useMemo(
    () => ({ conversionStage, conversionType, continueToSigning }),
    [conversionStage, conversionType, continueToSigning]
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
