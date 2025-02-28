// import React from 'react';
// import { View, Text, TouchableOpacity , Image} from 'react-native';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../types'; // Import the type
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// const CustomHeader = () => {
//     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   return (
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
//       <Text style={{ fontSize: 20 }}>My App</Text>
//       <TouchableOpacity
//     //    onPress={() => alert('Cart pressed!')}
//         // {/* <Icon name="shopping-cart" size={24} color="black" /> */}
//         //    {/* <TouchableOpacity
//         //                 style={{ marginRight: 15 }} */}
//                         // onPress={() => alert('Cart pressed!')}
//                         onPress={() => navigation.navigate('Cart')}>
                       
//                      {/* onPress={() => navigation?.navigate('Cart')}>  */}
//                         <Image  style={{ height: 20, width: 20, marginLeft: 5 }}
//                         source={require('../assets/Down Button.png')}
//                         />
//                       {/* </TouchableOpacity> */}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CustomHeader;