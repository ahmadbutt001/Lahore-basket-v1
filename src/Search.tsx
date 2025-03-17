// import React, { useState, useEffect, useContext } from 'react';
// import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
// import { CartContext } from '../src/CartContext';

// const width = Dimensions.get('screen').width / 2 - 20;

// const Search = ({ navigation }) => {
//   const cartContext = useContext(CartContext);
//   const { 
//     cart = [], 
//     addToCart = () => {}, 
//     removeFromCart = () => {}, 
//     updateQuantity = () => {}, 
//   } = cartContext || {};

//   interface Product {
//     id: number;
//     title: string;
//     price: number;
//     discount?: number;
//     images: string;
//     Discount: number;
//   }

//   const [products, setProducts] = useState<Product[]>([]);
//   const [originalProducts, setOriginalProducts] = useState<Product[]>([]); // Store original data


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://api.g3studio.co/api/products');
//         const data = await response.json();

//         if (data && Array.isArray(data.products)) {
//           setProducts(data.products);
//           setOriginalProducts(data.products); // Store full product list separately
//         } else {
//           console.error('Products array not found in response:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSearch = (text: string) => {
//     if (text.trim() === '') {
//       setProducts(originalProducts); // Reset to full list when input is cleared
//     } else {
//       const filteredData = originalProducts.filter(product =>
//         product.title.toLowerCase().includes(text.toLowerCase())
//       );
//       setProducts(filteredData);
//     }
//   };

//   const Card = ({ item }) => (
//     <TouchableOpacity 
//       style={{ marginBottom: 20, marginTop: 5 }}
//       activeOpacity={0.8}
//       onPress={() => navigation.navigate('DetailsScreen', item)}
//     >
//       <View style={styles.card}>
//         <View style={{ height: 100, alignItems: 'center' }}>
//           <Image 
//             source={{ uri: "https://api.g3studio.co" + item.images[0]?.src }}
//             style={{ resizeMode: 'contain', height: "100%", width: "100%" }}
//           />
//         </View>

//         {item?.Discount && (
//           <View style={styles.discountTag}>
//             <Text style={{ color: 'white', fontSize: 14 }}>{item.Discount}</Text>
//           </View>
//         )}

//         <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
//           {item.title}
//         </Text>

//         <View style={{ alignItems: 'center' }}>
//           <Text style={styles.priceText}>Rs. {item?.variants[0].price}</Text>
//         </View>
//       </View>

//       {cart.some((cartItem) => cartItem.id === item.id) ? (
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity  
//             onPress={() => {
//               const currentItem = cart.find(cartItem => cartItem.id === item.id);
//               if (currentItem && currentItem.quantity > 1) {
//                 updateQuantity(item.id, currentItem.quantity - 1);
//               } else {
//                 removeFromCart(item.id);
//               }
//             }} 
//             style={styles.quantityBtn}
//           >
//             <Text style={styles.btnText}>-</Text>
//           </TouchableOpacity>

//           <Text style={styles.quantityText}>
//             {cart.find(cartItem => cartItem.id === item.id)?.quantity || 1}
//           </Text>

//           <TouchableOpacity
//             onPress={() => {
//               const currentItem = cart.find(cartItem => cartItem.id === item.id);
//               if (currentItem) {
//                 updateQuantity(item.id, currentItem.quantity + 1);
//               }
//             }}  
//             style={styles.quantityBtn}
//           >
//             <Text style={styles.btnText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartBtn}>
//           <View style={styles.addToCartContainer}>
//             <Image style={{ height: 20, width: 20 }} source={require('../assets/Fast Cart.png')} />
//           </View>
//         </TouchableOpacity>
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ margin: 10 }}>
//       <View style={styles.searchBar}>
//         <Image source={require('../assets/searchbar.png')} style={{ width: 30, height: 30 }} />
//         <TextInput 
//           style={styles.searchInput}
//           placeholder="Search"
//           onChangeText={handleSearch} // Call the updated search function
//         />
//       </View>

//       <Text style={{ fontWeight: 'bold', fontSize: 20 }}>You May Also Like</Text>
//       <SafeAreaView style={{ marginBottom: 150 }}>
//         <FlatList
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           showsVerticalScrollIndicator={false}
//           numColumns={2}
          
