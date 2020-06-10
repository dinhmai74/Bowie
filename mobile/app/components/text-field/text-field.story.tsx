/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { TextField } from '../'
import { Story, StoryScreen, UseCase } from '../../../storybook/views'
import { Input } from '@ui-kitten/components'

declare let module

storiesOf('TextField', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Labelling', () => (
    <Story>
      <UseCase text="Normal text" usage="Use placeholder and label to set the text.">
        <TextField label="Name" placeholder="omg your name" />
      </UseCase>
    </Story>
  ))
  .add('text area', () => (
    <Story>
      <UseCase text="Normal text" usage="Use text area">
        <Input
          label="Name"
          placeholder="omg your name"
          multiline
          numberOfLines={4}
          textStyle={{
            minHeight: 64,
          }}
        />
      </UseCase>
    </Story>
  ))
