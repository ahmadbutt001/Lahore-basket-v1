
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, View, Image, ScrollView , FlatList, TouchableOpacity, Dimensions} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useCart } from './CartContext';
// const width = Dimensions.get('screen').width / 2 - 30;


// const plants = [
//   { id: '1', name:"Nexton Sunblock Ligtening Lotion 30 ml", price:100, Discount:'15%', uri: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
//   { id: '2', name:"raj", uri: 'https://do3ujptrj0wby.cloudfront.net/media/wysiwyg/porto/homepage/slider/08/static/intpromo_home_d-block01_w04_tea_coffee_2.png' },
//   { id: '4', name:"umer", uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '5', name:"ashraf", uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '6', name:"Ahmad butt", uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '7', name:"shiqawat", uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '8', uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '9', uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '10', uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '11', name:"Ahmad", price:100, uri: 'https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/14-Grocery-World.jpg?h=464&iar=0&w=1392&rev=2a4b13f3d92f4567bd71e474fbb178e7&hash=C4A1E457EC733D851253DD2E227DBD6B' },
//   { id: '12', name:"raj", uri: 'https://do3ujptrj0wby.cloudfront.net/media/wysiwyg/porto/homepage/slider/08/static/intpromo_home_d-block01_w04_tea_coffee_2.png' },
//   { id: '13', name:"umer", uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
//   { id: '14', name:"Ahmad", price:100, uri: 'https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/14-Grocery-World.jpg?h=464&iar=0&w=1392&rev=2a4b13f3d92f4567bd71e474fbb178e7&hash=C4A1E457EC733D851253DD2E227DBD6B' },
//   { id: '15', name:"raj", uri: 'https://do3ujptrj0wby.cloudfront.net/media/wysiwyg/porto/homepage/slider/08/static/intpromo_home_d-block01_w04_tea_coffee_2.png' },
//   { id: '16', name:"umer", uri: 'https://cdn.prod.website-files.com/63bc15b680c7e6464531c13e/668be337cdfc6426bffca741_20%20-%20Importance%20of%20%CE%BFffers%2C%20bundle%20offers%20Hero.jpg' },
 
// ];

// const Search = ({navigation}) => {

  

//   const SeaarchUser  = async (text)=>{
//    const url=`https://www.fruityvice.com/api/fruit/all?q${text}`;
//   //  console.warn(url);
//    let result = await fetch(url);
//    result = await result.json();
//     if(result){
//       setData(result)
//     }

//   }

//    const { addToCart } = useCart(); // Get addToCart function from context
//    const [data, setData] = useState(plants);
//   //  const [data,setData] = useState([]);

// //   const [data, setData] = useState(plants);



//   const Card = ({plants}) => {
//     return (

      

//       <TouchableOpacity style={{marginBottom:20, marginTop:5,}}
      
//         activeOpacity={0.8}
//         // onPress={() =>
//         //   navigation.navigate(plants.DetailsScreen)}>
      
//         onPress={() => navigation.navigate('DetailsScreen',plants)}>

        
 
         

          
         
          
//         <View style={styles.card}>
//           {/* <View style={{alignItems: 'flex-end'}}>
//             <View
//               style={{
//                 width: 30,
//                 height: 30,
//                 borderRadius: 20,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: plants.like
//                   ? 'rgba(245, 42, 42,0.2)'
//                   : 'rgba(0,0,0,0.2) ',
//               }}>
//               <Icon
//                 name="favorite"
//                 size={18}
//                 color={plants.like ? "red" : "black"}
//               />
//             </View>
//           </View> */}

//           <View
//             style={{
//               height: 100,
//               alignItems: 'center',
//             }}>
//             <Image 
//             //  source={plants.uri}
//             //  source={{
//             //   uri: 'https://reactnative.dev/img/tiny_logo.png',
//             // }}
//               source={{ uri: plants.uri }}
//               // source={{uri: plants.uri}}
//               style={{
//                  resizeMode: 'contain',  height:"100%", width:"100%"
                
//               }}
//             />
         
//           </View>
// {/* <View> */}
//           {plants?.Discount && (
//           <View style={{  
//     height: 30,
//     width: '25%',
//     backgroundColor: "#EC4505",
//     // borderRadius: 10,
//     borderEndStartRadius:10,
//     borderBottomEndRadius:10,
//     // borderStartEndRadius:10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf:'flex-start',
//     // alignContent:'flex-start',
//     position:'absolute',
//     // top:25

