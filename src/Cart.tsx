import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";


const width = Dimensions.get('screen').width / 2 - 40;



const data = [
    { id: '1', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 1000, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786', about: 'This is about section its expand and collapse for product discription' },
    { id: '2', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
    { id: '3', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
    { id: '4', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
    { id: '5', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
    { id: '6', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
    { id: '7', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
    { id: '8', title: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: "", image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  ];



const CartScreen = () => { 
  const navigation = useNavigation();
    // const [cart, setCart] = useState([]);
    const [cart, setCart] = useState<{ image: string; name: string; price: number; Discount: string; quantity: number; }[]>([]);
//   const { item } = route.params;  // Yahan selected product ka data ayega
  const [quantity, setQuantity] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);



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
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};


    const Card = ({ items }) => (
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
                source={{ uri: items.image }}
                style={{
                  resizeMode: 'contain', height: "100%", width: "100%"
    
                }}
              />
    
            </View>
    
            {items?.Discount && (
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
    
                <Text style={{ color: 'white', fontSize: 14 }}>{items.Discount}</Text>
    
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
                Rs. {items.price}
              </Text>
    
            </View>
    
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
          // style={{}}
          >
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
    
        </TouchableOpacity>
    
    
    
    
      );




   
    
    return (

        <SafeAreaView style={{flex:1, }}>
            <View>
                <Text style={{fontWeight:'bold', fontSize:18, padding:12}}>Just for you</Text>

                       <FlatList
                                    style={{}}
                                    // columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    showsHorizontalScrollIndicator={false}
                                    // numColumns={2}
                                    horizontal
                                    data={data}
                                    renderItem={({ item }) => <Card items={item} />}
                                  />

            </View>


            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',   }}>Your Cart</Text>



            <FlatList
            style={{marginBottom:40}}
                data={cart}
                // scrollEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    
                    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center',  backgroundColor:"white", borderRadius:30, marginLeft:15, marginRight:15, marginBottom:5, }}>
                        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, marginRight: 10 }} />
                        <View style={{padding:10, bottom:10}}>
                        <Text style={{fontSize:16, fontWeight:'bold', marginBottom:5, width:"40%"}} 
                              // numberOfLines={1}
                              // ellipsizeMode="tail"
                              >
                                {item.name} 
                      </Text> 
                     <Text style={{fontSize:18, fontWeight:'bold', color:'#EC4505'}}>Rs. {item.price}   </Text>


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
                        
                        {item?.Discount && (
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
    
                <Text style={{ color: 'white', fontSize: 14 }}>{item.Discount} Off</Text>
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


  {/* <TouchableOpacity activeOpacity={0.8} style={{ width: '90%', backgroundColor: '#EC4505', position: 'absolute', bottom: 10, padding: 5, borderRadius:50, alignSelf:'center'}}>
        {/* <View style={style.container}> */}
              
              {/* <View style={{padding:10, flexDirection:'row', justifyContent:'space-between'}}>
                
                  <Text style={{fontSize:15, color:'white', fontWeight:'bold',}}>Proceed to Checkout</Text>
                  <Text style={{fontSize:15, color:'white', fontWeight:'bold', left:10}}> Rs.</Text>
               
                </View> */}

         {/* </View> */}
   {/* </TouchableOpacity> */} 
   {cart.some(cartItem => cartItem) ? (

         
<TouchableOpacity 
    activeOpacity={0.8} 
    style={{ flex:1, width: '90%', backgroundColor: '#EC4505', position: 'absolute', bottom: 10, padding: 5, borderRadius:50, alignSelf:'center',}}
    // onPress={() => navigation.navigate('Checkout', 
    //      { totalPrice: calculateTotalPrice() },
    //      { cart }
    //     )}
        onPress={() => navigation.navigate('Checkout', { cart, totalPrice: calculateTotalPrice() })}
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
});


export default CartScreen;
 