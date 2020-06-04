import { Avatar as KittenAvatar } from '@ui-kitten/components'
import { GetCurrentUserInfoQuery, useGetImgLazyQuery, useGetImgQuery } from 'app-graphql'
import { Text, View } from 'components'
import React from 'react'
import { ImageStyle, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SkeletonContent from 'react-native-skeleton-content'
import styled from 'styled-components'
import { spacing, useThemes } from 'theme'
import { getBase64UriFromUnknownSource, toCapitalize } from 'utils'

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

  const { data: imgData, loading: loadingImg } = useGetImgQuery({
    variables: {
      id: getInfoData?.me?.avatarId,
    },
    fetchPolicy: 'network-only',
  })

  const { theme } = useThemes()
  let avatarUri: string

  if (imgData) {
    avatarUri = getBase64UriFromUnknownSource(imgData.getImg!.data)
  }

  const userName = getInfoData?.me?.name

  return (
    <Container row>
      <TouchableOpacity onPress={props.onAvatarPress}>
        <SkeletonContent
          containerStyle={styles.skeContainer}
          isLoading={loading || loadingImg}
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
