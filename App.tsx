// // import * as React, {Component}  from 'react';
// import React, {Component} from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
// import { NavigationContainer, } from '@react-navigation/native';
// import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Promotion from './src/Promotion';
// import Search from './src/Search';
// import Home from './src/Home';
// import Category from './src/Category';
// import Cart from './src/Cart';
// // import { HeaderButtons, Item } from "react-navigation-header-buttons";
// // import  {HeaderButton}  from "../component/HeaderButton";
// // import {Button} from 'react-native';
// // import { RootStackParamList } from './types'; // Import the type

// import { useEffect, useState } from 'react';
// import SplashScreen from './src/SplashScreen';
// import DetailsScreen from './src/DetailScreen';
// import ProductListScreen from './src/ProductListScreen';
// import CheckoutScreen from './src/Checkout';
// import CartScreen from './src/Cart';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import CustomHeader from './src/CustomHeader';
// import { useNavigation } from '@react-navigation/native';
// import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './types';

// const Tab = createBottomTabNavigator();
// // const Tab = createBottomTabNavigator<RootStackParamList>(); // Add type annotation

// const Stack = createNativeStackNavigator();
// // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
// // const Stack = createStackNavigator<RootStackParamList>();
// // export default function App() {
// const App = ({ }) => {
  
  
  
//   const [cart, setCart] = useState<any[]>([]);
//   const [cartQuantity, setCartQuantity] = useState(0);
 
//    // Calculate cart quantity whenever cart changes
//    useEffect(() => {
//     const quantity = cart.reduce((total, item) => total + item.quantity, 0);
//     setCartQuantity(quantity);
//   }, [cart]); // Re-run when cart changes

//   // Load cart on app start
//   useEffect(() => {
//     const loadCart = async () => {
//       const savedCart = await AsyncStorage.getItem('cart');
//       if (savedCart) {
//         const cart = JSON.parse(savedCart);
//         setCart(cart);
//       }
//     };
//     loadCart();
//   }, []);

//   // // Update cart quantity
//   // const updateCartQuantity = (cart: any[]) => {
//   //   const quantity = cart.reduce((total, item) => total + item.quantity, 0);
//   //   setCartQuantity(quantity);
//   // };












//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     // Simulate loading process
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000); // Adjust the time as needed
//   }, []);

//   // const { cart } = useCart(); // Global Cart State se cart items lo

//   return (
// <NavigationContainer>

// {isLoading ? <SplashScreen /> : 

// <Stack.Navigator initialRouteName="HomeScreen">
//   <Stack.Screen 
//    options={{ headerShown: false }}
//    name= "HomeScreen"
   
//    >{()=>(
//       // <Stack.Navigator 
//         // screenOptions={{ headerShown: false }}>

//     <Tab.Navigator
//       screenOptions={{
//         // tabBarStyle: { position: 'absolute', },
//         animation: 'shift',
//         tabBarActiveTintColor:"#EC4505",
//         tabBarInactiveTintColor:"white",
//         tabBarActiveBackgroundColor:"white",
//         tabBarInactiveBackgroundColor:'#EC4505',
        
//       }}
//     >
     
  

        
      


//       <Tab.Screen name="Home"   component={Home} 
      

//         options={{
//           tabBarLabel: 'Home',  
//           headerTitle: "",
          
//           tabBarIcon: ({ color, size }) => (
//             // <View style={{height:60, width:60, borderRadius:30, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
//             <Image
//               source={require('./assets/Home.png')}  
//               style={{ width: 30, height: 30, tintColor: color }}
//             />
//         //  </View>
//             ), 
//             // headerStyle:{backgroundColor:'blue'},
           
//             headerBackground: () => (              
//             <Image
//             source={require('./assets/lb.png')}  
//             style={{ 
//               // flex:1,
//               alignSelf:'center',  
//               justifyContent:'center',
//               width:64,
//               height:64, 
//               // marginTop:"9%",
              
//             }}
//           />
          
//             ),  
            
//         // headerStyle:{backgroundColor:'blue'}

//         }}
        
//       />

//       <Tab.Screen name="Categories" component={Category} 
//           options={{
//             // animation:'fade',
//             headerTitleAlign:'center',
//             headerStyle:{
//               backgroundColor:"#EC4505",
//             },
//             headerTitleStyle:{
//               fontWeight:'bold',
//               color:'white',
//             },
//             tabBarLabel: 'Category',    
//             // tabBarActiveTintColor:"#EC4505",
//             tabBarIcon: ({ color, size }) => (
//               <Image
//                 source={require('./assets/Category.png')}  
//                 style={{ width: 30, height: 30, tintColor: color }}
//               />
//             )
//           }}
//       />


//       <Tab.Screen name="Promotions" component={Promotion} 
   
  


//         options={{
//           headerTitleAlign:'center',
//           headerStyle:{
//             backgroundColor:"#EC4505",
//           },
//           headerTitleStyle:{
//             fontWeight:'bold',
//             color:'white',
//           },
//           tabBarLabel: 'Promotions',  
//           // tabBarActiveTintColor:"#EC4505",
//           tabBarIcon: ({ color, size }) => (
//             <Image
//               source={require('./assets/Promotion.png')}  
//               style={{ width: 30, height: 30, tintColor: color ,}}
//             />
//           )
//         }}
//       />




