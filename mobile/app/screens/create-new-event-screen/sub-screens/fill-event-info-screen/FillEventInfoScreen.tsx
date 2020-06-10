import { useNavigation } from '@react-navigation/native'
import { useCreateEventMutation, useGetTopTagsQuery } from 'app-graphql'
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
  AppIcon,
} from 'components'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { ReactNativeFile } from 'extract-files'
import _ from 'lodash'
import { useStores } from 'models/root-store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Image, TextStyle, ImageStyle, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import styled from 'styled-components'
import { metrics, spacing, images } from 'theme'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'
import { SuccessScreen } from '../SuccessScreen/SuccessScreen'
import { ChoseTagBottomSheet, Tag } from './ChoseTagBottomSheet'
import { useSnackBars } from 'utils'
import moment from 'moment'

const PickThumbnailWrapper = styled(View)({
  alignItems: 'flex-end',
})

const ThumbnailImgWrapper = styled(View)({
  alignItems: 'center',
})

const IlluPickImg = styled(Image)({
  ...metrics.images.xsm,
  resizeMode: 'contain',
  marginHorizontal: spacing[4],
})

const GalleryImg = styled(Image)({
  marginRight: spacing[4],
  ...metrics.images.x2m,
})

const NameInput = styled(TextField)({
  flex: 1,
  marginLeft: spacing[4],
})

const NameInputWrapper = styled(View)({
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
  const { data: tagsData, loading: loadingTags } = useGetTopTagsQuery()
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [imageBrowserOpen, setImageBrowserOpen] = React.useState(false)
  const [gallaries, setGallaries] = React.useState<MediaLibrary.Asset[]>([])
  const [thumbnail, setThumbnail] = React.useState<any>(null)
  const { addSnack } = useSnackBars()

  const [
    muCreatNewEvent,
    { loading: loadingCreateEvent, data: dataCreateEvent },
  ] = useCreateEventMutation({
    onError(e) {
      console.tron.log(e)
    },
    onCompleted(d) {
      console.tron.log('d', d)
    },
  })

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  React.useEffect(() => {
    register({ name: 'name' }, { required: 'errors.requiredField' })
    register({ name: 'description' })
  }, [register])

  const onSubmit = (data: FormValue) => {
    const files = []
    gallaries.forEach(v => {
      const file = new ReactNativeFile({
        uri: v?.uri,
        name: v?.filename,
        type: 'image/png',
      })
      files.push(file)
    })
    console.tron.log('files', files)
    muCreatNewEvent({
      variables: {
        event: {
          membersInfo: [],
          startTime: moment(createNewEventStore.startTime).utc(),
          endTime: moment(createNewEventStore.endTime).utc(),
          tags: selectedTags.map(v => v.id),
          // place: {
          // address: '1232ccc',
          // name: 'Ho chi minhh coffe',
          // coord: { latitude: 10.943009870934329, longitude: 106.74740731729867 },
          // },
          place: createNewEventStore.place,
          information: { eventName: data.name, description: data.description },
          galleries: {
            files,
          },
          thumbnail: {
            file: thumbnail,
          },
        },
      },
    })
  }

  const navigation = useNavigation()

  const imageBrowserCallback = (callback: Promise<MediaLibrary.Asset[]>) => {
    callback
      .then(photos => {
        console.tron.log('photo', photos)
        setGallaries(photos)
        setImageBrowserOpen(false)
      })
      .catch(e => console.log(e))
  }

  const pickThumbnailImg = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })
      if (result.cancelled === false) {
        // const file = new Blob(result?.uri, { type: 'image/png' })

        const file = new ReactNativeFile({
          uri: result?.uri,
          name: 'avatar.png',
          type: 'image/png',
        })

        setThumbnail(file)
      }
    } catch (E) {
      addSnack(E, {
        type: 'warning',
      })
    }
  }

  /* ------------- renders ------------- */
  const renderNameInput = () => (
    <NameInputWrapper row>
      <Text tx="createNewEventScreen.info.yourEventWillBeName" />
      <NameInput
        size="small"
        caption={errors?.name?.message.toString()}
        onChangeText={t => setValue('name', t, true)}
      />
    </NameInputWrapper>
  )

  const renderDetailsInput = () => {
    return (
      <>
        <Text tx="createNewEventScreen.info.details" />
        <SizedBox h={2} />
        <TextField
          multiline={true}
          numberOfLines={5}
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
                      onPress={() => {
                        setSelectedTags(p => p.filter(x => x.id !== v.id))
                      }}
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

  const renderPickThumbnail = () => {
    return (
      <PickThumbnailWrapper row>
        <TouchableOpacity onPress={() => setThumbnail(null)}>
          <IlluPickImg source={thumbnail || images.iWashHand} />
        </TouchableOpacity>
        <SizedBox w={4} />
        <ThumbnailImgWrapper>
          <Text tx="createNewEventScreen.info.pickThumbnail" />
          <AppIcon
            style={metrics.images.xsm}
            source={images.addImgPlaceholder}
            onPress={() => {
              pickThumbnailImg()
            }}
          />
        </ThumbnailImgWrapper>
      </PickThumbnailWrapper>
    )
  }

  const renderPickGallaries = () => {
    return (
      <View>
        <ImageBowser max={4} callback={imageBrowserCallback} isVisible={imageBrowserOpen} />
        <Text tx="createNewEventScreen.info.pickThumbnail" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // eslint-disable-next-line
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          {gallaries.map(image => (
            <TouchableOpacity
              onPress={() => {
                setGallaries(p => p.filter(v => v.id !== image.id))
              }}
              key={image.id}
            >
              <GalleryImg source={{ uri: image.uri }} />
            </TouchableOpacity>
          ))}
          <SizedBox w={2} />
          <ThumbnailImgWrapper>
            <AppIcon
              style={metrics.images.xsm}
              source={images.addImgPlaceholder}
              onPress={() => {
                setImageBrowserOpen(true)
              }}
            />
          </ThumbnailImgWrapper>
          <SizedBox w={6} />
          {gallaries.length <= 0 && <IlluPickImg source={images.iUpload} />}
        </ScrollView>
      </View>
    )
  }

  if (loadingTags)
    return (
      <View full bgBaseOnTheme>
        <Screen autoPaddingHorizontal>
          <NewEventHeader headerTx={createNewEventStore.place?.name} />
          <AppLoading />
        </Screen>
      </View>
    )

  if (loadingCreateEvent) return <LoadingScreen />

  if (dataCreateEvent) return <SuccessScreen />

  return (
    <View full bgBaseOnTheme>
      <Screen autoPaddingHorizontal>
        <NewEventHeader headerTx={createNewEventStore.place?.name} />

        <ScrollView keyboardDismissMode="none" showsVerticalScrollIndicator={false}>
          {renderNameInput()}
          <SizedBox h={4} />
          {renderDetailsInput()}
          <SizedBox h={4} />
          {renderEventTags()}
          <SizedBox h={4} />
          {renderPickThumbnail()}
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
