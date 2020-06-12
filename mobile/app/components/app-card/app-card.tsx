import { Layout } from '@ui-kitten/components'
import React from 'react'
import { appCardStyles as styles } from './app-card.styles'

export interface AppCardProps {
  style?: any
}

export const AppCard: React.FunctionComponent<AppCardProps> = props => {
  // const { someStore } = useStores()
  const { children, style } = props

  return <Layout style={[styles.wrapper, style]}>{children}</Layout>
}
