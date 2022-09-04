import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../../actions';
import styles, {Color} from '../../GlobalStyles';

const Header = props => {
  const {logout, user} = props;
  const navigation = useNavigation();

  const handlelogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (e) {
      console.log(e.response.data.status.message);
    }
  };

  return (
    <View style={_styles.headerContainer}>
      <View style={_styles.logoContainer} />
      <Text style={_styles.headerTitle}>ProxyPics</Text>
      {Object.keys(user).length ? (
        <>
          <TouchableOpacity
            onPress={handlelogout}
            style={_styles.logoutContainer}>
            <Text style={styles.baseText}>
              {user.email}
              <Text style={styles.boldText}> | Logout</Text>
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const _styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: Color.primary,
  },
  headerTitle: {
    ...styles.baseText,
    marginLeft: 10,
  },
  logoutContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, {
  logout,
})(Header);
