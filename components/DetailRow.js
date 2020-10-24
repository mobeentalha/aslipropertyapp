import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import MyIcon from '../components/MyIcon'
import Colors from '../constants/Colors';



function DetailRow(Props) {
    const styles = StyleSheet.create({
        row: {
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 5
        },
        title: {
            color: "#fff",
            fontSize: 20,
            flex: 1,
            marginLeft: 10
        },
        description: {
            color: "#fff",
            fontSize: 18,
            flex: 1,
            fontStyle: "italic",
        },
        rowInside: {
            flex: 1,
            flexDirection: "row",
            alignItems:"center"
        },
        rowDark: {
            flexDirection: "row",
            backgroundColor: Colors.mainDarkColor,
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 5
        },
        icon: {
            marginTop: 2,
        }
    });

    return (
        <View style={Props.Dark? styles.rowDark : styles.row}>
            <View style={styles.rowInside}>
                <View style={styles.icon}>
                    <MyIcon name={Props.IconName} size={Props.IconSize} color={Props.IconColor} />
                </View>
                <Text style={styles.title}>{Props.Title}</Text>
            </View>
            <View style={styles.rowInside}>
                <Text style={styles.description}>{Props.Description}</Text>
            </View>
        </View>
    )
};

export default DetailRow;