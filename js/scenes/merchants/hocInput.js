/**
 * Created by Admin on 5/24/2017.
 */
import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {Input} from 'native-base';
import styles from './styles';

/**
 * to be wrapped with redux-form Field component
 */
export default function HocInput(props) {
  // const { input, meta, ...inputProps } = props;
  const {input, label, type, meta: {touched, error, warning},...inputProps} = props;

  var hasError = false;
  if (error !== undefined) {
    hasError = true;
  }

  return (
    <View error={hasError}>
      <View style={styles.inputWrapper}>
        <Input style={styles.inputInner}
               {...input}
               {...inputProps}
        />
      </View>
      {hasError ? <Text style={{color : "red"}}>{error}</Text> : <Text />}
    </View>
  )
}