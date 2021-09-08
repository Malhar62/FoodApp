import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Text, TextStyle } from "react-native"
import { Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import AntDesign from 'react-native-vector-icons/AntDesign'
//import { List } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import { HEIGHT } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontFamily: typography.ray, color: '#1c1c1c', fontSize: 20, marginLeft: 10, textAlignVertical: 'center'
}
const VIEW: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
  paddingLeft: 10,
  paddingVertical: 5,
  backgroundColor: '#f1f1f1',
  alignItems: 'center'
}
export const FavouriteScreen = observer(function FavouriteScreen() {
  // Pull in one of our MST stores
  const { foodStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [active, setActive] = React.useState([-1]);
  // Pull in navigation via hook
  React.useEffect(() => {
    foodStore.viewingFavs(foodStore.favs.length)
  }, [])

  const renderHeader = (section: any, index: any) => {
    return (
      <View style={VIEW}>
        <Image source={{ uri: section.photo_url }} style={{ width: 70, height: 70, borderRadius: 35 }} />
        <Text style={TEXT}>{section.title}</Text>
        <AntDesign name={active == index ? 'caretdown' : 'caretup'} size={20} style={{ position: 'absolute', right: 10 }} />
      </View>
    );
  };

  const renderContent = (section: any) => {
    return (
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 25, fontFamily: typography.alvina }}>{section.description}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('product', { name: section.title })}>
          <Text style={{ color: 'blue' }}>...more info</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={ROOT}>
      <Header
        iconname='chevron-back'
        sidetext='History'
        headerText='Favourite Recipes'
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: HEIGHT(300) }}>
        <Accordion
          activeSections={active}
          sections={foodStore.favs}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={(id) => {
            setActive(id);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
})
