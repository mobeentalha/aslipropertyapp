import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground, Alert, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import { SliderBox } from "react-native-image-slider-box"
import { ScrollView } from 'react-native-gesture-handler';
import BackArrowBtn from '../components/BackArrowBtn'
import DetailRow from '../components/DetailRow'
import axios from 'axios';
import MyIcon from '../components/MyIcon';

export default class ItemDetail extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            data: [],
            loaded: false,
            favorite: false,
            favoriteArray: [],
            user: {},
            bannerGetID: null,
        }
    }
    async _retrieveData() {
        try {
            const retrievedItem = await AsyncStorage.getItem('User');
            const data = JSON.parse(retrievedItem);
            if (data) {
                this.setState({ user: data })
                this.getFavorites();
                this.checkFavorite();
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    getFavorites() {
        axios.get(`https://property12.herokuapp.com/api/favorite/get_phone/` + this.state.user.phoneNo)
            .then(response => {
                var data = response.data.data
                if (data.length>0) {
                    this.setState({ bannerGetID: data[0]._id })
                    var favorites = [];
                    for (var i = 0; i < data.length; i++) {
                        favorites.push(data[0].bannerId[i]);
                    }
                    this.setState({ favoriteArray: favorites })
                }
            });
    }
    


    checkFavorite() {
        if (this.state.favoriteArray.includes(this.state.data._id)) {
            this.setState({ favorite: true })
        }
        else {
            this.setState({ favorite: false })
        }
    }

    componentDidMount() {
        this._retrieveData();
        const { _id } = this.props.route.params
        this.setState({ itemId: _id })
        axios.get(`https://property12.herokuapp.com/api/banner/get/` + _id)
            .then(response => {
                console.log('response', response)
                this.setState({ data: response.data.data })
                this.setState({ loaded: true })
                this.getFavorites();
            }).catch(error => {
                if (error) {
                    Alert.alert("Error", "No Data Found!")
                }
            });
    }

    favoriteClicked() {
        if (this.state.favorite) {
            this.setState({ favorite: false })
            var favorites = this.state.favoriteArray;
            var newFav = [];
            for(var i = 0;i<favorites.length;i++){
                if(favorites[i] == this.state.data._id){

                }
                else{
                    newFav.push(favorites[i])
                }
            }
            this.setState({ favoriteArray: newFav })
            axios.post(`https://property12.herokuapp.com/api/favorite/update/` + this.state.bannerGetID, {
                bannerId: newFav,
                phoneNo: this.state.user.phoneNo
            })
                .then(response => {
                    console.log('response : ', response)
                this.getFavorites();
                }).catch(error => {
                    if (error) {
                        Alert.alert("Error", "Not Addes")
                    }
                })
        }
        else {
            if (this.state.favoriteArray.length>0) {
                this.setState({ favorite: true })
                this.state.favoriteArray.push(this.state.data._id)
                axios.post(`https://property12.herokuapp.com/api/favorite/update/`+ this.state.bannerGetID, {
                    bannerId: this.state.favoriteArray,
                    phoneNo: this.state.user.phoneNo
                })
                    .then(response => {
                    console.log('response : ', response)
                this.getFavorites();

                    }).catch(error => {
                        if (error) {
                            Alert.alert("Error", "Not Addes")
                        }
                    })
            }
            else {
                this.setState({ favorite: true })
                axios.post(`https://property12.herokuapp.com/api/favorite/add`, {
                    bannerId: [this.state.data._id],
                    phoneNo: this.state.user.phoneNo
                })
                    .then(response => {
                    console.log('response : ', response)
                this.getFavorites();
                    }).catch(error => {
                        if (error) {
                            Alert.alert("Error", "Not Addes")
                        }
                    })
            }

            // axios.get(`https://property12.herokuapp.com/api/favorite/get_phone/` + this.state.user.phoneNo)
            //     .then(response => {
            //         var data = response.data.data
            //         if (data.length === 0) {
            //             data = {
            //                 bannerId: this.state.favoriteArray,
            //                 phoneNo: this.state.user.phoneNo
            //             }
            //             axios.post(`https://property12.herokuapp.com/api/favorite/add`, data)
            //                 .then(response => {
            //                     console.log('response : ', response)
            //                 }).catch(error => {
            //                     if (error) {
            //                         Alert.alert("Error", "Not Addes")
            //                     }
            //                 })
            //         }
            //         else {
            //             for (var i = 0; i < data.length; i++) {
            //                 favArray.push(data[i].bannerId)
            //             }
            //             var send = {
            //                 bannerId: this.state.favoriteArray,
            //                 phoneNo: this.state.user.phoneNo
            //             }
            //             axios.post(`https://property12.herokuapp.com/api/favorite/add`, send)
            //                 .then(response => {
            //                     console.log('response : ', response)
            //                 }).catch(error => {
            //                     if (error) {
            //                         Alert.alert("Error", "Not Addes")
            //                     }
            //                 })
            //         }
            //         // this.setState({favorite:data})
            //     }).catch(error => {
            //         if (error) {
            //             Alert.alert("Error", "No Data Found!")
            //         }
            //     });
        }
    }

    chatIconClicked() {
        console.log('data : ', this.state.data)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loaded && this.state.data._id ?
                    <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                            <BackArrowBtn />
                            <TouchableOpacity onPress={() => this.favoriteClicked()}>
                                <MyIcon name="heart" size={30} color={this.state.favorite ? Colors.mainLightColor : "#fff"} />
                            </TouchableOpacity>
                        </View>
                        <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
                        <SliderBox
                            ImageComponent={Image}
                            images={this.state.data.image}
                            sliderBoxHeight={250}
                            dotColor={Colors.mainColor}
                            inactiveDotColor="#fff"
                            autoplay
                            circleLoop
                            resizeMethod={'resize'}
                            resizeMode={'cover'}
                            ImageComponentStyle={{ borderRadius: 15, width: '90%', marginTop: 5 }}
                            imageLoadingColor={Colors.mainLightColor}
                        />

                        <View style={styles.bgPadding}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <Text style={styles.detailTxt}>Details</Text>
                                <TouchableOpacity
                                    onPress={() => this.chatIconClicked()}
                                    style={{ marginLeft: '55%', marginTop: '2%' }} >
                                    <MyIcon
                                        name="wechat"
                                        size={30}
                                        color={"#fff"}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.detailCon}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <DetailRow Dark={true} IconName="home" IconColor="#fff" IconSize={25} Title="Property ID" Description={this.state.data._id} />
                                    <DetailRow IconName="building" IconColor="#fff" IconSize={25} Title="Type" Description={this.state.data.type} />
                                    <DetailRow Dark={true} IconName="money" IconColor="#fff" IconSize={25} Title="Price" Description={this.state.data.price} />
                                    <DetailRow IconName="text-height" IconColor="#fff" IconSize={25} Title="Area" Description={this.state.data.area} />
                                    <DetailRow Dark={true} IconName="check-circle" IconColor="#fff" IconSize={25} Title="Purpose" Description={this.state.data.purpose} />
                                    <DetailRow IconName="map" IconColor="#fff" IconSize={25} Title="City" Description={this.state.data.city} />
                                    <DetailRow Dark={true} IconName="map-marker" IconColor="#fff" IconSize={25} Title="Location" Description={this.state.data.location} />
                                    <View title={styles.row}>
                                        <Text style={styles.desTitle}>
                                            Description:
                                </Text>
                                        <Text style={styles.desDescription}>
                                            {this.state.data.description}
                                        </Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </ImageBackground>
                    : <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                            <BackArrowBtn />
                        </View>
                        <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
                    </ImageBackground>}
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
        paddingTop: 20,
    },
    bgPadding: {
        paddingHorizontal: 20,
        paddingTop: 20,
        flex: 1
    },
    detailTxt: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    },
    detailCon: {
        marginTop: 20,
        paddingBottom: 70
    },
    row: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
    desTitle: {
        marginTop: 15,
        color: "#fff",
        fontSize: 25,
    },
    desDescription: {
        color: "#fff",
        fontSize: 15,
        fontStyle: "italic",
    },
});