import { useCallback, useState } from 'react'
import Animated from 'react-native-reanimated'
import { mix } from 'react-native-redash'

interface Size {
  width: number
  height: number
  x: number
  y: number
}

export const useLayout = (): [Size, any] => {
  const [layout, setLayout] = useState(null)

  const onLayout = useCallback(event => {
    const { width, height, x, y } = event.nativeEvent.layout
    setLayout({ width, height, x, y })
  }, [])

  return [layout, onLayout]
}
export const getOpacity: any = (value, from = 0, to = 1) => ({
  opacity: mix(value, from, to),
})

export const getScale: any = (value, from = 0, to = 1) => ({
  scale: mix(value, from, to),
})

export const getScaleAndOpacity: any = (value, from = 0, to = 1) => ({
  ...getOpacity(value, from, to),
  transform: [getScale(value, from, to)],
})

export const getTranslateX: any = (value, from = 100, to = 0) => ({
  transform: [
    {
      translateX: mix(value, from, to),
    },
  ],
})

export const getCircle = (value = 50) => ({
  borderRadius: value / 2,
  ...getSize(value),
})

export const getAnimateCircle = (animatedValue: Animated.Value<number>, from = 0, to = 50) => {
  const size = mix(animatedValue, from, to)
  const border = mix(animatedValue, from, to / 2)
  return {
    borderRadius: border,
    width: size,
    height: size,
  }
}

export const getSize = (value: number) => ({
  width: value,
  height: value,
})

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick(tick => tick + 1)
  }, [])
  return update
}
