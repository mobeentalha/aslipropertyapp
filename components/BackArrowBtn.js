import React from 'react'
import { TouchableOpacity } from 'react-native';
import MyIcon from '../components/MyIcon'

import { useNavigation } from '@react-navigation/native';


function BackArrow() {
    const navigation = useNavigation();
  
    return (
      <TouchableOpacity style={{ width: 50 }}
        onPress={() =>
          navigation.goBack()
        }>
        <MyIcon name="long-arrow-left" size={40} color="#fff" />
      </TouchableOpacity>
    )
  };

  export default BackArrow;