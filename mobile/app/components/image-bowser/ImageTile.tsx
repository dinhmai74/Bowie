import React from 'react'
import { Dimensions, Image, TouchableHighlight } from 'react-native'
const { width } = Dimensions.get('window')

interface ImageTileProps {
  item: string
  index: number
  selected: boolean
  selectImage: (i: number) => void
}

export const ImageTile: React.FC<ImageTileProps> = props => {
  const { item, index, selected, selectImage } = props
  const opacity = selected ? 0.5 : 1
  const style = [{ opacity }]
  return (
    <TouchableHighlight
      style={style}
      underlayColor="transparent"
      onPress={() => selectImage(index)}
    >
      <Image style={{ width: width / 4, height: width / 4 }} source={{ uri: item }} />
    </TouchableHighlight>
  )
}
