import * as Font from "expo-font"

export const initFonts = async () => {
  await Font.loadAsync({
    Montserrat: require("./Montserrat-Regular.ttf"),
    "Montserrat-Regular": require("./Montserrat-Regular.ttf"),
    BalooDa2: require("./BalooDa2-Regular.ttf"),
    "BalooDa2-Regular": require("./BalooDa2-Regular.ttf"),
    "BalooDa2-Medium": require("./BalooDa2-Medium.ttf"),
    "BalooDa2-SemiBold": require("./BalooDa2-SemiBold.ttf"),
    "BalooDa2-Bold": require("./BalooDa2-Bold.ttf"),
    "BalooDa2-ExtraBold": require("./BalooDa2-ExtraBold.ttf"),
  })
}
