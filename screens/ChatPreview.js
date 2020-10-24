import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, FlatList, Image } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import MyChat from '../components/MyChat'
import MyChatScreen from '../components/MyChatScreen'
import MyIcon from '../components/MyIcon'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';
import MyBtn from '../components/MyBtn'
import BackArrowBtn from '../components/BackArrowBtn'


export default class ChatPreview extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            data: [
                {
                    Sent: true,
                    id: '1',
                    Text: "Hello",
                },
                {
                    id: '2',
                    Text: "Hi, How are you?",
                },
                {
                    id: '3',
                    Sent: true,
                    Text: "I am good, what about you?",
                },
                {
                    id: '4',
                    Text: "I am good too",
                },
                {
                    id: '5',
                    Sent: true,
                    Text: "You are selling 10 marla?",
                },
                {
                    id: '6',
                    Sent: true,
                    Text: "There?",
                },
                {
                    id: '7',
                    Sent: true,
                    Text: "Hello!?",
                },
                {
                    id: '8',
                    Sent: true,
                    Text: "Hmmm",
                },
                {
                    id: '9',
                    Sent: true,
                    Text: "My Internet is bad",
                },
            ]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <MenuProvider>

                        <View style={styles.topBar}>
                            <BackArrowBtn />
                            <Image style={styles.topBarImg} source={require("../assets/images/ads/1.png")} />
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={styles.name}>Name</Text>
                                <Text style={styles.lastSeen}>Last Seen Today at 12:10 pm </Text>
                            </View>
                            <Menu>
                                <MenuTrigger>
                                    <MyIcon name="ellipsis-v" size={40} color="#fff" />
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
                        <View>
                            <FlatList
                                data={this.state.data}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => <MyChatScreen Text={item.Text} Sent={item.Sent}/>}
                                keyExtractor={item => item.id}
                            />

                        </View>

                        <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>
                            <Input
                                inputContainerStyle={styles.inputStyles}
                                placeholder='Text'
                                placeholderTextColor="gray"
                                rightIconContainerStyle={{ marginRight: 5, padding: 0, height: 25 }}
                                rightIcon={
                                    <TouchableOpacity
                                        onPress={()=>alert('Sent')}>
                                        <MyIcon name="paper-plane" size={20} color="#000" />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
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
        paddingTop: 40
    },
    topBar: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between"
    },
    topBarImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginHorizontal: 10,
    },
    name: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 2
    },
    lastSeen: {
        color: "#fff",
        fontSize: 12,
        marginBottom: 2,
        fontStyle: 'italic'
    },
    inputStyles: {
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        padding: 5,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 10,

    },
});