import React from 'react'
import { Modal, ModalProps, Card } from '@ui-kitten/components'
import { AppStyles, spacing } from 'theme'
import { Text, Button, View, SizedBox } from 'components'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  padding: ${spacing[4]}px ${spacing[5]}px;
`

const StyledChoseRow = styled(View)`
  align-items: center;
  margin: ${spacing[5]}px 0;
`

interface JoinModalProps extends ModalProps {
  onAccepted: (type: Number) => void
}

export const JoinModal: React.FC<JoinModalProps> = props => {
  const { onAccepted, ...rest } = props
  return (
    <Modal {...rest} backdropStyle={AppStyles.backdrop}>
      <StyledCard disabled={true}>
        <Text preset="h3" text="eventDetailScreen.wannaJoinAs" textAlign="center" />

        <StyledChoseRow row>
          <Button tx="common.secret" appearance="outline" onPress={() => onAccepted(0)} />
          <SizedBox w={4} />
          <Text tx="common.or" />
          <SizedBox w={4} />
          <Button tx="common.public" onPress={() => onAccepted(1)} />
        </StyledChoseRow>

        <Text preset="h3" text="eventDetailScreen.member" textAlign="center" />
      </StyledCard>
    </Modal>
  )
}
