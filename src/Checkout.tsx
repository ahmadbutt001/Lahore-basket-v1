
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Animated,
//   ScrollView,
//   Alert,
// } from 'react-native';

// const CheckoutScreen = ({ route, navigation }) => {
//   const { cart = [], totalPrice } = route.params || {};
//   const item = route.params?.item;
//   console.log('Checkout Item:', item);
//   console.log('Total Price:', totalPrice);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('COD'); // Default: Cash on Delivery
//   const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
//   const [expanded, setExpanded] = useState(false);
//   const [animation] = useState(new Animated.Value(0));

//   const handleOrder = async () => {
//     // Prepare the items array
//     const items = cart.length > 0 ? cart : item ? [item] : [];

//     const orderData = {
//       customer: {
//         name: name, // Use the name from state
//         email: email, // Use the email from state
//         phone: phone, // Use the phone from state
//       },
//       items: items.map((item) => ({
//         variantId: item.variants[0]?.id, // Use the variant ID
//         quantity: item.quantity || 1, // Default to 1 if quantity is missing
//       })),
//       paymentMethod: paymentMethod === 'COD' ? 'COD' : 'credit-card', // Map payment method
//       address: {
//         address: address, // Use the address from state
//         city: 'Lahore', // Replace with actual city if available
//         state: 'Punjab', // Replace with actual state if available
//         zip: '12345', // Replace with actual zip if available
//         country: 'Pakistan', // Replace with actual country if available
//         carrier: 'TCS', // Replace with actual carrier if available
//       },
//     };

//     try {
//       const response = await fetch('https://api.g3studio.co/api/cart/checkout/direct', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Cookie: 'connect.sid=s%3A7sXM8QLAA4rc3VhdxSHrBgv-476RgEnT.xhChcpaDkRc6eyXIGpFnCvOwTJfZaxCeCzHQNGbV1tI', // Use the correct cookie
//         },
//         body: JSON.stringify(orderData),
//       });

//       // Log the raw response text
//       const responseText = await response.text();
//       console.log('Raw Response:', responseText);

//       // Check if the response is valid JSON
//       let result;
//       try {
//         result = JSON.parse(responseText);
//       } catch (jsonError) {
//         console.error('JSON Parse Error:', jsonError);
//         throw new Error('Invalid JSON response from server');
//       }

//       if (response.ok) {
//         Alert.alert('Success', 'Your order has been placed successfully!');
//         console.log('Order Placed:', result);
//       } else {
//         Alert.alert('Error', 'Failed to place order. Please try again.');
//         console.error('Order Failed:', result);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An error occurred. Please check your connection.');
//       console.error('Error:', error);
//     }
//   };

//   const toggleExpand = () => {
//     const finalValue = expanded ? 0 : 1;

//     Animated.timing(animation, {
//       toValue: finalValue,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();

//     setExpanded(!expanded);
//   };

//   const maxHeight = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 300], // Adjust height for your content
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={{ paddingHorizontal: 2, marginTop: 0 }}>
//           <View style={styles.containerani}>
//             <TouchableOpacity style={styles.toggleButton} onPress={toggleExpand}>
//               <Text style={styles.toggleText}>{expanded ? 'Order Summary' : 'Order Summary'}</Text>
//               <Image
//                 source={expanded ? require('../assets/Slide Up.png') : require('../assets/Down Button.png')}
//                 style={{ width: 20, height: 20, backgroundColor: 'black' }}
//               />
//             </TouchableOpacity>

//             <Animated.View style={[styles.content, { maxHeight }]}>
//               <FlatList
//                 data={cart.length > 0 ? cart : item ? [item] : []}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                   <View style={styles.cartItem}>
//                     <Image source={{ uri: 'https://api.g3studio.co' + item.images[0]?.src }} style={styles.image} />
//                     <View style={styles.itemDetails}>
//                       <Text style={styles.itemName}>{item.title}</Text>
//                       <Text style={styles.itemPrice}>Rs. {item?.variants[0].price}</Text>
//                       <Text style={styles.itemqty}>qty {item.quantity}</Text>
//                     </View>
//                   </View>
//                 )}
//               />
//               <Text style={styles.totalPrice}>Total: Rs. {totalPrice || 0}</Text>
//             </Animated.View>
//           </View>
//         </View>