//           data={products}
//           renderItem={({ item }) => <Card item={item} />}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   searchBar: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     borderWidth: 0.5,
//   },
//   card: {
//     height: 200,
//     backgroundColor: "white",
//     width,
//     marginHorizontal: 2,
//     borderTopStartRadius: 12,
//     borderTopEndRadius: 12,
//     padding: 15,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 5, height: 20 },
//     shadowOpacity: 0.15,
//     shadowRadius: 3, 
//   },
//   discountTag: {
//     height: 30,
//     width: '25%',
//     backgroundColor: "#EC4505",
//     borderEndStartRadius: 10,
//     borderBottomEndRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//   },
//   productTitle: {
//     fontWeight: 'bold',
//     fontSize: 17,
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   priceText: {
//     fontSize: 19,
//     fontWeight: 'bold',
//     color: '#EC4505',
//   },
//   addToCartContainer: {
//     alignSelf: 'center',
//     height: 25,
//     width,
//     backgroundColor: "#FCD6C7",
//     borderBottomEndRadius: 10,
//     borderBottomStartRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addToCartBtn: {
//     borderRadius: 15,
//     alignItems: 'center',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FCD6C7',
//     borderRadius: 10,
//     justifyContent: 'center',
//     width,
//   },
//   quantityBtn: {
//     backgroundColor: '#EC4505',
//     paddingVertical: 2,
//     paddingHorizontal: "15%",
//     borderBottomEndRadius: 10,
//     borderBottomStartRadius: 10,
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginHorizontal: 22,
//     color: '#EC4505',
//     backgroundColor: '#FCD6C7',
//   },
// });

// export default Search;



import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { CartContext } from '../src/CartContext';

const width = Dimensions.get('screen').width / 2 - 20;

const Search = ({ navigation }) => {
  const cartContext = useContext(CartContext);
  const { 
    cart = [], 
    addToCart = () => {}, 
    removeFromCart = () => {}, 
    updateQuantity = () => {}, 
  } = cartContext || {};

  interface Product {
    id: number;
    title: string;
    price: number;
    discount?: number;
    images: string;
    Discount: number;
  }

  // const [products, setProducts] = useState<Product[]>([]);
  // const [originalProducts, setOriginalProducts] = useState<Product[]>([]); // Store original data
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.g3studio.co/api/products');
        const data = await response.json();

        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
          setOriginalProducts(data.products);
          shuffleRandomProducts(data.products);
        } else {
          console.error('Products array not found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  const shuffleRandomProducts = (productsList: Product[]) => {
    const shuffled = [...productsList].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 10)); // Pick 6 random products
  };

  const handleSearch = (text: string) => {
    if (text.trim() === '') {
      setSearchResults([]); // Clear search results if input is empty
    } else {
      const filteredData = originalProducts.filter(product =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredData);
    }
  };

  const Card = ({ item }) => (
    <TouchableOpacity 
      style={{ marginBottom: 20, marginTop: 5 }}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', item)}
    >
      <View style={styles.card}>
        <View style={{ height: 100, alignItems: 'center' }}>
          <Image 
            source={{ uri: "https://api.g3studio.co" + item.images[0]?.src }}
            style={{ resizeMode: 'contain', height: "100%", width: "100%" }}
          />
        </View>

        {item?.Discount && (
          <View style={styles.discountTag}>
            <Text style={{ color: 'white', fontSize: 14 }}>{item.Discount}</Text>
          </View>
        )}

        <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.priceText}>Rs. {item?.variants[0].price}</Text>
        </View>
      </View>

      {cart.some((cartItem) => cartItem.id === item.id) ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity  
            onPress={() => {
              const currentItem = cart.find(cartItem => cartItem.id === item.id);
              if (currentItem && currentItem.quantity > 1) {
                updateQuantity(item.id, currentItem.quantity - 1);
              } else {
                removeFromCart(item.id);
              }
            }} 
            style={styles.quantityBtn}
          >
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>
            {cart.find(cartItem => cartItem.id === item.id)?.quantity || 1}
          </Text>

          <TouchableOpacity
            onPress={() => {
              const currentItem = cart.find(cartItem => cartItem.id === item.id);
              if (currentItem) {
                updateQuantity(item.id, currentItem.quantity + 1);
              }
            }}  
            style={styles.quantityBtn}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartBtn}>
          <View style={styles.addToCartContainer}>
            <Image style={{ height: 20, width: 20 }} source={require('../assets/Fast Cart.png')} />
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView>
    <View style={{ margin: 10 }}>
      <View style={styles.searchBar}>
        <Image source={require('../assets/searchbar.png')} style={{ width: 30, height: 30 }} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={handleSearch} // Call the updated search function
        />
        
      </View>


      {/* <Text style={{ fontWeight: 'bold', fontSize: 20 }}>You May Also Like</Text>
      <SafeAreaView style={{ marginBottom: 150 }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          
          data={products}
          renderItem={({ item }) => <Card item={item} />}
        />
      </SafeAreaView> */}

{searchResults.length > 0 && (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Search Results</Text>
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={searchResults}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}

      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>You May Also Like</Text>
      <SafeAreaView style={{ marginBottom: 150 }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={randomProducts}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </View>
    </ScrollView>
  );
};
   

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 0.5,
  },
  card: {
    height: 200,
    backgroundColor: "white",
    width,
    marginHorizontal: 2,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    padding: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 3, 
  },
  discountTag: {
    height: 30,
    width: '25%',
    backgroundColor: "#EC4505",
    borderEndStartRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#EC4505',
  },
  addToCartContainer: {
    alignSelf: 'center',
    height: 25,
    width,
    backgroundColor: "#FCD6C7",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartBtn: {
    borderRadius: 15,
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCD6C7',
    borderRadius: 10,
    justifyContent: 'center',
    width,
  },
  quantityBtn: {
    backgroundColor: '#EC4505',
    paddingVertical: 2,
    paddingHorizontal: "15%",
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
    color: '#EC4505',
    backgroundColor: '#FCD6C7',
  },
});

export default Search;


