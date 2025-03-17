import React, { useState, useEffect, useContext  } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert, Animated, FlatList } from 'react-native';
const width = Dimensions.get('screen').width / 2 - 30;
import { CartContext,  } from '../src/CartContext'; 



const plants = [
  { id: '1', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 1000, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786', about: 'This is about section its expand and collapse for product discription' },
  { id: '2', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '3', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '4', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '5', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '6', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '7', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: '15%', image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
  { id: '8', name: "Nexton Sunblock Ligtening Lotion 30 ml", price: 100, Discount: "", image: 'https://lahorebasket.com/cdn/shop/files/nexton-sunblock-ligtening-lotion-30-ml-438468_360x.jpg?v=1737618786' },
];




  const DetailsScreen = ({ route, navigation }) => {
    
    console.log(route.params)
    // const { item } = route.params; // Ensure item is being accessed correctly
    const cartContext = useContext(CartContext);

    const { 
      cart = [], 
      addToCart = () => {}, 
      removeFromCart = () => {}, 
      updateQuantity = () => {}, 
      cartQuantity = 0 
    } = cartContext || {};

    const [data, setData] = useState(plants);
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const { ...item } = route.params;
    
    

    const toggleExpand = () => {
      const finalValue = expanded ? 0 : 1;

      Animated.timing(animation, {
        toValue: finalValue,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setExpanded(!expanded);
    };

    const maxHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300], // Adjust height for your content
    });




  const Card = ({ item }) => (

    <TouchableOpacity style={{ marginBottom: 20, marginTop: 5, }}

      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', item)}>



      <View style={style.card}>


        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: item.image }}
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
          {item.name}
        </Text>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#EC4505' }}>
            Rs. {item.price}
          </Text>

        </View>

      </View>
      <TouchableOpacity
        activeOpacity={0.6}
      // style={{}}
      >
        <View
          style={{

            height: 30,
            width: '100%',
            backgroundColor: "#FCD6C7",
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require('../assets/Fast Cart.png')}
          />

        </View>
      </TouchableOpacity>

    </TouchableOpacity>




  );

  const discountPercentage = Math.round(
    ((item?.variants[0].price - item?.variants[0].discountPrice) / item?.variants[0].price) * 100
  );

  return (

    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: "12%",
        backgroundColor:'white'

      }}>





      <View style={style.imageContainer}>


        <Image
          // source={{ uri: item.image }}
          source={{ uri: "https://api.g3studio.co"+item.images[0]?.src }}

          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        />
        {item?.variants[0].discountPrice && item?.variants[0].price >  item?.variants[0].discountPrice && (
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
            top: 25

          }}>

            <Text style={{ color: 'white', fontSize: 16 }}>{discountPercentage}% Off</Text>

          </View>

        )
        }
      </View>

      <ScrollView style={{ flex: 1, }}>

        <View style={style.detailsContainer}>


          <View
            style={{
              marginLeft: 20,
            }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#EC4505' }}>
              {item?.title}
            </Text>
            <View
              style={{ flexDirection: 'row', }}
            >
              
              


              {item?.variants[0].discountPrice && (
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textDecorationLine: 'line-through',
                  }}>
                  Rs.{item?.variants[0].price}
                </Text>
              )}
              {item.variants[0].discount == true ?<Text
                style={{
                  marginLeft: 15,
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Rs. {item?.variants[0].discountPrice}
              </Text>:<Text
                style={{
                  marginLeft: 15,
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Rs. {item?.variants[0].price}
              </Text>}
              

            </View>
          </View>


          <View
            style={{ paddingHorizontal: 15, marginTop: 4,  }}>

            <View style={style.containerani}>
              <TouchableOpacity style={style.toggleButton} onPress={toggleExpand}>
                <Text style={style.toggleText}>{expanded ? 'Product Details' : 'Product Details'}</Text>

                <Image
                  source={expanded ? require('../assets/Slide Up.png') : require('../assets/Down Button.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              <Animated.View style={[style.content, { maxHeight }]}>
                <Text style={style.description}>
                  {item?.bodyHtml}
                </Text>
              </Animated.View>

            </View>

          </View>




          <View style={style.containerimg}>
            <View style={style.itemimg}>
              <Image source={require('../assets/Exclusive Product.png')} style={style.imageimg} />
              <Text style={style.textimg}>Genuine Product</Text>
            </View>

            <View style={style.itemimg}>
              <Image source={require('../assets/Money Yours.png')} style={style.imageimg} />
              <Text style={style.textimg}>3 Days Return Policy</Text>
            </View>

            <View style={style.itemimg}>
              <Image source={require('../assets/Delivery.png')} style={style.imageimg} />
              <Text style={style.textimg}>Free Delivery</Text>
            </View>
          </View>





          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold', top: 10, marginBottom: 10, fontSize: 20 }}>You May Also Like </Text>

            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}

              renderItem={({ item }) => <Card item={item} />}
            />

          </View>




        </View>


      </ScrollView>


      <View style={{ width: '100%', backgroundColor: '#EC4505', position: 'absolute', bottom: 0, padding: 10 }}>
        <View style={style.container}>
          <View>
            <TouchableOpacity style={style.addToCartBtn} 
            onPress={() => navigation.navigate('Checkout', {  
              item,
              totalPrice: item.price })}
             
              // totalPrice: item?.variants[0].price })}
            // onPress={() => navigation.navigate('Checkout' )}
              // totalPrice: calculateTotalPrice()}

            //  })}
            //  onPress={() => addToCart(item)}
            >
              <Text style={style.addToCartText}>Buy Now</Text>

              <Image
                style={{ height: 20, width: 20, marginLeft: 5 }}
                source={require('../assets/Buy.png')} />

            </TouchableOpacity>
          </View>



          {cart.some((cartItem) => cartItem.id === item.id) ? (
  // If item is already in cart, show quantity buttons
  <View style= {style.quantityContainer} >
    <TouchableOpacity 
    // onPress={() => updateQuantity(item.id, -1) } 
    onPress={() => {
      const currentItem = cart.find((cartItem) => cartItem.id === item.id);
      if (currentItem && currentItem.quantity > 1) {
        updateQuantity(item.id, currentItem.quantity - 1);
      } else {
        removeFromCart(item.id); // Agar quantity 1 hai, toh item remove ho jaye
      }
    }}
    style={style.quantityBtn}>
      <Text style={style.btnText}>-</Text>
    </TouchableOpacity>

    <Text style={style.quantityText}>
    {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 1}
    </Text>

    <TouchableOpacity
    onPress={() => {
      const currentItem = cart.find((cartItem) => cartItem.id === item.id);
      if (currentItem) {
        updateQuantity(item.id, currentItem.quantity + 1);
      }
    }}  
    style={style.quantityBtn}>
      <Text style={style.btnText}>+</Text>
    </TouchableOpacity>
  </View>
) : (
  // If item is NOT in cart, show "Add to Cart" button
  <TouchableOpacity onPress={() => addToCart(item)} style={style.addToCartBtn}>
    <Text style={style.addToCartText}>Add to Cart</Text>
    <Image style={{ height: 25, width: 25 }} source={require('../assets/Fast Cart.png')} />
  </TouchableOpacity>
)}



        </View>
      </View>






    </SafeAreaView>

  );
};

const style = StyleSheet.create({
  header: {

    marginLeft: '80%',
    marginTop: 20,

  },
  imageContainer: {
    flex: 0.65,

    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 7,

    borderRadius: 20,

    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: 'black',
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 20,
  },
  borderBtnText: { fontWeight: 'bold', fontSize: 12 },
  buyBtn: {
    width: 160,
    height: 50,
    marginHorizontal: 20,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // padding: 10,
    // backgroundColor: '#EC4505'
  },
  addToCartBtn: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
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
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 5,
  },
  quantityBtn: {
    backgroundColor: '#EC4505',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  containerani: {
    backgroundColor: '#FF753E',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    // justifyContent:"center"

  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,


  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',

  },
  content: {
    overflow: "scroll",
  },
  description: {
    padding: 10,
    fontSize: 16,
    color: 'white',
  },
  containerimg: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust spacing
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  itemimg: {
    alignItems: 'center',
    width: '30%', // Ensure 3 items fit in a row
  },
  imageimg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textimg: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  card: {
    height: 200,
    backgroundColor: "white",
    // color:"white",
    width,
    marginHorizontal: 2,
    // borderRadius: 10,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    // marginBottom: 20,
    padding: 15,
    elevation: 8,
    shadowColor: 'black'


  },
});



export default DetailsScreen;