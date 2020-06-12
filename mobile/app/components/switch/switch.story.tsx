/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Toggle } from 'react-powerplug'
import { Switch } from './switch'

declare let module

const styleArray: ViewStyle[] = [{ borderColor: '#686868' }]

storiesOf('Switch', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behaviour', () => (
    <Story>
      <UseCase text="The Toggle Switch" usage="Use the switch to represent on/off states.">
        <Toggle initial={false}>
          {({ on, toggle }) => <Switch checked={on} onChange={toggle} />}
        </Toggle>
      </UseCase>
      <UseCase text="checked = true" usage="This is permanently on.">
        <Switch checked={true} />
      </UseCase>
      <UseCase text="checked = false" usage="This is permanantly off.">
        <Switch checked={false} />
      </UseCase>
    </Story>
  ))
  .add('Styling', () => (
    <Story>
      <UseCase text="Custom Styling" usage="Promise me this won't happen.">
        <Toggle initial={false}>
          {({ on, toggle }) => (
            <View>
              <Switch checked={on} onChange={toggle} />
            </View>
          )}
        </Toggle>
      </UseCase>

      <UseCase text="Style array" usage="This either.">
        <Toggle initial={false}>
          {({ on, toggle }) => (
            <View>
              <Switch style={styleArray} checked={on} onChange={toggle} />
            </View>
          )}
        </Toggle>
      </UseCase>
    </Story>
  ))
