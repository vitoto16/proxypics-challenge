import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {register} from '../../actions';
import validateEmail from '../../util/validateEmail';
import styles, {Color} from '../../GlobalStyles';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Select from '../components/Select';

const typeOptions = ['Requester', 'Assignee'];

const Registration = props => {
  const {register, navigation, authToken} = props;
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const fields = {email, type, password, passwordConfirmation};
    const newErrors = {};

    Object.keys(fields).forEach(k => {
      if (!fields[k]) {
        newErrors[k] = 'This field is required';
      }
    });
    if (email && !validateEmail(email)) {
      newErrors.email = 'Email must be valid';
    }
    if (password !== passwordConfirmation) {
      newErrors.password = "Passwords don't match";
      newErrors.passwordConfirmation = "Passwords don't match";
    }
    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    try {
      validateForm();
      if (!Object.keys(errors).length) {
        await register({email, password, type});
        navigation.replace('Login');
      }
    } catch (e) {
      setErrors({...errors, general: e.response.data.status.message});
    }
  };

  useEffect(() => {
    if (authToken) {
      navigation.replace('Login');
    }
  }, []);

  return (
    <>
      <Header />
      <KeyboardAwareScrollView contentContainerStyle={_styles.container}>
        <Text style={_styles.title}>New account</Text>
        <View style={_styles.inputsContainer}>
          <Text style={_styles.errorText}>{errors.general}</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={'Email'}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            label="Email"
            error={errors.email}
            isRequired
            formControlProps={{style: _styles.input}}
          />
          <Select
            selectedValue={type}
            options={typeOptions}
            onValueChange={setType}
            placeholder={'Type'}
            label="Type"
            error={errors.type}
            isRequired
            formControlProps={{style: _styles.input}}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry
            label="Password"
            error={errors.password}
            isRequired
            formControlProps={{style: _styles.input}}
          />
          <TextInput
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            placeholder={'Confirm Password'}
            secureTextEntry
            label="Confirm Password"
            error={errors.passwordConfirmation}
            isRequired
            formControlProps={{style: _styles.input}}
          />
        </View>
        <View style={_styles.buttonContainer}>
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={_styles.haveAccountText}>I already have an account</Text>
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
  title: {
    ...styles.baseText,
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  errorText: {
    ...styles.baseText,
    color: Color.error,
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 30,
    width: '75%',
  },
  haveAccountText: {
    ...styles.underlinedText,
    marginTop: 30,
  },
});

const mapStateToProps = state => {
  const {authToken} = state.auth;
  return {
    authToken: authToken,
  };
};

export default connect(mapStateToProps, {
  register,
})(Registration);
