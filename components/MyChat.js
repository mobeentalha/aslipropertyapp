import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import MyIcon from './MyIcon'
import Colors from '../constants/Colors';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';



export default function CategoryCard(Props) {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: 10,
            flexDirection: 'row',
            borderRadius: 5,
            marginVertical:5
        },
        name: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        title: {
            fontSize: 12,
            color: "gray",
            fontWeight: 'bold'
        },
        textCon: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: "center"
        },
        iconCon: {
            marginRight: 10,
            justifyContent: "center"
        },
        text: {
            marginTop: 5,
            fontSize: 17,
            fontStyle: 'italic'
        },
        menuText: {
            fontSize: 20,
        },
        thumbnail: {
            width: 70,
            height: 70,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 100,
            alignSelf: 'center',
            marginRight: 10
        }
    })
    return (
        <TouchableOpacity onPress={() =>
            Props.ToScreen ?
            navigation.navigate(Props.ToScreen)
            : null
          } style={styles.container}>
            <Image source={Props.imageSrc} style={styles.thumbnail} />
            <View style={styles.textCon}>
                <Text style={styles.name}>{Props.name}</Text>
                <Text style={styles.title}>{Props.title}</Text>
                <Text style={styles.text}>{Props.text}</Text>
            </View>
            <View style={styles.iconCon}>
                <Menu>
                    <MenuTrigger customStyles={{padding:10}}>
                        <MyIcon name="ellipsis-v" size={40} color="#000" />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ padding: 10, marginTop: 35 }}>
                        <MenuOption onSelect={() => alert(`Marked`)} >
                            <Text style={styles.menuText}>Mark</Text>
                        </MenuOption>
                        <View style={{ width: 100 + "%", backgroundColor: "#000", height: 1 }}></View>
                        <MenuOption onSelect={() => alert(`Delete`)} >
                            <Text style={styles.menuText}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

        </TouchableOpacity>
    )
}