//         <View style={styles.contactForm}>
//           <TextInput
//             placeholder="Email"
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//           <TextInput
//             placeholder="Full Name"
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             placeholder="Phone Number"
//             style={styles.input}
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//           />
//           <TextInput
//             placeholder="Address"
//             style={styles.input}
//             value={address}
//             onChangeText={setAddress}
//             keyboardType="default"
//           />

//           <Text style={styles.sectionHeadern}>Shipping Method</Text>
//           <Text style={styles.shippingMethodn}>Free Delivery</Text>

//           <Text style={styles.sectionHeadern}>Payment</Text>
//           <TouchableOpacity style={styles.radioOptionn} onPress={() => setPaymentMethod('COD')}>
//             <Text style={[styles.radioTextn, paymentMethod === 'COD' && styles.selectedOptionn]}>
//               ● Cash on Delivery (COD)
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.radioOptionn} onPress={() => setPaymentMethod('Card')}>
//             <Text style={[styles.radioTextn, paymentMethod === 'Card' && styles.selectedOptionn]}>
//               ○ Debit - Credit Card
//             </Text>
//           </TouchableOpacity>

//           <Text style={styles.sectionHeadern}>Billing Address</Text>
//           <TouchableOpacity style={styles.radioOptionn} onPress={() => setBillingSameAsShipping(true)}>
//             <Text style={[styles.radioTextn, billingSameAsShipping && styles.selectedOptionn]}>
//               ● Same as Shipping Address
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.radioOptionn} onPress={() => setBillingSameAsShipping(false)}>
//             <Text style={[styles.radioTextn, !billingSameAsShipping && styles.selectedOptionn]}>
//               ○ Use a Different Billing Address
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
//           <Text style={styles.orderText}>Place Order</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // Styles remain the same as in your original code
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
//   cartItem: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
//   image: { width: 80, height: 80, marginRight: 10 },
//   itemDetails: { justifyContent: 'center' },
//   itemName: { fontSize: 16, fontWeight: 'bold' },
//   itemPrice: { fontSize: 16, color: '#EC4505' },
//   itemqty: { fontSize: 16, color: 'Black' },
//   totalPrice: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
//   contactForm: { marginVertical: 10 },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
//   orderButton: { backgroundColor: '#EC4505', padding: 15, borderRadius: 50, alignItems: 'center', marginTop: 10 },
//   orderText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   containerani: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 20,
//     elevation: 3,
//   },
//   toggleButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//   },
//   toggleText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   content: {
//     overflow: 'scroll',
//   },
//   description: {
//     padding: 10,
//     fontSize: 16,
//     color: 'white',
//   },
//   containern: { padding: 20 },
//   headern: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   cartItemn: { flexDirection: 'row', marginBottom: 10 },
//   imagen: { width: 50, height: 50, marginRight: 10 },
//   itemNamen: { fontSize: 16 },
//   itemPricen: { color: 'gray' },
//   inputn: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
//   sectionHeadern: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
//   shippingMethodn: { fontSize: 16, color: 'green', marginVertical: 5 },
//   radioOptionn: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
//   radioTextn: { fontSize: 16 },
//   selectedOptionn: { fontWeight: 'bold' },
//   totalPricen: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
//   payButtonn: { backgroundColor: 'orange', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
//   payButtonTextn: { color: 'white', fontSize: 18 },
// });

// export default CheckoutScreen;








import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated, 
  ScrollView,
  Alert,
} from 'react-native';
import { useCart } from '../src/CartContext'; // Import useCart hook

