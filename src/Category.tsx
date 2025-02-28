// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity , SafeAreaView,} from 'react-native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Test from './Test';
// // import Sa from './Sa';
// // import Ss from './Ss';


// const images = [
//   { id: '1', uri: 'https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/14-Grocery-World.jpg?h=464&iar=0&w=1392&rev=2a4b13f3d92f4567bd71e474fbb178e7&hash=C4A1E457EC733D851253DD2E227DBD6B' },
//   { id: '2', uri: 'https://do3ujptrj0wby.cloudfront.net/media/wysiwyg/porto/homepage/slider/08/static/intpromo_home_d-block01_w04_tea_coffee_2.png' },
//   { id: '3', uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
// ];
// const categories = [
//   { id: '1', text: 'bavereges', uri: 'https://lahorebasket.com/cdn/shop/files/berevages_8f4146d0-926d-4900-b643-bb76b6c6996d_535x.png?v=1733911820' },
//   { id: '2', text: 'food', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '3', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '4', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '5', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '6', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '7', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '8', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: '9', text: 'coke', uri: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },

// ]


// export default function Category({navigation}) {
//   return (

// <SafeAreaProvider>
//     <SafeAreaView>
//       <FlatList
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         data={images}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity
//           onPress={()=>{navigation.navigate('Test')}}
//           // onPress={() => navigation.navigate(Test)}
//           >
//             <Image
//             //  onProgress={navigation.navigate(Sa)}
             
//               source={item}
//               /* Use item to set the image source */
//               key={index} /* Important to set a key for list items,
//                        but it's wrong to use indexes as keys, see below */
//               style={{
//                 width: 300,
//                 height: 200,
//                 borderRadius: 30,
//                 // borderWidth:2,
//                 // borderColor:'#d35647',
//                 // resizeMode:'contain',
//                 margin: 8,
//                 marginBottom:"25%"
//               }}
//             />
//           </TouchableOpacity>
//         )}
//       />

    
       



// {/* <SafeAreaView> */}
//         <FlatList
//           // scrollEnabled
//           // numColumns={3}
//           // horizontal={true} 
//           showsVerticalScrollIndicator={false} 
//           data={categories}
//           renderItem={({ item, index }) => (

//             <TouchableOpacity style={{}}>
//               <Image source={item}
//                  key={index}
//                 style={{
//                   // flexDirection:'column',
//                   width: 100,
//                   height: 100,
//                   // borderRadius: 30,
//                   // borderWidth:2,
//                   // borderColor:'#d35647',
//                   // resizeMode:'contain',
//                   // margin:8
//                 }}
//               />
               
//               <Text style={{ textAlign: 'center' }}>{item.text}</Text>
//             </TouchableOpacity>

//           )}
//         />
// {/* </SafeAreaView> */}

//       </SafeAreaView>
//       </SafeAreaProvider>
  

//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



{/* <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => <Item categories={item.text} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider> */}



// For api use 

//   import React, { useState, useEffect } from 'react';
// import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // for navigation
// import { SafeAreaView } from 'react-native-safe-area-context';

