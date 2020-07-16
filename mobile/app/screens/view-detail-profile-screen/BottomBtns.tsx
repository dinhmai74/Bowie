import { Button, SizedBox, View } from 'components'
import React from 'react'
import styled from 'styled-components'
import { useLayout } from 'utils'

interface BottomBtnsProps {}

export const BottomBtns: React.FC<BottomBtnsProps> = props => {
  const [layout, setLayout] = useLayout()
  return (
    <>
      <Button
        preset="outlineWithoutBorder"
        status="success"
        full
        tx="viewDetailProfileScreen.changePw"
      />
      <SizedBox h={4} />
      <RowBtnWrapper full>
        <Button preset="bordered" tx="viewDetailProfileScreen.discard" onLayout={setLayout} />
        <Button
          tx="viewDetailProfileScreen.saveChanges"
          style={{
            width: layout?.width,
          }}
        />
      </RowBtnWrapper>
    </>
  )
}

const RowBtnWrapper = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
})
