import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, Image, TouchableOpacity, FlatList, View, StatusBar, ImageBackground, TextStyle, Dimensions, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { URL, USER } from "./Link"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontSize: 20, color: '#fff', textAlign: 'center'
}
const total_height = HEIGHT(130);
const image_height = HEIGHT(100)
const total_width = WIDTH(390);
const image_width = WIDTH(100)

const VIEW: ViewStyle = {
  width: total_width,
  height: total_height,
  flexDirection: 'row',
  backgroundColor: '#e6e4df',
  alignSelf: 'center',
  marginTop: 15,
  alignItems: 'center', borderWidth: 0,
  paddingLeft: 10,
  borderRadius: 7,
}


export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  const { authStore, foodStore } = useStores()
  const [show, setShow] = React.useState(1)
  // Pull in navigation via hook
  const navigation = useNavigation()
  function TOP() {
    return (
      <View>
        <Text style={{ fontSize: 30, textAlign: 'center', fontFamily: typography.alvina }}>Recently Visited</Text>
      </View>
    )
  }
  const length = React.useRef(new Animated.Value(0)).current;
  const HEADER_MAX_HEIGHT = (Dimensions.get('screen').height / 2) + HEIGHT(30);
  const HEADER_MIN_HEIGHT = 60;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  function CommonView({ item, index }) {
    return (
      <TouchableOpacity>
        <View
          elevation={3}
          style={{
            width: WIDTH(300),
            height: HEIGHT(120),
            flexDirection: 'row',
            backgroundColor: '#e6e4df',
            alignSelf: 'center',
            marginTop: 15,
            alignItems: 'center',
            borderWidth: 0,
            paddingLeft: 10,
            borderRadius: 7,
            borderBottomWidth: 1,
          }}>
          <View>
            <Image
              source={{ uri: item.photo_url }}
              style={{ height: 100, width: 100, borderRadius: 50 }}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
              height: HEIGHT(100),
              width: WIDTH(100),
              justifyContent: 'center',
            }}>
            <Text style={[TEXT]}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function ICONS() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: 200,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: HEIGHT(40),
            width: WIDTH(100),
            borderRadius: WIDTH(100) / 2,
            backgroundColor: '#d8643e',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, color: '#fff' }}>Follow</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: HEIGHT(40),
            width: WIDTH(40),
            borderRadius: WIDTH(40) / 2,
            backgroundColor: '#878787',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome
            name={'facebook'}
            size={20}
            color="#fff"
            onPress={() => { }}
          />
        </View>
        <View
          style={{
            height: HEIGHT(40),
            width: WIDTH(40),
            borderRadius: WIDTH(40) / 2,
            backgroundColor: '#878787',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome
            name={'google'}
            size={20}
            color="#fff"
            onPress={() => { }}
          />
        </View>
      </View>
    );
  }


  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <StatusBar hidden />
      <Animated.View
        style={{
          height: length.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
          }),
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={{ uri: URL }}
          style={{
            height: length.interpolate({
              inputRange: [0, HEADER_SCROLL_DISTANCE],
              outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
              extrapolate: 'clamp',
            }),
          }}
        />
        <View style={{ position: 'absolute', left: 10, top: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#fff', fontSize: 20 }}>{'< Home'}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Animated.Image
            source={{ uri: USER }}
            style={{
              width: length.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [100, 60],
                extrapolate: 'clamp',
              }),
              height: length.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [100, 60],
                extrapolate: 'clamp',
              }),
              borderRadius: length.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [50, 30],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [0, 60],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              alignSelf: 'center',
            }}
          />
          <Animated.Text
            style={{
              fontSize: 25,
              color: '#fff',
              alignSelf: 'center',
              transform: [
                {
                  translateX: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [0, 100],
                    extrapolate: 'clamp',
                  }),
                },
                {
                  translateY: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [0, -40],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            {authStore.username}
          </Animated.Text>

          <Animated.View
            style={{
              flexDirection: 'row',
              opacity: show
            }}>
            <View>
              <Text style={TEXT}>{foodStore.favs.length}</Text>
              <Text style={TEXT}>Favourites</Text>
            </View>
            <View>
              <Text style={TEXT}>{foodStore.histories.length}</Text>
              <Text style={TEXT}>Visited</Text>
            </View>
          </Animated.View>
        </View>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            opacity: show
          }}>
          <ICONS />
        </Animated.View>
        <View
          style={{ height: HEIGHT(30), backgroundColor: 'transparent' }}></View>
      </Animated.View>

      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: Dimensions.get('screen').height / 2 - HEIGHT(20),
        }}></View>
      <FlatList
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: length } } }],
          { useNativeDriver: false }
        )}
        data={foodStore.histories}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <CommonView item={item} index={index} />
          </View>
        )}
        keyExtractor={(item, index) => 'index' + index.toString()}
      />
    </View>
  )
})
