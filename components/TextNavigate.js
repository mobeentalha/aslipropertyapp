import React from 'react'
import { TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';


function TextNavigate(Props) {
    const navigation = useNavigation();
  
    return (
      <TouchableOpacity style={Props.ConStyle}
        onPress={() =>
          Props.ToScreen ?
          navigation.navigate(Props.ToScreen)
          : null
        }>
            <Text style={Props.TextStyle}>{Props.text}</Text>
      </TouchableOpacity>
    )
  };

  export default TextNavigate;