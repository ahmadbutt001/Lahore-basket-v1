// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const CheckoutScreen = ({ route, navigation }) => {
//   const { item } = route.params; // Yeh data DetailsScreen se aya hai

//   return (

//     <View style={styles.container}>
//       <Text style={styles.title}>Checkout</Text>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>Rs.{item.price}</Text>

//       <TouchableOpacity 
//         style={styles.confirmButton} 
//         onPress={() => alert('Order Placed Successfully!')}
//       >
//         <Text style={styles.confirmText}>Confirm Order</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//   image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
//   name: { fontSize: 20, fontWeight: 'bold' },
//   price: { fontSize: 18, color: '#EC4505', marginBottom: 20 },
//   confirmButton: { backgroundColor: '#EC4505', padding: 10, borderRadius: 10 },
//   confirmText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
// });

// export default CheckoutScreen;




// import React, {useState} from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

// const CheckoutScreen = ({ route, navigation }) => {
//     const { totalPrice } = route.params; // Total price passed from CartScreen
//         // const [item] = useState <{ image: string; name: string; price: number; Discount: string; }[]>([]) ;

//     return (
//         <SafeAreaView style={styles.container}>
     
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Checkout</Text>
//             </View>
//             {/* <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>Rs.{item.price}</Text> */}

//             <View style={styles.content}>
//                 <Text style={styles.totalPriceText}>Total Price: Rs. {totalPrice}</Text>

//                 {/* Add more checkout details here */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Delivery Address</Text>
//                     <Text style={styles.sectionText}>123 Main Street, City, Country</Text>
//                 </View>

//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Payment Method</Text>
//                     <Text style={styles.sectionText}>Credit Card (**** **** **** 1234)</Text>
//                 </View>

//                 {/* Proceed to Payment Button */}
//                 <TouchableOpacity
//                     style={styles.proceedButton}
//                     onPress={() => {
//                         // Navigate to Payment Screen or process payment
//                         alert('Payment functionality to be implemented.');
//                     }}
//                 >
//                     <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
//     header: {
//         backgroundColor: '#EC4505',
//         padding: 15,
//         alignItems: 'center',
//     },
//     headerText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     content: {
//         flex: 1,
//         padding: 20,
//     },
//     totalPriceText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 20,
//     },
//     section: {
//         marginBottom: 20,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 5,
//     },
//     sectionText: {
//         fontSize: 16,
//         color: '#666',
//     },
//     proceedButton: {
//         backgroundColor: '#EC4505',
//         padding: 15,
//         borderRadius: 50,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     proceedButtonText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
//     name: { fontSize: 20, fontWeight: 'bold' },
//     price: { fontSize: 18, color: '#EC4505', marginBottom: 20 },
// });

// export default CheckoutScreen;












import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';



const CheckoutScreen = ({ route, navigation }) => {
    // const { cart, totalPrice } = route.params;
    const { cart = [], totalPrice } = route.params || {};
    const item = route.params?.item; // Ensure item is received
    console.log('Checkout Item:', item); // Debugging
    console.log('Total Price:', totalPrice);  // Debugging
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default: Cash on Delivery
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

    const handleOrder = () => {
        const orderData = {
            name,
            email,
            phone,
            address,
            cart,
            totalPrice,
            shippingMethod: 'Free Delivery',
            paymentMethod,
            billingSameAsShipping
        };
        console.log('Order Placed:', orderData);
    };

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

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>Checkout</Text> */}


   <View
            style={{ paddingHorizontal: 2, marginTop: 0 }}>

            <View style={styles.containerani}>
              <TouchableOpacity style={styles.toggleButton} onPress={toggleExpand}>
                <Text style={styles.toggleText}>{expanded ? 'Order Summery' : 'Order Summery'}</Text>

                <Image
                  source={expanded ? require('../assets/Slide Up.png') : require('../assets/Down Button.png')}
                  style={{ width: 20, height: 20, backgroundColor:"black" }}
                />
              </TouchableOpacity>

              <Animated.View style={[styles.content, { maxHeight }]}>
              {/* <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                        </View>
                    </View>
                )}
            /> */}
            <FlatList
  data={cart.length > 0 ? cart : item ? [item] : []} // Ensure array format
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs. {item.price}</Text>
      </View>
    </View>
  )}
/>
<Text style={styles.totalPrice}>
  {/* Total: Rs. {totalPrice} */}
  Total: Rs. {totalPrice || 0}
{/* Total: Rs. {cart.reduce((acc, item) => acc + item.price, 0)} */}
</Text>
              </Animated.View>

            </View>

          </View>
            

            

            <View style={styles.contactForm}>
            <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Full Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                                <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                     <TextInput
                    placeholder="Address"
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    keyboardType="default"
                />
                
   {/* Shipping Method */}
   <Text style={styles.sectionHeadern}>Shipping Method</Text>
            <Text style={styles.shippingMethodn}>Free Delivery</Text>
            
            {/* Payment Method */}
            <Text style={styles.sectionHeadern}>Payment</Text>
            <TouchableOpacity style={styles.radioOptionn} onPress={() => setPaymentMethod('COD')}>
                <Text style={[styles.radioTextn, paymentMethod === 'COD' && styles.selectedOptionn]}>● Cash on Delivery (COD)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOptionn} onPress={() => setPaymentMethod('Card')}>
                <Text style={[styles.radioTextn, paymentMethod === 'Card' && styles.selectedOptionn]}>○ Debit - Credit Card</Text>
            </TouchableOpacity>
            
            {/* Billing Address */}
            <Text style={styles.sectionHeadern}>Billing Address</Text>
            <TouchableOpacity style={styles.radioOptionn} onPress={() => setBillingSameAsShipping(true)}>
                <Text style={[styles.radioTextn, billingSameAsShipping && styles.selectedOptionn]}>● Same as Shipping Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOptionn} onPress={() => setBillingSameAsShipping(false)}>
                <Text style={[styles.radioTextn, !billingSameAsShipping && styles.selectedOptionn]}>○ Use a Different Billing Address</Text>
            </TouchableOpacity>

            </View>



            <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                <Text style={styles.orderText}>Place Order</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    cartItem: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
    image: { width: 80, height: 80, marginRight: 10 },
    itemDetails: { justifyContent: 'center' },
    itemName: { fontSize: 16, fontWeight: 'bold' },
    itemPrice: { fontSize: 16, color: '#EC4505' },
    totalPrice: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 15,  },
    contactForm: { marginVertical: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
    orderButton: { backgroundColor: '#EC4505', padding: 15, borderRadius: 50, alignItems: 'center', marginTop: 10 },
    orderText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    containerani: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      elevation: 3,
  
    },
    toggleButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    toggleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black'
    },
    content: {
      overflow: "scroll",
    },
    description: {
      padding: 10,
      fontSize: 16,
      color: 'white',
    },
    containern: { padding: 20 },
    headern: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    cartItemn: { flexDirection: 'row', marginBottom: 10 },
    imagen: { width: 50, height: 50, marginRight: 10 },
    itemNamen: { fontSize: 16 },
    itemPricen: { color: 'gray' },
    inputn: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    sectionHeadern: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    shippingMethodn: { fontSize: 16, color: 'green', marginVertical: 5 },
    radioOptionn: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    radioTextn: { fontSize: 16 },
    selectedOptionn: { fontWeight: 'bold' },
    totalPricen: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    payButtonn: { backgroundColor: 'orange', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    payButtonTextn: { color: 'white', fontSize: 18 }
});

export default CheckoutScreen;






























// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// const CheckoutScreen = () => {
//   // State for cart items (initially empty)
//   const [cartItems, setCartItems] = useState([]);

//   // Simulate fetching cart data from backend (API)
//   useEffect(() => {
//     // Replace this with your actual API call or data fetching logic
//     const fetchCartData = async () => {
//       // Simulated API response
//       const response = [
//         { id: 1, image: require('./path/to/image1.jpg'), title: 'Down Milky Broad Regular Pi', price: 120 },
//         { id: 2, image: require('./path/to/image2.jpg'), title: 'Tag Pack', price: 100 },
//         { id: 3, image: require('./path/to/image3.jpg'), title: 'Adams Restaurized Milk', price: 120, discount: '15% off' },
//       ];
//       setCartItems(response);
//     };

//     fetchCartData();
//   }, []);

//   // Calculate subtotal
//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => total + item.price, 0);
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return calculateSubtotal(); // Add additional charges if needed
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>My Cart Items</Text>

//       {/* Display Cart Items */}
//       {cartItems.map((item) => (
//         <View key={item.id} style={styles.itemContainer}>
//           <Image source={item.image} style={styles.itemImage} />
//           <View style={styles.itemDetails}>
//             <Text style={styles.itemTitle}>{item.title}</Text>
//             <Text style={styles.itemPrice}>Rs. {item.price}</Text>
//             {item.discount && <Text style={styles.itemDiscount}>{item.discount}</Text>}
//           </View>
//         </View>
//       ))}

//       {/* Subtotal and Total */}
//       <View style={styles.summaryContainer}>
//         <Text style={styles.summaryText}>Subtotal: Rs. {calculateSubtotal()}</Text>
//         <Text style={styles.summaryText}>Total: Rs. {calculateTotal()}</Text>
//       </View>

//       {/* User Input Form */}
//       <View style={styles.formContainer}>
//         <TextInput style={styles.input} placeholder="Full Name" />
//         <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
//         <TextInput style={styles.input} placeholder="Address" />
//         <TextInput style={styles.input} placeholder="City" />
//         <TextInput style={styles.input} placeholder="Postal Code" keyboardType="numeric" />
//       </View>

//       {/* Pay Now Button */}
//       <TouchableOpacity style={styles.payButton}>
//         <Text style={styles.payButtonText}>Pay Now</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   itemDetails: {
//     marginLeft: 10,
//     justifyContent: 'center',
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   itemPrice: {
//     fontSize: 14,
//     color: '#888',
//   },
//   itemDiscount: {
//     fontSize: 12,
//     color: '#EC4505',
//   },
//   summaryContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   summaryText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   formContainer: {
//     marginTop: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   payButton: {
//     backgroundColor: '#EC4505',
//     padding: 15,
//     borderRadius: 50,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   payButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CheckoutScreen;