import React from "react"
import { GiftedChat } from "react-native-gifted-chat"

export interface ChatProps {}

export const Chat: React.FunctionComponent<ChatProps> = props => {
  // const { someStore } = useStores()

  return <GiftedChat />
}
