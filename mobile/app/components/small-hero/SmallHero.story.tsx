import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { Story, StoryScreen, UseCase } from '../../../storybook/views'
import { SmallHero } from './SmallHero'

declare let module

storiesOf('Small hero', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('Names', () => (
    <Story>
      <UseCase text="default" usage="All case">
        <SmallHero />
      </UseCase>
    </Story>
  ))
