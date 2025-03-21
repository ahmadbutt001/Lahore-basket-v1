import React  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView,Linking, } from 'react-native';


const OrderSuccess = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Thank You Image */}

        {/* <Image 
           source={{ uri: 'https://plus.unsplash.com/premium_photo-1733259823567-9b681f9dd76e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhhbmslMjB5b3V8ZW58MHx8MHx8fDA%3D' }} 
          style={styles.image}
        /> */}
         <Image  
                // style={{ height: 25, width: 25,  }}
                style={styles.image}
                source={require('../assets/Tick Box.png')}
                />

        {/* Thank You Message */}
        <Text style={styles.thankYouText}>Thank You!</Text>
        <Text style={styles.messageText}>
          Your order has been placed successfully. We will deliver your items soon.
        </Text>

        {/* <WebView
      style={styles.containers}
      source={{ uri: 'https://goryco.com/lahore-basket/' }}
    /> */}
<TouchableOpacity onPress={() => Linking.openURL('https://goryco.com/lahore-basket/')}>
<Text style={{color:"white", bottom:10}}>Privacy Policy</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => Linking.openURL('https://goryco.com/lahore-basket/')}>
<Text style={{color:"white", bottom:10}}>Terms and Condition</Text>
</TouchableOpacity>

        {/* Continue Shopping Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('HomeScreen', { screen: 'Home' })}// Navigate to Home screen
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EC4505',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containers: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    // backgroundColor:'orange',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  continueButtonText: {
    color: '#EC4505',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSuccess;