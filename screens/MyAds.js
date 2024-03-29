import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, FlatList, Alert, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import MyIcon from '../components/MyIcon'
import MyBtn from '../components/MyBtn'
import ItemCard from '../components/ItemCard'
import axios from 'axios';

export default class MyAds extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            myAds: [],
            favorite: [],
            user:{},
        }
    }
    async _retrieveData() {
        try {
          const retrievedItem = await AsyncStorage.getItem('User');
          const data = JSON.parse(retrievedItem);
          if (data) {
            this.setState({user:data})
            this.getMyAds();
            this.getfavorite();
          }
        } catch (error) {
            Alert.alert(error.message)
        }
      }
      getMyAds(){
        axios.get(`https://property12.herokuapp.com/api/banner/get_phone/`+this.state.user.phoneNo)
        .then(response =>{
            var data = response.data.data
            this.setState({myAds:data})
        }).catch(error => {
            if (error) {
                console.log('no data')
            }
        });
      }
      getfavorite(){
        axios.get(`https://property12.herokuapp.com/api/favorite/get_phone/`+this.state.user.phoneNo)
        .then(response =>{
            var data = response.data.data
            console.log('data : ', data)
            data.bannerId.map((value, key) => {
                console.log('value :: ', value)
                // axios.get(`https://property12.herokuapp.com/api/banner/get/`+value)
            })
            
            this.setState({favorite:data})
        }).catch(error => {
            if (error) {
                console.log('nodata')
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
                        {this.state.myAds.length ? 
                            <FlatList
                            style={{flex:1}}
                            data={this.state.myAds}
                            renderItem={({item}) =>
                            <> 
                                <MyIcon name="remove" size={20} color="red" /> 
                                <ItemCard
                                    imageSrc={{uri:item.image[0]}} 
                                    price={item.price} 
                                    description={item.description} 
                                    tag={item.city}
                                    _id={item._id}
                                />
                            </>
                            }
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                            />
                    :
                    <View style={styles.noDataCon}>
                        <Text style={styles.noData}>No Data Found</Text>
                    </View>}
                        
                        <View style={{ width: 2, backgroundColor: '#fff', marginTop: 10,marginHorizontal:10 }} />
                        {this.state.favorite.length ? 
                            <FlatList
                            style={{flex:1}}
                            data={this.state.favorite}
                            renderItem={({item}) => 
                                <ItemCard 
                                    imageSrc={{uri:item.image}} 
                                    price={item.price} 
                                    description={item.description} 
                                    tag={item.city}
                                    _id={item.bannerId}
                                />
                            }
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                            />
                        :<View style={styles.noDataCon}>
                        <Text style={styles.noData}>No Data Found</Text>
                    </View>}
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
    },
    noData:{
        fontSize:30,
        textAlign:'center',
        color:"#fff",
        fontStyle:"italic",
        fontWeight:'bold',
    },
    noDataCon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});