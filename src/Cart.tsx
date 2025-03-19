import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { CartContext,  } from '../src/CartContext'; // Adjust the path as needed


const width = Dimensions.get('screen').width / 2 - 40;



  
const CartScreen = ({item}:any) => { 
      const cartContext = useContext(CartContext);
     
        const { 
          // cart = [], 
          addToCart = () => {}, 
          // removeFromCart = () => {}, 
          updateQuantity = () => {}, 
          // cartQuantity = 0 
        } = cartContext || {};
  interface Product {
    id: number;
    title: string;
    price: number;
    discount?: number;
    images: string;
    Discount: number;
  }
   const [products, setProducts] = useState<Product[]>([]);
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const navigation = useNavigation();
    // const [cart, setCart] = useState([]);
    const [cart, setCart] = useState<{ images: string; title: string; price: number; Discount: string; quantity: number; id:number; }[]>([]);
//   const { item } = route.params;  // Yahan selected product ka data ayega
  // const [quantity, setQuantity] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);




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





  useEffect(() => { 
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(quantity);
  }, [cart]); // Re-run when cart changes

  // Load cart on app start
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCart(cart);
      }
    };
    loadCart();
  }, []);








  // Load cart on screen focus
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);



useFocusEffect(
    React.useCallback(() => {
        loadCart();  // Jab bhi screen open hogi, cart refresh hoga
    }, [])
);

    useEffect(() => {
        loadCart();
    }, []);

    
    const loadCart = async () => {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
            console.log("Cart loaded:", JSON.parse(savedCart || "[]"));
        }
       
    };

    const removeFromCart = async (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log("Current Cart State:", cart);
    };


    // const increaseQuantity = () => {
    //     setQuantity(prevQty => prevQty + 1);
    //   };
    
    //   const decreaseQuantity = () => {
    //     if (quantity > 1) {
    //       setQuantity(prevQty => prevQty - 1);
    //     } else {
    //       setQuantity(0); // If quantity reaches 0, revert back to "Add to Cart"
    //     }
    //   };

    const increaseQuantity = (index: number) => {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      
      setCart(updatedCart);  // UI update karega
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));  // AsyncStorage update karega
  };
  
  const decreaseQuantity = (index: number) => {
      const updatedCart = [...cart];
  
      if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
      } else {
          updatedCart.splice(index, 1); // Agar quantity 1 ho, to item remove kare
      }
  
      setCart(updatedCart);  // UI update karega
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));  // AsyncStorage update karega
  };


  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item?.variants[0].price * item.quantity, 0); 
};


    const Card = ({ items }:any) => {
      const discountPercentage = Math.round(
        ((items?.variants[0].price - items?.variants[0].discountPrice) / items?.variants[0].price) * 100
      );
      
      return (
      // console.log("Item being passed:", item), // Debugging line
        <TouchableOpacity style={{ marginBottom: 20, marginTop: 5, }}
    
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DetailsScreen', items)}>
    
    
    
          <View style={style.card}>
    
    
            <View
              style={{
                height: 90,
                alignItems: 'center',
              }}>
              <Image
                        source={{ uri: "https://api.g3studio.co"+items.images[0]?.src}}

                style={{
                  resizeMode: 'contain', height: "100%", width: "100%"
    
                }}
              />
    
            </View>
    
            {items?.variants[0].discountPrice && items?.variants[0].price >  items?.variants[0].discountPrice && (

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
              {items.title}
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#EC4505' }}>
              Rs. {items?.variants[0].discountPrice ? items.variants[0].discountPrice : items?.variants[0].price}

              </Text>
    
            </View>
    
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
          >
        
          </TouchableOpacity> {cart.some((cartItem) => cartItem.id === items.id) ? (
                        // If item is already in cart, show quantity buttons
                        <View style= {style.quantityContainer} >
                          <TouchableOpacity  
                          onPress={() => {
                const currentItem = cart.find((cartItem) => cartItem.id === items.id);
                if (currentItem && currentItem.quantity > 1) {
                  updateQuantity(items.id, currentItem.quantity - 1);
                } else {
                  removeFromCart(items.id); // Agar quantity 1 hai, toh item remove ho jaye
                }
              }} style={style.quantityBtn}>
                            <Text style={style.btnText}>-</Text>
                          </TouchableOpacity>
                          
                          <Text style={style.quantityText}>
                          {cart.find((cartItem) => cartItem.id === items.id)?.quantity || 1}
                          </Text>
                          
                          <TouchableOpacity
                           onPress={() => {
                const currentItem = cart.find((cartItem) => cartItem.id === items.id);
                if (currentItem) {
                  updateQuantity(items.id, currentItem.quantity + 1);
                }
              }}  style={style.quantityBtn}>
                            <Text style={style.btnText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        // If item is NOT in cart, show "Add to Cart" button
                        <TouchableOpacity onPress={() => addToCart(items)} style={style.addToCartBtn}>
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

    }


    const discountPercentage = item?.variants?.[0]?.price && item?.variants?.[0]?.discountPrice
    ? Math.round(
        ((item.variants[0].price - item.variants[0].discountPrice) / item.variants[0].price) * 100
      )
    : 0;
    console.log(discountPercentage);
    return (
 
        <SafeAreaView style={{flex:1, }}>
          <ScrollView>
            <View>
                <Text style={{fontWeight:'bold', fontSize:18, padding:12}}>Just for you</Text>

                       <FlatList
                                    style={{}}
                                    // columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    showsHorizontalScrollIndicator={false}
                                    // numColumns={2}
                                    horizontal
                                    data={randomProducts}
                                    renderItem={({ item }) => <Card items={item} />}
                                  />

            </View>


            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',  bottom:10 }}>Your Cart</Text>



            <FlatList
            style={{marginBottom:60}}
                data={cart}
                // scrollEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    
                    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center',  backgroundColor:"white", borderRadius:30, marginLeft:15, marginRight:15, marginBottom:5, }}>
                        <Image source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }} style={{ width: 100, height: 100, marginRight: 10 }} />
                        <View style={{padding:10, bottom:10}}>
                        <Text style={{fontSize:16, fontWeight:'bold', marginBottom:5, width:"40%"}} 
                              // numberOfLines={1}
                              // ellipsizeMode="tail"
                              >
                                {item.title} 
                      </Text> 
                     <Text style={{fontSize:18, fontWeight:'bold', color:'#EC4505'}}>  Rs. {item?.variants[0].discountPrice ? item.variants[0].discountPrice : item?.variants[0].price} </Text>


                     <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth:0, borderColor:'#A5A3A3', left:70, top:20 }}>
                            <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 5, color:'#EC4505', backgroundColor:'white', borderWidth:1, borderColor:'#A5A3A3' }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, padding: 8, backgroundColor:'#EC4505', color:'white' }}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => increaseQuantity(index)}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 5, color:'#EC4505'  , backgroundColor:'white', borderWidth:1, borderColor:'#A5A3A3' }}>+</Text>
                            </TouchableOpacity>
                        </View>



                        </View>
                        
     {item?.variants[0].discountPrice && item?.variants[0].price >  item?.variants[0].discountPrice && (

              <View style={{
                
                height: 20,
                width: '25%',
                backgroundColor: "#EC4505",
                borderEndStartRadius: 10,
                borderBottomEndRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',
                position: 'absolute',
    
              }}>
    
                <Text style={{ color: 'white', fontSize: 14,  }}>  {isNaN(discountPercentage) ? 'N/A' : `${discountPercentage}%`}</Text>
                </View>)}
             

             
                        <TouchableOpacity 
                        style={{
                            right:0,
                            alignSelf: 'flex-start',
                            padding:12,
                            position: 'absolute',
                
                          }}
                        onPress={() => removeFromCart(index)}>
                             <Image
        style={{width:20, height:20}}
        source={require('../assets/Delete.png')}
      />
                            
                        </TouchableOpacity>
                        
                    </View>
                )}
            />
