/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import OnBoarding from '../components/OnBoarding';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import HeaderNavigation from '../components/HeaderNavigation';

const ExchangeDetail = ({route, navigation}) => {
  const [book, setBook] = React.useState(null);
  const LineDivider = () => {
    return (
      <View style={{width: 1, paddingVertical: 5}}>
        <View
          style={{
            flex: 1,
            borderColor: COLORS.white,
            borderLeftWidth: 1,
          }}
        />
      </View>
    );
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-shadow
    let {book} = route.params;
    setBook(book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.lightGray2,
            flex: 1,
          }}>
          <OnBoarding book={book} />
          <View
            style={{
              margin: 5,
              position: 'absolute',
              bottom: SIZES.padding,
              right: SIZES.padding,
              width: 25,
              height: 25,
              color: 'tomato',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FullScreenImage', {book: book})
              }>
              <Image
                source={icons.zoom_icon}
                resizeMode="contain"
                style={{width: 40, height: 40, tintColor: COLORS.lightGray4}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderBookInformation() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: SIZES.padding,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Location */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={icons.location_icon}
                resizeMode="contain"
                style={{width: 25, height: 25, tintColor: COLORS.black}}
              />
              <Text style={{...FONTS.h4, color: COLORS.brown}}>
                Th??nh ph??? Th??? ?????c
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 15,
                }}
                onPress={() => console.log('Bookmark')}>
                <Image
                  source={icons.bookmark_icon}
                  resizeMode="contain"
                  style={{width: 25, height: 25, tintColor: COLORS.black}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Title and Author */}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={{...FONTS.h2, color: COLORS.brown}}>{book.name}</Text>
            <Text style={{...FONTS.body4, color: COLORS.black}}>
              {book.author}
            </Text>
          </View>

          {/* Book Info */}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightBrown,
            }}>
            {/* Rating */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>90%</Text>
              <Text style={{...FONTS.body4, color: COLORS.white}}>????? m???i</Text>
            </View>

            <LineDivider />

            {/* Pages */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: SIZES.radius,
                alignItems: 'center',
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>
                {book.pageNum}
              </Text>
              <Text style={{...FONTS.body4, color: COLORS.white}}>Trang</Text>
            </View>

            <LineDivider />

            {/* Language */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>
                {book.language}
              </Text>
              <Text style={{...FONTS.body4, color: COLORS.white}}>
                Ng??n ng???
              </Text>
            </View>
          </View>

          {/* More Information */}
          <View style={{paddingTop: SIZES.padding}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>Ph????ng th???c trao ?????i:</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                G???p tr???c ti???p
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>Ch??? s??ch:</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                Quang Doan
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>S??? ??i???n tho???i</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                032987979
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>Gi?? b??a:</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                100.000VND
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>?????i cu???n:</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                Tr??n ???????ng B??ng
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Create Transfer Request */}
        <TouchableOpacity
          style={{
            flex: 3,
            backgroundColor: COLORS.lightBrown,
            marginRight: 5,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Create Transfer Request')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Ch???p nh???n</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 3,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: 5,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Create Transfer Request')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>T??? ch???i</Text>
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray4,
            marginLeft: 5,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            console.log('Chat');
            navigation.navigate('ChatRoom');
          }}>
          <Image
            source={icons.chat_icon}
            resizeMode="contain"
            style={{width: 25, height: 25, tintColor: COLORS.lightGray2}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Navigation Header */}
        <HeaderNavigation
          headerName="Th??ng Tin S??ch"
          goBack={() => navigation.goBack()}
        />
        {/* Book Image Section */}
        <View style={{flex: 4}}>{renderBookInfoSection()}</View>
        {/* Information Section */}
        <View
          style={{
            flex: 4,
            backgroundColor: COLORS.white,
          }}>
          {renderBookInformation()}
        </View>
        {/* Buttons */}
        <View style={{flex: 1}}>{renderBottomButton()}</View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default ExchangeDetail;
