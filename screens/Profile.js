import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground, Alert, AsyncStorage, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import MyIcon from '../components/MyIcon'
import MyBtn from '../components/MyBtn'
import TextNavigate from '../components/TextNavigate';
import Colors from '../constants/Colors';
import axios from 'axios';


export default class Profile extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            safe: true,
            user: {},
            userID: null,
            userNameLetter: "",
            refreshing: false
        }
    }
    async _retrieveData() {
        try {
            const retrievedItem = await AsyncStorage.getItem('User');
            const data = JSON.parse(retrievedItem);
            if (data) {
                this.setState({ userID: [data._id] })
                this.getUser();
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    componentDidMount() {
        this._retrieveData();
    }
    getUser() {
        axios.get(`https://property12.herokuapp.com/api/user/get/` + this.state.userID)
            .then(response => {
                if (response.data.statusCode == 200) {
                    var data = response.data.data;
                    this.setState({ user: data })
                    var firstName = data.name.split(' ').slice(0, -1).join(' ');
                    var lastName = data.name.split(' ').slice(-1).join(' ');
                    var letters = firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase();
                    this.setState({ userNameLetter: letters })
                }
            }).catch(error => {
                if (error) {
                    Alert.alert("Error", "Could not find user!")
                }
            });
    }
    async _clearData() {
        try {
            await AsyncStorage.removeItem('User');
        } catch (error) {
            console.log(error.message);
        }
    }
    logout() {
        Alert.alert(
            "Log out?",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes", onPress: () => {
                        this._clearData();
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        })
                    }
                }
            ],
        );

    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
                        <View style={styles.logo}>
                            <View style={styles.logoImg}>
                                <Image source={require("../assets/images/logo.png")} />
                            </View>
                            <Text style={{ color: "#fff", textAlign: "center", marginTop: 5, fontSize: 20, fontWeight: 'bold' }}>
                                Asli Property
                        </Text>
                        </View>

                        <View style={styles.mainCon}>
                            <View style={styles.picName}>
                                <View style={styles.nameCon} >
                                    <Text style={styles.nameLetter}>
                                        {this.state.userNameLetter}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-around' }}>
                                    <Text style={styles.name}>{this.state.user.name}</Text>
                                    <TextNavigate text="Edit Profile" TextStyle={styles.viewEdit} ToScreen="EditProfile" />
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', margin: 40 }}>
                            <MyBtn title="Log Out" onPress={() => this.logout()} textStyle={{ color: "#fff", fontSize: 17 }} containerStyle={styles.myBtn} colors={[Colors.mainColor, Colors.mainLightColor]} />
                        </View>
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
        paddingTop: 20
    },
    logo: {
        margin: 10,
    },
    logoImg: {
        flexDirection: "row",
        justifyContent: "center",
    },
    mainCon: {
        marginTop: 30
    },
    nameCon: {
        height: 125,
        width: 125,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: "silver"
    },
    nameLetter: {
        fontSize: 55,
        fontWeight: 'bold',
    },
    picName: {
        flexDirection: "row",
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    name: {
        color: Colors.mainColor,
        fontSize: 25,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    viewEdit: {
        color: Colors.mainColor,
        textDecorationColor: Colors.mainColor,
        textDecorationLine: 'underline',
        fontSize: 20,
        fontStyle: 'italic'
    },
    myBtn: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "transparent",
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 10
    },
});