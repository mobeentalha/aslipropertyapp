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
            data:[],
            userPhone: '',
            filterKey : '',
            homeDiv: false,
            flatsDiv: false,
            plotsDiv: false,
            comerDiv: false,
        }
        this.onFilterPress = this.onFilterPress.bind(this)
    }
    componentDidMount() {
        axios.get(`https://property12.herokuapp.com/api/banner/get_approved/Approved`)
        .then(response =>{
            this.setState({data: response.data.data})
        }).catch(error => {
            if (error) {
                Alert.alert("Error", "No Data Found!")
            }
        });
        
    }
    onFilterPress (key) {
        this.setState({filterKey: key})
        switch (key) {
            case 'House': 
                this.setState({homeDiv: true});
                break;
            case 'Plots':
                this.setState({plotsDiv: true});
                break;
            case 'Commercial': 
                this.setState({commercial: true});
                break;
            default:
                break;
        }
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
                        <CategoryCard 
                            text="House" 
                            imageSrc={require('../assets/images/icon/home.png')}
                            onFilterPress={this.onFilterPress}
                            state={this.state.homeDiv}
                        />
                        <CategoryCard 
                            text="Flats" 
                            imageSrc={require('../assets/images/icon/company.png')}
                            onFilterPress={this.onFilterPress}
                            state={this.state.flatsDiv}
                        />
                        <CategoryCard 
                            text="Plots" 
                            imageSrc={require('../assets/images/icon/land.png')}
                            onFilterPress={this.onFilterPress}
                            state={this.state.plotsDiv}
                        />
                        <CategoryCard 
                            text="Commercial" 
                            imageSrc={require('../assets/images/icon/company.png')} 
                            textStyle={{ fontSize: 11, marginTop: 3 }} 
                            onFilterPress={this.onFilterPress}
                            state={this.state.comerDiv}
                        />
                        
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flex: 1,  flexDirection: 'row'}}>
                            {this.state.filterKey === 'House' ? (
                                <View style={{flex: 1,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View style={styles.filterButton}>
                                        <Text 
                                            style={{color: 'black', fontSize: 15}}> 
                                            For Sale 
                                        </Text>
                                    </View>
                                    <View style={styles.filterButton}>
                                        <Text 
                                            style={{color: 'black', fontSize: 15}}> 
                                            For Rent 
                                        </Text>
                                    </View>
                                </View>
                                )
                                : <View />
                            }
                        </View>
                        <View style={{flex: 1,  flexDirection: 'row'}}>
                            {this.state.filterKey === 'Flats' ? (
                                <View style={{flex: 1,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View style={styles.filterButton}>
                                        <Text 
                                            style={{color: 'black', fontSize: 15}}> 
                                            For Sale 
                                        </Text>
                                    </View>
                                    <View style={styles.filterButton}>
                                        <Text 
                                            style={{color: 'black', fontSize: 15}}> 
                                            For Rent 
                                        </Text>
                                    </View>
                                </View>
                                )
                                : <View />
                            }
                        </View>
                        <View style={{flex: 1,  flexDirection: 'row'}}>
                            {this.state.filterKey === 'Commercial' ? (
                                <View style={{flex: 1,flexDirection:'row',justifyContent:'space-between'}}>
                                    <View style={styles.filterButton}>
                                        <Text 
                                            style={{color: 'black', fontSize: 15 }}> 
                                            For Sale 
                                        </Text>
                                    </View>
                                    <View style={styles.filterButton}>
                                        <Text 
                                            style={{color: 'black', fontSize: 15}}> 
                                            For Rent 
                                        </Text>
                                    </View>
                                </View>
                                )
                                : <View />
                            }
                        </View>
                    </View>

                    <FlatList
                    style={{marginTop:10}}
                    data={this.state.data}
                    renderItem={({item}) => 
                        <ItemCard 
                            imageSrc={{uri:item.image[0]}} 
                            price={item.price} 
                            description={item.description} 
                            tag={item.city}
                            _id={item._id}
                        />
                    }
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    keyExtractor={item => item._id}
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
        paddingTop: 35
    },
    filterButton: {
        flex: 0.5, 
        backgroundColor: 'white', 
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    }
});