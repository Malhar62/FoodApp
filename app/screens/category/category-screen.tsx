import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, View, FlatList, Image, Text, TouchableOpacity, TextStyle } from "react-native"
import { Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const MAIN: ViewStyle = {
  width: WIDTH(360),
  height: HEIGHT(220),
  borderWidth: 1,
  borderColor: '#e8e8e8',
  borderRadius: 15,
  marginTop: 20,
  alignSelf: 'center'
}
const TEXT: TextStyle = {
  fontSize: 20, fontFamily: typography.ray, color: '#424954', textAlign: 'center', marginTop: HEIGHT(5)
}
export const CategoryScreen = observer(function CategoryScreen() {
  const { foodStore } = useStores()

  const navigation = useNavigation()

  function Finder(ID: any) {
    var count = 0;
    let other = foodStore.recipes;
    for (var i = 0; i < other.length; i++) {
      if (other[i].categoryId == ID) {
        count++;
      }
    }
    return count;
  }

  function Insider({ item, index }) {
    return (
      <View style={MAIN}>
        <TouchableOpacity onPress={() => navigation.push('home', { ID: item.id, NAME: item.name })}>
          <Image source={{ uri: item.photo_url }} style={{ width: WIDTH(360), height: HEIGHT(150), borderRadius: 15 }} />
          <Text style={TEXT}>{item.name}</Text>
          <Text style={TEXT}>{Finder(item.id)} Recipes</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <SafeAreaView style={ROOT}>
      <Header
        iconname={'chevron-back'}
        headerText='Categories'
        sidetext={'Home'}
      />
      <View>
        <FlatList
          data={foodStore.categories}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={(item, index) => 'index' + index.toString()}
        />
      </View>
    </SafeAreaView>
  )
})
