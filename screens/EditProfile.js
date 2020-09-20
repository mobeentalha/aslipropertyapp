import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground, Alert, ToastAndroid, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import MyIcon from '../components/MyIcon'
import Colors from '../constants/Colors';
import BackArrowBtn from '../components/BackArrowBtn'
import MyBtn from '../components/MyBtn'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const CNICLength = 13;

export default class EditProfile extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            safe: true,
            Confirmsafe: true,
            name: "",
            cnic: "",
            pass: "",
            currentPass: "",
            email: "",
            loading: false,
            currentUser: {},
            updated: false
        }
    }
    componentDidMount() {
        this._retrieveData();
    }

    async _retrieveData() {
        try {
            const retrievedItem = await AsyncStorage.getItem('User');
            const data = JSON.parse(retrievedItem);
            this.setState({ loading: false })
            if (data) {
                this.setState({ currentUser: data })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    getUser() {
        axios.get(`https://property12.herokuapp.com/api/user/get` + this.state.currentUser._id)
            .then(response => {
                if (response) {
                    var data = response.data.data;
                    this.setState({ currentUser: data })
                    try {
                        AsyncStorage.setItem(
                            'User',
                            JSON.stringify(data)
                          );
                            ToastAndroid.show("User Successfully Updated!", ToastAndroid.SHORT);
                            this.props.navigation.goBack()
                    } catch (error) {
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    }
                }
            })
            .catch(error => {
                console.log(error.message)
            });
    }
    updateUser() {
        if (this.state.cnic.length == CNICLength || this.state.name.length > 0 || this.state.pass.length || this.state.pass.length) {
            if (this.state.currentPass === this.state.currentUser.password) {
                this.setState({ loading: true })
                axios.post(`https://property12.herokuapp.com/api/user/update/` + this.state.currentUser._id, {
                    cnic: this.state.cnic.length == CNICLength ? this.state.cnic : this.state.currentUser.cnic,
                    name: this.state.name.length > 0 ? this.state.name : this.state.currentUser.name,
                    password: this.state.pass.length > 0 ? this.state.pass : this.state.currentUser.password,
                    email: this.state.pass.length ? this.state.email : this.state.currentUser.email,
                    phoneNo: this.state.currentUser.phoneNo,
                }).then(response => {
                    if (response) {
                        ToastAndroid.show("User Updated!", ToastAndroid.SHORT);
                        this.getUser();
                    }
                    else {
                        this.setState({ loading: false })
                        ToastAndroid.show("Could not update user!\nTry again later!", ToastAndroid.SHORT);
                    }
                }).catch(error => {
                    this.setState({ loading: false })
                    if (error) {
                        ToastAndroid.show("Try again later!" + error.message, ToastAndroid.SHORT);
                    }
                });
            }
            else {
                ToastAndroid.show("Current password is not matching!", ToastAndroid.SHORT);
            }
        }
        else {
            ToastAndroid.show("Please fill inputs that you need to be changed!", ToastAndroid.SHORT);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Updating User'}
                        textStyle={styles.loadingText}
                        overlayColor={Colors.loadingBackground}
                    />
                    <View style={{ paddingHorizontal: 20, paddingTop: 20, marginBottom: 30 }}>
                        <BackArrowBtn />
                    </View>
                    <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
                    <View style={styles.logo}>
                        <View style={styles.logoImg}>
                            <Image source={require("../assets/images/logo.png")} />
                        </View>
                        <Text style={{ color: "#fff", textAlign: "center", marginTop: 5, fontSize: 20, fontWeight: 'bold' }}>
                            Asli Property
                         </Text>
                    </View>
                    <View style={styles.inputCon}>
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Name'
                            placeholderTextColor="gray"
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='CNIC'
                            keyboardType={"number-pad"}
                            placeholderTextColor="gray"
                            label={this.state.cnic.length}
                            labelStyle={this.state.cnic.length == CNICLength ? styles.labelStyleGood : styles.labelStyle}
                            onChangeText={(text) => this.setState({ cnic: text })}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Current Password'
                            placeholderTextColor="gray"
                            secureTextEntry={this.state.safe}
                            rightIconContainerStyle={{ margin: 0, padding: 0, height: 25 }}
                            onChangeText={(text) => this.setState({ currentPass: text })}
                            rightIcon={
                                <TouchableOpacity
                                    style={{ margin: 5 }}
                                    onPress={() => this.state.safe ? this.setState({ safe: false }) : this.setState({ safe: true })}>
                                    <MyIcon name={this.state.safe ? 'eye' : 'eye-slash'} size={25} color="#000" />
                                </TouchableOpacity>
                            }
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='New Password'
                            placeholderTextColor="gray"
                            secureTextEntry={this.state.Confirmsafe}
                            rightIconContainerStyle={{ margin: 0, padding: 0, height: 25 }}
                            onChangeText={(text) => this.setState({ pass: text })}
                            rightIcon={
                                <TouchableOpacity
                                    style={{ margin: 5 }}
                                    onPress={() => this.state.Confirmsafe ? this.setState({ Confirmsafe: false }) : this.setState({ Confirmsafe: true })}>
                                    <MyIcon name={this.state.Confirmsafe ? 'eye' : 'eye-slash'} size={25} color="#000" />
                                </TouchableOpacity>
                            }
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Email'
                            placeholderTextColor="gray"
                            onChangeText={(text) => this.setState({ email: text })}
                        />

                        <MyBtn title="Edit" onPress={() => this.updateUser()} textStyle={{ color: "#fff", fontSize: 17 }} containerStyle={styles.myBtn} colors={[Colors.mainColor, Colors.mainLightColor]} />

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
    logoImg: {
        flexDirection: "row",
        justifyContent: "center",
    },
    inputCon: {
        marginTop: 20,
    },
    inputStyles: {
        borderColor: 'transparent',
        borderWidth: 1,
        margin: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        padding: 0,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 10
    },
    myBtn: {
        marginTop: 10,
        marginHorizontal: 20,
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
    loadingText: {
        color: Colors.loadingTxt,
        fontSize: 30
    },
    labelStyle: {
        color: "red",
        marginTop: -20,
        fontSize: 12
    },
    labelStyleGood: {
        color: "lime",
        marginTop: -22,
        fontSize: 14,
    }
});