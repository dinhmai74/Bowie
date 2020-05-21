import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import * as React from 'react'
import { ScrollView, View, ViewStyle } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export interface StoryProps {
  children?: React.ReactNode
}

const ROOT: ViewStyle = { flex: 1 }

export function Story(props: StoryProps) {
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <View style={ROOT}>
          <ScrollView>{props.children}</ScrollView>
        </View>
      </ApplicationProvider>
    </SafeAreaProvider>
  )
}
