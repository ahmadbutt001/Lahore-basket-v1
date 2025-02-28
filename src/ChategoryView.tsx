// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

// type CategoryItem = {
//   name: string;
//   imageUrl: string;
  
// };

// type Category = {
//   title: string;
//   imageUrl: string;
//   items: CategoryItem[];
// };

// type ApiResponse = {
//   categories: Category[];
// };

// const CategoryView: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('https://dummyjson.com/products/category-list');
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
        
//       }
//       const data: ApiResponse = await response.json();
//       setCategories(data.categories);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       // (console.log);
//       setLoading(false);
//     }
//   };
// //   fetch('https://dummyjson.com/products/category-list')
// // .then(res => res.json())
// // .then(console.log);

//   const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       {/* <Image source={{ uri: item.imageUrl }} style={styles.itemImage} /> */}
//       <Text style={styles.itemText}>{item.name}</Text>
//       <Text>heyxaskdjaldaldnslkcnsdl</Text>

//     </TouchableOpacity>
//   );

//   const renderCategory = ({ item }: { item: Category }) => (
//     <View style={styles.categoryContainer}>
//       <Text style={styles.categoryTitle}>{item.title}</Text>
//       <Text>heyxaskdjaldaldnslkcnsdl</Text>

//       <FlatList
//         data={item.items}
//         renderItem={renderCategoryItem}
//         keyExtractor={(item) => item.name}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text>heyxaskdjaldaldnslkcnsdl</Text>
//       <FlatList
//         data={categories}
//         renderItem={renderCategory}
//         keyExtractor={(item) => item.title}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   categoryContainer: {
//     marginBottom: 20,
//   },
//   categoryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   itemContainer: {
//     marginRight: 15,
//     alignItems: 'center',
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   itemText: {
//     marginTop: 5,
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });

// export default CategoryView;








// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   SafeAreaView,
//   Image,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Define the type for a category
// type Category = {
//   id?: number; // Made optional to handle undefined cases
//   name: string;
//   image?: string; // Optional image field
// };

// // Define the type for the API response
// type ApiResponse = Category[];

// const CategoryView = ({  }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('https://dummyjson.com/products/category-list');
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("API Response:", data); // Debugging output
  
//       // Ensure proper data extraction
//       if (Array.isArray(data.categories)) {
//         setCategories(data.categories.filter(category => category.id !== undefined));
//       } else {
//         console.error("Unexpected API response format:", data);
//       }
  
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }: { item: Category }) => (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       // onPress={() => item.id && navigation.navigate('CategoryDetail', { categoryId: item.id })}
//       style={styles.slide}
//     >
//       <Image
//         source={{ uri: item.image || 'https://via.placeholder.com/150' }}
//         style={styles.image}
//       />
//       <Text style={styles.categoryName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#EC4505" />
//       <FlatList
//         data={categories}
//         renderItem={renderItem}
//         keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} // Fallback for missing id
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slide: {
//     width,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: width * 0.9,
//     height: 200,
//     borderRadius: 20,
//     resizeMode: 'cover',
//   },
//   categoryName: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color:'red'
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CategoryView;





import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('window');

// Local category data
// const categories = [
//   { id: 1, categoryId: 1, name: 'Bavereges', image: 'https://lahorebasket.com/cdn/shop/files/berevages_8f4146d0-926d-4900-b643-bb76b6c6996d_535x.png?v=1733911820' },
//   { id: 2, name: 'Groccery', image: 'https://lahorebasket.com/cdn/shop/files/personal_care_a1412c18-2320-4055-8cc8-973ec982123f_535x.png?v=1733911820' },
//   { id: 3, name: 'Baby Care', image: 'https://lahorebasket.com/cdn/shop/files/baby_care_5f257735-fe0a-4901-8330-be1556afaaa0_535x.png?v=1733911820' },
//   { id: 4, name: 'Beauty', image: 'https://lahorebasket.com/cdn/shop/files/house_care_d8ab1266-72ca-4e37-bafe-ac186b1f2250_535x.png?v=1733911820' },
//   { id: 5, name: 'Personal Care', image: 'https://lahorebasket.com/cdn/shop/files/dairy_9c94e96c-875b-49c8-bb09-8cd674db0aac_535x.png?v=1733911820' },
//   { id: 6, name: 'Sports', image: 'https://lahorebasket.com/cdn/shop/files/vegetable_535x.png?v=1733911820' },
//   { id: 7, name: 'Meets', image: 'https://lahorebasket.com/cdn/shop/files/meat_5d2c13de-8094-4930-a57b-b378c906af55_535x.png?v=1733911820' },
//   { id: 8, name: 'Sports', image: 'https://lahorebasket.com/cdn/shop/files/party_4bd1f835-fe95-475a-9119-678a72f4e53e_535x.png?v=1733911820' },
//   { id: 9, name: 'Stationary', image: 'https://lahorebasket.com/cdn/shop/files/staionary_535x.png?v=1733911820' },
//   { id: 10, name: 'Gifts', image: 'https://lahorebasket.com/cdn/shop/files/birthday_1febc93d-0b0d-48d5-acf7-d8be3df8e0b6_535x.png?v=1733911820' },
//   { id: 11, name: 'Dalein', image: 'https://lahorebasket.com/cdn/shop/files/birthday_1febc93d-0b0d-48d5-acf7-d8be3df8e0b6_535x.png?v=1733911820' },
// ];

const CategoryView = ({  }) => {
const navigation = useNavigation();

  const [categories,setCategories] = useState([])
// const myHeaders = new Headers();
// myHeaders.append("Cookie", "connect.sid=s%3AV7Ay1TVNb2vRSPaemZmFq8uOjIHSh8mk.ZgU58FihSoMEsDLaaEbnFVhRSdeMK1C1QVxT4maNx6s");

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };

// fetch("http://52.74.115.234:5000/api/categories", requestOptions)
//   .then((response) => response.text())
//   .then((result) => {
//     setCategories(JSON.parse(result) )
//     // console.log(categories)
//   })
//   .catch((error) => console.error(error));  


  const handleCategoryPress = (categoryId, categoryName) => {
    console.log('Category Clicked:', categoryId); // Debugging ke liye
    navigation.navigate('ProductListScreen', { categoryId, categoryName });
  };


  const renderItem = ({ item  }) => (
    console.log(item),
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => navigation.navigate('ProductListScreen', { categoryId: item.id })}
      onPress={() => handleCategoryPress(item.id, item.title)}
      // onPress={() => navigation.navigate(Checkout)}
      // onPress={() => navigation.navigate('Tab', { screen: 'Cart' })}
      style={styles.categoryCard}
    >
      <Image 
      // source={{ uri: item.image }}
      source={{ uri: "http://52.74.115.234:5000"+item.images[0]?.src }}
       style={styles.image} />
      <Text style={styles.categoryName}>{item?.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
        </View>

      <View style={{width:"85%", borderWidth:1, alignSelf:'center', borderColor:'#D9D9D9' }}>

        </View>

      <FlatList
        // data={categories}
        data={categories["categories"]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius:30,
    width:"95%",
    alignSelf:'center',
    elevation:5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#EC4505',
    fontWeight: 'bold',
  },
  listContainer: {
    // paddingHorizontal: 10,
  },
  categoryCard: {
    width: width * 0.3,
    // backgroundColor: '#fff',
    // borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    // marginRight: 15,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
  },
  image: {
    width: '80%',
    height: 70,
    // borderRadius: 10,
    resizeMode: 'cover',
  },
  categoryName: {
    // marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryView;
