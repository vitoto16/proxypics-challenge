import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, useToast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {connect} from 'react-redux';
import {fetchOrders, submitPhotos} from '../../actions';
import styles, {Color} from '../../GlobalStyles';
import {addIcon} from '../../style/assetsLink';
import Header from '../../common/components/Header';

const SubmitPhotos = props => {
  const {fetchOrders, submitPhotos, navigation, order} = props;
  const {showActionSheetWithOptions} = useActionSheet();
  const toast = useToast();
  const [photos, setPhotos] = useState([]);

  const handleOpenPhotoOptions = async () => {
    const options = ['Take Photo', 'Choose from Library', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    return showActionSheetWithOptions(
      {options, cancelButtonIndex},
      async buttonIndex => {
        let result = null;
        const mediaOptions = {mediaType: 'photo', selectionLimit: 0};
        switch (buttonIndex) {
          case 0:
            result = await launchCamera(mediaOptions);
            break;
          case 1:
            result = await launchImageLibrary(mediaOptions);
            break;
        }
        if (result.assets) {
          setPhotos([...photos, ...result.assets.map(a => a.uri)]);
        } else if (result.errorMessage) {
          toast.show({
            description:
              'There was a problem selecting your picture. Please try again.',
          });
        }
      },
    );
  };

  const handleSubmit = async () => {
    try {
      await submitPhotos(order.id, photos);
      toast.show({description: 'Photos were successfully submitted!'});
      navigation.replace('AssigneeDashboard');
    } catch (e) {
      toast.show({description: e.response.data.message});
    }
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
          <Text style={_styles.title}>Submit Photos</Text>
        </View>
        <View style={_styles.orderDetailsContainer}>
          <Text style={_styles.subTitle}>
            <Text style={_styles.subTitle}>Order:</Text> #{order.id}
          </Text>
          <Text style={_styles.subTitle}>
            <Text style={_styles.subTitle}>Address:</Text> {order.address}
          </Text>
          <Text style={_styles.subTitle}>
            <Text style={_styles.subTitle}>Requester:</Text>
            {' ' + order.requester.email}
          </Text>
        </View>
        <View style={_styles.photosContainer}>
          {photos.map((photo, i) => (
            <View style={_styles.photo} key={i}>
              <Image source={{uri: photo}} style={styles.imageContain} />
            </View>
          ))}
          <TouchableOpacity
            style={_styles.placeholderContainer}
            onPress={handleOpenPhotoOptions}>
            <Image source={addIcon} />
          </TouchableOpacity>
        </View>
        <View style={_styles.buttonContainer}>
          <Button onPress={handleSubmit}>Submit</Button>
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
  orderDetailsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  subTitle: {
    ...styles.baseText,
    fontSize: 20,
  },
  photosContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 10,
    alignSelf: 'flex-start',
    padding: 5,
    margin: 5,
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    backgroundColor: Color.light,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonContainer: {
    width: '75%',
    marginTop: 30,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {orders} = state;
  return {
    order: orders[ownProps.route.params.orderId],
  };
};

export default connect(mapStateToProps, {
  fetchOrders,
  submitPhotos,
})(SubmitPhotos);
