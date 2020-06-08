import { EventTag, useCreateEventTagsMutation } from 'app-graphql'
import { Button, SizedBox, Text, TextField, View } from 'components'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import { spacing } from 'theme'

const SModal = styled(Modal)({
  justifyContent: 'flex-end',
  margin: 0,
})

const Wrapper = styled(View)({
  padding: 22,
  justifyContent: 'center',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
  paddingVertical: spacing[4],
})

const SButton = styled(Button)({
  marginHorizontal: spacing[2],
})

export type Tag = Pick<EventTag, 'name' | 'id'>

interface ChoseTagBottomSheetProps {
  isVisible?: boolean
  close: () => void
  tags?: Tag[]
  onDone: (tags: Tag[]) => void
}

export const ChoseTagBottomSheet: React.FC<ChoseTagBottomSheetProps> = props => {
  const { tags, isVisible, close } = props
  const [selected, setSelected] = React.useState<Tag[]>([])
  const [news, setNews] = useState<Tag[]>([])

  useEffect(() => {
    setSelected([])
  }, [isVisible])

  const [createNewTags] = useCreateEventTagsMutation({
    onCompleted(d) {
      setNews(p => [...p, d.createTag])
    },
    onError(e) {
      Alert.alert(e.message)
    },
  })

  return (
    <SModal
      testID={'modal'}
      isVisible={isVisible}
      onSwipeComplete={close}
      swipeDirection={['down']}
      onBackdropPress={close}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Wrapper bgBaseOnTheme>
          <SizedBox h={2} />
          <Text tx="createNewEventScreen.info.trendingTags" />
          <SizedBox h={2} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tags.map((v: EventTag) => {
              return (
                <SButton
                  key={v.id}
                  preset="bordered"
                  status="basic"
                  onPress={() => setSelected(p => _.uniqBy([...p, v], v => v.id))}
                >
                  {'#' + v.name}
                </SButton>
              )
            })}
          </ScrollView>
          <SizedBox h={6} />
          <View row>
            <Text tx="createNewEventScreen.info.orNewOne" />
            <SizedBox w={4} />
            <TextField
              full
              clearButtonMode="always"
              onSubmitEditing={e => {
                if (e.nativeEvent?.text)
                  createNewTags({
                    variables: {
                      input: { name: e.nativeEvent.text, currentUse: 0 },
                    },
                  })
              }}
            />
          </View>

          <SizedBox h={4} />
          <Text tx="createNewEventScreen.info.selectedTags" />
          <SizedBox h={2} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {news.map((v: EventTag) => {
              return (
                <SButton key={v.id} preset="bordered">
                  {'#' + v.name}
                </SButton>
              )
            })}
            {selected.map((v: EventTag) => {
              return (
                <SButton
                  key={v.id}
                  preset="bordered"
                  onPress={() => setSelected(p => p.filter(x => x.id !== v.id))}
                >
                  {'#' + v.name}
                </SButton>
              )
            })}
          </ScrollView>

          <SizedBox h={6} />
          <Button tx="common.done" full onPress={() => props.onDone(selected)} />
        </Wrapper>
      </KeyboardAvoidingView>
    </SModal>
  )
}
