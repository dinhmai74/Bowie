import React, { useState, useEffect, createContext, useMemo, useCallback } from 'react'
import { SnackbarValue, AppSnackbar } from 'components'
import { useContext } from 'react'
import _ from 'lodash'
import { useLayout } from '@react-native-community/hooks'
import { View } from 'react-native'
import { spacing } from 'theme'
import styled from 'styled-components'

export const SnackBarContext = createContext(null)

const Container = styled(View)<{}>`
  position: absolute;
  bottom: ${spacing[2]}px;
  left: 0;
  right: 0;
  padding: ${spacing[6]}px;
`

const AUTO_DISMISS = 6000

interface SnackBarProviderState {
  addSnack: (value: SnackbarValue) => void
}

export const SnackBarProvider = ({ children }) => {
  const [values, setValues] = useState<SnackbarValue[]>([])
  const { onLayout, ...layout } = useLayout()
  const [currentHeight, setHeight] = useState<number>(0)
  const [preH, setPH] = useState<number>(0)

  const activeAlertIds = values.join(',')
  // @ts-ignore
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(() => {
        setValues(p => p.slice(0, p.length - 1))
        if (values.length === 0) {
          setHeight(0)
          setPH(0)
        }
      }, AUTO_DISMISS)
      return () => clearTimeout(timer)
    }
  }, [activeAlertIds])

  // const addAlert = (v: SnackbarValue) => setValues(p => [...p, v])
  const addSnack = useCallback((content: SnackbarValue) => {
    setValues(v => _.uniqBy([...v, content], v => v.message))
  }, [])
  const value = useMemo(() => ({ addSnack }), [addSnack])

  useEffect(() => {
    setPH(currentHeight)
    setHeight(layout.height)
  }, [layout])

  console.tlog('currentHeight', preH)
  console.tlog('values', values)

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      <Container>
        {_.uniqBy(values, 'message').map((v, i) => {
          return <AppSnackbar key={i} value={v} />
        })}
      </Container>
    </SnackBarContext.Provider>
  )
}

const useSnackBars = (): SnackBarProviderState => useContext(SnackBarContext)

export { useSnackBars }
