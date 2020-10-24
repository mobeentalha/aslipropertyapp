import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    StatusBar, 
    Image, 
    ImageBackground, 
    ScrollView, 
    Alert, 
    AsyncStorage,
    ToastAndroid 
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../constants/Colors';
import MyIcon from '../components/MyIcon';
import Constants from 'expo-constants';
import MyBtn from '../components/MyBtn';
import axios from 'axios';
import {Toast} from 'native-base'
import * as Device from 'expo-device';

export default class AddItem extends Component {

    constructor(Props) {
        super(Props);
        this.state = {
            data: [
                {
                    label: 'Plot',
                    textSize: 17,
                    color: "#fff",
                    value: 'Plot'
                },
                {
                    label: 'Home',
                    textSize: 17,
                    color: "#fff",
                    value: 'Home'
                },
                {
                    label: 'Flat',
                    textSize: 17,
                    color: "#fff",
                    value: 'Flat'
                },
                {
                    label: 'Commercial',
                    textSize: 17,
                    color: "#fff",
                    value: 'Commercial'
                },
            ],
            proofImages: [],
            images: [],
            Proof: null,
            ProofImg: null,
            adTitle: '',
            type:'',
            price: '',
            area: '',
            purpose: '',
            city: '',
            location: '',
            description:'',
            proofSelect:'',
            userPhone: '',
            device_id: Device.osBuildId,
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
        this._retrieveData();
    }
    async _retrieveData() {
        try {
            const retrievedItem = await AsyncStorage.getItem('User');
            const data = JSON.parse(retrievedItem);
            if (data) {
                this.setState({ userPhone: data.phoneNo })
                // this.getUser();
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    onPress = data => {
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        console.log('selected options : ', selectedButton)
        this.setState({ type: selectedButton })
    };
    MyAlert(ImgToRemove) {
        Alert.alert(
            "Remove Picture",
            "Are you sure you want to remove this picture?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.setState({ [ImgToRemove]: null }) }
            ],
            { cancelable: false }
        );
    }


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    pickPropertyImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          base64: true
        });
    
        if (!result.cancelled) {
            
          
          let base64Img = `data:image/jpg;base64,${result.base64}`
          
          //Add your cloud name
          let apiUrl = 'https://api.cloudinary.com/v1_1/dxqyygq2o/image/upload';
      
          let data = {
            "file": base64Img,
            "upload_preset": "ipypbpvg",
          }
    
          fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
              let data = await r.json()
              let urlArray = this.state.images;
              urlArray.push(data.secure_url)
              this.setState({ images: urlArray });
              return data.secure_url
        }).catch(err=>console.log(err))
      }
      
    }

    pickProofImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          base64: true
        });
    
        if (!result.cancelled) {
            
          
          let base64Img = `data:image/jpg;base64,${result.base64}`
          
          //Add your cloud name
          let apiUrl = 'https://api.cloudinary.com/v1_1/dxqyygq2o/image/upload';
      
          let data = {
            "file": base64Img,
            "upload_preset": "ipypbpvg",
          }
    
          fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
              let data = await r.json()
              console.log('Url Try  ::',data.secure_url)
              this.setState({ proofImages: data.secure_url});
              return data.secure_url
        }).catch(err=>console.log(err))
      }
      
    }

    inputchange = (key, value) => {
        switch (key) {
            case 'title': 
                this.setState({title: value});
                break;
            case 'price': 
                this.setState({price: value});
                break;
            case 'area':
                this.setState({area: value});
                break;
            case 'purpose':
                this.setState({purpose: value});
                break;
            case 'city':
                this.setState({city: value});
                break;
            case 'location':
                this.setState({location: value});
                break;
            case 'description':
                this.setState({description: value});
                break;
            case 'proof':
                this.setState({proof: value});
                break;
            default:
                break;
        }
    }

    submitAd = () => {
        let data = {
            image: this.state.images,
            title: this.state.title,
            type: this.state.type,
            price: this.state.price,
            area: this.state.area,
            purpose: this.state.purpose,
            city: this.state.city,
            location: this.state.location,
            description: this.state.description,
            owner_pic: this.state.proofImages,
            phoneNo: this.state.userPhone
        }
        console.log('data : ', data)

        axios.post(`https://property12.herokuapp.com/api/banner/add`,data)
        .then(response => {
          if (response.status==200) {
              console.log('response ', response)
                Toast.show({
                    text: 'Data Added Succes',
                    buttonText: 'Okay',
                    type: 'success',
                    duration: 3000
                })
            // navigate("Login")
          } 
        }).catch(error => {
        //   this.setState({ loading: false })
          if (error) {
            Toast.show({
                text: 'Error in Data',
                buttonText: 'Okay',
                type: 'danger'
            })
          }
        });

    }

    pickImageProof = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ ProofImg: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        console.log('device id : ', this.state.device_id);
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
                    <View style={styles.logo}>
                        <View style={styles.logoImg}>
                            <Image source={require("../assets/images/logo.png")} />
                        </View>
                        <Text style={{ color: "#fff", textAlign: "center", marginTop: 5, fontSize: 20, fontWeight: 'bold' }}>
                            Asli Property
                        </Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Input Title here'
                            placeholderTextColor="gray"
                            label="Title:"
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('title', text)}
                        />
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <Text style={[styles.labelStyle, { marginLeft: 20 }]}>Type:</Text>
                            <RadioGroup 
                                radioButtons={this.state.data} 
                                onPress={this.onPress}
                            />
                        </View>
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Enter Price'
                            placeholderTextColor="gray"
                            label="Price:"
                            keyboardType={"number-pad"}
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('price', text)}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Enter Area'
                            placeholderTextColor="gray"
                            label="Area:"
                            multiline={true}
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('area', text)}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Enter Purpose Here'
                            placeholderTextColor="gray"
                            label="Purpose:"
                            multiline={true}
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('purpose', text)}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Enter City'
                            placeholderTextColor="gray"
                            label="City:"
                            multiline={true}
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('city', text)}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Enter location'
                            placeholderTextColor="gray"
                            label="Location:"
                            multiline={true}
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('location', text)}
                        />
                        <Input
                            inputContainerStyle={styles.inputStyles}
                            placeholder='Enter Description'
                            placeholderTextColor="gray"
                            label="Description:"
                            multiline={true}
                            numberOfLines={5}
                            labelStyle={styles.labelStyle}
                            onChangeText={(text) => this.inputchange('description', text)}
                        />
                        <Text style={[styles.labelStyle, { marginLeft: 20 }]}>Proof of ownership</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Electricity bill' },
                                { label: 'Gas bill' },
                                { label: 'Telephone bill' },
                                { label: 'Copy of allotment letter' },
                                { label: 'Copy of statement' },
                                { label: 'Copy of Registry' },
                                { label: 'Copy of Fartt' },
                            ]}
                            defaultIndex={0}
                            dropDownMaxHeight={100}
                            containerStyle={{ height: 40, marginHorizontal: 10 }}
                            zIndex={1}
                            onChangeItem={item => this.setState({ Proof: item.label })}
                        />

                        <MyBtn 
                            title="Add Ownership Picture" 
                            onPress={this.pickProofImage} 
                            textStyle={{ color: "#fff", fontSize: 17 }} 
                            containerStyle={styles.myBtn} 
                            colors={[Colors.mainColor, Colors.mainLightColor]} 
                        />

                        <View style={styles.imgCon}>
                            {/* {this.state.proofImages && (
                                <View>
                                    <TouchableOpacity 
                                    onPress={() => this.MyAlert("image1")} 
                                    style={styles.imgRemoveIconCon}>
                                        <MyIcon name="times" size={15} color="#fff" />
                                    </TouchableOpacity>
                                    <Image source={{ uri: this.state.proofImages.url }} style={styles.imgStyle} />
                                </View> 
                            )} */}
                        </View>

                        <Text 
                            style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', marginTop: 20 }}>
                                Pictures of Property
                        </Text>

                        <MyBtn 
                            title="Add Property Picture" 
                            onPress={this.pickPropertyImage} 
                            textStyle={{ color: "#fff", fontSize: 17 }} 
                            containerStyle={styles.myBtn} 
                            colors={[Colors.mainColor, Colors.mainLightColor]} 
                        />

                        <View style={styles.imgCon}>
                            {this.state.images && this.state.images.map((value, key) => {
                                console.log('value : ', value)
                                return (
                                    <View key={key}>
                                        <TouchableOpacity 
                                            onPress={() => this.MyAlert("image1")} 
                                            style={styles.imgRemoveIconCon}>
                                                <MyIcon name="times" size={15} color="#fff" />
                                            </TouchableOpacity>
                                            <Image source={{ uri: value.url }} style={styles.imgStyle} />
                                    </View> 
                                )
                            })}
                        </View>

                        <MyBtn 
                            title="Submit Ad" 
                            onPress={this.submitAd} 
                            textStyle={{ color: "#fff", fontSize: 17 }} 
                            containerStyle={styles.myBtn} 
                            colors={[Colors.mainColor, Colors.mainLightColor]} 
                        />

                        <Text > * After uploading ad, it would take 24 hours to approve your ad.</Text>    
                    </ScrollView>
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
        paddingTop: 30,
        flexDirection: 'column',
    },
    logo: {
        margin: 10,
    },
    logoImg: {
        flexDirection: "row",
        justifyContent: "center",
    },
    inputStyles: {
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: -10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 10
    },
    labelStyle: {
        color: "#fff",
        fontSize: 18,
        margin: 5,
        fontWeight: "bold",
    },
    addPic: {
        marginHorizontal: 10,
        marginVertical: 30,
        color: "#fff",
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: "#fff"
    },
    imgCon: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        marginBottom: 20
    },
    imgStyle: {
        height: 80,
        width: 80,
        borderRadius: 100,
        borderColor: "#fff",
        borderWidth: 1
    },
    imgRemoveIconCon: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        height: 20,
        width: 20,
        backgroundColor: "red",
        flexDirection: "column",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: "#fff",
        borderWidth: 1
    },
    myBtn: {
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
        elevation: 3
      },
});