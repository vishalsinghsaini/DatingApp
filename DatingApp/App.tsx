import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions, ImageBackground, FlatList, ScrollView, TouchableOpacity, SafeAreaView, LogBox } from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';
const pages = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];
import { GlassView } from '@metafic-co/react-native-glassmorphism'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
  const imageArray = [
    {
      uri: require('./assets/images/karinaTessProfilePic.png'),
    },
    {
      uri: require('./assets/images/karinaTessProfilePic.png'),
    },
    {
      uri: require('./assets/images/karinaTessProfilePic.png'),
    },
    {
      uri: require('./assets/images/karinaTessProfilePic.png'),
    },
  ]

  const flatListData = [
    {
      uri: require('./assets/images/HighVoltage.png'),
      label: '2 km away'
    },
    {
      uri: require('./assets/images/Pushpin.png'),
      label: 'Level 3'
    },
    {
      uri: null,
      label: 'Long-Term'
    },
  ]
  const aboutMe = [
    {
      uri: require('./assets/images/Women.png'),
      label: 'Women'
    },
    {
      uri: require('./assets/images/Om.png'),
      label: 'Hindu'
    },
    {
      uri: require('./assets/images/Taurus.png'),
      label: 'Taurus'
    },
    {
      uri: require('./assets/images/BeerMugs.png'),
      label: 'Never'
    },
    {
      uri: require('./assets/images/Cigarette.png'),
      label: 'Sometimes'
    },
  ]
  const interests = [
    {
      uri: require('./assets/images/Headphone.png'),
      label: 'Music'
    },
    {
      uri: require('./assets/images/Notebook.png'),
      label: 'Books'
    },
    {
      uri: require('./assets/images/Weights.png'),
      label: 'Gym'
    },
  ]

  const renderAboutMe = ({ item, index }) => {
    return (
      <View style={[styles.shadowProp, styles.subcards]}>
        <ImageBackground
          source={aboutMe?.[index]?.uri}
          style={{
            width: 21,
            height: 21,
            marginRight: 7
          }}
        />
        <Text>{item.label}</Text>
      </View >
    )
  }
  const renderInterests = ({ item, index }) => {
    return (
      <View style={[styles.shadowProp, styles.subcards]}>
        <ImageBackground
          source={interests?.[index]?.uri}
          style={{
            width: 21,
            height: 21,
            marginRight: 7
          }}
        />
        <Text>{item.label}</Text>
      </View>
    )
  }
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Animated.ScrollView
            horizontal={true}
            pagingEnabled={true}
            style={{
              // width: 376,
              height: 382,
              borderRadius: 22,
              marginTop: 10,
              // marginHorizontal: 16
            }}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true,
            })}
          >
            {pages.map((page, index) => (
              <View key={index} style={[styles.page, { width, height }]}>
                <ImageBackground
                  source={imageArray?.[index]?.uri}
                  style={{
                    width: 376,
                    height: 382
                  }}
                >
                  <View style={styles.pageIndicator}>
                    <PageIndicator count={pages.length} current={animatedCurrent} variant={'train'} color={'white'} />
                  </View>

                  <View style={{ flexDirection: 'row', top: 340, marginLeft: 17 }}>
                    {flatListData.map((item, index) => (
                      <GlassView glassStyle={{
                        paddingHorizontal: 12, paddingVertical: 8,
                        borderRadius: 16, marginRight: 9, flexDirection: 'row', alignItems: 'center'
                      }}>
                        {flatListData?.[index]?.uri && <ImageBackground
                          source={flatListData?.[index]?.uri}
                          style={{
                            width: 18,
                            height: 18
                          }}
                        />}
                        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>
                          {item.label}
                        </Text>
                      </GlassView>
                    ))}
                  </View>

                </ImageBackground>
              </View>
            ))}

          </Animated.ScrollView>
        </View>

        <View style={[styles.common, styles.shadowProp]}>
          <View>
            <Text style={styles.heading}>
              Bio
            </Text>
          </View>
          <Text style={{ marginBottom: 7 }}>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form. Lorem ipsum is a placeholder text used to demonstrate the visual form
          </Text>
          <View>
            <Text style={styles.heading}>
              About Me
            </Text>
            <FlatList
              numColumns={3}
              data={aboutMe}
              contentContainerStyle={{ marginLeft: 5 }}
              key={(_, index) => index?.toString()}
              renderItem={renderAboutMe}
            />
          </View>
        </View>

        <View style={[styles.common, styles.shadowProp, { marginBottom: 100 }]}>
          <View>
            <Text style={styles.heading}>
              Common Interests
            </Text>
            <FlatList
              numColumns={3}
              data={interests}
              contentContainerStyle={{ marginLeft: 5 }}
              key={(_, index) => index?.toString()}
              renderItem={renderInterests}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginHorizontal: 57, borderRadius: 10, paddingHorizontal: 74, paddingVertical: 16, height: 50, backgroundColor: '#736CD3', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 10 }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          Send Message
        </Text>
      </TouchableOpacity>
    </>
  )
}

const ProfileMatchScreen = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
  useEffect(() => {
    const animation = Animated.timing(rotateValue, {
      toValue: 1,
      duration: 3000, // Duration of one complete rotation in milliseconds
      useNativeDriver: true,
    });

    animation.start();

    // Stop the animation after one complete rotation
    const stopAnimation = () => {
      rotateValue.stopAnimation();
    };

    setTimeout(stopAnimation, 3000); // Stop after 3 seconds

    return () => {
      stopAnimation(); // Cleanup on unmount
    };
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const navigateToProfileScreen = () => navigation.navigate('Profile')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginBottom: 52, marginHorizontal: 16 }}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ImageBackground
            source={require('./assets/images/Girl.png')}
            style={{ height: 178, width: 178, marginTop: 80, zIndex: 5 }}
          />
          <ImageBackground
            source={require('./assets/images/Heart.png')}
            style={{ height: 28, width: 28, position: 'absolute', marginTop: 80, marginLeft: 162, zIndex: 10 }}
          />
        </Animated.View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ImageBackground
            source={require('./assets/images/Thread.png')}
            style={{ height: 178, width: 178, marginTop: -40, left: 60, zIndex: 0 }}
          />
        </Animated.View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ImageBackground
            source={require('./assets/images/Boy.png')}
            style={{ height: 178, width: 178, alignSelf: 'flex-end', right: 40, marginTop: -40, zIndex: 5 }}
          />
        </Animated.View>
      </View>
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 24, marginBottom: 5 }}>
        Congratulations!
      </Text>
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: '400', fontSize: 15, opacity: 0.5 }}>
        You and nancy liked each other
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={navigateToProfileScreen}
        style={{ marginHorizontal: 57, borderRadius: 10, paddingHorizontal: 74, paddingVertical: 16, height: 50, backgroundColor: '#736CD3', justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 50 }}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
          Go to profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

LogBox.ignoreAllLogs()
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'ProfileMatch'}>
        <Stack.Screen
          name="ProfileMatch"
          component={ProfileMatchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  pageIndicator: {
    top: 20,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
  },
  common: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 22,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subcards: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 16,
    marginBottom: 12
  }
});

export default App;