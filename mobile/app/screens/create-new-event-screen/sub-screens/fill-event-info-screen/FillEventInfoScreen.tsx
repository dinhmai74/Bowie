import { useNavigation } from '@react-navigation/native'
import { useGetTopTagsQuery } from 'app-graphql'
import {
  AppCircleButton,
  AppFooter,
  AppLoading,
  Button,
  ImageBowser,
  Screen,
  SizedBox,
  Text,
  TextField,
  View,
} from 'components'
import _ from 'lodash'
import { useStores } from 'models/root-store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Image, TextStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import styled from 'styled-components'
import { metrics, spacing } from 'theme'
import { ChoseTagBottomSheet, Tag } from './ChoseTagBottomSheet'

const GalleryImg = styled(Image)({
  marginRight: spacing[4],
  ...metrics.images.x2m,
})

const SInput = styled(TextField)({
  flex: 1,
  marginLeft: spacing[4],
})

const SView = styled(View)({
  alignItems: 'center',
})

const TEXT_AREA_STYLE: TextStyle = {
  minHeight: 120,
}

const FooterRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing[8],
  paddingHorizontal: spacing[6],
})

const SButton = styled(Button)({
  marginHorizontal: spacing[2],
})

interface FillEventInfoScreenProps {}

type FormValue = {
  name: string
  description: string
}

export const FillEventInfoScreen: React.FC<FillEventInfoScreenProps> = props => {
  const { createNewEventStore } = useStores()
  const { setValue, register, handleSubmit, errors } = useForm<FormValue>()
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])
  const { data: tagsData, loading: tagsLoading } = useGetTopTagsQuery()
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [imageBrowserOpen, setImageBrowserOpen] = React.useState(false)
  const [images, setImages] = React.useState([])

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  React.useEffect(() => {
    register({ name: 'name' }, { required: 'errors.requiredField' })
    register({ name: 'description' })
  }, [register])

  const onSubmit = (data: FormValue) => {}

  const navigation = useNavigation()
  const loading = tagsLoading

  const imageBrowserCallback = callback => {
    callback
      .then(photos => {
        console.tron.log('photo', photos)
        setImages(photos)
        setImageBrowserOpen(false)
      })
      .catch(e => console.log(e))
  }

  if (loading)
    return (
      <View full bgBaseOnTheme>
        <Screen autoPaddingHorizontal>
          <NewEventHeader headerTx={createNewEventStore.place?.name} />
          <AppLoading />
        </Screen>
      </View>
    )

  /* ------------- renders ------------- */
  const renderNameInput = () => (
    <SView row>
      <Text tx="createNewEventScreen.info.yourEventWillBeName" />
      <SInput
        size="small"
        caption={errors?.name?.message.toString()}
        onChangeText={t => setValue('name', t, true)}
      />
    </SView>
  )

  const renderDetailsInput = () => {
    return (
      <>
        <Text tx="createNewEventScreen.info.details" />
        <SizedBox h={2} />
        <TextField
          multiline={true}
          textStyle={TEXT_AREA_STYLE}
          onChangeText={t => setValue('description', t)}
        />
      </>
    )
  }

  const renderEventTags = () => {
    return (
      <>
        <Text tx="createNewEventScreen.info.eventstag" />
        <SizedBox h={3} />
        <View row>
          {selectedTags.length > 0 && (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedTags.map((v: Tag) => {
                  return (
                    <SButton
                      key={v.id}
                      preset="bordered"
                      onPress={() => setSelectedTags(p => p.filter(x => x.id !== v.id))}
                    >
                      {'#' + v.name}
                    </SButton>
                  )
                })}
              </ScrollView>

              <SizedBox w={4} />
            </>
          )}
          <AppCircleButton onPress={toggleModal} />
        </View>
      </>
    )
  }

  const renderPickGallaries = () => {
    return (
      <>
        <ImageBowser max={4} callback={imageBrowserCallback} isVisible={imageBrowserOpen} />
        <Button
          text="Choose Images"
          onPress={() => {
            setImageBrowserOpen(true)
          }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map(image => (
            <GalleryImg key={image.id} source={{ uri: image.uri }} />
          ))}
        </ScrollView>
      </>
    )
  }

  return (
    <View full bgBaseOnTheme>
      <Screen autoPaddingHorizontal>
        <NewEventHeader headerTx={createNewEventStore.place?.name} />

        <ScrollView keyboardDismissMode="interactive" showsVerticalScrollIndicator={false}>
          {renderNameInput()}
          <SizedBox h={4} />
          {renderDetailsInput()}
          <SizedBox h={4} />
          {renderEventTags()}
          <SizedBox h={4} />
          {renderPickGallaries()}
        </ScrollView>
      </Screen>

      <AppFooter>
        <FooterRow>
          <Button tx="common.pre" onPress={() => navigation.goBack()} />
          <Button tx="common.done" onPress={handleSubmit(onSubmit)} />
        </FooterRow>
      </AppFooter>

      <ChoseTagBottomSheet
        tags={tagsData?.getTopTenHotTag}
        isVisible={isModalVisible}
        close={toggleModal}
        onDone={tags => {
          setSelectedTags(p => _.uniqBy([...p, ...tags], v => v.id))
          toggleModal()
        }}
      />
    </View>
  )
}
