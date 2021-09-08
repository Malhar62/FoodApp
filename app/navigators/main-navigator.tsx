/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useNavigation, NavigationAction } from "@react-navigation/native"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen, CategoryScreen, ProductScreen, IngredientScreen, IngredientDetailScreen, SearchScreen, HistoryScreen, FavouriteScreen, LoginScreen, ProfileScreen } from "../screens"
import { typography } from "../theme"
import { useStores } from "../models"
import { HEIGHT, WIDTH } from "../theme/scale"
import Fontisto from 'react-native-vector-icons/Fontisto'
import { DrawerHeader } from "../components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  home: undefined
  product: undefined
  category: undefined
  ingredient: undefined
  ingredientdetail: undefined
  search: undefined
  all: undefined
  history: undefined
  tab: undefined
  favourite: undefined
  login: undefined
  main: undefined
  auth: undefined
  profile: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<PrimaryParamList>()
const Drawer = createDrawerNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator<PrimaryParamList>()

export function MainNavigator() {
  const { authStore } = useStores()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='auth' component={AuthStack} />
      <Stack.Screen name='main' component={MainStack} />
    </Stack.Navigator>
  )
}
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' component={LoginScreen} />
    </Stack.Navigator>
  )
}
function MainStack() {
  function CustomDrawerContent() {
    let data = [
      { path: 'home' }, { path: 'category' }, { path: 'search' }, { path: 'tab', name1: 'History', name2: 'Favourite' }, { path: 'profile' }
    ]
    const navigation = useNavigation()
    const { authStore } = useStores()
    console.log('*************************')
    const state = navigation.dangerouslyGetState();
    let actualRoute: any = state.routes[state.index];
    while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
    }
    console.log(actualRoute.name)
    return (
      <DrawerHeader
        data={data}
        pathName={actualRoute.name}
        onNavi={(data: any) => {
          if (data == 'history' || data == 'favourite') {
            navigation.navigate('tab', { screen: data });
          } else {
            navigation.navigate(data)
          }
        }}
        onFBlogout={() => {
          console.log("logout.")
          authStore.onLoginWithFb('', '');
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth' }]
          });
        }}
        onLogout={() => {
          authStore.onLogout()
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth' }]
          });
        }}
      />
    )
  }
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name='all' component={All} />
    </Drawer.Navigator>
  )
}
function All() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='category' component={CategoryScreen} />
      <Stack.Screen name='product' component={ProductScreen} />
      <Stack.Screen name='ingredient' component={IngredientScreen} />
      <Stack.Screen name='ingredientdetail' component={IngredientDetailScreen} />
      <Stack.Screen name='search' component={SearchScreen} />
      <Stack.Screen name='tab' component={TabBar} />
      <Stack.Screen name='profile' component={ProfileScreen} />
    </Stack.Navigator>
  )
}
function CustomTab({ state, descriptors, navigation }) {
  let iconlist = ['history', 'favorite']
  return (
    <View key={Math.random()}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          width: '100%',
          height: 70,
          bottom: 0,
          right: 0, left: 0,
          position: 'absolute',
          justifyContent: 'space-between',
        }}>
        {state.routes.map((route, index: any) => {
          const isFocused = state.index === index;


          return (
            <View key={index}>
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: Dimensions.get('window').width / 4,
                  borderRightWidth: Dimensions.get('window').width / 4,
                  borderBottomWidth: WIDTH(20),
                  borderStyle: 'solid',
                  backgroundColor: 'transparent',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: isFocused ? '#00BCD4' : 'transparent',
                }}
              />
              <View
                style={{
                  width: Dimensions.get('window').width / 2,
                  height: 50,
                  backgroundColor: isFocused ? '#00BCD4' : '#fff',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Fontisto name={iconlist[index]} size={20}
                  color={isFocused ? 'black' : 'grey'}
                  onPress={() => {
                    navigation.navigate(route.name);
                  }} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(route.name);
                  }}>
                  <Text style={{ fontFamily: typography.ray, fontSize: 18, color: isFocused ? 'black' : 'grey', }}>
                    {route.name}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  )
}
function TabBar() {
  // function getTabBarVisibility(route: { name: any }) {
  //   const routeName = route.name
  //   console.log(routeName)
  //   if (routeName == 'favourite') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTab {...props} />}>
      <Tab.Screen name='history' component={HistoryScreen} />
      <Tab.Screen name='favourite' component={FavouriteScreen}
      />
    </Tab.Navigator>
  )
}
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
