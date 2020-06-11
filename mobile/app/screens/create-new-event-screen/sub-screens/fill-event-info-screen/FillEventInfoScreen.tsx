import { useNavigation } from '@react-navigation/native'
import { CreateEventDocument, useGetTopTagsQuery } from 'app-graphql'
import {
  AppCircleButton,
  AppFooter,
  AppIcon,
  AppLoading,
  Button,
  ImageBowser,
  Screen,
  SizedBox,
  Text,
  TextField,
  View,
} from 'components'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { ReactNativeFile } from 'extract-files'
import _ from 'lodash'
import { useStores } from 'models/root-store'
import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useOfflineMutation } from 'react-offix-hooks'
import { NewEventHeader } from 'screens/create-new-event-screen/components/NewEventHeader'
import { images, metrics } from 'theme'
import { AppRoutes, useSnackBars } from 'utils'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'
import { SuccessScreen } from '../SuccessScreen/SuccessScreen'
import { ChoseTagBottomSheet, Tag } from './ChoseTagBottomSheet'
import {
  FooterRow,
  GalleryImg,
  IlluPickImg,
  NameInput,
  NameInputWrapper,
  PickThumbnailWrapper,
  SButton,
  TEXT_AREA_STYLE,
  ThumbnailImgWrapper,
} from './FillEventInfoScreen.elements'

interface FillEventInfoScreenProps {}

type FormValue = {
  name: string
  description: string
}

export const FillEventInfoScreen: React.FC<FillEventInfoScreenProps> = () => {
  const { createNewEventStore } = useStores()
  const { data: tagsData, loading: loadingTags } = useGetTopTagsQuery()
  const { addSnack } = useSnackBars()

  const { setValue, register, handleSubmit, errors, getValues } = useForm<FormValue>({
    defaultValues: {
      name: createNewEventStore?.information?.eventName,
      description: createNewEventStore?.information?.description,
    },
  })

  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [imageBrowserOpen, setImageBrowserOpen] = React.useState(false)
  const [gallaries, setGallaries] = React.useState<MediaLibrary.Asset[]>([])
  const [thumbnail, setThumbnail] = React.useState<any>(null)

  const [
    muCreatNewEvent,
    { loading: loadingCreateEvent, data: dataCreateEvent },
  ] = useOfflineMutation(CreateEventDocument)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  React.useEffect(() => {
    register({ name: 'name' }, { required: 'errors.requiredField' })
    register({ name: 'description' })
  }, [register])

  const onSubmit = async (data: FormValue) => {
    createNewEventStore.setEventInfo(data.name, data.description)
    const files = []
    gallaries.forEach(v => {
      const file = new ReactNativeFile({
        uri: v?.uri,
        name: v?.filename,
        type: 'image/png',
      })
      files.push(file)
    })

    try {
      await muCreatNewEvent({
        variables: {
          event: {
            startTime: moment(createNewEventStore.startTime).utc(),
            endTime: moment(createNewEventStore.endTime).utc(),
            tags: selectedTags.map(v => v.id),
            place: createNewEventStore.place,
            information: { eventName: data.name, description: data.description },
            galleries: {
              files,
            },
            thumbnail: thumbnail && {
              file: thumbnail,
            },
          },
        },
      })
    } catch (e) {
      if (e.offline) {
        // 2. We can still track when offline change is going to be replicated.
        addSnack('warning.youAreOffline', { type: 'warning' })
        navigation.navigate(AppRoutes.primaryStack)
      } else {
        addSnack(e?.message, { type: 'warning' })
      }
    }
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
          name: 'thumbnail.png',
          type: 'image/png',
        })

        setThumbnail(file)
      }
    } catch (e) {
      const mess = e?.message || JSON.stringify(e)
      addSnack(mess, {
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
        defaultValue={getValues().name}
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
          defaultValue={getValues().description}
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
