import { Card, Modal, ModalProps } from '@ui-kitten/components'
import { MemberInfoType } from 'app-graphql'
import { Button, SizedBox, Text, View } from 'components'
import React from 'react'
import styled from 'styled-components'
import { AppStyles, spacing } from 'theme'

const StyledCard = styled(Card)`
  padding: ${spacing[4]}px ${spacing[5]}px;
  align-items: center;
  justify-content: center;
`

const StyledChoseRow = styled(View)`
  align-items: center;
  justify-content: center;
  margin: ${spacing[5]}px 0;
`

interface JoinModalProps extends ModalProps {
  onAccepted: (type: MemberInfoType) => void
}

export const JoinModal: React.FC<JoinModalProps> = props => {
  const { onAccepted, ...rest } = props
  return (
    <Modal {...rest} backdropStyle={AppStyles.backdrop}>
      <View autoPaddingHorizontal>
        <StyledCard disabled={true}>
          <Text preset="h3" tx="eventDetailScreen.wannaJoinAs" textAlign="center" />

          <StyledChoseRow row>
            <Button
              tx="common.secret"
              appearance="outline"
              onPress={() => onAccepted(MemberInfoType.SECRET)}
            />
            <SizedBox w={4} />
            <Text tx="common.or" />
            <SizedBox w={4} />
            <Button tx="common.public" onPress={() => onAccepted(MemberInfoType.PUBLIC)} />
          </StyledChoseRow>

          <Text preset="h3" tx="eventDetailScreen.member" textAlign="center" />
        </StyledCard>
      </View>
    </Modal>
  )
}
