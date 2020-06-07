import { Backdrop, Text, View } from 'components'
import React from 'react'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import styled from 'styled-components'
import { spacing } from 'theme'
import { getElevation } from 'utils'

const Wrapper = styled(View)({
  height: '100%',
  padding: spacing[4],
  width: '100%',
  ...getElevation(),
})

interface ChoseTagBottomSheetProps {
  bsref: React.MutableRefObject<any>
}

export const ChoseTagBottomSheet: React.FC<ChoseTagBottomSheetProps> = props => {
  const { bsref } = props
  const fall = new Animated.Value(0)

  const renderContent = () => (
    <Wrapper bgBaseOnTheme>
      <Text>contonet</Text>
    </Wrapper>
  )

  const closeBs = () => {
    bsref.current.snapTo(0)
  }

  return (
    <>
      <BottomSheet
        ref={bsref}
        snapPoints={[-100, '40%', '50%']}
        renderContent={() => renderContent()}
        callbackNode={fall}
        borderRadius={spacing[4]}
        initialSnap={0}
      />

      <Backdrop fall={fall} onPress={closeBs} />
    </>
  )
}
