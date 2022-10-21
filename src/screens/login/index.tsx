import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, globalLoading, Text } from 'components';
import { useFormik } from 'forMik';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { TextInput } from 'react-native-element-textInput';
import { styles } from './styles';

const IMG_BACKGROUND = require('assets/images/pictures/background.jpg');

interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const forMik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: values => {
      const error: any = {};
      if (values.username.length === 0) {
        error.username = 'Please enter Email & Phone';
      }

      if (values.password.length === 0) {
        error.password = 'Please enter Password';
      }

      return error;
    },
    onSubmit: _values => {
      globalLoading.show();
      setTimeout(() => {
        globalLoading.hide();
        navigate('Main');
      }, 1000);
    },
  });

  return (
    <ImageBackground
      style={styles.container}
      source={IMG_BACKGROUND}
      resizeMode="cover">
      <View style={styles.wrapBox}>
        <Text style={styles.title} bold fontSize={30}>
          Login
        </Text>
        <TextInput
          style={styles.textInput}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          value={forMik.values.username}
          onChangeText={forMik.handleChange('username')}
          label="Email & Phone"
          placeholderTextColor="gray"
          textError={forMik.errors.username}
        />

        <TextInput
          style={styles.textInput}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          value={forMik.values.password}
          textContentType="oneTimeCode"
          onChangeText={forMik.handleChange('password')}
          label="Password"
          placeholderTextColor="gray"
          secureTextEntry
          textError={forMik.errors.password}
        />

        <Button
          style={styles.button}
          title="Login"
          fontSize={20}
          onPress={forMik.handleSubmit}
        />
        <Text style={styles.textOr} fontSize={16}>
          Or
        </Text>
        <Text
          style={styles.textOr}
          fontSize={18}
          onPress={() => navigate('Register')}>
          Create new account?
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
