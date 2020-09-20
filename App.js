import React, { Component } from "react";
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
    style:{height:52}
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
    }
  }
  componentDidMount() {
    this._retrieveData();
    //only while testing!
    setTimeout(() => {
      this.setState({ isLoaded: true })
    }, 1000);
  }
  async _retrieveData() {
    try {
      const retrievedItem = await AsyncStorage.getItem('User');
      if (JSON.stringify(retrievedItem) > 0) {
        this.setState({logged:true})
        this.setState({ isLoaded: true })
      }
      else{
        this.setState({logged:false})
        this.setState({ isLoaded: true })
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



// FOR RADIOBUTTON In case it updates!

// import React, { Component } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default class RadioGroup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       radioButtons: this.validate(this.props.radioButtons),
//     };
//   }

//   validate(data) {
//     let selected = false; // Variable to check if "selected: true" for more than one button.
//     data.map(e => {
//       e.color = e.color ? e.color : '#444';
//       e.disabled = e.disabled ? e.disabled : false;
//       e.label = e.label ? e.label : 'You forgot to give label';
//       e.layout = e.layout ? e.layout : 'row';
//       e.selected = e.selected ? e.selected : false;
//       e.textSize = e.textSize ? e.textSize : 14;
//       if (e.selected) {
//         if (selected) {
//           e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
//           console.log('Found "selected: true" for more than one button');
//         } else {
//           selected = true;
//         }
//       }
//       e.size = e.size ? e.size : 24;
//       e.value = e.value ? e.value : e.label;
//     });
//     if (!selected) {
//       data[0].selected = true;
//     }
//     return data;
//   }

//   onPress = label => {
//     const radioButtons = this.state.radioButtons;
//     const selectedIndex = radioButtons.findIndex(e => e.selected == true);
//     const selectIndex = radioButtons.findIndex(e => e.label == label);
//     if (selectedIndex != selectIndex) {
//       radioButtons[selectedIndex].selected = false;
//       radioButtons[selectIndex].selected = true;
//       this.setState({ radioButtons });
//       this.props.onPress(this.state.radioButtons);
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={{ flexDirection: this.props.flexDirection }}>
//           {this.state.radioButtons.map(data => (
//             <RadioButton
//               key={data.label}
//               data={data}
//               onPress={this.onPress}
//             />
//           ))}
//         </View>
//       </View>
//     );
//   }
// }

// class RadioButton extends Component {
//   render() {
//     const data = this.props.data;
//     const opacity = data.disabled ? 0.2 : 1;
//     let layout = { flexDirection: 'row' };
//     let margin = { marginLeft: 10 };
//     if (data.layout === 'column') {
//       layout = { alignItems: 'center' };
//       margin = { marginTop: 10 };
//     }
//     return (
//       <TouchableOpacity
//         style={[layout, { opacity, marginHorizontal: 10, marginVertical: 5 }]}
//         onPress={() => {
//           data.disabled ? null : this.props.onPress(data.label);
//         }}>
//         <View
//           style={[
//             styles.border,
//             {
//               borderColor: data.color,
//               width: data.size,
//               height: data.size,
//               borderRadius: data.size / 2,
//               alignSelf: 'center'
//             },
//           ]}>
//           {data.selected &&
//             <View
//               style={{
//                 backgroundColor: data.color,
//                 width: data.size / 2,
//                 height: data.size / 2,
//                 borderRadius: data.size / 2,
//               }}
//             />}
//         </View>
//         <Text style={[{ alignSelf: 'center',color:data.color,fontSize:data.textSize,fontWeight:'bold' }, margin]}>{data.label}</Text>
//       </TouchableOpacity>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   border: {
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