// const width = Dimensions.get('screen').width / 2 - 30;

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const navigation = useNavigation();

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('YOUR_CATEGORY_API_URL');
//         const data = await response.json();
//         setCategories(data); // assuming the API response contains a 'categories' array
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryPress = (categoryId) => {
//     // Navigate to the product list screen and pass the category ID
//     navigation.navigate('ProductList', { categoryId });
//   };

//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.categoryCard}
//       onPress={() => handleCategoryPress(item.id)}
//     >
//       <Image
//         source={{ uri: item.image }} // Assuming each category has an 'image' field
//         style={styles.categoryImage}
//       />
//       <Text style={styles.categoryName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>Categories</Text>
//       <FlatList
//         data={categories}
//         renderItem={renderCategoryItem}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2} // Display categories in two columns
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   categoryCard: {
//     backgroundColor: '#fff',
//     width: width,
//     marginBottom: 20,
//     borderRadius: 10,
//     elevation: 6,
//     alignItems: 'center',
//     padding: 10,
//   },
//   categoryImage: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     borderRadius: 10,
//   },
//   categoryName: {
//     marginTop: 10,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default Category;






// For dummy data use/ 


import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // for navigation
import { SafeAreaView } from 'react-native-safe-area-context';

const width = Dimensions.get('screen').width / 3 - 20; // Adjust width for 3 items in a row

const Category = ({  }) => {
  const [categories,setCategories] = useState([])
  const navigation = useNavigation();
  const myHeaders = new Headers();
  myHeaders.append("Cookie", "connect.sid=s%3AV7Ay1TVNb2vRSPaemZmFq8uOjIHSh8mk.ZgU58FihSoMEsDLaaEbnFVhRSdeMK1C1QVxT4maNx6s");
  
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
 
  fetch("http://52.74.115.234:5000/api/categories", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      setCategories(JSON.parse(result) )
      // console.log(categories)
    })
    .catch((error) => console.error(error));
  

  // const categories = [
  //   { id: 1, name: 'Bavereges', image: 'https://lahorebasket.com/cdn/shop/files/berevages_8f4146d0-926d-4900-b643-bb76b6c6996d_535x.png?v=1733911820' },
  //   { id: 2, name: 'Groccery', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 3, name: 'Baby care', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 4, name: 'Personal Care', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 5, name: 'Beauty', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 6, name: 'bakery', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 7, name: 'asseseries', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 8, name: 'Covers', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 9, name: 'Gift', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 10, name: 'Stationary', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 11, name: 'Dalein', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 12, name: 'Cards', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
  //   { id: 13, name: 'Cards', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
    
  // ];
  

  // const handleCategoryPress = (categoryId, categoryName) => {
  //   navigation.navigate('ProductListScreen', { categoryId, categoryName });
  // };
  
  const handleCategoryPress = (categoryId, categoryName) => {
    console.log('Category Clicked:', categoryId); // Debugging ke liye
    navigation.navigate('ProductListScreen', { categoryId, categoryName });
  };
  // const navigation = useNavigation();

  // Handle category press
  // const handleCategoryPress = (categoryId) => {
  //   // Navigate to the product list screen and pass the category ID
  //   navigation.navigate('ProductListScreen', { categoryId });
  // };

  const renderCategoryItem = ({ item  }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      activeOpacity={0.7}
      // onPress={() => handleCategoryPress(item.id)}
      onPress={() => handleCategoryPress(item.id, item.title)}
    >
      <Image 
        source={{ uri: "http://52.74.115.234:5000"+item.images[0]?.src }}
        // source={{ uri: item.image }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryName}>{item?.title}</Text>
      {/* <Text style={styles.categoryName}>{item.name}</Text> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Banner Image */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/14-Grocery-World.jpg?h=464&iar=0&w=1392&rev=2a4b13f3d92f4567bd71e474fbb178e7&hash=C4A1E457EC733D851253DD2E227DBD6B' }} // Replace with actual banner image URI
          style={styles.bannerImage}
        />
      </View>

      {/* Categories Header */}
      {/* <Text style={styles.header}>Categories</Text> */}

      {/* Categories List */}
      <FlatList
        data={categories["categories"]}
        // data={categories}
        renderItem={renderCategoryItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}  // Display 3 items per row
        columnWrapperStyle={{ justifyContent: 'space-evenly', }}  // Space between columns
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bannerContainer: {
    marginBottom: 20, // Space between banner and categories
  },
  bannerImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // Ensure the image covers the available space
    borderRadius: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryCard: {
    // backgroundColor: '#fff',
    width: width,
    marginBottom: 20,
    // borderRadius: 10,
    // elevation: 6,
    alignItems: 'center',
    // padding: 10,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  categoryName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Category;
