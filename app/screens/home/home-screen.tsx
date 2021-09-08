import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, Image, Text, TouchableOpacity, Dimensions, TextStyle, SafeAreaView, StatusBar } from "react-native"
import { useNavigation, DrawerActions, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import { Header } from "../../components"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontSize: 18, alignSelf: 'center', fontFamily: typography.ray, color: '#424954', textAlign: 'center'
}

const MAIN: ViewStyle = { width: WIDTH(170), height: HEIGHT(230), borderWidth: 1, borderColor: '#e8e8e8', marginTop: 20, borderRadius: 10, marginLeft: WIDTH(24) }
export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { foodStore } = useStores()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute<any>()
  const [list, setList] = React.useState([])


  React.useEffect(() => {
    if (isFocused) {
      foodStore.setCategory()
      foodStore.setRecipe()
      var array = [];
      if (route.params) {
        foodStore.recipes.forEach(item => {
          if (item.categoryId == route.params.ID) {
            array.push(item)
          }
        })
      }
      setList(route.params ? array.slice() : foodStore.recipes.slice())
    }
  }, [isFocused])

  function Finder(ID: any) {
    for (var i = 0; i < foodStore.categories.length; i++) {
      if (ID == foodStore.categories[i].id) {
        return foodStore.categories[i].name
      }
    }
  }
  function Insider({ item, index }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('product', { name: item.title })}>
        <View style={MAIN} >
          <Image source={{ uri: item.photo_url }} style={{ width: WIDTH(168), height: HEIGHT(150), borderRadius: 10 }} />
          <Text style={TEXT}>{item.title}</Text>
          <Text style={[{ fontSize: 15, position: 'absolute', bottom: 0 }, TEXT]}>{Finder(item.categoryId)}</Text>
        </View>
      </TouchableOpacity >
    )
  }
  return (
    <SafeAreaView style={ROOT}>
      <Header
        iconname={route.params ? 'chevron-back' : 'menu'}
        headerText={route.params ? route.params.NAME.toString() : 'Home'}
        sidetext={route.params && 'Back'}
      />
      <View style={{ height: (Dimensions.get('window').height - 60) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          key={'#'}
          numColumns={2}
          data={list}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={(item, index) => 'index' + index.toString()}
        />
      </View>
    </SafeAreaView>
  )
})
