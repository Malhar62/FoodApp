import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, FlatList, ImageBackground, TouchableOpacity, ImageBackgroundBase, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"
import { Text } from "../"
import { HEIGHT, WIDTH } from "../../theme/scale"
import { useStores } from "../../models"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { LoginButton } from 'react-native-fbsdk';


const TEXT: TextStyle = {
  fontFamily: typography.code,
  fontSize: 18,
  color: '#fff',
  fontWeight: 'bold'
}
const URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH7xkmD-_U4gHqX02xrPqx-CD_c6HotXaFWS0qKpE40M4d8KJqoZRVUXvw4MpGSIUQqsI&usqp=CAU'
export interface DrawerHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: any
  pathName?: string
  onNavi?: (arg: any) => void
  onFBlogout?: () => void
  onLogout?: () => void
}

/**
 * Describe your component here
 */
export const DrawerHeader = observer(function DrawerHeader(props: DrawerHeaderProps) {
  const { style, data, pathName, onFBlogout, onLogout, onNavi } = props
  const { authStore, foodStore } = useStores()

  const top_height = HEIGHT(250);
  const bottom_height = Dimensions.get('screen').height - top_height;

  const [flag, setFlag] = React.useState<boolean>(false)

  function Finder(item: { path: string }) {
    if (item.path.toUpperCase() == pathName.toUpperCase()) {
      return 5;
    } else {
      if (item.path == 'tab' && (pathName == 'favourite' || pathName == 'history')) {
        return 5;
      } else {
        return 0;
      }
    }
  }
  React.useEffect(() => {
    if (pathName == 'history' || pathName == 'favourite') {
      setFlag(true)
    }
  })
  function DOT() {
    return (
      <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'blue' }}>

      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: URL }} style={{ height: HEIGHT(250), borderBottomColor: 'black', borderBottomWidth: 3 }}>
        <View style={{ position: 'absolute', bottom: 0 }}>
          <Text style={TEXT}>{authStore.email}</Text>
          <Text style={TEXT}>Welcome, {authStore.username}</Text>
        </View>
      </ImageBackground>
      <View style={{ height: bottom_height }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View>
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
                width: '100%',
                height: HEIGHT(40),
                backgroundColor: (item.path.toUpperCase() == pathName.toUpperCase()) ? '#c1c3db' : '#f1f1f1',
                borderLeftWidth: Finder(item),
                borderLeftColor: 'navy',
                alignItems: 'center', paddingLeft: 10
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcons name={item.path == 'profile' ? 'info-outline' : item.path} size={30} color='#424954' />
                  {item.path == 'tab' &&
                    (foodStore.viewedfavs < foodStore.favs.length) &&
                    <DOT />}
                </View>
                <TouchableOpacity onPress={() => {
                  if (item.path != 'tab') {
                    onNavi(item.path)
                  } else {
                    setFlag(!flag)
                  }
                }}>
                  <Text style={{ fontSize: 20, fontFamily: typography.ray, color: '#424954', marginLeft: 5 }}>{item.path.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
              {item.path == 'tab' && flag &&
                <View>
                  <TouchableOpacity
                    style={{
                      marginTop: 7,
                      backgroundColor: (item.name1.toUpperCase() == pathName.toUpperCase()) ? '#dadbeb' : '#f1f1f1',
                      borderLeftColor: (item.name1.toUpperCase() == pathName.toUpperCase()) ? 'orange' : '#f1f1f1',
                      borderLeftWidth: (item.name1.toUpperCase() == pathName.toUpperCase()) ? 3 : 0
                    }}
                    onPress={() => onNavi(item.name1.toLowerCase())}>
                    <Text style={{ fontSize: 20, fontFamily: typography.ray, color: '#424954', marginLeft: 5 }}>
                      {item.name1}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 7,
                      backgroundColor: (item.name2.toUpperCase() == pathName.toUpperCase()) ? '#dadbeb' : '#f1f1f1',
                      borderLeftColor: (item.name2.toUpperCase() == pathName.toUpperCase()) ? 'orange' : '#f1f1f1',
                      borderLeftWidth: (item.name2.toUpperCase() == pathName.toUpperCase()) ? 3 : 0
                    }}
                    onPress={() => onNavi(item.name2.toLowerCase())}>
                    <Text style={{ fontSize: 20, fontFamily: typography.ray, color: '#424954', marginLeft: 5 }}>
                      {item.name2}
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          )}
          keyExtractor={item => item.path}
        />
      </View>
      <View elevation={5} style={{ position: 'absolute', bottom: 10, alignSelf: 'center', borderWidth: 0 }}>
        {(authStore.method == 'facebook') ?
          <LoginButton
            onLogoutFinished={() => onFBlogout()}
          /> :
          <TouchableOpacity
            onPress={() => onLogout()}
          >
            <View style={{
              height: HEIGHT(40), width: WIDTH(200), borderRadius: 7, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'
            }}>
              <Text style={{ color: '#fff', fontSize: 30, fontFamily: typography.alvina }}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    </View >
  )
})
