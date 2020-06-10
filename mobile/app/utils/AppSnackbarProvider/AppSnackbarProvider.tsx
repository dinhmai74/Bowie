import { AppSnackbar, SnackbarType, SnackbarValue } from 'components'
import _ from 'lodash'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { spacing } from 'theme'

export const SnackBarContext = createContext(null)

const Container = styled(View)<{}>`
  position: absolute;
  bottom: ${spacing[2]}px;
  left: 0;
  right: 0;
  padding: ${spacing[6]}px;
`

const AUTO_DISMISS = 2000

interface SnackBarOption {
  type: SnackbarType
}

interface SnackBarProviderState {
  addSnack: (value: string, option?: SnackBarOption) => void
}

export const SnackBarProvider = ({ children }) => {
  const [values, setValues] = useState<SnackbarValue[]>([])

  const activeAlertIds = values.join(',')
  // @ts-ignore
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(() => {
        setValues(p => p.slice(0, p.length - 1))
      }, AUTO_DISMISS)
      return () => clearTimeout(timer)
    }
  }, [activeAlertIds])

  // const addAlert = (v: SnackbarValue) => setValues(p => [...p, v])
  const addSnack = useCallback((message, { type } = { type: 'success' }) => {
    setValues(v => _.uniqBy([...v, { message, type }], v => v.message))
  }, [])
  const value = useMemo(() => ({ addSnack }), [addSnack])

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {values.length > 0 && (
        <Container>
          {values.map((v, i) => {
            return <AppSnackbar key={i} value={v} />
          })}
        </Container>
      )}
    </SnackBarContext.Provider>
  )
}

const useSnackBars = (): SnackBarProviderState => useContext(SnackBarContext)

export { useSnackBars }
