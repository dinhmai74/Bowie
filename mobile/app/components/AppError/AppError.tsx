import { SizedBox } from 'components/sized-box/sized-box'
import { SmallHero, SmallHeroProps } from 'components/SmallHero/SmallHero'
import React from 'react'
import { Text } from '../text/text'
import { appErrorStyles as styles } from './AppError.styles'

interface AppErrorProps extends SmallHeroProps {
  messages: string[]
}

export const AppError: React.FunctionComponent<AppErrorProps> = props => {
  // const { someStore } = useStores()
  const { heroImg, imgStyle, wraperStyle, messages } = props

  return (
    <SmallHero {...{ heroImg, imgStyle, wraperStyle }}>
      <SizedBox h={4} />
      {messages.map((v, i) => (
        <Text tx={v} key={i} style={styles.text} />
      ))}
    </SmallHero>
  )
}
