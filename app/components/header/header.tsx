import React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, StatusBar } from "react-native"
import { HeaderProps } from "./header.props"
import { Text } from "../text/text"
import { useNavigation, DrawerActions } from "@react-navigation/native"

import Ionicons from 'react-native-vector-icons/Ionicons'
import { HEIGHT, WIDTH } from "../../theme/scale"
import { Dimensions } from "react-native"
import { typography } from "../../theme"
const HEADER: ViewStyle = {
  width: '100%',
  alignSelf: 'center',
  height: HEIGHT(60),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#e4e4e4',
  marginTop: HEIGHT(20)
}
const TEXT: TextStyle = {
  fontFamily: typography.ray, color: '#1c1c1c', fontSize: 18
}
// static styles
/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    iconname,
    sidetext
  } = props
  const navigation = useNavigation()

  function DoAction() {
    if (iconname == 'chevron-back') {
      navigation.goBack()
    } else {
      navigation.dispatch(DrawerActions.openDrawer())
    }
  }
  var mytextvar = headerText
  var maxlimit = 25
  return (
    <View style={HEADER}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
      <View style={{ position: 'absolute', left: sidetext ? 0 : 10, alignItems: 'center', flexDirection: 'row' }}>
        <Ionicons name={iconname} size={25}
          color={sidetext ? '#5873c3' : '#424954'}
          onPress={() => DoAction()}
        />
        <TouchableOpacity onPress={() => DoAction()}>
          <Text style={[TEXT, { color: sidetext ? '#5873c3' : '#424954' }]}>{sidetext}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[{ textAlign: 'center' }, TEXT]}>
          {((mytextvar).length > maxlimit) ?
            (((mytextvar).substring(0, maxlimit - 3)) + '...') :
            mytextvar}
        </Text>
      </View>
    </View>
  )
}
