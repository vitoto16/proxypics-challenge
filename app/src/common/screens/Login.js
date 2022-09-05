import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {login} from '../../actions';
import styles, {Color} from '../../GlobalStyles';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

const Login = props => {
  const {login, navigation, route, user} = props;
  const {notice} = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!Object.keys(user).length);

  const handleLoggedIn = () => {
    user.type === 'Requester'
      ? navigation.replace('RequesterDashboard')
      : user.type === 'Assignee'
      ? navigation.replace('AssigneeDashboard')
      : setError(`User not logged in`);
  };

  const handleLogin = async () => {
    try {
      await login({email, password});
      setIsLoggedIn(true);
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleLoggedIn();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <KeyboardAwareScrollView contentContainerStyle={_styles.container}>
        <View style={_styles.imageContainer} />
        <View style={_styles.inputsContainer}>
          <Text style={_styles.noticeText}>{notice}</Text>
          <Text style={_styles.errorText}>{error}</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={'Email'}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            formControlProps={{style: _styles.input}}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry
            formControlProps={{style: _styles.input}}
          />
        </View>
        <View style={_styles.buttonContainer}>
          <Button onPress={handleLogin}>Login</Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={_styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 30,
    width: 200,
    height: 200,
    backgroundColor: Color.primaryDark,
  },
  inputsContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    ...styles.baseText,
    color: Color.error,
  },
  noticeText: {
    ...styles.baseText,
    color: Color.primary,
  },
  input: {
    marginTop: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 30,
    width: '75%',
  },
  createAccountText: {
    ...styles.underlinedText,
    marginTop: 30,
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, {
  login,
})(Login);