//     }}>

//         <Text style={{color:'white',fontSize:14}}>{plants.Discount}</Text>

//       </View> )}
      
//       {/* </View> */}


//           <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10, textAlign:'center'}}
//           numberOfLines={2}  
//         ellipsizeMode="tail"
//           >
//             {plants.name}
//           </Text>
//           <View
//             style={{
//               // flexDirection: 'row',
//               // justifyContent: 'space-between',
//               // marginTop: 5,
//               alignItems:'center',
//             }}>
//             <Text style={{fontSize: 19, fontWeight: 'bold', color:'#EC4505'}}>
//               Rs. {plants.price}
//             </Text>
          
//           </View>
        
//         </View>
//         <TouchableOpacity
//         activeOpacity={0.6}
//         >
//       <View
//       style={{
        
//         height: 30,
//         width: '100%',
//         backgroundColor: "#FCD6C7",
//         // borderRadius: 10,
//         borderBottomEndRadius:10,
//         borderBottomStartRadius:10,
//         justifyContent: 'center',
//         alignItems: 'center',
        
//       }}>
//       <Image
//         style={{height:25,width:25}}
//         source={require('../assets/Fast Cart.png')}
//       />
//          <TouchableOpacity onPress={() => addToCart(plants)}>
//           <View
//            style={styles.addToCartButton}
//            >
//              <Text>Add to Cart</Text>
//            </View>
//          </TouchableOpacity>
//        </View>
//      </TouchableOpacity>
//     {/* </View> */}
//     </TouchableOpacity>
//       // </TouchableOpacity>
    

    
//     );
//   };




//   return (

//     <View style={{ margin: 10 }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom:15}}>
//         <Image source={require('../assets/searchbar.png')}
//           style={{ width: 30, height: 30, }}
//         />

//         <TextInput
//           placeholder="Search"
//           onChangeText={(text)=>SeaarchUser(text)}
//           // onChangeText={handleChangeText}
//           style={{
//             flex: 1,
//             paddingTop: 10,
//             paddingRight: 10,
//             paddingBottom: 10,
//             paddingLeft: 10,
//             // height:45,
//             backgroundColor: '#fff',
//             // color: '#424242',
//             // borderColor:'gray',
//             borderRadius: 25,
//             borderWidth: 0.5,
//           }}
//         />
        
//       </View>
//       <View>  <Text style={{fontWeight:'bold', fontSize:20}}>You May Also Like </Text> </View>
//       {/* <Text style={{fontWeight:'bold', fontSize:20}}>You May Also Like </Text> */}
        
//          <SafeAreaView style={{marginBottom:100}}>
          
//       <FlatList
//         columnWrapperStyle={{justifyContent: 'space-between'}}
//         showsVerticalScrollIndicator={false}
//         // showsHorizontalScrollIndicator={true}
//         // scrollEnabled={false}
//         // nestedScrollEnabled
//         disableVirtualization={true}
//         contentContainerStyle={{
//           marginTop: 0,
//           paddingBottom: 50,
//         }}
       
//         numColumns={2}
//         data={plants}
//         renderItem={({item}) => {
        
//           return    < Card plants={item} /> ; 
//         }}
//       />
      
//       </SafeAreaView>
//       {/* <ScrollView> */}
     

        

//       {/* </ScrollView> */}
// {/* 
//       <ScrollView>
//       {
        
//         data.length ?
//         data.map((item) => <View> 
          
//           <Text style={{fontWeight:'bold'}}>{item.name}</Text>
//           <Text>{item.family}</Text>
//           <Text>{item.order}</Text>


//           {/* <Image source={item.uri}/> */}
//         {/* </View>) */}
//         {/* : null */}
//        {/* } */}



//       {/* // </ScrollView> */} 


//             {/* <FlatList
//                      // scrollEnabled
//                      // numColumns={3}
//                      // horizontal={true} 
//                      showsVerticalScrollIndicator={false} 
//                      data={SeaarchUser}
//                      renderItem={({ item, index }) => (
           
//                        <TouchableOpacity style={{}}>
//                          <Image source={item}
//                             key={index}
//                            style={{
//                              // flexDirection:'column',
//                              width: 100,
//                              height: 100,
//                              // borderRadius: 30,
//                              // borderWidth:2,
//                              // borderColor:'#d35647',
//                              // resizeMode:'contain',
//                              // margin:8
//                            }}
//                          />
                          
