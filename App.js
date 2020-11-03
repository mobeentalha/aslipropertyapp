import React, { Component } from "react";
import {View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from "./components/context";
import { Root } from "native-base";
import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/Home'
import ItemDetail from './screens/ItemDetail'
import Chat from './screens/Chat'
import AddItem from './screens/AddItem'
import Profile from './screens/Profile'
import EditProfile from './screens/EditProfile'
import MyAds from './screens/MyAds'
import ChatPreview from './screens/ChatPreview'
import AuthScreen from './screens/phoneVerify.tsx'

import MyIcon from './components/MyIcon'
import TabBarTitle from './components/TabBarTitle'

import {AsyncStorage} from 'react-native'

import AnimatedSplash from "react-native-animated-splash-screen";
import Colors from './constants/Colors';


const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Login">

    <AuthStack.Screen
      name="Login"
      component={Login}
    />
    <AuthStack.Screen
      name="Auth"
      component={AuthScreen}
    />
    <AuthStack.Screen
      name="SignUp"
      component={Signup}
    />
    <AuthStack.Screen
      name="Home"
      component={HomeStackScreen}
    />

  </AuthStack.Navigator>
);


const HomeTabs = createBottomTabNavigator();

const HomeTabsScreen = () => (
  <HomeTabs.Navigator screenOptions={{
    headerShown: false,
  }}
  tabBarOptions={{
    style:{height:100}
  }}

    initialRouteName="Home">

    <HomeTabs.Screen name="Home" component={Home} options={{
      tabBarLabel: ({ focused }) => (<TabBarTitle text="Home" textStyle={focused ? { color: "#000", fontSize: 16, fontWeight: "bold" } : { color: "gray" }} />),
      tabBarIcon: ({ focused }) => (
        focused ?
          <MyIcon name="home" color="#000" size={30} />
          :
          <MyIcon name="home" color="gray" size={30} />
      ),
    }} />
    <HomeTabs.Screen name="Chat" component={Chat} options={{
      tabBarLabel: ({ focused }) => (<TabBarTitle text="Chat" textStyle={focused ? { color: "#000", fontSize: 16, fontWeight: "bold" } : { color: "gray" }} />),
      tabBarIcon: ({ focused }) => (
        focused ?
          <MyIcon name="comment" color="#000" size={30} />
          :
          <MyIcon name="comment" color="gray" size={30} />
      ),
    }} />
    <HomeTabs.Screen name="AddItem" component={AddItem} options={{
      tabBarLabel: ({ focused }) => (<TabBarTitle text="Sell" textStyle={focused ? { color: "#000", fontSize: 16, fontWeight: "bold" } : { color: "gray" }} />),
      tabBarIcon: ({ focused }) => (
        focused ?
          <MyIcon name="camera" color="#000" size={27} />
          :
          <MyIcon name="camera" color="gray" size={27} />
      ),
    }} />
    <HomeTabs.Screen name="MyAds" component={MyAds} options={{
      tabBarLabel: ({ focused }) => (<TabBarTitle text="My Ads" textStyle={focused ? { color: "#000", fontSize: 16, fontWeight: "bold" } : { color: "gray" }} />),
      tabBarIcon: ({ focused }) => (
        focused ?
          <MyIcon name="bars" color="#000" size={30} />
          :
          <MyIcon name="bars" color="gray" size={30} />
      ),
    }} />
    <HomeTabs.Screen name="Profile" component={Profile} options={{
      tabBarLabel: ({ focused }) => (<TabBarTitle text="Profile" textStyle={focused ? { color: "#000", fontSize: 16, fontWeight: "bold" } : { color: "gray" }} />),
      tabBarIcon: ({ focused }) => (
        focused ?
          <MyIcon name="user-circle" color="#000" size={25} />
          :
          <MyIcon name="user-circle" color="gray" size={25} />
      ),
    }} />
  </HomeTabs.Navigator>

);

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{
    headerShown: false
  }}
    initialRouteName="Home">

    <HomeStack.Screen
      name="Home"
      component={HomeTabsScreen}
    />
    <HomeStack.Screen
      name="ItemDetail"
      component={ItemDetail}
    />
    <HomeStack.Screen
      name="EditProfile"
      component={EditProfile}
    />
    <HomeStack.Screen
    name="ChatPreview"
    component={ChatPreview}
    />

  </HomeStack.Navigator>
)


export default class App extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      isLoaded: false,
      logged:false,
      splash: false,
    }
  }
  componentDidMount() {
    this._retrieveData();
    //only while testing!
    setTimeout(() => {
      this.setState({ isLoaded: true, splash: true})
    }, 5000);
  }
  async _retrieveData() {
    try {
      const retrievedItem = await AsyncStorage.getItem('User');
      if (JSON.stringify(retrievedItem) > 0) {
        this.setState({logged:true})
        this.setTimeout( () => {
              this.setState({ isLoaded: true })
        },3000);
      }
      else{
        this.setState({logged:false})
        this.setTimeout( () => {
              this.setState({ isLoaded: true })
        },3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <Root>
      <AuthContext.Provider>
        <NavigationContainer>
          <AnimatedSplash
            translucent={true}
            isLoaded={this.state.isLoaded}
            logoImage={require("./assets/images/splashLogo.png")}
            backgroundColor={Colors.mainColor}
            logoHeight={500}
            logoWidth={500}
          >
            {
              this.state.logged == true? <HomeStackScreen /> : <AuthStackScreen />
            }
          </AnimatedSplash>
        </NavigationContainer>
      </AuthContext.Provider>
      </Root>
    );
  }
};



