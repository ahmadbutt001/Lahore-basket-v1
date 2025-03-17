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



const CategoryView = ({  }) => {
const navigation = useNavigation();

  const [categories,setCategories] = useState([])
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
    setCategories(JSON.parse(result))
    // console.log(categories)
  })
  .catch((error) => console.error(error));  




  const handleCategoryPress = (categoryId, categoryName) => {
    console.log('Category Clicked:', categoryId); // Debugging ke liye
    navigation.navigate('ProductListScreen', { categoryId, categoryName });
  };


  const renderItem = ({ item  }) => (
    // console.log(item),
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleCategoryPress(item.id, item.title)}
      style={styles.categoryCard}
    >
      <Image 
      // source={{ uri: item.image }}
      source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }}
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
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: '80%',
    height: 70,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryView;
