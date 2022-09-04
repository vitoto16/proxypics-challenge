import React, {Component} from 'react';
import {Text} from 'react-native';
import {FormControl, Select as NBSelect} from 'native-base';
import styles from '../../GlobalStyles';

const Select = ({
  isRequired = false,
  formControlProps = {},
  labelTextProps = styles.boldText,
  label = '',
  options = [],
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
      <NBSelect {...rest}>
        {options.map(o => (
          <NBSelect.Item label={o} value={o} key={o} />
        ))}
      </NBSelect>
      <FormControl.ErrorMessage fontSize="xs">
        <Text>{error}</Text>
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default Select;