</ScrollView>
   {cart.some(cartItem => cartItem) ? (

         
<TouchableOpacity 
    activeOpacity={0.8} 
    style={{ flex:1, width: '90%', backgroundColor: '#EC4505', position: 'absolute', bottom: 10, padding: 5, borderRadius:50, alignSelf:'center',}}
    // onPress={() => navigation.navigate('Checkout', 
    //      { totalPrice: calculateTotalPrice() },
    //      { cart }
    //     )}
        onPress={() => navigation.navigate('Checkout', {item: cart, cart, totalPrice: calculateTotalPrice() })}
>
  
    {/* <View style={style.container}> */}
    <View style={{padding:10, flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize:15, color:'white', fontWeight:'bold',}}>Proceed to Checkout</Text>
        <Text style={{fontSize:15, color:'white', fontWeight:'bold',}}> Rs. {calculateTotalPrice()}</Text>
    </View>
    {/* </View> */}
</TouchableOpacity>
) : (
<Text style={{left:20, fontSize:16, fontWeight:'bold', bottom:"50%", color:'gray' }}>Cart is Empty</Text>
)}   

        </SafeAreaView>
    );
};


const style = StyleSheet.create({
  card: {
    height: 170,
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
 
  container: {
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // bottom:10
    // padding: 10,
    // backgroundColor: '#EC4505'
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
  addToCartBtn: {
    // backgroundColor: 'white',
    // paddingVertical: 10,
    // paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: 'row',

    alignItems: 'center',
    marginHorizontal: 5, // Added margin for spacing

  },
});


export default CartScreen;
 