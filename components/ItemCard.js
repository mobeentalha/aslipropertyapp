import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function ItemCard(Props) {
    const styles = StyleSheet.create({
        desStyle: {
            fontSize: 14,
            color: Colors.mainColor,
            fontWeight:"bold",
            marginTop:3
        },
        priceStyle:{
            fontSize: 16,
            color:"#000",
            fontWeight:"bold",
        },
        tag:{
            margin:0,
            padding:0,
            fontSize:12,
            color:Colors.mainColor
        }
    })
const navigation = useNavigation();
  return (
    <View style={{flex:1}}>
      <TouchableOpacity
      onPress={() =>
        navigation.navigate("ItemDetail", {
          _id: Props._id,
      })
      }>
        
    <Card
    containerStyle={{padding:5, borderRadius:10, flex:1,margin:5, backgroundColor:"rgba(255, 255, 255, 0.9)", borderBottomColor:"rgba(255, 255, 255, 0.9)"}}
    image={Props.imageSrc}>
        <Text style={styles.tag}>{Props.tag}</Text>
        <Text style={styles.priceStyle}>
            RS: {Props.price}
        </Text>
    <Text style={styles.desStyle}>
      {Props.description}
    </Text>
  </Card>
  </TouchableOpacity>
  </View>
  );
}