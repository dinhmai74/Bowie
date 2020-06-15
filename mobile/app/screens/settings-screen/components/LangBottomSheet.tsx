import { Icon, Layout } from '@ui-kitten/components'
import { AppIcon, Backdrop, SizedBox, Text, View } from 'components'
import { langTranslations, useLocalization } from 'i18n/i18n'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity as RnTouchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import { metrics, spacing, typography, useThemes } from 'theme'
import { palette } from 'theme/palette'
import { getElevation, isIos, saveString, strings } from 'utils'

const styles = StyleSheet.create({
  bsWrapper: {
    height: '100%',
    padding: spacing[4],
    width: '100%',
    ...getElevation(),
  },

  closeIc: {
    borderColor: palette.white,
    borderRadius: 50,
    borderWidth: 1,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
    paddingHorizontal: spacing[4],
  },
  modalHeaderContainer: {
    alignItems: 'center',
    flex: 1,
    padding: spacing[4],
  },
})

interface LangBottomSheetProps {
  bs?: any
}

const langs = Object.keys(langTranslations)

export const LangBottomSheet: React.FC<LangBottomSheetProps> = ({ bs }) => {
  const { setLocale, locale } = useLocalization()
  const fall = new Animated.Value(1)
  const changeLang = v => {
    setLocale(v)
    saveString(strings.lang, v)
  }

  const closeBs = () => {
    bs.current.snapTo(0)
    bs.current.snapTo(0)
  }

  const renderBottomSheetContent = () => {
    return (
      <Layout style={styles.bsWrapper}>
        <SizedBox h={4} />
        <Text preset="h3" tx={'settingsScreen.choseLang'} />
        <SizedBox h={4} />
        <FlatList
          data={langs}
          keyExtractor={(_, k) => k.toString()}
          renderItem={({ item }) => (
            <LangItem
              value={item}
              bold={item === locale}
              onPress={v => {
                closeBs()
                changeLang(v)
              }}
            />
          )}
        />
        <SizedBox h={6} />
      </Layout>
    )
  }

  const renderHeaderBottomSheet = () => {
    return (
      <View style={styles.modalHeaderContainer}>
        <AppIcon
          icon="close"
          color={palette.white}
          size={metrics.icon.lg}
          onPress={() => closeBs()}
          containerStyle={styles.closeIc}
        />
      </View>
    )
  }

  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[-100, '40%', '50%']}
        renderContent={() => renderBottomSheetContent()}
        renderHeader={() => renderHeaderBottomSheet()}
        callbackNode={fall}
        borderRadius={spacing[4]}
      />
      <Backdrop fall={fall} onPress={() => closeBs()} />
    </>
  )
}

interface LangItemProps {
  onPress: (value: string) => void
  value: string
  bold?: boolean
}

export const LangItem: React.FC<LangItemProps> = props => {
  const { value, onPress, bold } = props
  const { color } = useThemes()

  const Touchable = isIos ? RnTouchable : TouchableOpacity
  const iconName = bold ? 'check' : 'chevron-right'

  return (
    <Touchable
      onPress={() => {
        onPress(value)
      }}
    >
      <View row style={styles.container}>
        <Text tx={value} fontFamily={bold ? typography.bold : undefined} />
        <Icon name={iconName} color={color['color-basic-600']} />
      </View>
    </Touchable>
  )
}
