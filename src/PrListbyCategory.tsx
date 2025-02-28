import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext,  } from '../src/CartContext'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width / 2 - 50;


const PrListbyCategory = ({ route,  }:any) => {
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
          `http://52.74.115.234:5000/api/categories/${categoryId}`,
          requestOptions
        );
        const categoryResult = await categoryResponse.json();
        setCategoryName(categoryResult.name); // Set the category name

        // Fetch products for the category
        const productsResponse = await fetch(
          `http://52.74.115.234:5000/api/products?categoryId=${categoryId}`,
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


  // const addToCart = async (item: any) => {
  //   try {
  //     // Pehle se existing cart load karen
  //     let updatedCart = [...cart];
  
  //     // Check karein ke item already exist karta hai ya nahi
  //     const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
  
  //     if (existingItemIndex !== -1) {
  //       // Agar product already cart me hai, to uski quantity badha do
  //       updatedCart[existingItemIndex].quantity += 1;
  //     } else {
  //       // Naya product add karte waqt uski quantity 1 set karo
  //       updatedCart.push({ ...item, quantity: 1 });
  //     }
  //     setCart(updatedCart);  // UI update karein
  //     await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));  // AsyncStorage update karein
  
  //     console.log('Cart Updated:', updatedCart);
  //   } catch (error) {
  //     console.error('Error saving cart:', error);
  //   }
  // };
  
  
  
  // useEffect(() => {
  //   console.log('Cart Updated:', cart);
  // }, [cart]);  // Jab bhi cart update hoga, ye re-render karega
  
//   useEffect(() => {
//     loadCart();  // Jab screen load ho to saved cart load ho
// }, []);


// const loadCart = async () => {
//     const savedCart = await AsyncStorage.getItem('cart');
//     if (savedCart) {
//         setCart(JSON.parse(savedCart));
//     }
// };





  // const addToCart = async (item: any) => {
  //   try {
  //     let updatedCart = [...cart];
      
  //     const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
  
  //     if (existingItemIndex !== -1) {
  //       updatedCart[existingItemIndex].quantity += 1;
  //     } else {
  //       updatedCart.push({ ...item, quantity: 1 });
  //     }
  
  //     setCart(updatedCart);
  //     await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  
  //     console.log('Cart Updated:', updatedCart);
  //   } catch (error) {
  //     console.error('Error saving cart:', error);
  //   }
  // };
  
  // // Function to update quantity
  // const updateQuantity = async (itemId: number, change: number) => {
  //   let updatedCart = [...cart];
  
  //   const itemIndex = updatedCart.findIndex(cartItem => cartItem.id === itemId);
  //   if (itemIndex !== -1) {
  //     updatedCart[itemIndex].quantity += change;
  //     if (updatedCart[itemIndex].quantity < 1) {
  //       updatedCart.splice(itemIndex, 1); // Remove item if quantity < 1
  //     }
  //   }
  
  //   setCart(updatedCart);
  //   await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  // };






  // useEffect(() => {
  //   console.log('Cart Updated:', cart);
  // }, [cart]);  // Jab bhi cart update hoga, ye re-render karega



  
  
    // Filter products based on categoryId
    // const filteredProducts = products.filter((product) => product.categoryId === categoryId);







  const Card = ({ item }:any) => (
    
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
        source={{ uri: "http://52.74.115.234:5000"+item.images[0]?.src }}

                style={{
                  resizeMode: 'contain', height: "100%", width: "100%"
    
                }}
              />
    
            </View>
    
            {item?.Discount && (
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
    
                <Text style={{ color: 'white', fontSize: 14 }}>{item.Discount}</Text>
    
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
                Rs. {item?.variants[0].price}
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









  return (
    <View style={styles.container}>
      {/* Top Header - Category Name & See All */}
      <View style={styles.header}>
        {/* <Text style={styles.title}>{categoryName}</Text> */}
        <Text style={styles.title}>{categoryId}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProductListScreen", { category })}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Gray Separator */}
      <View style={styles.separator} />

      {/* Horizontal Scrollable Product List with Images */}
      {/* <FlatList
      
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity  style={styles.productCard} onPress={() => navigation.navigate('DetailsScreen', item)}>
            <Image
            
            source={{ uri: item.image }} style={styles.productImage} />
            <Text  style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      /> */}
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
    shadowColor: 'black'
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

export default PrListbyCategory;





// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const PrListbyCategory = ({ category }) => {
//   const navigation = useNavigation();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // API ya Dummy Data se products laane ka code
//     const fetchProducts = async () => {
//       try {
//         // API call replace kar sakte hain
//         const data = [
//           { id: "1", name: "Product 1", category },
//           { id: "2", name: "Product 2", category },
//           { id: "3", name: "Product 3", category },
//           { id: "4", name: "Product 3", category },
//           { id: "5", name: "Product 3", category },
//         ];
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [category]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>{category}</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("ProductListScreen", { category })}>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.separator} />

//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.productCard}>
//             <Text>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     padding: 10,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   seeAll: {
//     color: "blue",
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "gray",
//     marginVertical: 5,
//   },
//   productCard: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//     marginBottom: 5,
//   },
// });

// export default PrListbyCategory;
