// import React,  {useState, useEffect} from 'react';
// import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity, 
// FlatList, Dimensions, SafeAreaView, TextInput } from 'react-native';
// import Sa from './Sa';
// import CategoryView from "./ChategoryView"
// import DiscountBanners from './DiscountBanners';
// import PrListbyCategory from './PrListbyCategory';
// import FourinOneBanner from './FourinOneBanner';
// import { useNavigation } from "@react-navigation/native";


// const { width } = Dimensions.get('window');

// type Banner = {
//   id: number;
//   imageUrl: string;
//   link: string;
//   position: number;
//   type: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type ApiResponse = {
//   banners: Banner[];
// };

// const Home = ({})   => {
//   const navigation = useNavigation();
  
//      const [banners, setBanners] = useState<Banner[]>([]);
//      const [loading, setLoading] = useState<boolean>(true);

     
//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     try {
//       const response = await fetch('http://192.168.18.31:5000/api/banners');   
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data: ApiResponse = await response.json();
//       setBanners(data.banners); // Set the banners array
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }: { item: Banner }) => (
//     <TouchableOpacity 
//     activeOpacity={0.8}
//     onPress={()=>{navigation.navigate('Test')}} 
//     style={styles.slide} >
//       <Image 
      
//       source={{ uri: item.imageUrl }} style={styles.image} />
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

  



//   return (
//     <SafeAreaView > 
//       <ScrollView>
//     {/* <SafeAreaView style={styles.container}> */}
//       <StatusBar backgroundColor={"#EC4505"} />
//       <FlatList 
        
//         data={banners}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//       />
//        {/* </SafeAreaView> */}
     
//         <TouchableOpacity style={{ margin: 10 }}>
//               <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                
       
//                 <TouchableOpacity   onPress={()=>{navigation.navigate('Search')}}
//                   style={{
                    
//                     // flex: 1,
//                     flexDirection: 'row',  alignItems: 'center',
//                     width:'95%',
//                     height:"100%",
//                     paddingTop: 10,
//                     paddingRight: 10,
//                     paddingBottom: 10,
//                     paddingLeft: 10,
//                     // height:45,
//                     backgroundColor: '#fff',
//                     // color: '#424242',
//                     // borderColor:'gray',
//                     borderRadius: 25,
//                     borderWidth: 0.5,
                    
//                   }}>
//                     <Image source={require('../assets/searchbar.png')}
//                   style={{ width: 20, height: 20, }}
//                 />
//                  <Text style={{fontSize:15, paddingLeft:5, }}>Search</Text>
//                  </TouchableOpacity>
                 
//       </View>
//       </TouchableOpacity>

//       <CategoryView/>
     
//       <DiscountBanners/>

// {/* <PrListbyCategory /> */}
// <PrListbyCategory route={{ params: { categoryId: 1 } }} />

// <FourinOneBanner />
// {/* <PrListbyCategory/> */}
// <PrListbyCategory route={{ params: { categoryId: 2 } }} />




//       {/* <DiscountBanners/> */}
// {/* <PrListbyCategory/> */}
// {/* <PrListbyCategory/> */}




// </ScrollView>
//     </SafeAreaView>
//   );
// };





// const styles = StyleSheet.create({

//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slide: {
//     width,
//     // justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: width * 0.9,
//     height: 200,
//     borderRadius: 20,
//   },
// });

// export default Home




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
import Sa from './Sa';
import CategoryView from './ChategoryView';
import DiscountBanners from './DiscountBanners';
import PrListbyCategory from './PrListbyCategory';
import FourinOneBanner from './FourinOneBanner';
import { useNavigation } from '@react-navigation/native';
import { usePushNotifications } from '../usePushNotifications';

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
  const {expoPushToken, notification} = usePushNotifications();
  const data = JSON.stringify(notification, undefined,2);

  const navigation = useNavigation();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList<Banner>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBanners();
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
      const response = await fetch('http://192.168.18.31:5000/api/banners');
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

  const renderItem = ({ item }: { item: Banner }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Test');
      }}
      style={styles.slide}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor={'#EC4505'} />
        <Text>Token: {expoPushToken?.data ?? ""}</Text>
        <Text>{data}</Text>
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
        <PrListbyCategory route={{ params: { categoryId: 1 } }} />
        <FourinOneBanner />
        <PrListbyCategory route={{ params: { categoryId: 2 } }} />
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

