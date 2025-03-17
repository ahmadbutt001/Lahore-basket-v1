import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { CartContext,  } from '../src/CartContext'; // Adjust the path as needed

const width = Dimensions.get('screen').width / 2 - 30;



const ProductListScreen = ({navigation, route , item}:any) => {
  
    const cartContext = useContext(CartContext);
    const { 
      cart = [], 
      addToCart = () => {}, 
      removeFromCart = () => {}, 
      updateQuantity = () => {}, 
      cartQuantity = 0 
    } = cartContext || {};

    interface Product {
      id: number;
      categoryId: number;
      title: string;
      price: number;
      discount?: number;
      images: string;
      Discount: number;  }
const { categoryId, categoryName } = route.params;
const [products, setProducts] = useState<Product[]>([]);



  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.g3studio.co/api/products');
        const data = await response.json();

        // console.log('API Response:', data); // Debugging purpose

        // Ensure products exist and are an array
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Products array not found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once

  // Filter products based on categoryId
  const filteredProducts = products.filter((product) => product.categoryId === categoryId);


  
  const discountPercentage = Math.round(
    ((item?.variants[0].price - item?.variants[0].discountPrice) / item?.variants[0].price) * 100
  );
   


  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
        {categoryName} Products
      </Text>

      {filteredProducts.length > 0 ? (
               <View style={{ padding: 10, marginBottom:10  }}>
        <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
        
                <TouchableOpacity style={{ marginBottom: 20, marginTop: 5, }}
            
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('DetailsScreen', item)}>
            
            
            
                  <View style={style.card}>
            
            
                    <View
                      style={{
                        height: 100,
                        alignItems: 'center',
                      }}>
                      <Image
                        // source={{ uri: item.image }}
        source={{ uri: "https://api.g3studio.co"+item.images[0]?.src}}
                        
                        style={{
                          resizeMode: 'contain', height: "100%", width: "100%"
            
                        }}
                      />
            
                    </View>
            {/* {item.price } */}
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
                      {item.title}
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#EC4505' }}>
                      Rs. {item?.variants[0].discountPrice ? item.variants[0].discountPrice : item?.variants[0].price}
                      </Text>
            
                    </View>
            
                  </View>



                  {cart.some((cartItem) => cartItem.id === item.id) ? (
              // If item is already in cart, show quantity buttons
              <View style= {style.quantityContainer} >
                <TouchableOpacity   onPress={() => {
      const currentItem = cart.find((cartItem) => cartItem.id === item.id);
      if (currentItem && currentItem.quantity > 1) {
        updateQuantity(item.id, currentItem.quantity - 1);
      } else {
        removeFromCart(item.id); // Agar quantity 1 hai, toh item remove ho jaye
      }
    }}
     style={style.quantityBtn}>
                  <Text style={style.btnText}>-</Text>
                </TouchableOpacity>
                
                <Text style={style.quantityText}>
                {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 1}
                </Text>
                
                <TouchableOpacity  onPress={() => {
      const currentItem = cart.find((cartItem) => cartItem.id === item.id);
      if (currentItem) {
        updateQuantity(item.id, currentItem.quantity + 1);
      }
    }}  
     style={style.quantityBtn}>
                  <Text style={style.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // If item is NOT in cart, show "Add to Cart" button
              <TouchableOpacity onPress={() => addToCart(item)} style={style.addToCartBtn}>



        {/* <TouchableOpacity
        activeOpacity={0.6}
        > */}
        <View
                      style={{
            
                        height: 30,
                        width: '100%',
                        backgroundColor: "#FCD6C7",
                        borderBottomEndRadius: 10,
                        borderBottomStartRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
            
                      }}>
                      <Image
                        style={{ height: 25, width: 25 }}
                        source={require('../assets/Fast Cart.png')}
                      />
            
                    </View>
     {/* </TouchableOpacity> */}
      </TouchableOpacity>
                 )}
            
                </TouchableOpacity>
            
            
               
          
              
          )}
        />
         </View>
      ) : ( 
        <Text>No products found in this category.</Text>
      )} 
    </View> 
  );
};


const style = StyleSheet.create({
card: {
  height: 200,
  backgroundColor: "white",
  // color:"white",
  width,
  marginHorizontal: 2,
  // borderRadius: 10,
  borderTopStartRadius: 12,
  borderTopEndRadius: 12,
  // marginBottom: 20,
  padding: 15,
  elevation: 8,
  shadowColor: 'black',
  // shadowColor: '#000',         // Shadow color
  shadowOffset: { width: 5, height: 20 }, // Shadow position
  shadowOpacity: 0.15,         // Shado5w opacity
  shadowRadius: 3, 
},
addToCartBtn: {
  // backgroundColor: 'white',
  // paddingVertical: 10,
  // paddingHorizontal: 30,
  borderRadius: 15,
  // flexDirection: 'row',

  alignItems: 'center',
  // marginHorizontal: 5, // Added margin for spacing

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
  justifyContent:'center',
  // marginHorizontal: 15, // Added margin for spacing1
  // padding: 5,
  width
},
quantityBtn: {
  backgroundColor: '#EC4505',
  paddingVertical: 2,
  paddingHorizontal: "15%",
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


export default ProductListScreen;

