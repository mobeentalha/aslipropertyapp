import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ImageBackground } from 'react-native';
import Colors from '../constants/Colors';
import { SliderBox } from "react-native-image-slider-box"
import { ScrollView } from 'react-native-gesture-handler';
import BackArrowBtn from '../components/BackArrowBtn'
import DetailRow from '../components/DetailRow'

export default class ItemDetail extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            images: [
                require('../assets/images/ads/1.png'),
                require('../assets/images/ads/1.png'),
                require('../assets/images/ads/1.png'),
                require('../assets/images/ads/1.png'),
            ],
            PropertyID: "123456789",
            Type: "Residential Plot",
            Price: "PKR 10 Lacs",
            Size: "30 marla",
            Purpose: "For Sale",
            City: "Rawalpindi",
            Location: "Bahria Town Phase 8 - Block 1",
            Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap int electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                        <BackArrowBtn />
                    </View>
                    <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
                    <SliderBox
                        disableOnPress={true}
                        ImageComponent={Image}
                        images={this.state.images}
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
                        <Text style={styles.detailTxt}>Details</Text>

                        <View style={styles.detailCon}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <DetailRow Dark={true} IconName="home" IconColor="#fff" IconSize={25} Title="Property ID" Description={this.state.PropertyID} />
                                <DetailRow IconName="building" IconColor="#fff" IconSize={25} Title="Type" Description={this.state.Type} />
                                <DetailRow Dark={true} IconName="money" IconColor="#fff" IconSize={25} Title="Price" Description={this.state.Price} />
                                <DetailRow IconName="text-height" IconColor="#fff" IconSize={25} Title="Area" Description={this.state.Size} />
                                <DetailRow Dark={true} IconName="check-circle" IconColor="#fff" IconSize={25} Title="Purpose" Description={this.state.Purpose} />
                                <DetailRow IconName="map" IconColor="#fff" IconSize={25} Title="City" Description={this.state.City} />
                                <DetailRow Dark={true} IconName="map-marker" IconColor="#fff" IconSize={25} Title="Location" Description={this.state.Location} />
                                <View title={styles.row}>
                                    <Text style={styles.desTitle}>
                                        Description:
                                </Text>
                                    <Text style={styles.desDescription}>
                                        {this.state.Description}
                                </Text>
                                </View>
                            </ScrollView>
                        </View>
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
        paddingBottom:70
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