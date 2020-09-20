import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function TabBarTitle(props) {
    const styles = StyleSheet.create({
        textStyle: {
            fontSize: 14,
            color: "#000",
            textAlign: 'center'
        }
    })
  return (
      <Text style={[styles.textStyle, props.textStyle]} >
          {props.text}
      </Text>
  );
}
