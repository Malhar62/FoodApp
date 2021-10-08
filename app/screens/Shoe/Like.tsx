import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, Image, TouchableOpacity, FlatList, View, StatusBar, ImageBackground, TextStyle, Dimensions, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const Like = observer(function Like() {

    return (
        <View>
            <Text>Like</Text>
        </View>
    )
})