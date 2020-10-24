import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import Colors from '../constants/Colors';

import { useNavigation } from '@react-navigation/native';


export default function CategoryCard(Props) {
    const text = Props.text;

    const styles = StyleSheet.create({
        textStyle: {
            backgroundColor: 'transparent',
            fontSize: 14,
            color: Colors.mainColor,
            fontWeight:'bold',
            textAlign:"center",
        },
        cardImg:{
            width:100+"%",
            height:100+"%",
        },
        cardCon:{
            flex:1,
            flexDirection:'column',
            justifyContent:"center",
            backgroundColor:'#fff',
            padding:10,
            borderWidth:1,
            margin:1,
            borderColor:'transparent',
            borderRadius:10,
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: {
              height: 0,
              width: 0
            },
        elevation: 10,
        width:85,
        height: 85,
        },
    })
    return (
            <TouchableOpacity 
                style={styles.cardCon}
                onPress={() => Props.onFilterPress(text)}
            >
                    <View>
                        <Image source={Props.imageSrc} style={styles.cardImg} resizeMode="cover"/>
                    </View>
                    <Text
                        style={[styles.textStyle,Props.textStyle]}>
                        {Props.text}
                    </Text>
            </TouchableOpacity>
    )
}