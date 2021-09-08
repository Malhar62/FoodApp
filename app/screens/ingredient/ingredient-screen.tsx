import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ViewStyle, Image, View, FlatList, Text, TouchableOpacity, StatusBar } from "react-native"
import { Header } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import { TextStyle } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontFamily: typography.ray, textAlign: 'center',
}
export const IngredientScreen = observer(function IngredientScreen() {
  // Pull in one of our MST stores
  const { foodStore } = useStores()
  const route = useRoute<any>()
  const Array: any = route.params.data;
  const TITLE: string = route.params.title;
  const navigation = useNavigation()
  React.useEffect(() => {
    foodStore.setIngredient()
  }, [])
  var datalist: any = foodStore.ingredients;
  const color_name = '#343434'

  return (
    <SafeAreaView style={ROOT}>
      <Header
        iconname='chevron-back'
        sidetext='Back'
        headerText={`Ingredients for ${TITLE}`}
      />
      <View style={{ height: 690 }}>
        <FlatList
          key={1}
          showsVerticalScrollIndicator={false}
          data={Array.slice()}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ingredientdetail', { card: datalist[item[0]].name })}>
              <View style={{ marginLeft: WIDTH(30), marginTop: 10, height: 180, width: WIDTH(100) }}>
                <Image source={{ uri: datalist[item[0]].photo_url }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <Text style={[TEXT, { fontSize: 15, color: color_name }]}>{datalist[item[0]].name}</Text>
                <Text style={[TEXT, { color: '#d6d6d6' }]}>{item[1]}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => 'index' + index.toString()}
        />
      </View>
    </SafeAreaView>
  )
})
