import i18n from "i18n-js"

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
const missingTranslationRegex = /^\[missing ".*" translation\]$/

export function translate(initialMsg: string, options?: object) {
  // We tried to translate something else than a string
  // The native I18n function will simply crash instead of rejecting the attempt with an error message
  if (typeof initialMsg !== "string") {
    // __DEV__ &&
    // console.log(`I18n: you must give a string to translate instead of "${typeof initialMsg}"`)

    return "" // We don't return any message as we don't know what to send
  }

  const localMsg = i18n.t(initialMsg, options)

  // The translation does not exist, the default message is not very sexy
  // Instead we return the message we tried to translate
  if (missingTranslationRegex.test(localMsg)) {
    // __DEV__ && console.log(`translation "${initialMsg}" does not exists in translations files`)

    return initialMsg
  }

  return localMsg
}

