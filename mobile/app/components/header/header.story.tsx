import { createStackNavigator } from '@react-navigation/stack'
import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { Alert, View } from 'react-native'
import { Story, StoryScreen, UseCase } from '../../../storybook/views'
import { Header } from './header'

declare let module

const VIEWSTYLE = {
  flex: 1,
}

const Stack = createStackNavigator()

const HeaderStory = () => (
  <View>
    <UseCase noPad text="default" usage="The default usage">
      <View style={VIEWSTYLE}>
        <Header headerTx="demoScreen.howTo" />
      </View>
    </UseCase>
    <UseCase noPad text="leftIcon" usage="A left nav icon">
      <View style={VIEWSTYLE}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={() => Alert.alert('left nav')}
        />
      </View>
    </UseCase>
    <UseCase noPad text="rightIcon" usage="A right nav icon">
      <View style={VIEWSTYLE}>
        <Header
          headerTx="demoScreen.howTo"
          rightIcon="bullet"
          onRightPress={() => Alert.alert('right nav')}
        />
      </View>
    </UseCase>
  </View>
)

storiesOf('Header', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behavior', () => (
    <Story>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HeaderStory} />
      </Stack.Navigator>
    </Story>
  ))
