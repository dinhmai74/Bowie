import { flatten, mergeAll } from 'ramda'
import React from 'react'
import { Image } from 'react-native'
import { images } from 'theme'
import { presets } from './wallpaper.presets'
import { WallpaperProps } from './wallpaper.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = 'stretch', style: styleOverride, backgroundImage } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const style = mergeAll(flatten([presetToUse, styleOverride]))

  // figure out which image to use
  const source = backgroundImage || images.dfWallpaper

  return <Image source={source} style={style} />
}
