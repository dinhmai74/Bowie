import { Avatar as KittenAvatar } from '@ui-kitten/components'
import { GetCurrentUserInfoQuery } from 'app-graphql'
import base64 from 'base64-js'
import { Text, View } from 'components'
import React from 'react'
import { ImageStyle, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SkeletonContent from 'react-native-skeleton-content'
import styled from 'styled-components'
import { spacing, useThemes } from 'theme'
import { toCapitalize } from 'utils'

const Container = styled(View)`
  margin: ${spacing[4]}px 0;
`

const styles = StyleSheet.create({
  skeContainer: {},
})

const avtSize = 70
const skeAvatar = {
  width: avtSize,
  height: avtSize,
  marginBottom: 6,
  borderRadius: avtSize / 2,
  marginHorizontal: spacing[4],
} as ImageStyle

interface AvatarProps {
  data: GetCurrentUserInfoQuery
  loading: boolean
  onAvatarPress: () => void
  onEditPress: () => void
}

export const Avatar: React.FC<AvatarProps> = props => {
  const { data: getInfoData, loading } = props
  if (getInfoData) console.tron.log('get user data', getInfoData)
  const { theme } = useThemes()
  if (getInfoData?.me?.error) console.tron.log('data.me.error', getInfoData.me?.error?.message)

  let avatarUri: string

  if (getInfoData?.me) {
    const data = getInfoData?.me?.user?.avatar?.data
    const base = 'data:image/png;base64,'
    if (data?.data)
      avatarUri = base + base64.fromByteArray(getInfoData?.me?.user?.avatar?.data?.data)
    else avatarUri = base + data
  }

  const userName = getInfoData?.me?.user?.name

  return (
    <Container row>
      <TouchableOpacity onPress={props.onAvatarPress}>
        <SkeletonContent
          containerStyle={styles.skeContainer}
          isLoading={loading}
          layout={[skeAvatar]}
        >
          {!loading && <KittenAvatar source={{ uri: avatarUri }} style={{ ...skeAvatar }} />}
        </SkeletonContent>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onEditPress}>
        <SkeletonContent
          containerStyle={styles.skeContainer}
          isLoading={loading}
          layout={[
            { width: 220, height: 20, marginBottom: spacing[4] },
            { width: 180, height: 20, marginBottom: spacing[4] },
          ]}
        >
          <Text preset="h3">Hi, {toCapitalize(userName)}</Text>

          <Text
            tx={'settingsScreen.viewAndEdit'}
            themeColor={theme === 'dark' ? 'color-basic-500' : 'color-primary-700'}
          />
        </SkeletonContent>
      </TouchableOpacity>
    </Container>
  )
}
