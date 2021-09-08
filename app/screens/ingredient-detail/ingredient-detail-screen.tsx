import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, TextStyle, Animated, StatusBar } from "react-native"
import { Header } from "../../components"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const IngredientDetailScreen = observer(function IngredientDetailScreen() {
  // Pull in one of our MST stores
  const { foodStore } = useStores()
  const route = useRoute<any>()
  const CARD: any = route.params.card;
  const isFocused = useIsFocused()
  // Pull in navigation via hook
  const navigation = useNavigation()
  var datalist: any = foodStore.ingredients;
  let obj = datalist.find((x: { name: any }) => x.name == CARD);
  let recipelist = foodStore.recipes
  var array = [];
  // React.useEffect(() => {
  //   if (isFocused) {
  //   }
  // }, [isFocused])
  const TEXT: TextStyle = {
    fontSize: 18, alignSelf: 'center', fontFamily: typography.ray, color: '#424954', textAlign: 'center'
  }

  const MAIN: ViewStyle = { width: WIDTH(170), height: HEIGHT(230), borderWidth: 1, borderColor: '#e8e8e8', marginTop: 20, borderRadius: 10, marginLeft: WIDTH(24) }

  for (var i = 0; i < recipelist.length; i++) {
    for (var j = 0; j < recipelist[i].ingredients.length; j++) {
      if (obj.ingredientId == recipelist[i].ingredients[j][0]) {
        //console.log(recipelist[i].title)
        array.push(recipelist[i])
      }
    }
  }
  function Finder(ID: any) {
    for (var i = 0; i < foodStore.categories.length; i++) {
      if (ID == foodStore.categories[i].id) {
        return foodStore.categories[i].name
      }
    }
  }
  function Insider({ item, index }) {
    return (
      <TouchableOpacity onPress={() => navigation.push('product', { name: item.title })}>
        <View style={MAIN} >
          <Image source={{ uri: item.photo_url }} style={{ width: WIDTH(168), height: HEIGHT(150), borderRadius: 10 }} />
          <Text style={TEXT}>{item.title}</Text>
          <Text style={[{ fontSize: 15, position: 'absolute', bottom: 0 }, TEXT]}>{Finder(item.categoryId)}</Text>
        </View>
      </TouchableOpacity >
    )
  }
  function TOP() {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={[TEXT, { fontSize: 20 }]}>Recipes with {obj.name}</Text>
      </View>
    )
  }
  const length = React.useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = HEIGHT(250);
  const HEADER_MIN_HEIGHT = HEIGHT(50);
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  return (
    <SafeAreaView style={ROOT}>
      <Header
        iconname='chevron-back'
        sidetext='Back'
        headerText={obj.name}
      />
      <Animated.View style={{
        height: length.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [265, 60],
          extrapolate: 'clamp',
        })
        , borderBottomWidth: 1, borderBottomColor: '#e4e4e4', alignItems: 'center'
      }}>
        <Animated.Image source={{ uri: obj.photo_url }} style={{
          width: length.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [400, 50],
            extrapolate: 'clamp',
          }), borderRadius: 10,

          height: length.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
          }),
        }} />
      </Animated.View>
      <TOP />
      <FlatList
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: length } } },
        ], { useNativeDriver: false })}

        showsVerticalScrollIndicator={false}
        key={'#'}
        numColumns={2}
        data={array.slice()}
        renderItem={({ item, index }) => (
          <Insider item={item} index={index} />
        )}
        keyExtractor={(item, index) => 'index' + index.toString()}
      />
    </SafeAreaView>
  )
})
