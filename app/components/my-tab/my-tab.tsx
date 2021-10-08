import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Dimensions, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { WIDTH, HEIGHT } from "../../theme/scale"
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface MyTabProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  state
  descriptors
  navigation
}

/**
 * Describe your component here
 */
export const MyTab = ({ state, descriptors, navigation }) => {
  let icons = ['home', 'videocam', 'category', 'info-outline']

  return (
    <View key={Math.random()}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          width: '100%',
          height: 70,
          bottom: 0,
          right: 0, left: 0,
          position: 'absolute',
          justifyContent: 'space-between',
          paddingHorizontal: 10
        }}>
        {state.routes.map((route, index: any) => {
          const isFocused = state.index === index;


          return (
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
              key={index}>
              {/* {isFocused &&
                <View
                  style={{
                    width: 70,
                    height: 35,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderColor: '#fff',
                    borderBottomWidth: 0,

                  }}></View>
              } */}
              <View
                style={{
                  width: WIDTH(100),
                  height: HEIGHT(100),
                  borderRadius: 50,
                  backgroundColor: isFocused ? '#fff' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  elevation={isFocused ? 7 : 0}
                  style={{
                    width: WIDTH(50),
                    height: HEIGHT(50),
                    borderRadius: 25,
                    marginBottom: isFocused ? HEIGHT(30) : 0,
                    backgroundColor: isFocused ? '#fa6f25' : '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialIcons
                    name={icons[index]}
                    size={20}
                    color={isFocused ? '#fff' : 'grey'}
                    onPress={() => {
                      navigation.navigate(route.name);
                    }} />

                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  )
}
