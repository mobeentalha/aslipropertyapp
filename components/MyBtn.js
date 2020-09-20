import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';


export default function MyBtn(Props) {
    const navigation = useNavigation()

    const colors = Props.colors ? Props.colors : ['transparent', 'transparent']

    const styles = StyleSheet.create({
        buttonStyle: {
            padding: 10,
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 5,
        },
        textStyle: {
            backgroundColor: 'transparent',
            fontSize: 14,
            color: "#000",
            textAlign: 'center'
        },
    })
    return (
        <TouchableOpacity
            onPress={Props.ToScreen ?
                () => { Props.ToScreen == "HomeSet" ? navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                }) :
                    navigation.navigate(Props.ToScreen)}
                : Props.onPress}
        >
            <LinearGradient
                colors={colors}
                end={[1, 1]}
                style={[styles.buttonStyle, Props.containerStyle]}>
                <Text
                    style={[styles.textStyle, Props.textStyle]}>
                    {Props.title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}