import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import CategoryCard from '../components/CategoryCard'
import ItemCard from '../components/ItemCard'
import InfiniteScroll from 'react-native-infinite-scrolling'
import axios from 'axios';

export default class Home extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            safe: true,
            data:[
                {
                    id:"1",
                    price: 10000,
                    description: "This is just some random text to text the application UI",
                    imageSrc: require('../assets/images/ads/1.png'),
                    tag: "10 Marla",
                    ToScreen: "ItemDetail"
                },
                {
                    id:"2",
                    price: 500000,
                    description: "This is just some random text to text the application UI",
                    imageSrc: require('../assets/images/ads/1.png'),
                    tag: "20 Marla",
                    ToScreen: "ItemDetail"
                },
                {
                    id:"3",
                    price: 9999,
                    description: "This is just some random text to text the application UI",
                    imageSrc: require('../assets/images/ads/1.png'),
                    tag: "5 Marla",
                    ToScreen: "ItemDetail"
                },
                {
                    id:"4",
                    price: 995399,
                    description: "This is just some random text to text the application UI",
                    imageSrc: require('../assets/images/ads/1.png'),
                    tag: "3 Marla",
                    ToScreen: "ItemDetail"
                }
            ],
        }
    }
    componentDidMount() {
        axios.get(`https://property12.herokuapp.com/api/banner/get`)
        .then(response =>{
            console.log('response', response)
            this.setState({data: response.data.data})
        }).catch(error => {
            if (error) {
                Alert.alert("Error", "No Data Found!")
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <View style={styles.logoImg}>
                        <Image source={require("../assets/images/logo.png")} />
                    </View>
                    <Input
                        inputContainerStyle={styles.inputStyles}
                        placeholder='Search'
                        placeholderTextColor="gray"
                    />
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <CategoryCard text="House" imageSrc={require('../assets/images/icon/home.png')}/>
                        <CategoryCard text="Flats" imageSrc={require('../assets/images/icon/company.png')}/>
                        <CategoryCard text="Plots" imageSrc={require('../assets/images/icon/land.png')}/>
                        <CategoryCard text="Commercial" imageSrc={require('../assets/images/icon/company.png')} textStyle={{ fontSize: 11, marginTop: 3 }} />
                    </View>
                    <FlatList
                    style={{marginTop:10}}
                    data={this.state.data}
                    renderItem={({item}) => 
                        <ItemCard 
                            imageSrc={item.image} 
                            price={item.price} 
                            description={item.description} 
                            tag={item.area} 
                            ToScreen={item.ToScreen}
                        />
                    }
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    />
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
    logoImg: {
        flexDirection: "row",
        justifyContent: "center",
    },
    inputStyles: {
        borderColor: 'transparent',
        borderWidth: 1,
        marginTop: 20,
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
    }
});