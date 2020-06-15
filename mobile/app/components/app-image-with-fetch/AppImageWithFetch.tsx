import { useGetImgQuery } from 'app-graphql'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { metrics } from 'theme'
import { getBase64UriFromUnknownSource } from 'utils/ImageConverter/ImageConverter'

const imgSize = {
  width: metrics.images.lg.width,
  height: (metrics.images.lg.width * 2) / 3,
}

const styles = StyleSheet.create({
  container: {
    ...imgSize,
  },
})

export interface AppImageWithFetchProps {
  id: string
  style?: any
  containerStyle?: any
  layoutStyle?: any
}

export const AppImageWithFetch: React.FunctionComponent<AppImageWithFetchProps> = props => {
  // const { someStore } = useStores()
  const { id, style, containerStyle, layoutStyle } = props
  const { data, loading } = useGetImgQuery({
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  })

  let imgUri
  if (data?.getImg?.data) imgUri = getBase64UriFromUnknownSource(data?.getImg.data)

  return <Image source={{ uri: imgUri }} style={[imgSize, style]} />
}
