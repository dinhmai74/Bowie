import { Screen, View } from 'components'
import styled from 'styled-components'
import { spacing } from 'theme'

export const Container = styled(Screen)(() => ({
  flex: 1,
}))

export const MyHostedWrapper = styled(View)(() => ({}))

export const MyJoinedWrapper = styled(View)(() => ({
  marginVertical: spacing[5],
}))
