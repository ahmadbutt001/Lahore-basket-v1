import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import CategoryView from './ChategoryView';
import DiscountBanners from './DiscountBanners';
import PrListbyCategory from './PrListbyCategory';
import FourinOneBanner from './FourinOneBanner';
import { useNavigation } from '@react-navigation/native';
import * as Network from "expo-network";
import Promotionhomeview from './Promotionhomeview';
import OrderSuccess from './OrderSuccess';
// import { usePushNotifications } from '../usePushNotifications';

const { width } = Dimensions.get('window');

type Banner = {
  id: number;
  imageUrl: string;
  link: string;
  position: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  banners: Banner[];
};

const Home = () => {
  const [networkStatus, setNetworkStatus] = useState(null);

  const checkNetwork = async () => {
    const status = await Network.getNetworkStateAsync();
    console.log("📡 Network Status:", status);
    setNetworkStatus(status.isConnected ? "Connected" : "No Internet");
  };

  useEffect(() => {
    checkNetwork();
  }, []);
  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener(notification => {
  //     console.log('Notification received in HomeScreen:', notification);
  //   });

  //   return () => subscription.remove();
  // }, []);
  // const {expoPushToken, notification} = usePushNotifications()
  // console.log(expoPushToken)
  // ;
  // const data = JSON.stringify(notification, undefined,2);

  const navigation = useNavigation();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [category, setCategory] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList<Banner>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBanners();
    fetchcate();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (banners.length > 0) {
        const nextIndex = (currentIndex + 1) % banners.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      }
    }, 3000); // Change the interval time as needed (3000ms = 3 seconds)

    return () => clearInterval(interval);
  }, [banners.length, currentIndex]);

  const fetchBanners = async () => {
    try {
      const response = await fetch('https://api.g3studio.co/api/banners');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setBanners(data.banners);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setLoading(false);
    }
  };
  const fetchcate = async () => {
    try {
      const response = await fetch('https://api.g3studio.co/api/categories');
      const data: ApiResponse = await response.json();
      console.log(data?.categories)
      setCategory(data?.categories)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // setCategory(data.categories.title);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setLoading(false);
    }
  };
  const renderItem = ({ item }: { item: Banner }) => (
    <>
    {item?.type == "GENERAL"? <>
      <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => {
      //   navigation.navigate('Test');
      // }}
      style={styles.slide}
    >
      <Image
      //  source={{ uri: item.imageUrl }}
       source={{ uri: "https://api.g3studio.co/"+item?.imageUrl}}
        style={styles.image} 
       />
    </TouchableOpacity></>:<></>}
    
    </>  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor={'#EC4505'} />
        {/* <Text>Token: {expoPushToken?.data ?? ""}</Text>
        <Text>{data}</Text> */}
        <FlatList
          ref={flatListRef}
          data={banners}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScrollToIndexFailed={() => {
            // Handle scroll failure if needed
          }}
        />
        <TouchableOpacity style={{ margin: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
                height: '100%',
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                backgroundColor: '#fff',
                borderRadius: 25,
                borderWidth: 0.5,
              }}
            >
              <Image source={require('../assets/searchbar.png')} style={{ width: 20, height: 20 }} />
              <Text style={{ fontSize: 15, paddingLeft: 5 }}>Search</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <CategoryView />
        <DiscountBanners />
        <Promotionhomeview route={{params:{}}} />
        <FourinOneBanner />
        {category.map((cate)=>{
          return(
            <PrListbyCategory route={{ params: { categoryId:cate.id}  }} />
          )
        })}
        {/* <PrListbyCategory route={{ params: { categoryId: 1}  }} /> */}
        
        {/* <PrListbyCategory route={{ params: { categoryId: 7 } }} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: 200,
    borderRadius: 20,
  },
});

export default Home;

