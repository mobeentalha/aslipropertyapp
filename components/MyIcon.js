import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MyIcon(props) {
  return (
    <Icon
      name={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
