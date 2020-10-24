import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import MyChat from '../components/MyChat'
import MyIcon from '../components/MyIcon'
import { MenuProvider } from 'react-native-popup-menu';
import MyBtn from '../components/MyBtn'


export default class Chat extends Component {
    constructor(Props){
        super(Props);
        this.state={
            data:[
                {
                    imageSrc: require("../assets/images/ads/1.png"),
                    name:"sample",
                    title:"10 Marla",
                    text:"Hello There!",
                    id:'1',
                    ToScreen:"ChatPreview"
                },
                {
                    imageSrc: require("../assets/images/ads/1.png"),
                    name:"sample",
                    title:"10 Marla",
                    text:"Hello There!",
                    id:'2',
                    ToScreen:"ChatPreview"
                },
                {
                    imageSrc: require("../assets/images/ads/1.png"),
                    name:"sample",
                    title:"10 Marla",
                    text:"Hello There!",
                    id:'3',
                    ToScreen:"ChatPreview"
                },
                {
                    imageSrc: require("../assets/images/ads/1.png"),
                    name:"sample",
                    title:"10 Marla",
                    text:"Hello There!",
                    id:'4',
                    ToScreen:"ChatPreview"
                },
            ]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <Input
                        inputContainerStyle={styles.inputStyles}
                        placeholder='Search'
                        placeholderTextColor="gray"
                        rightIconContainerStyle={{ marginRight: 10 }}
                        rightIcon={
                            <MyIcon
                                name='search'
                                size={22}
                                color='gray'
                            />
                        }
                    />
                    <View style={styles.topRow}>
                        <View style={styles.topRowCol}>
                        <MyBtn title="Inbox" textStyle={styles.btnText} containerStyle={{padding:2, borderWidth:1, borderColor:"#fff"}} Transparent={true} />
                        </View>
                        <View style={styles.topRowCol}>
                        <MyBtn title="Marked" whiteBorder={true} containerStyle={{padding:2, borderWidth:1, borderColor:"#fff"}} textStyle={styles.btnText} Transparent={true} />
                        </View>
                    </View>
                    <MenuProvider>
                        <FlatList
                        data={this.state.data} 
                        renderItem={({item}) => <MyChat imageSrc={item.imageSrc} name={item.name} title={item.title} text={item.text} ToScreen={item.ToScreen} />}
                        keyExtractor={item => item.id}/>
                    </MenuProvider>
                    <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    bg: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30
    },
    inputStyles: {
        borderColor: 'transparent',
        borderWidth: 1,
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        padding: 0,
        marginBottom: -20,
        paddingBottom: 0,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 10
    },
    topRow: {
        flexDirection: "row",
        marginVertical: 30,
        marginTop:20
    },
    topRowCol:{
        flex:1,
        marginHorizontal:25,
    },
    btnText:{
        color:"#fff",
        fontSize:22,
        fontWeight:'bold',
        fontStyle:'italic'
    }
});