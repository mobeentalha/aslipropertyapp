import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground, ScrollView,  ToastAndroid } from 'react-native';
import { Input } from 'react-native-elements';
import MyIcon from '../components/MyIcon'
import MyBtn from '../components/MyBtn'
import TextNavigate from '../components/TextNavigate';
import Colors from '../constants/Colors';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const CNICLength = 13;
const NumberLength = 11;

export default class Signup extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      safe: true,
      Confirmsafe: true,
      name: "",
      cnic: "",
      phoneNo: "",
      password: "",
      email: "",
      confirmPass: "",
      loading: false
    }
  }
  create() {
    const { navigate } = this.props.navigation;
    if (this.state.name.length && this.state.cnic.length && this.state.phoneNo.length && this.state.password.length && this.state.confirmPass) {
      if(this.state.cnic.length == CNICLength && this.state.phoneNo.length == NumberLength){
      if (this.state.password == this.state.confirmPass) {
        this.setState({ loading: true })
        axios.post(`https://property12.herokuapp.com/api/user/add`, {
          name: this.state.name,
          cnic: this.state.cnic,
          phoneNo: this.state.phoneNo,
          password: this.state.password,
          email: this.state.email,
        }).then(response => {
          this.setState({ loading: false })
          if (response.status==200) {
            ToastAndroid.show("User has been created!",ToastAndroid.LONG);
            navigate("Login")
          } 
        }).catch(error => {
          this.setState({ loading: false })
          if (error) {
            ToastAndroid.show("Try again later!",ToastAndroid.SHORT);
          }
        });
      }
      else {
      ToastAndroid.show("Make sure that password is same!",ToastAndroid.SHORT);
      }
    }
    else{
      ToastAndroid.show("CNIC should be "+CNICLength+" digit long!\nPhone No should be "+NumberLength+" digit long!",ToastAndroid.SHORT);
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
            textContent={'Creating User'}
            textStyle={styles.loadingText}
            overlayColor={Colors.loadingBackground}
          />
          <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
          <ScrollView contentContainerStyle={{justifyContent:"center",flex:1}} showsVerticalScrollIndicator={false}>
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
              onChangeText={(text) => this.setState({ password: text })}
              rightIconContainerStyle={{ margin: 0, padding: 0, height: 25 }}
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
              placeholder='Confirm Password'
              placeholderTextColor="gray"
              secureTextEntry={this.state.Confirmsafe}
              rightIconContainerStyle={{ margin: 0, padding: 0, height: 25 }}
              onChangeText={(text) => this.setState({ confirmPass: text })}
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
            <Text style={styles.caution}>All fields are mendory! (Excapt Email)</Text>
          </View>
          <MyBtn title="Sign up" onPress={() => this.create()} textStyle={{ color: "#fff", fontSize: 17 }} containerStyle={styles.buttonLogin} colors={[Colors.mainColor, Colors.mainLightColor]} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ textAlign: 'center', color: '#fffb' }}>Already have an account?&ensp;</Text>
            <TextNavigate text="Login" ToScreen="Login" TextStyle={{ color: "#fff" }} />
          </View>
          </ScrollView>
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
  buttonLogin: {
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
  caution: {
    color: 'yellow',
    fontSize: 12,
  },
  loadingText: {
    color:Colors.loadingTxt,
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