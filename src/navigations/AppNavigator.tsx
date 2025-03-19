// // npm start --clean-cache 
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Promotion from '../Promotion';
import Search from '../Search';
import Home from '../Home';
import Category from '../Category';
import { useEffect, useState } from 'react';
import SplashScreen from '../SplashScreen';
import DetailsScreen from '../DetailScreen';
import ProductListScreen from '../ProductListScreen';
import CheckoutScreen from '../Checkout';
import CartScreen from '../Cart';
import { CartContext } from '../CartContext';
import OrderSuccess from '../OrderSuccess';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = ({ }) => {
    const { cartQuantity } = useContext(CartContext);
  
  


  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);



  return (
<NavigationContainer>

{isLoading ? <SplashScreen /> : 

<Stack.Navigator initialRouteName="HomeScreen">
  <Stack.Screen 
   options={{ headerShown: false }}
   name= "HomeScreen"
   
   >{()=>(


    <Tab.Navigator
      screenOptions={{
        animation: 'shift',
        tabBarActiveTintColor:"#EC4505",
        tabBarInactiveTintColor:"white",
        tabBarActiveBackgroundColor:"white",
        tabBarInactiveBackgroundColor:'#EC4505',
        
      }}
    >
     
  

      <Tab.Screen name="Home"   component={Home} 
      

        options={{
          tabBarLabel: 'Home',  
          headerTitle: "",
          
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/Home.png')}  
              style={{ width: 30, height: 30, tintColor: color }}
            />
            ), 
            headerBackground: () => (              
            <Image
            source={require('../../assets/lb.png')}  
            style={{ 
              alignSelf:'center',  
              justifyContent:'center',
              width:64,
              height:64, 
            }}
          />
          
            ),  
            

        }}
        
      />

      <Tab.Screen name="Categories" component={Category} 
          options={{
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:"#EC4505",
              
            },
            headerTitleStyle:{
              fontWeight:'bold',
              color:'white',
            },
            tabBarLabel: 'Category',    
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/Category.png')}  
                style={{ width: 30, height: 30, tintColor: color }}
              />
            )
          }}
      />


      <Tab.Screen name="Promotions" component={Promotion} 
   
  


        options={{
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:"#EC4505",
          },
          headerTitleStyle:{
            fontWeight:'bold',
            color:'white',
          },
          tabBarLabel: 'Promotions',  
          // tabBarActiveTintColor:"#EC4505",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/Promotion.png')}  
              style={{ width: 30, height: 30, tintColor: color ,}}
            />
          )
        }}
      />




      <Tab.Screen name="Search" component={Search} 
        options={{
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:"#EC4505",
          },
          headerTitleStyle:{
            fontWeight:'bold',
            color:'white',
          },
          // animation:'fade',
          tabBarLabel: 'Search',  
          // tabBarActiveTintColor:"#EC4505",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/Search.png')}  
              style={{ width: 30, height: 30, tintColor: color ,}}
            />
          )
        }}
      />




{/* <Tab.Screen name="Cart" component={Cart} /> */}




      <Tab.Screen name="Cart" component={CartScreen}  
          options={{
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:"#EC4505",
            },
            headerTitleStyle:{
              fontWeight:'bold',
              color:'white',
            },
            // animation:'fade',
            tabBarLabel: 'Cart',  
            // tabBarActiveTintColor:"#EC4505",
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/Cart.png')}  
                style={{ width: 30, height: 30, tintColor: color ,}}
              />
            ),
            tabBarBadge :   cartQuantity > 0 ? cartQuantity : 0,
          }}
        /> 

           
         {/* <MyStack/> */}

    </Tab.Navigator> 
       )}
  
      
  </Stack.Screen>


  
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} 
            options={({ navigation }) => ({headerStyle:{backgroundColor:'#EC4505'},
            title:'Product Detail', headerTitleStyle:{fontWeight:'700'},
              headerTitleAlign:'center', headerTintColor:'white',
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 0 }}
                  onPress={() => navigation.navigate('HomeScreen', { screen: 'Cart' })}
                >
                <Image  
                style={{ height: 25, width: 25,  }}
                source={require('../../assets/Fast Cart White.png')}
                />
                  {cartQuantity > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartQuantity}</Text>
                </View>  
              )}
                </TouchableOpacity>
              ),


})}
/>

<Stack.Screen name="OrderSuccess" component={OrderSuccess } options={{headerStyle:{backgroundColor:'#EC4505',},headerBackVisible: false, title:'Confirmed', headerTitleStyle:{fontWeight:'700'}, headerTitleAlign:'center', headerTintColor:'white',  }}/>

      <Stack.Screen name="Checkout" component={CheckoutScreen } options={{headerStyle:{backgroundColor:'#EC4505'}, title:'Checkout', headerTitleStyle:{fontWeight:'700'}, headerTitleAlign:'center', headerTintColor:'white' }}/>
      <Stack.Screen name="ProductListScreen" component={ProductListScreen} 
   options={({ navigation }) => ({headerStyle:{backgroundColor:'#EC4505'},
    title:'Product by Category', headerTitleStyle:{fontWeight:'700'},
      headerTitleAlign:'center', headerTintColor:'white',
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 0 }}
          onPress={() => navigation.navigate('HomeScreen', { screen: 'Cart' })}
        >
        <Image  
        style={{ height: 25, width: 25,  }}
        source={require('../../assets/Fast Cart White.png')}
        />
          {cartQuantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartQuantity}</Text>
        </View>  
      )}
        </TouchableOpacity>
      ),


})}

    
    />

       </Stack.Navigator>}
     </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'gray',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default AppNavigator;

