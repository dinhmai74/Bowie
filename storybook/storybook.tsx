import React, { useEffect } from "react"
import { getStorybookUI, configure } from "@storybook/react-native"
import { AppThemeContext, themes } from "../app/theme"
import { ApplicationProvider } from "@ui-kitten/components"
import { mapping } from "@eva-design/eva"

// eslint-disable-next-line
declare var module

configure(() => {
  require("./storybook-registry")
}, module)

const StorybookUI = getStorybookUI({ port: 9001, host: "localhost", onDeviceUI: true })

export const StorybookUIRoot: React.FunctionComponent = () => {
  useEffect(() => {
    ;(async () => {
      if (typeof __TEST__ === "undefined" || !__TEST__) {
        const Reactotron = require("../app/services/reactotron")
        const reactotron = new Reactotron.Reactotron()
        reactotron.setup()
      }
    })()
  }, [])

  const currentTheme = themes[theme]

  const toggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }

  return (
    <AppThemeContext.Provider value={{ theme, toggle }}>
      <ApplicationProvider mapping={mapping} theme={currentTheme}>
        <StorybookUI />
      </ApplicationProvider>
    </AppThemeContext.Provider>
  )
}