//                          <Text style={{ textAlign: 'center' }}>{item.name}</Text>
//                        </TouchableOpacity> */}

//     </View>
 


//   );
// }

// const styles = StyleSheet.create({
// card: {
//   height: 200,
//   backgroundColor: "#F1F1F1",
//   // color:"#F1F1F1",
//   width,
//   marginHorizontal: 2,
//   // borderRadius: 10,
//   borderTopStartRadius:12,
//   borderTopEndRadius:12,
//   // marginBottom: 20,
//   padding: 15,
//   elevation:6,
  
// },
//   addToCartButton: {
//     height: 30,
//     width: '100%',
//     backgroundColor: "#FCD6C7",
//     borderBottomEndRadius: 10,
//     borderBottomStartRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// }
// )


// export default Search





import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Dimensions, SafeAreaView  } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useCart } from './CartContext'; // Import useCart hook to access cart functions

const width = Dimensions.get('screen').width / 2 - 20;

const plants = [
  { id: '1', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 1000, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786', about:'This is about section its expand and collapse for product discription' },
  { id: '2', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100,  image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '3', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '4', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '5', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '6', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '7', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '8', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: "", image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  // Add the rest of your plants data here
];

const Search = ({ navigation }) => {
  // const [cart, setCart] = useState([]);
  const [data, setData] = useState(plants);

  // const addToCart = (item) => {
  //   const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  //   if (itemIndex === -1) {
  //     setCart([...cart, { ...item, quantity: 1 }]);
  //   } else {
  //     const updatedCart = [...cart];
  //     updatedCart[itemIndex].quantity += 1;
  //     setCart(updatedCart);
  //   }
  // };

  // const handleQuantityChange = (item, action) => {
  //   const updatedCart = cart.map(cartItem => {
  //     if (cartItem.id === item.id) {
  //       if (action === 'increase') cartItem.quantity += 1;
  //       if (action === 'decrease' && cartItem.quantity > 1) cartItem.quantity -= 1;
  //     }
  //     return cartItem;
  //   });
  //   setCart(updatedCart);
  // };


  const Card = ({ item }) => (
  //   <TouchableOpacity style={{ marginBottom: 20, marginTop: 5 }} onPress={() => navigation.navigate('DetailsScreen', item)}>
  //     <View style={styles.card}>
  //       <View style={{ height: 100, alignItems: 'center' }}>
  //         <Image source={{ uri: item.uri }} style={{ resizeMode: 'contain', height: "100%", width: "100%" }} />
  //       </View>

  //       {item.Discount && (
  //         <View style={styles.discountTag}>
  //           <Text style={{ color: 'white', fontSize: 14 }}>{item.Discount}</Text>
  //         </View>
  //       )}

  //       <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, textAlign: 'center' }} numberOfLines={2} ellipsizeMode="tail">
  //         {item.name}
  //       </Text>
  //       <View style={{ alignItems: 'center' }}>
  //         <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#EC4505' }}>Rs. {item.price}</Text>
  //       </View>

  //       {/* Add to Cart Button */}
  //       <TouchableOpacity
  //       //  onPress={() => addToCart(item)}s
  //        >
  //         <View style={styles.addToCartButton}>
  //           <Text>Add to Cart</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   </TouchableOpacity>
  // );

      

      <TouchableOpacity style={{marginBottom:20, marginTop:5,}}
      
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate(plants.DetailsScreen)}>
      
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

        <Text style={{color:'white',fontSize:14}}>{item.Discount}</Text>

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
        <TouchableOpacity
        activeOpacity={0.6}
        >
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
     </TouchableOpacity>
    {/* </View> */}
    </TouchableOpacity>
      // </TouchableOpacity>
    

    
    );


  return (
    <View style={{ margin: 10 }}>
      <View style={styles.searchBar}>
        <Image source={require('../assets/searchbar.png')} style={{ width: 30, height: 30,}} />
        <TextInput
        style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => {
            const filteredData = plants.filter(plant => plant.name.toLowerCase().includes(text.toLowerCase()));
            setData(filteredData);
          }}
          
        />
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>You May Also Like</Text>
      <SafeAreaView style={{ marginBottom: 150 }}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
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
  }
});

export default Search;
