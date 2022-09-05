import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Badge, Button, useToast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {createOrder, fetchOrders} from '../../actions';
import styles, {Color} from '../../GlobalStyles';
import {addIcon} from '../../style/assetsLink';
import Header from '../../common/components/Header';
import TextInput from '../../common/components/TextInput';
import Modal from '../../common/components/Modal';

const RequesterDashboard = props => {
  const {createOrder, fetchOrders, orders, user} = props;
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [newOrderAddress, setNewOrderAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleCreateOrder = async () => {
    const newErrors = {};
    if (!newOrderAddress) {
      newErrors.newOrderAddress = 'This field is required';
    } else {
      try {
        await createOrder({address: newOrderAddress});
        toast.show({description: 'Order created successfully!'});
        setModalVisible(false);
      } catch (e) {
        toast.show({
          description: e.response.data.message,
        });
      }
    }
    setErrors(newErrors);
  };

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

  return (
    <>
      <Header />
      <KeyboardAwareScrollView contentContainerStyle={_styles.container}>
        <View style={_styles.titleContainer}>
          <Text style={_styles.title}>Orders</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={_styles.imageContainer}>
            <Image source={addIcon} style={styles.imageContain} />
          </TouchableOpacity>
        </View>
        <View style={_styles.cardsContainer}>
          {orders.map((order, i) => (
            <View style={_styles.orderCard} key={i}>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={styles.baseText}>
                  <Text style={styles.boldText}>Order:</Text> #{order.id}
                </Text>
                <Text style={styles.baseText}>
                  <Text style={styles.boldText}>Address:</Text> {order.address}
                </Text>
                {order.status === 'Completed' ? (
                  <Text style={styles.baseText}>
                    <Text style={styles.boldText}>Assignee:</Text>{' '}
                    {order.assignee.email}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <Badge
                variant={order.status === 'Completed' ? 'subtle' : 'solid'}
                p={2}
                _text={styles.baseText}
                rounded="2xl"
                alignSelf="center">
                {order.status}
              </Badge>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Create Order"
        body={
          <TextInput
            value={newOrderAddress}
            onChangeText={setNewOrderAddress}
            placeholder={'Address'}
            autoCapitalize={'none'}
            label="Address"
            error={errors.newOrderAddress}
            isRequired
          />
        }
        footer={
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button onPress={handleCreateOrder}>Create</Button>
          </Button.Group>
        }
      />
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
})(RequesterDashboard);