const CheckoutScreen = ({ route, navigation }) => {
  const { cart = [], totalPrice } = route.params || {};
  const item = route.params?.item;
  const { clearCart } = useCart(); // Access clearCart function from CartContext

  console.log('Checkout Item:', item);
  console.log('Total Price:', totalPrice);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default: Cash on Delivery
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const handleOrder = async () => {
    // Prepare the items array
    const items = cart.length > 0 ? cart : item ? [item] : [];

    const orderData = {
      customer: {
        name: name, // Use the name from state
        email: email, // Use the email from state
        phone: phone, // Use the phone from state
      },
      items: items.map((item) => ({
        variantId: item.variants[0]?.id, // Use the variant ID
        quantity: item.quantity || 1, // Default to 1 if quantity is missing
      })),
      paymentMethod: paymentMethod === 'COD' ? 'COD' : 'credit-card', // Map payment method
      address: {
        address: address, // Use the address from state
        city: 'Lahore', // Replace with actual city if available
        state: 'Punjab', // Replace with actual state if available
        zip: '12345', // Replace with actual zip if available
        country: 'Pakistan', // Replace with actual country if available
        carrier: 'TCS', // Replace with actual carrier if available
      },
    };

    try {
      const response = await fetch('https://api.g3studio.co/api/cart/checkout/direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'connect.sid=s%3A7sXM8QLAA4rc3VhdxSHrBgv-476RgEnT.xhChcpaDkRc6eyXIGpFnCvOwTJfZaxCeCzHQNGbV1tI', // Use the correct cookie
        },
        body: JSON.stringify(orderData),
      });

      // Log the raw response text
      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      // Check if the response is valid JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok) {
        Alert.alert('Success', 'Your order has been placed successfully!');
        console.log('Order Placed:', result);

        // Clear the cart after successful order
        await clearCart();

        // Navigate to a success screen or home screen
        navigation.navigate('OrderSuccess');
      } else {
        Alert.alert('Error', 'Failed to place order. Please try again.');
        console.error('Order Failed:', result);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please check your connection.');
      console.error('Error:', error);
    }
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
      <ScrollView>
        <View style={{ paddingHorizontal: 2, marginTop: 0 }}>
          <View style={styles.containerani}>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleExpand}>
              <Text style={styles.toggleText}>{expanded ? 'Order Summary' : 'Order Summary'}</Text>
              <Image
                source={expanded ? require('../assets/Slide Up.png') : require('../assets/Down Button.png')}
                style={{ width: 20, height: 20, backgroundColor: 'black' }}
              />
            </TouchableOpacity>

            <Animated.View style={[styles.content, { maxHeight }]}>
              <FlatList
                data={cart.length > 0 ? cart : item ? [item] : []}
                nestedScrollEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  // <ScrollView>
                  <View style={styles.cartItem}>
                    <Image source={{ uri: 'https://api.g3studio.co' + item.images[0]?.src }} style={styles.image} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.title}</Text>
                      <Text style={styles.itemPrice}>Rs. {item?.variants[0].price}</Text>
                      <Text style={styles.itemqty}>qty {item.quantity}</Text>
                    </View>
                  </View>
                  // {/* </ScrollView> */}
                )}
              />
              <Text style={styles.totalPrice}>Total: Rs. {totalPrice || 0}</Text>
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

          <Text style={styles.sectionHeadern}>Shipping Method</Text>
          <Text style={styles.shippingMethodn}>Free Delivery</Text>

          <Text style={styles.sectionHeadern}>Payment</Text>
          <TouchableOpacity style={styles.radioOptionn} onPress={() => setPaymentMethod('COD')}>
            <Text style={[styles.radioTextn, paymentMethod === 'COD' && styles.selectedOptionn]}>
              ● Cash on Delivery (COD)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioOptionn} onPress={() => setPaymentMethod('Card')}>
            <Text style={[styles.radioTextn, paymentMethod === 'Card' && styles.selectedOptionn]}>
              ○ Debit - Credit Card
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionHeadern}>Billing Address</Text>
          <TouchableOpacity style={styles.radioOptionn} onPress={() => setBillingSameAsShipping(true)}>
            <Text style={[styles.radioTextn, billingSameAsShipping && styles.selectedOptionn]}>
              ● Same as Shipping Address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioOptionn} onPress={() => setBillingSameAsShipping(false)}>
            <Text style={[styles.radioTextn, !billingSameAsShipping && styles.selectedOptionn]}>
              ○ Use a Different Billing Address
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain the same as in your original code
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  cartItem: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  image: { width: 80, height: 80, marginRight: 10 },
  itemDetails: { justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, color: '#EC4505' },
  itemqty: { fontSize: 16, color: 'Black' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
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
    color: 'black',
  },
  content: {
    overflow: 'scroll',
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
  payButtonTextn: { color: 'white', fontSize: 18 },
});

export default CheckoutScreen;
