import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppKittenIcon } from "./AppKittenIcon"

declare let module

storiesOf("AppKittenIcon", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppKittenIcon text="AppKittenIcon" />
      </UseCase>
    </Story>
  ))
