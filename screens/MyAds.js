import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, FlatList, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import MyIcon from '../components/MyIcon'
import MyBtn from '../components/MyBtn'
import ItemCard from '../components/ItemCard'
import axios from 'axios';

export default class MyAds extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            MyAds: [
                {
                    id: "1",
                    price: 10000,
                    description: "This is just some random text to text the application UI",
                    imageSrc: require('../assets/images/ads/1.png'),
                    tag: "10 Marla",
                    ToScreen: "ItemDetail"
                },
            ],
            user:[],
        }
    }
    async _retrieveData() {
        try {
          const retrievedItem = await AsyncStorage.getItem('User');
          const data = JSON.parse(retrievedItem);
          if (data) {
            this.setState({user:data})
            this.getMyAds();
          }
        } catch (error) {
        }
      }
      getMyAds(){
        axios.get(`https://property12.herokuapp.com/api/banner/get/`+user._id)
        .then(response =>{
            console.log(response.data.data)
            Alert.alert(response.data.data._id)
        }).catch(error => {
            if (error) {
                Alert.alert("Error", "No Data Found!")
            }
        });
      }
    componentDidMount(){
        this._retrieveData();
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <View style={{flexDirection:'row', justifyContent: "space-around"}}>
                        <Text style={styles.titles}>My Ads</Text>
                        <Text style={styles.titles}>Favorites</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                        <FlatList
                            style={{ margin: 5, marginBottom: 0 }}
                            data={this.state.MyAds}
                            renderItem={({ item }) => <ItemCard imageSrc={item.imageSrc} price={item.price} description={item.description} tag={item.tag} ToScreen={item.ToScreen} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ width: 2, backgroundColor: '#fff', marginTop: 10 }} />
                        <FlatList
                            style={{ margin: 5, marginBottom: 0 }}
                            data={this.state.MyAds}
                            renderItem={({ item }) => <ItemCard imageSrc={item.imageSrc} price={item.price} description={item.description} tag={item.tag} ToScreen={item.ToScreen} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

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
        paddingTop: 20
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
    btnText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    titles:{
        color:"#fff",
        fontSize:25,
        fontWeight:'bold',
        fontStyle:'italic',
        marginVertical:10
    }
});