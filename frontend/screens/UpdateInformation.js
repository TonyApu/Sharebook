/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import * as UserServices from '../services/user-services';
import {UserApiContext} from '../contexts/AuthContext';

const UpdateInformation = ({navigation}) => {
  const [currentUser] = useContext(UserApiContext);
  const [fullname, setFullname] = React.useState(currentUser.name);
  const [username, setUsername] = React.useState(currentUser.name);
  const [address, setAddress] = React.useState(currentUser.address);
  const [email, setEmail] = React.useState(currentUser.email);
  const [phone, setPhone] = React.useState(currentUser.phoneNumber);
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState('01');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');
  const [selectedWard, setSelectedWard] = React.useState('');

  const [cityOptions, setCityOptions] = React.useState([]);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [wardOptions, setWardOptions] = React.useState([]);

  React.useEffect(() => {
    // Fetch City
    fetch('https://vapi.vnappmob.com/api/province/')
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setCityOptions(data.results);
          setWardOptions([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (selectedCity) {
      // Fetch quan huyen
      fetch(`https://vapi.vnappmob.com/api/province/district/${selectedCity}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setDistrictOptions(data.results);
            setWardOptions([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedCity]);

  React.useEffect(() => {
    if (selectedDistrict) {
      // Fetch xa phuong
      fetch(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setWardOptions(data.results);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedDistrict]);

  const getProvinceName = async () => {
    let provinceList = [];
    await fetch('https://vapi.vnappmob.com/api/province/')
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          provinceList = data.results;
        }
      })
      .catch(err => {
        console.log(err);
      });
    return provinceList.find(p => p.province_id === selectedCity).province_name;
  };

  const getDistrictName = async () => {
    let districtList = [];
    await fetch(
      `https://vapi.vnappmob.com/api/province/district/${selectedCity}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          districtList = data.results;
        }
      })
      .catch(err => {
        console.log(err);
      });
    return districtList.find(p => p.district_id === selectedDistrict)
      .district_name;
  };

  const getWardName = async () => {
    let wardList = [];
    await fetch(
      `https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          wardList = data.results;
        }
      })
      .catch(err => {
        console.log(err);
      });
    return wardList.find(p => p.ward_id === selectedWard).ward_name;
  };


  
  function renderInformationForm() {
    return (
      <ScrollView>
        {/* Title label */}
        <View style={{padding: SIZES.padding}}>
          {/* Fullname input text */}
          <View>
            <Text style={{...FONTS.body5}}>Ho?? va?? t??n: </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={fullname}
              onChangeText={setFullname}
            />
          </View>

          {/* Username input text */}
          <View>
            <Text style={{...FONTS.body5}}>T??n ????ng nh????p:</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Email input text */}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>Email: </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Phone input text  */}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>S???? ??i????n thoa??i: </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* City picker */}
          <View>
            <View>
              <Text style={{...FONTS.body5, marginTop: 5}}>
                Ti??nh/Tha??nh ph????:
              </Text>
            </View>
            
            <Picker
              selectedValue={selectedCity}
              style={{height: 40}}
              onValueChange={itemValue => setSelectedCity(itemValue)}
              >
                
   
              {cityOptions.map(op => (
                <Picker.Item
                  key={op.province_id}
                  label={op.province_name}
                  value={op.province_id}
                  
                />
              ))}
              {/* <Picker.Item label="Tp. H???? Chi?? Minh" value="hochiminh" />
              <Picker.Item label="Ha?? N????i" value="hanoi" />
              <Picker.Item label="??a?? N????ng" value="danang" /> */}
            </Picker>
          </View>

          {/* District picker */}
          <View>
            <View>
              <Text style={{...FONTS.body5, marginTop: 5}}>Qu????n/huy????n:</Text>
            </View>

            <Picker
              selectedValue={selectedDistrict}
              style={{height: 40}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDistrict(itemValue)
              }>
              {districtOptions.map(op => (
                <Picker.Item
                  key={op.district_id}
                  label={op.district_name}
                  value={op.district_id}
                />
              ))}
            </Picker>
          </View>

          {/* Ward picker */}
          <View>
            <View>
              <Text style={{...FONTS.body5, marginTop: 5}}>Xa??/ph??????ng:</Text>
            </View>

            <Picker
              selectedValue={selectedWard}
              style={{height: 40}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedWard(itemValue)
              }>
              {wardOptions.map(op => (
                <Picker.Item
                  key={op.ward_id}
                  label={op.ward_name}
                  value={op.ward_id}
                />
              ))}
             
            </Picker>
          </View>

          {/* Address input text */}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>??i??a chi??: </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Confirm Button */}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.brown,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.padding,
            }}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {navigation.goBack();
            ToastAndroid.show('C???p Nh???t Th??nh C??ng', ToastAndroid.LONG)}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body2}}>
                  C???p Nh???t
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fb'}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Thay ?????i Th??ng Tin"
        goBack={() => navigation.goBack()}
      />

      {/*information*/}
      <View style={{flex: 1}}>{renderInformationForm()}</View>
    </SafeAreaView>
  );
};

export default UpdateInformation;
