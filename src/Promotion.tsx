
// import { StyleSheet, Text, View, FlatList,TouchableOpacity, Image } from 'react-native';

// const images = [
//   { id: '1', uri: 'https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/14-Grocery-World.jpg?h=464&iar=0&w=1392&rev=2a4b13f3d92f4567bd71e474fbb178e7&hash=C4A1E457EC733D851253DD2E227DBD6B' },
//   { id: '2', uri: 'https://do3ujptrj0wby.cloudfront.net/media/wysiwyg/porto/homepage/slider/08/static/intpromo_home_d-block01_w04_tea_coffee_2.png' },
//   { id: '3', uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
// ];



// export default function Promotion() {

// // return(
// //   <View>
// //   <View
// //   style={{
// //     // height: 100,
// //     // alignItems: 'center',
// //   }}
// //   >
// //   <Image
// //     // source={plants.uri}
// //     // source={{uri:    'https://do3ujptrj0wby.cloudfront.net/media/wysiwyg/porto/homepage/slider/08/static/intpromo_home_d-block01_w04_tea_coffee_2.png'}}
// //     source={images[0].uri}  
// //     style={{ height:150, width:300  }}
// //   />
// //   {/* <Image
// //                   source={require('../assets/Cart.png')}  
// //                   style={{ width: 30, height: 30, }}
// //                 /> */}
// // </View>
// // </View>
// // )

//   return (
//     <View style={styles.container}>
            
      
//        <FlatList
//           // scrollEnabled
//           horizontal={true} 
//           showsHorizontalScrollIndicator={false} 
//           data={images}
//           renderItem={ ({ item, index }) => (
//             <TouchableOpacity>
//             <Image source={item} 
//             /* Use item to set the image source */
//               key={index} /* Important to set a key for list items,
//                              but it's wrong to use indexes as keys, see below */    
//               style={{
//                 width: 300,
//                 height:200,
//                 borderRadius:30,
//                 // borderWidth:2,
//                 // borderColor:'#d35647',
//                 // resizeMode:'contain',
//                 margin:8
//               }}
//             />
//             </TouchableOpacity>
//           )}
//         />
       
      
//       {/* <StatusBar style="auto" /> */}
//     </View>
  
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });





import React, { useState, useEffect} from 'react'; 
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width / 2 - 20; // Adjust width for 2 items in a row

