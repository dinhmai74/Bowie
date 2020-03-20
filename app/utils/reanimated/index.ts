import { Value } from "react-native-reanimated"
export const state = {
  finished: new Value(0),
  position: new Value(0),
  time: new Value(0),
  frameTime: new Value(0),
}

export * from "./run"