//       <Tab.Screen name="Search" component={Search} 
//         options={{
//           headerTitleAlign:'center',
//           headerStyle:{
//             backgroundColor:"#EC4505",
//           },
//           headerTitleStyle:{
//             fontWeight:'bold',
//             color:'white',
//           },
//           // animation:'fade',
//           tabBarLabel: 'Search',  
//           // tabBarActiveTintColor:"#EC4505",
//           tabBarIcon: ({ color, size }) => (
//             <Image
//               source={require('./assets/Search.png')}  
//               style={{ width: 30, height: 30, tintColor: color ,}}
//             />
//           )
//         }}
//       />




// {/* <Tab.Screen name="Cart" component={Cart} /> */}




//       <Tab.Screen name="Cart" component={CartScreen}  
//           options={{
//             headerTitleAlign:'center',
//             headerStyle:{
//               backgroundColor:"#EC4505",
//             },
//             headerTitleStyle:{
//               fontWeight:'bold',
//               color:'white',
//             },
//             // animation:'fade',
//             tabBarLabel: 'Cart',  
//             // tabBarActiveTintColor:"#EC4505",
//             tabBarIcon: ({ color, size }) => (
//               <Image
//                 source={require('./assets/Cart.png')}  
//                 style={{ width: 30, height: 30, tintColor: color ,}}
//               />
//             ),
//             tabBarBadge :   cartQuantity > 0 ? cartQuantity : "",
//           }}
//         /> 

           
//          {/* <MyStack/> */}

//     </Tab.Navigator> 
//        )}
  
      
//   </Stack.Screen>


  
//             <Stack.Screen name="DetailsScreen" component={DetailsScreen} 


//               // options={({ navigation }) => ({
//               //   headerRight: () => (
//               //     <TouchableOpacity
//               //       style={{ marginRight: 15 }}
//               //       onPress={() =>
//               //         //  navigation.navigate('Cart')}
//               //         navigation.navigate('Tabs', { screen: 'Cart' })}
//               //     >
//               //   <Image
//               //                     source={require('./assets/Promotion.png')}  
//               //                     style={{ width: 30, height: 30, backgroundColor:"red" ,}}
//               //                   />
//               //     </TouchableOpacity>
//               //   ),
//               // })}


              


//             options={({ navigation }) => ({headerStyle:{backgroundColor:'#EC4505'},
//             title:'Product Detail', headerTitleStyle:{fontWeight:'700'},
//               headerTitleAlign:'center', headerTintColor:'white',
            
//               // header: () => <CustomHeader />,
//               headerRight: () => (
//                 <TouchableOpacity
//                   style={{ marginRight: 0 }}
//                   // onPress={() => navigation.navigate('Cart')}
//                   onPress={() => navigation.navigate('HomeScreen', { screen: 'Cart' })}
//                   // onPress={() => navigation.navigate('Tab', { screen: 'Cart' })}
//                   // onPress={alert}
//                 >
//                 <Image  
//                 style={{ height: 25, width: 25,  }}
//                 source={require('./assets/Fast Cart White.png')}
//                 />
//                   {cartQuantity > 0 && (
//                 <View style={styles.badge}>
//                   <Text style={styles.badgeText}>{cartQuantity}</Text>
//                 </View>  
//               )}
//                 </TouchableOpacity>
//               ),
//               // header: () => <CustomHeader />,

// })}
// />

//       {/* <Stack.Screen name="Cart" component={CartScreen} /> */}

//       {/* <Stack.Screen name="Test" component={Test} /> */}
//       <Stack.Screen name="Checkout" component={CheckoutScreen } options={{headerStyle:{backgroundColor:'#EC4505'}, title:'Checkout', headerTitleStyle:{fontWeight:'700'}, headerTitleAlign:'center', headerTintColor:'white' }}/>
//       <Stack.Screen name="ProductListScreen" component={ProductListScreen} options={{headerStyle:{backgroundColor:'#EC4505'}, title:'Product by Category', headerTitleStyle:{fontWeight:'700'}, headerTitleAlign:'center', headerTintColor:'white' 
  
// //   headerRight: () => (
// //   <AddCart
// //     name="cart"
// //     iconColor={defaultStyles.colors.whiteColor}
// //     backgroundColor={defaultStyles.colors.primaryColor}
// //     onPress={() => navigation.navigate('Cart')}
// //   />
// // ),
//     }}/>
//       {/* <Stack.Screen name="CartScreen" component={CartScreen}/> */}
//       {/* <Stack.Screen name="DiscountBanners" component={DiscountBanners} /> */}
//       {/* <Stack.Screen name="CategoryView" component={CategoryView} /> */}


//       {/* <Stack.Screen name="Sa" component={Sa} />
//         <Stack.Screen name="Ss" component={Ss} /> */}
//        </Stack.Navigator>}
//      </NavigationContainer>
//   );
// };
// const styles = StyleSheet.create({
//   badge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });
// export default App;

// // function MyStack() {


// //   return (

// //     <NavigationContainer>
// //    <Stack.Navigator 
// //         screenOptions={{ headerShown: false }}>

// //         <Stack.Screen name="Test" component={Test} />

// //         {/* <Stack.Screen name="Sa" component={Sa} />
// //         <Stack.Screen name="Ss" component={Ss} /> */}
// //       </Stack.Navigator>
      
// //     </NavigationContainer>
       
// //     // {isLoading ? <SplashScreen /> : <Stack.Navigator 
// //     //   screenOptions={{ headerShown: false }}>

// //     //   <Stack.Screen name="Sa" component={Sa} />
// //     //   <Stack.Screen name="Ss" component={Ss} />
// //     // </Stack.Navigator>}
   
// //   );
// // }



// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <MyTabs />
// //       </NavigationContainer>
   
// //   );
// // }



// // npm start --clean-cache 



import React from 'react';
import { CartProvider } from './src/CartContext';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
};

export default App;