const Discount = () => {
      const [cart, setCart] = useState<any[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState([
    {
      id: '1',
      name: 'Product 1',
      price: '10',
      Discount: '7',
      image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786',
    },
    {
      id: '2',
      name: 'Product 2',
      price: '15',
      Discount: '10',
      image: 'https://lahorebasket.com/cdn/shop/files/vaseline-super-food-freshlock-peach-lotion-320-ml-imported-600568_360x.jpg?v=1737619866',
    },
    {
      id: '3',
      name: 'Product 3',
      price: '20',
      Discount: '14',
      image: 'https://lahorebasket.com/cdn/shop/files/care-natural-honey-lotion-120-ml-215464_360x.jpg?v=1738157415',
      about:' his is about section its expand and collapse for product discriptionThis is about section its expand and collapse for This is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionThis is about section its expand and collapse for product discriptionproduct discription This is about section its expand and collapse for product discription This is about section its expand and collapse for product discription This is about section its expand and collapse for product discription This is about section its expand and collapse for product discription This is about section its expand and collapse for product discription This is about section its expand and collapse for product discription'
    },
    {
      id: '4',
      name: 'Product 4',
      price: '25',
      Discount: '18',
      image: 'https://lahorebasket.com/cdn/shop/files/vince-clarifying-aloe-vera-face-wash-120-ml-137862_360x.jpg?v=1737619869',
    },
    {
      id: '5',
      name: 'Product 4',
      price: '25',
      Discount: '18',
      image: 'https://lahorebasket.com/cdn/shop/files/vince-clarifying-aloe-vera-face-wash-120-ml-137862_360x.jpg?v=1737619869',
    },   {
      id: '6',
      name: 'Product 4',
      price: '25',
      Discount: '18',
      image: 'https://lahorebasket.com/cdn/shop/files/vince-clarifying-aloe-vera-face-wash-120-ml-137862_360x.jpg?v=1737619869',
    },
    {
      id: '7',
      name: 'Product 4',
      price: '25',
      Discount: '18',
      image: 'https://lahorebasket.com/cdn/shop/files/vince-clarifying-aloe-vera-face-wash-120-ml-137862_360x.jpg?v=1737619869',
    },
  ]);

  const navigation = useNavigation();

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetailScreen', { productId });
  };



  useEffect(() => {
    loadCart();  // Jab screen load ho to saved cart load ho
}, []);


const loadCart = async () => {
    const savedCart = await AsyncStorage.getItem('cart');
    if (savedCart) {
        setCart(JSON.parse(savedCart));
    }
};





  const addToCart = async (item: any) => {
    try {
      let updatedCart = [...cart];
      
      const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }
  
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  
      console.log('Cart Updated:', updatedCart);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };
  
  // Function to update quantity
  const updateQuantity = async (itemId: number, change: number) => {
    let updatedCart = [...cart];
  
    const itemIndex = updatedCart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity += change;
      if (updatedCart[itemIndex].quantity < 1) {
        updatedCart.splice(itemIndex, 1); // Remove item if quantity < 1
      }
    }
  
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };






  useEffect(() => {
    console.log('Cart Updated:', cart);
  }, [cart]);  // Jab bhi cart update hoga, ye re-render karega




  const renderProductItem = ({ item }) => (
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
              source={{ uri: item.image }}
              // source={{uri: plants.uri}}
              style={{
                 resizeMode: 'contain',  height:"100%", width:"100%"
                
              }}
            />
         
          </View>
{/* <View> */}
          {item?.Discount && (
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

        <Text style={{color:'white',fontSize:14}}>{item.Discount}%</Text>

      </View> )}
      
      {/* </View> */}


          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10, textAlign:'center'}}
          numberOfLines={2}  
        ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              // marginTop: 5,
              alignItems:'center',
            }}>
            <Text style={{fontSize: 19, fontWeight: 'bold', color:'#EC4505'}}>
              Rs. {item.price}
            </Text>
          
          </View>
        
        </View>





     {cart.some(cartItem => cartItem.id === item.id) ? (
              // If item is already in cart, show quantity buttons
              <View style= {styles.quantityContainer} >
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1) } style={styles.quantityBtn}>
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>
                  {cart.find(cartItem => cartItem.id === item.id)?.quantity || 1}
                </Text>
                
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityBtn}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // If item is NOT in cart, show "Add to Cart" button
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartBtn}>



        {/* <TouchableOpacity
        activeOpacity={0.6}
        > */}
      <View
      style={{
        
        height: 30,
        width: '100%',
        backgroundColor: "#FCD6C7",
        // borderRadius: 10,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        
      }}>
      <Image 
      // onPress={() => addToCart(items)}
        style={{height:25,width:25}}
        source={require('../assets/Fast Cart.png')}
      />
         {/* <TouchableOpacity
          // onPress={() => addToCart(plants)}
          >
          <View
           style={styles.addToCartButton}
           >
             <Text>Add to Cart</Text>
           </View>
         </TouchableOpacity> */}
       </View>
     {/* </TouchableOpacity> */}
      </TouchableOpacity>
                 )}
    {/* </View> */}
    {/* </TouchableOpacity> */}
       </TouchableOpacity>
    

    
    );







  return (
    <SafeAreaView style={styles.container}>
      {/* Banner Image */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/006/549/978/non_2x/weekly-sale-banner-design-template-sale-background-design-special-offer-promotion-discount-banner-free-vector.jpg' }}
          style={styles.bannerImage}
        />
      </View>

      {/* Discounted Products List */}
      <FlatList
        data={discountedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display 2 items per row
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
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
