import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import MyIcon from '../components/MyIcon'
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';



function MyChatScreen(Props) {
    const styles = StyleSheet.create({
        Sent: {
            padding: 5,
            borderRadius: 12,
            flex: 1,
            borderTopRightRadius: 0,
            marginVertical: 4,
            backgroundColor: '#fff',
            borderLeftWidth: 10,
            borderColor: Colors.mainLightColor,
            marginLeft:15
        },
        Got: {
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 12,
            flex: 1,
            borderTopLeftRadius: 0,
            marginVertical: 4,
            borderRightWidth: 10,
            borderColor: Colors.mainDarkColor,
            marginRight:15,
            paddingLeft:10
        },
        Text: {
            color: '#000',
            fontSize: 18,
            flex: 1,
            margin: 0
        },
    });

    return (
        <TouchableOpacity onLongPress={() => alert(Props.Text)}>
        <View style={Props.Sent ? styles.Sent : styles.Got}>
            <Text style={styles.Text}>{Props.Text}</Text>
        </View>
        </TouchableOpacity>
    )
};

export default MyChatScreen;