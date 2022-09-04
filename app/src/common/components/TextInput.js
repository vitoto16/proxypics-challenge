import React from 'react';
import {Text} from 'react-native';
import {FormControl, Input} from 'native-base';
import styles from '../../GlobalStyles';

const TextInput = ({
  isRequired = false,
  formControlProps = {},
  labelTextProps = styles.boldText,
  label = '',
  error = '',
  ...rest
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={error}
      {...formControlProps}>
      {label ? (
        <FormControl.Label _text={labelTextProps}>{label}</FormControl.Label>
      ) : (
        <></>
      )}
      <Input {...rest} />
      <FormControl.ErrorMessage fontSize="xs">
        <Text>{error}</Text>
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default TextInput;
