import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, Image, TouchableOpacity, FlatList, View, StatusBar, ImageBackground, TextStyle, Dimensions, Animated } from "react-native"
import { useStores } from "../../models"

export const Home = observer(function Home() {

    const { newsStore } = useStores()


    newsStore.getNewsFromStore('general')
    return (
        <View style={{ marginTop: 100 }}>
            <TouchableOpacity onPress={() => newsStore.getNJason()
            }>
                <Text>Home</Text></TouchableOpacity>

        </View>
    )
})