import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, TextStyle, View, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native"
import { useNavigation, DrawerActions } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'


const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const HEADER: ViewStyle = {
  width: '100%',
  alignSelf: 'center',
  height: HEIGHT(60),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#e4e4e4',
  marginTop: HEIGHT(20),
  paddingHorizontal: 5
}
const TEXT: TextStyle = {
  fontSize: 18, alignSelf: 'center', fontFamily: typography.ray, color: '#424954', textAlign: 'center'
}
const MAIN: ViewStyle = { width: WIDTH(170), height: HEIGHT(230), borderWidth: 1, borderColor: '#e8e8e8', marginTop: 20, borderRadius: 10, marginLeft: WIDTH(24) }

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  const { foodStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  foodStore.setIngredient()
  foodStore.setCategory()
  foodStore.setRecipe()
  const [name, setName] = React.useState('')
  const [datalist, setDatalist] = React.useState(foodStore.recipes)
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
  function List() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        key={'#'}
        numColumns={2}
        data={datalist.slice()}
        renderItem={({ item, index }) => (
          <Insider item={item} index={index} />
        )}
        keyExtractor={(item, index) => 'index' + index.toString()}
      />
    )
  }
  function handleSearch(text: string) {
    setName(text)
    let first: any = foodStore.findByCategory(text)
    let second: any = foodStore.findByRecipeName(text)
    let third: any = foodStore.findByIngredient(text)
    let aux: any = [...first, ...second, ...third]
    var recipeArray: any = [...new Set(aux)];
    console.log(recipeArray)
    setDatalist(recipeArray)
  }

  return (
    <SafeAreaView style={ROOT}>
      <View style={HEADER}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Ionicons name={'chevron-back'} size={25}
              color={'#5873c3'}
              onPress={() => navigation.navigate('home')}
            />
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
              <Text style={[TEXT, { color: '#5873c3' }]}>{'Home'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: WIDTH(280), height: 40, backgroundColor: '#f1f1f1', borderRadius: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='search' size={18} color="grey" style={{ marginLeft: WIDTH(10) }} />
            <TextInput
              value={name}
              onChangeText={text => handleSearch(text)}
              style={{ width: WIDTH(220), height: HEIGHT(35), backgroundColor: 'transparent' }}
            />
            <Entypo name='cross' size={20} color='grey' onPress={() => { setName(''); setDatalist(foodStore.recipes) }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Ionicons name={'menu'} size={25}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          </View>
        </View>
      </View>
      <List />
    </SafeAreaView>
  )
})
//Splash-Screen


/**
  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setName(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setName(text);
    }
  }; */