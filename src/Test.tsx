// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import Home from './Home';
// // import HomeSlider from './HomeSlider';

// const Test = () => {
//   return (
//     <View style={styles.container}>
//     <Home />
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
// });

// export default Test;


import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Home from './Home';
import DiscountBanners from './DiscountBanners';
// import ImageSlider from './ImageSlider'; // Adjust the import path as necessary

const Test: React.FC = () => {
  return (
    <View style={styles.container}>
      <Home />
      <DiscountBanners/>
      <Text>Hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default Test;