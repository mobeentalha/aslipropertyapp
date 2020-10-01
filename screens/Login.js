import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground, Alert, ToastAndroid, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import MyIcon from '../components/MyIcon'
import MyBtn from '../components/MyBtn'
import TextNavigate from '../components/TextNavigate';
import Colors from '../constants/Colors';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const NumberLength = 11;

export default class Login extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      safe: true,
      phoneNo: "",
      password: "",
      loading: false,
      user: {},
    }
  }
  async _storeData() {
    try {
      await AsyncStorage.setItem(
        'User',
        JSON.stringify(this.state.user)
      );
      this._retrieveData();
    } catch (error) {
      // Error saving data
    }
  };
  async _retrieveData() {
    try {
      const retrievedItem = await AsyncStorage.getItem('User');
      const data = JSON.parse(retrievedItem);
      if (data) {
        let newPhone = '+92'+this.state.phoneNo;
        // this.props.navigation.navigate(
        //   'Auth',
        //   { newPhone },
        // );
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        })
      }
    } catch (error) {
    }
  }
  logIn() {
    const { navigate } = this.props.navigation;
    if (this.state.phoneNo.length && this.state.password.length) {
      if (this.state.phoneNo.length == NumberLength) {
        this.setState({ loading: true })
        axios.post(`https://property12.herokuapp.com/api/user/login`, {
          phoneNo: this.state.phoneNo,
          password: this.state.password,
        }).then(response => {
          this.setState({ loading: false })
          if (response.data.statusCode == 200) {
            var data = response.data.data;
            this.setState({ user: data, phoneScreen: true })
            this._storeData()
          }
          else {
            Alert.alert("No User", "No user found!", [
              {
                text: 'Cancel',
              },
              { text: 'Create', onPress: () => navigate("SignUp") }
            ],
            {cancelable:true})
          }
        }).catch(error => {
          this.setState({ loading: false })
          if (error) {
            ToastAndroid.show("Try again later!",ToastAndroid.SHORT);
          }
        });
      }
      else {
        ToastAndroid.show("Phone No should be "+NumberLength+" digits long!",ToastAndroid.SHORT);
      }
    }
    else {
      ToastAndroid.show("Please Fill Inputs!",ToastAndroid.SHORT);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
          <Spinner
            visible={this.state.loading}
            textContent={'Fetching Data'}
            textStyle={styles.loadingText}
            overlayColor={Colors.loadingBackground}
          />
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
              placeholder='Phone Number'
              keyboardType={"number-pad"}
              label={this.state.phoneNo.length}
              labelStyle={this.state.phoneNo.length == NumberLength ? styles.labelStyleGood : styles.labelStyle}
              placeholderTextColor="gray"
              onChangeText={(text) => this.setState({ phoneNo: text })}
            />
            <Input
              inputContainerStyle={styles.inputStyles}
              placeholder='Password'
              placeholderTextColor="gray"
              secureTextEntry={this.state.safe}
              rightIconContainerStyle={{ margin: 0, padding: 0, height: 25 }}
              onChangeText={(text) => this.setState({ password: text })}
              rightIcon={
                <TouchableOpacity
                  onPress={() => this.state.safe ? this.setState({ safe: false }) : this.setState({ safe: true })}>
                  <MyIcon name={this.state.safe ? 'eye' : 'eye-slash'} size={25} color="#000" />
                </TouchableOpacity>
              }
            />
          </View>

          <Text style={styles.forgotTxt}>Forgot Password?</Text>
          <MyBtn title="Login" onPress={() => this.logIn()} textStyle={{ color: "#fff", fontSize: 17 }} containerStyle={styles.buttonLogin} colors={[Colors.mainColor, Colors.mainLightColor]} />


          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ textAlign: 'center', color: '#fffb' }}>Don't have an account?&ensp;</Text>
            <TextNavigate text="Sign up" ToScreen="SignUp" TextStyle={{ color: "#fff" }} />
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
    flexDirection: 'column',
    justifyContent: "center",
  },
  logo: {
    margin: 10,
  },
  logoImg: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputCon: {
    marginTop: 100,
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
    elevation: 10
  },
  buttonLogin: {
    marginTop: 10,
    marginBottom: 20,
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
  forgotTxt: {
    color: "#fff"
  },
  loadingText: {
    color: Colors.loadingTxt,
    fontSize: 30
  },
  labelStyle:{
    color:"red",
    marginTop:-20,
    fontSize:12
  },
  labelStyleGood:{
    color:"lime",
    marginTop:-22,
    fontSize:14,
  }
});