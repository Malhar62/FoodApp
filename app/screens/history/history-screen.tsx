import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, View, Image, FlatList, Text, TouchableOpacity, TextStyle } from "react-native"
import { Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"


const total_height = HEIGHT(130);
const image_height = HEIGHT(100)
const total_width = WIDTH(390);
const image_width = WIDTH(100)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const VIEW: ViewStyle = {
  width: total_width,
  height: total_height,
  flexDirection: 'row',
  backgroundColor: '#e6e4df',
  alignSelf: 'center',
  marginTop: 15,
  alignItems: 'center', borderWidth: 0,
  paddingLeft: 10,
  borderRadius: 7, borderBottomWidth: 1
}
const TEXT: TextStyle = {
  fontSize: 20, fontFamily: typography.ray, color: '#424954'
}

export const HistoryScreen = observer(function HistoryScreen() {
  // Pull in one of our MST stores
  const { foodStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()


  function CommonView({ item, index }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('product', { name: item.title })}>

        <View elevation={3} style={VIEW}>
          <View>
            <Image source={{ uri: item.photo_url }} style={{ height: 100, width: 100, borderRadius: 50 }} />
          </View>
          <View style={{ marginLeft: 10, height: total_height, width: (total_width - image_width), justifyContent: 'center' }}>
            <Text style={[TEXT]}>{item.title}</Text>
            <Text style={[TEXT, { fontSize: 18, position: 'absolute', right: 25, bottom: 0, fontFamily: typography.code }]}>{item.Time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  function List() {
    return (
      <FlatList
        data={foodStore.histories}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View >
            <CommonView item={item} index={index} />
          </View>
        )}
        keyExtractor={(item, index) => 'index' + index.toString()}
      />
    )
  }

  return (
    <SafeAreaView style={ROOT} >
      <Header
        iconname='chevron-back'
        sidetext='Home'
        headerText='History'
      />
      <List />
    </SafeAreaView>
  )
})
