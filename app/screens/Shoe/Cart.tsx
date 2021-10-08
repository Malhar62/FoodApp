import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, Image, TouchableOpacity, FlatList, View, StatusBar, ImageBackground, TextStyle, Dimensions, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const Cart = observer(function Cart() {

    return (
        <View>
                        <Text>cart</Text>
        </View>
    )
})