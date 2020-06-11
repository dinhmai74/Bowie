import { Modal } from '@ui-kitten/components'
import { Text, View } from 'components'
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions'
import React from 'react'
import { Dimensions, FlatList, Platform } from 'react-native'
import styled from 'styled-components'
import { spacing } from 'theme'
import { ImageTile } from './ImageTile'
const { width, height } = Dimensions.get('window')

const Header = styled(View)({
  height: 50,
  width: width,
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: spacing[4],
  marginVertical: spacing[2],
})

const Container = styled(View)({
  height: height,
  width: width,
})

const getImages = params => {
  return Permissions.askAsync(Permissions.CAMERA_ROLL)
    .then(() => {
      return MediaLibrary.getAssetsAsync(params)
    })
    .then(result => {
      return result
    })
}

interface ImageBowserProps {
  max: number
  callback: (v: Promise<MediaLibrary.Asset[]>) => void
  isVisible?: boolean
}

export const ImageBowser: React.FC<ImageBowserProps> = props => {
  const { max, callback, isVisible } = props
  const [photos, setPhotos] = React.useState<MediaLibrary.Asset[]>([])
  const [selected, setSelected] = React.useState({})
  const [after, setAfter] = React.useState<any>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  React.useEffect(() => {
    getPhotos()
  }, [])

  const getPhotos = async () => {
    const params: any = { first: 50, assetType: 'Photos' }
    if (after) params.after = after
    if (Platform.OS === 'ios') params.groupTypes = 'All'
    if (!hasNextPage) return
    getImages(params).then(processPhotos)
  }

  const processPhotos = (r: MediaLibrary.PagedInfo<MediaLibrary.Asset>) => {
    if (after === r.endCursor) return
    setPhotos(p => [...p, ...r.assets])
    setAfter(r.endCursor)
    setHasNextPage(r.hasNextPage)
  }

  const selectImage = index => {
    let newSelected = { ...selected }
    if (newSelected[index]) {
      delete newSelected[index]
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > max) return
    if (!newSelected) newSelected = {}
    setSelected(newSelected)
  }

  const prepareCallback = () => {
    const selectedPhotos = photos.filter((_, index) => {
      return selected[index]
    })
    callback(Promise.resolve(selectedPhotos))
  }

  /* ------------- renders ------------- */

  const renderHeader = () => {
    const selectedCount = Object.keys(selected).length
    let headerText = selectedCount + ' Selected'
    if (selectedCount === max) headerText = headerText + ' (Max)'
    return (
      <Header>
        <Text
          tx="common.exit"
          themeColor="text-primary-color"
          onPress={() => callback(Promise.resolve([]))}
        />
        <Text>{headerText}</Text>
        <Text
          tx="common.choose"
          themeColor="text-primary-color"
          onPress={() => prepareCallback()}
        />
      </Header>
    )
  }

  const renderImageTile = ({ item, index }) => {
    const isSelected = !!selected[index]
    return (
      <ImageTile item={item.uri} index={index} selected={isSelected} selectImage={selectImage} />
    )
  }

  const getItemLayout = (data, index) => {
    const length = width / 4
    return { length, offset: length * index, index }
  }

  return (
    <Modal visible={isVisible}>
      <Container bgBaseOnTheme>
        {renderHeader()}
        <FlatList
          data={photos}
          numColumns={4}
          renderItem={renderImageTile}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={() => {
            getPhotos()
          }}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text>Loading...</Text>}
          initialNumToRender={24}
          getItemLayout={getItemLayout}
        />
      </Container>
    </Modal>
  )
}
