import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { SliderBox } from "react-native-image-slider-box";
import { HEIGHT, WIDTH } from "../../theme/scale"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ICON: ViewStyle = {
  position: 'absolute',
  width: 30, height: 30, borderRadius: 15, backgroundColor: '#fffeff',
  justifyContent: 'center', alignContent: 'center'
}
const BUTTON: ViewStyle = { marginTop: HEIGHT(20), width: WIDTH(300), height: HEIGHT(60), borderRadius: 30, borderColor: '#acccb9', justifyContent: 'center', alignItems: 'center', borderWidth: 2, alignSelf: 'center' }
const color_name = '#343434'
export const ProductScreen = observer(function ProductScreen() {


  const { foodStore } = useStores()

  const navigation = useNavigation()
  const route = useRoute<any>()

  const TITLE: string = route.params.name;
  let obj = foodStore.recipes.find(x => x.title == TITLE);

  var DATE = moment().format('D MMMM YYYY');
  var TIME = moment().format('h:mm a');
  let ITEM = {
    recipeId: obj.recipeId,
    categoryId: obj.categoryId,
    title: obj.title,
    photo_url: obj.photo_url,
    photosArray: obj.photosArray,
    time: obj.time,
    ingredients: obj.ingredients,
    Date: DATE,
    Time: TIME
  }
  foodStore.addToHistory(ITEM)
  //console.log(DATE + TIME)
  const [show, setShow] = React.useState<boolean>(true)

  function Finder(id: any) {
    let list = foodStore.categories.find(x => x.id == id)
    return list.name.toUpperCase();
  }

  function Timer() {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: HEIGHT(10) }}>
        <Entypo name='stopwatch' size={25} />
        <Text style={{ color: color_name, fontSize: 20, marginLeft: 7, fontFamily: typography.ray }}>{obj.time} minutes</Text>
      </View>
    )
  }

  function ViewButton() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ingredient', { data: obj.ingredients, title: obj.title })}>
        <View style={BUTTON}>
          <Text style={{ color: '#8fcfad', fontSize: 18, fontFamily: typography.ray }}>View Ingredients</Text>
        </View>
      </TouchableOpacity>
    )
  }
  function Finding() {
    var count = 0;
    foodStore.favs.forEach(item => {
      if (item.title == obj.title) {
        console.log('nothing')
      } else {
        count++;
      }
    })
    if (count == foodStore.favs.length) {
      foodStore.addToFav(obj)
    } else {
      var ind = foodStore.favs.findIndex(x => x.title == obj.title)
      foodStore.removeFromFavs(ind)
    }
  }
  function giveValue(text: string, about: string) {
    var count = 0;
    foodStore.favs.forEach((item, index) => {
      if (text == item.title) {
        console.log('matched')
      } else {
        count++;
      }
    })
    if (about == 'icon') {
      if (count == foodStore.favs.length) {
        return 'star-o'
      } else {
        return 'star'
      }
    } else {
      if (count == foodStore.favs.length) {
        return 'black'
      } else {
        return 'gold'
      }
    }
  }
  return (
    <ScrollView
      onScrollToTop={() => console.log('top')}
      onScroll={({ nativeEvent }) => {
        console.log(nativeEvent.contentOffset.y)
        if (nativeEvent.contentOffset.y == 0) {
          setShow(true)
        } else {
          setShow(false)
        }
      }}
      showsVerticalScrollIndicator={false}
      style={ROOT}>
      <View style={{ height: HEIGHT(280) }}>
        <SliderBox
          images={obj.photosArray}
          dotColor={'#fff'}
          sliderBoxHeight={HEIGHT(280)}
          onCurrentImagePressed={(index: any) =>
            console.log(`image ${index} pressed`)
          }
        />
        {show && <View style={[ICON, {
          top: 30,
          left: 10,
        }]}>
          <Ionicons
            name='chevron-back'
            size={25}
            color={'#6ec89a'}
            onPress={() => navigation.goBack()}
            style={{ alignSelf: 'center' }} />
        </View>}
        <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', backgroundColor: 'white', position: 'absolute', bottom: -20, right: 10 }}>
          <FontAwesome name={giveValue(obj.title, 'icon')} size={30} color={giveValue(obj.title, 'color')}
            onPress={Finding}
            style={{ alignSelf: 'center', backgroundColor: 'transparent' }} />
        </View>
      </View>
      <View>
        <Text style={{ marginTop: HEIGHT(20), color: color_name, fontSize: 30, textAlign: 'center', fontFamily: typography.ray }}>{obj.title}</Text>
        <Text style={{ marginTop: HEIGHT(20), color: '#7bb99a', textAlign: 'center', fontSize: 18, fontFamily: typography.ray }}>{Finder(obj.categoryId)}</Text>
      </View>
      <Timer />
      <ViewButton />
      <View style={{ marginHorizontal: 40, marginTop: HEIGHT(20) }}>
        <Text style={{ fontSize: 18, color: color_name, }}>{obj.description}</Text>
      </View>
      <Text></Text>
    </ScrollView>
  )
})
