import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext,  } from '../src/CartContext'; // Adjust the path as needed
const width = Dimensions.get('screen').width / 2 - 50;


const Promotionhomeview = ({ route,  }:any) => {
    const cartContext = useContext(CartContext);
  
      const { 
        cart = [], 
        addToCart = () => {}, 
        removeFromCart = () => {}, 
        updateQuantity = () => {}, 
        cartQuantity = 0 
      } = cartContext || {};
    // const { categoryId, categoryName } = route.params;
      // const [cart, setCart] = useState<any[]>([]); // Assuming a simple cart array
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const { categoryId } = route.params; // Extract categoryId from route.params

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          'Cookie',
          'connect.sid=s%3AYw3XBWtmq5f_kcPo6hwcDU9eR-qsQ1M8.4%2FMgGh2UaGj2MmET0UrZMyDKy6QF9U3Pv8eylpjnX7g; connect.sid=s%3ApIyeCFksZcmYu8CZsBG5PuYgzcSURJNk.mFCiv1xb923itxZjFEJ0GkE0loJZVmkOHGy6Vttchsk'
        );

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        // Fetch category name
        const categoryResponse = await fetch(
          `https://api.g3studio.co/api/categories/${categoryId}`,
          requestOptions
        );
        const categoryResult = await categoryResponse.json();
        setCategoryName(categoryResult.name); // Set the category name

        // Fetch products for the category
        const productsResponse = await fetch(
          `https://api.g3studio.co/api/products?categoryId=${categoryId}`,
          requestOptions
        );
        const productsResult = await productsResponse.json();
        setProducts(productsResult); // Set the products
        // console.log(productsResult)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();  
  }, [categoryId]);


  

  const Card = ({ item }:any) => {
    const discountPercentage = Math.round(
      ((item?.variants[0].price - item?.variants[0].discountPrice) / item?.variants[0].price) * 100
    );
   
    return (
    <>
    
    {item.variants[0].discount == true?
    <SafeAreaView>
        <TouchableOpacity style={{ marginBottom: 0, marginTop: 5, }}
    
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DetailsScreen', item)}>
    
    
    
          <View style={styles.card}>
    
    
            <View
              style={{
                height: 70,
                alignItems: 'center',
              }}>
              <Image
                // source={{ uri: item.image }}
        source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }}

                style={{
                  resizeMode: 'contain', height: "100%", width: "100%"
    
                }}
              />
    
            </View>
    
            {item?.variants[0].discountPrice && item?.variants[0].price >  item?.variants[0].discountPrice && (
              <View style={{
                height: 30,
                width: '25%',
                backgroundColor: "#EC4505",
                borderEndStartRadius: 10,
                borderBottomEndRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',  
                position: 'absolute',
    
              }}>
    
                <Text style={{ color: 'white', fontSize: 14 }}>{discountPercentage}%</Text>
    
              </View>)}
    
    
    
    
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, textAlign: 'center' }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item?.title}
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#EC4505' }}>
                {/* Rs. {items.price} */}
                Rs. {item?.variants[0].discountPrice ? item.variants[0].discountPrice : item?.variants[0].price}
              </Text>
    
            </View>
    
          </View>
        
        
            {cart.some((cartItem) => cartItem.id === item.id) ? (
              // If item is already in cart, show quantity buttons
              <View style= {styles.quantityContainer} >
                <TouchableOpacity  
                onPress={() => {
      const currentItem = cart.find((cartItem) => cartItem.id === item.id);
      if (currentItem && currentItem.quantity > 1) {
        updateQuantity(item.id, currentItem.quantity - 1);
      } else {
        removeFromCart(item.id); // Agar quantity 1 hai, toh item remove ho jaye
      }
    }} style={styles.quantityBtn}>
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>
                {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 1}
                </Text>
                
                <TouchableOpacity
                 onPress={() => {
      const currentItem = cart.find((cartItem) => cartItem.id === item.id);
      if (currentItem) {
        updateQuantity(item.id, currentItem.quantity + 1);
      }
    }}  style={styles.quantityBtn}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // If item is NOT in cart, show "Add to Cart" button
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartBtn}>
 <View
              style={{
                
                alignSelf:'center',
                height: 25,
                width,
                backgroundColor: "#FCD6C7",
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
    
              }}
              >
              <Image
                style={{ height: 20, width: 20 }}
                source={require('../assets/Fast Cart.png')}
              />
    
            </View>
              </TouchableOpacity>
            )}
         
        </TouchableOpacity>
        </SafeAreaView>
    :<></> }
    
    </>
    
    
    
      );


    }






  return (
    <View style={styles.container}>
      {/* Top Header - Category Name & See All */}
      <View style={styles.header}>
        {/* <Text style={styles.title}>{categoryName}</Text> */}
        <Text style={styles.title}>Promotions</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Promotions")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Gray Separator */}
      <View style={styles.separator} />

  
        <FlatList
                                          style={{}}
                                          // columnWrapperStyle={{ justifyContent: 'space-between' }}
                                          showsHorizontalScrollIndicator={false}
                                          // numColumns={2}
                                          horizontal
                                          data={products["products"]}
                                          // data={products}
                                          renderItem={({ item }) => <Card item={item} />}
                                        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 15,
    marginTop:15,
    borderRadius:30,
    width:"95%",
    alignSelf:'center',
    elevation:5

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:5
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#EC4505",
    fontSize: 14,
  },
  separator: {
    // height: 1,
    borderWidth:1,
    borderColor:"#D9D9D9",
    width:"90%",
    alignSelf:'center',
    marginVertical: 5,
  },
card: {
    height: 150,
    backgroundColor: "white",
    // color:"white",
    width,
    marginHorizontal: 6 ,
    // borderRadius: 10,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    // marginBottom: 20,
    padding: 1,
    paddingRight:10,
    paddingLeft:10,
    elevation: 8,
    shadowColor: 'black',
    // shadowColor: '#000',         // Shadow color
    shadowOffset: { width: 0, height: 10 }, // Shadow position
    shadowOpacity: 0.25,         // Shadow opacity
    shadowRadius: 3, 
  },

  addToCartBtn: {
    // backgroundColor: 'white',
    // paddingVertical: 10,
    // paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: 'row',

    alignItems: 'center',
    marginHorizontal: 5, // Added margin for spacing

  },
  addToCartText: {
    color: '#EC4505',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 5
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCD6C7',
    borderRadius: 10,
    marginHorizontal: 5, // Added margin for spacing
    // padding: 5,
    width,
    justifyContent:'center'
  },
  quantityBtn: {
    backgroundColor: '#EC4505',
    // paddingVertical: 5,
    paddingHorizontal: "12.5%",
    // borderRadius: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 22,
    color:'#EC4505',
    backgroundColor:'#FCD6C7'
  },
 
});

export default Promotionhomeview;
