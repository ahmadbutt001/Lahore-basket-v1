import React, { useState, useEffect, useContext  } from 'react';
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Dimensions, SafeAreaView  } from 'react-native';
import { CartContext,  } from '../src/CartContext';  

const width = Dimensions.get('screen').width / 2 - 20;



const Search = ({ navigation }) => {
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
  
  const [products, setProducts] = useState<Product[]>([]); 


  const shuffleArray = (array: Product[]): Product[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.g3studio.co/api/products');
        const data = await response.json();

        if (data && Array.isArray(data.products)) {
          const shuffledProducts = shuffleArray(data.products); // Shuffle the products array
          const first10Products = shuffledProducts.slice(0, 10); // Take only the first 10 products
          setProducts(first10Products);
        } else {
          console.error('Products array not found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once


  //  useEffect(() => {
  //       const fetchProducts = async () => {
  //         try {
  //           const response = await fetch('https://api.g3studio.co/api/products');
  //           const data = await response.json();
    
  //           // console.log('API Response:', data); // Debugging purpose
    
  //           // Ensure products exist and are an array
  //           if (data && Array.isArray(data.products)) {
  //             setProducts(data.products);
  //           } else {
  //             console.error('Products array not found in response:', data);
  //           }
  //         } catch (error) {
  //           console.error('Error fetching products:', error);
  //         }
  //       };
    
  //       fetchProducts();
  //     }, []); // Empty dependency array to run only once
    
  


  const Card = ({ item }) => (

      
      <TouchableOpacity style={{marginBottom:20, marginTop:5,}}
      
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate(plants.DetailsScreen)}>
      
        // onPress={() => navigation.navigate('DetailsScreen',item)}>
 onPress={() => navigation.navigate('DetailsScreen',item)}>
        

          
        <View style={styles.card}>
          {/* <View style={{alignItems: 'flex-end'}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: plants.like
                  ? 'rgba(245, 42, 42,0.2)'
                  : 'rgba(0,0,0,0.2) ',
              }}>
              <Icon
                name="favorite"
                size={18}
                color={plants.like ? "red" : "black"}
              />
            </View>
          </View> */}

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image 
              source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }}
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

        <Text style={{color:'white',fontSize:14}}>{item.Discount}</Text>

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
            <Text style={{fontSize: 19, fontWeight: 'bold', color:'#EC4505'}}>
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
    <View style={{ margin: 10 }}>
      <View style={styles.searchBar}>
        <Image source={require('../assets/searchbar.png')} style={{ width: 30, height: 30,}} />
        <TextInput
        style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => {
            const filteredData = products.filter(products => products.title.toLowerCase().includes(text.toLowerCase()));
            setProducts(filteredData);
          }}
          
        />
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>You May Also Like</Text>
      <SafeAreaView style={{ marginBottom: 150 }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          
          data={products}
          renderItem={({ item }) => <Card item={item} />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor:'#white'
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 0.5,
  },
  // card: {
  //   height: 200,
  //   backgroundColor: "#F1F1F1",
  //   width,
  //   marginHorizontal: 2,
  //   borderTopStartRadius: 12,
  //   borderTopEndRadius: 12,
  //   padding: 15,
  //   elevation: 6,
  // },
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
  addToCartButton: {
    height: 30,
    width: '100%',
    backgroundColor: "#FCD6C7",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Search;
