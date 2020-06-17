import { Button, TextField, View } from 'components'
import { Image, TextStyle } from 'react-native'
import styled from 'styled-components'
import { metrics, spacing } from 'theme'

export const PickThumbnailWrapper = styled(View)({
  alignItems: 'flex-end',
})

export const ThumbnailImgWrapper = styled(View)({
  alignItems: 'center',
})

export const IlluPickImg = styled(Image)({
  ...metrics.images.xsm,
  resizeMode: 'contain',
  marginHorizontal: spacing[4],
})

export const GalleryImg = styled(Image)({
  marginRight: spacing[4],
  ...metrics.images.x2m,
})

export const NameInput = styled(TextField)({
  flex: 1,
  marginLeft: spacing[4],
})

export const NameInputWrapper = styled(View)({
  alignItems: 'center',
})

export const TEXT_AREA_STYLE: TextStyle = {
  minHeight: 120,
}

export const FooterRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing[8],
  paddingHorizontal: spacing[6],
})

export const SButton = styled(Button)({
  marginHorizontal: spacing[2],
})
