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
 
  fetch("https://api.g3studio.co/api/categories", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      setCategories(JSON.parse(result) )
      // console.log(categories)
    })
    .catch((error) => console.error(error));
  


  
  const handleCategoryPress = (categoryId, categoryName) => {
    console.log('Category Clicked:', categoryId); // Debugging ke liye
    navigation.navigate('ProductListScreen', { categoryId, categoryName });
  };


  const renderCategoryItem = ({ item  }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      activeOpacity={0.7}
      // onPress={() => handleCategoryPress(item.id)}
      onPress={() => handleCategoryPress(item.id, item.title)}
    >
      <Image 
        source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }}
        // source={{ uri: item.image }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryName}>{item?.title}</Text>
      {/* <Text style={styles.categoryName}>{item.name}</Text> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bannerContainer: {
    marginBottom: 10, // Space between banner and categories
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
