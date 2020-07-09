import { Avatar } from '@ui-kitten/components'
import { EvaSize } from '@ui-kitten/components/devsupport'
import { useGetImgQuery } from 'app-graphql'
import React from 'react'
import { images } from 'theme'
import { getBase64UriFromUnknownSource } from 'utils/ImageConverter/ImageConverter'

export interface AppAvatarProps {
  id: string
  shape?: 'round' | 'rounded' | 'square' | string
  size?: EvaSize
}

export const AppAvatar: React.FunctionComponent<AppAvatarProps> = props => {
  // const  // const { someStore } = useStores()
  const { id, ...rest } = props
  const { data } = useGetImgQuery({
    variables: {
      id,
      collection: 'avatar',
    },
    fetchPolicy: 'no-cache',
  })

  let uri
  if (data?.getImg?.data) uri = getBase64UriFromUnknownSource(data?.getImg.data)

  const source = uri ? { uri } : images.iProfilePic

  return <Avatar source={source} {...rest} />
}
