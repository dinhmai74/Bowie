import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppImageWithFetch } from "./AppImageWithFetch"

declare var module

storiesOf("AppImageWithFetch", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppImageWithFetch text="AppImageWithFetch" />
      </UseCase>
    </Story>
  ))