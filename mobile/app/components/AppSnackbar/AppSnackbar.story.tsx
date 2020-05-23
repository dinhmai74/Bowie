import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppSnackbar } from "./AppSnackbar"

declare var module

storiesOf("AppSnackbar", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppSnackbar text="AppSnackbar" />
      </UseCase>
    </Story>
  ))