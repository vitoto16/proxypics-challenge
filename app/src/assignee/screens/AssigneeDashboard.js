import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Badge, useToast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {createOrder, fetchOrders} from '../../actions';
import styles, {Color} from '../../GlobalStyles';
import Header from '../../common/components/Header';

const AssigneeDashboard = props => {
  const {fetchOrders, navigation, orders} = props;
  const toast = useToast();
  const [index, setIndex] = useState(0);
  const [routes] = useState(['New', 'Completed']);
  const [ordersForDisplay, setOrdersForDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrders();
      } catch (e) {
        toast.show({
          description: 'Something went wrong. Check your internet connection',
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOrdersForDisplay(
      orders.filter(o =>
        index === 0
          ? o.status === 'Pending'
          : index === 1
          ? o.status === 'Completed'
          : orders,
      ),
    );
  }, [orders, index]);

  return (
    <>
      <Header />
      <KeyboardAwareScrollView contentContainerStyle={_styles.container}>
        <View style={_styles.titleContainer}>
          <Text style={_styles.title}>Orders</Text>
        </View>
        <View style={_styles.tabsContainer}>
          {routes.map((route, i) => (
            <TouchableOpacity
              key={i}
              style={[
                _styles.tabOption,
                index === i ? _styles.tabSelected : {},
              ]}
              onPress={() => setIndex(i)}>
              <Text style={styles.baseText}>{route}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={_styles.cardsContainer}>
          {ordersForDisplay.map((order, i) => (
            <View style={_styles.orderCard} key={i}>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={styles.baseText}>
                  <Text style={styles.boldText}>Order:</Text> #{order.id}
                </Text>
                <Text style={styles.baseText}>
                  <Text style={styles.boldText}>Address:</Text> {order.address}
                </Text>
                <Text style={styles.baseText}>
                  <Text style={styles.boldText}>Requester:</Text>{' '}
                  {order.requester.email}
                </Text>
              </View>
              {order.status === 'Completed' ? (
                <Badge
                  style={{alignSelf: 'center'}}
                  variant="subtle"
                  colorScheme="warning"
                  p={2}
                  _text={styles.baseText}
                  rounded="2xl">
                  Completed
                </Badge>
              ) : (
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() =>
                    navigation.navigate('SubmitPhotos', {orderId: order.id})
                  }>
                  <Badge
                    variant="solid"
                    colorScheme="warning"
                    p={2}
                    _text={styles.baseText}
                    rounded="2xl">
                    Submit Photos
                  </Badge>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    ...styles.baseText,
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabOption: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: Color.gray,
  },
  tabSelected: {
    borderColor: Color.primaryDark,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  cardsContainer: {
    width: '100%',
    marginTop: 10,
  },
  orderCard: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: Color.light,
    minHeight: 100,
    padding: 10,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => {
  const {orders} = state;
  return {
    orders: Object.values(orders),
  };
};

export default connect(mapStateToProps, {
  createOrder,
  fetchOrders,
})(AssigneeDashboard);
