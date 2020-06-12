import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { Story, StoryScreen, UseCase } from '../../../storybook/views'
import { AppLoading } from './AppLoading'

declare let module

storiesOf('App Loading', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Names', () => (
    <Story>
      <UseCase text="default" usage="All case">
        <AppLoading />
      </UseCase>
    </Story>
  ))
