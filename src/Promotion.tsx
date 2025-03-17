import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext,  } from '../src/CartContext'; 
import { SafeAreaView } from 'react-native-safe-area-context';



const width = Dimensions.get('screen').width / 2 - 20; // Adjust width for 2 items in a row

const Discount = ({navigation, route }:any) => {
  
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
        categoryId?: number;
        title: string;
        price: number;
        discount?: number;
        images: string;
        Discount: number;
      }
  // const { categoryId, categoryName } = route.params;
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
    // const filteredProducts = products.filter((product) => product.categoryId === categoryId);
    
  const renderProductItem = ({ item }:any) => {
    const discountPercentage = Math.round(
      ((item?.variants[0].price - item?.variants[0].discountPrice) / item?.variants[0].price) * 100
    );
    return(
  //   <TouchableOpacity
  //     style={styles.productCard}
  //     onPress={() => handleProductPress(item.id)}
  //   >
  //     <Image source={{ uri: item.image }} style={styles.productImage} />
  //     <Text style={styles.productName}>{item.name}</Text>
  //     <View style={styles.priceContainer}>
  //       <Text style={styles.discountPrice}>{item.discountPrice}</Text>
  //       <Text style={styles.originalPrice}>{item.price}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

   <TouchableOpacity style={{marginBottom:20, marginTop:5,}}
      
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate(plants.DetailsScreen)}>
        // onPress={() => handleProductPress(item.id)}
        onPress={() => navigation.navigate('DetailsScreen',item)}
        >

              <View style={styles.card} >
          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image 
            //  source={plants.uri}
            //  source={{
            //   uri: 'https://reactnative.dev/img/tiny_logo.png',
            // }}
              
        source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }}
             
              style={{
                 resizeMode: 'contain',  height:"100%", width:"100%"
                
              }}
            />
         
          </View>
{/* <View> */}
{item?.variants[0].discountPrice && item?.variants[0].price >  item?.variants[0].discountPrice && (
          <View style={{  
    height: 30, 
    width: '25%',
    backgroundColor: "#EC4505",
    // borderRadius: 10,
    borderEndStartRadius:10,
    borderBottomEndRadius:10,
    // borderStartEndRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'flex-start',
    // alignContent:'flex-start',
    position:'absolute',
    // top:25

    }}>

        <Text style={{color:'white',fontSize:14}}>{discountPercentage}%</Text>

      </View> )}
      
      {/* </View> */}


          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10, textAlign:'center'}}
          numberOfLines={2}  
        ellipsizeMode="tail"
          >
           {item.title}
          </Text>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              // marginTop: 5,
              alignItems:'center',
            }}>

            {/* <Text style={{fontSize: 19, fontWeight: 'bold', color:'#EC4505'}}>
            Rs. {item?.variants[0].discountPrice}
            </Text> */}
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#EC4505' }}>
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
    

    
    );

  };





  return (
    <SafeAreaView 
    style={styles.container}
    >
      <ScrollView>
      {/* Banner Image */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/006/549/978/non_2x/weekly-sale-banner-design-template-sale-background-design-special-offer-promotion-discount-banner-free-vector.jpg' }}
          style={styles.bannerImage}
        />
      </View>

      {/* Discounted Products List */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display 2 items per row
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
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
    marginBottom: 20, // Space between banner and products
  },
  bannerImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 20,
  },
  productCard: {
    width: width,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4, // Shadow effect
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  card: {
    height: 200,
    backgroundColor: "white",
    // color:"#F1F1F1",
    width,
    marginHorizontal: 2,
    // borderRadius: 10,
    borderTopStartRadius:12,
    borderTopEndRadius:12,
    // marginBottom: 20,
    padding: 15,
    elevation:6,
       shadowColor: '#000',         // Shadow color
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

export default Discount;
