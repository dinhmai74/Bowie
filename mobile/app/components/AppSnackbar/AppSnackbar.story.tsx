import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { Story, StoryScreen, UseCase } from '../../../storybook/views'
import { AppSnackbar } from './AppSnackbar'

declare let module

storiesOf('AppSnackbar', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppSnackbar value={{ message: 'yeoolo' }} />
      </UseCase>
    </Story>
  ))
