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





// App.json
// {
//   "expo": {
//     "name": "lahore-basket",
//     "slug": "lahore-basket",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/lb.png",
//     "userInterfaceStyle": "light",
//     "newArchEnabled": true,
//     "splash": {
//       "image": "./assets/splash-icon.png",
//       "resizeMode": "contain",
//       "backgroundColor": "#ffffff"
//     },
//     "ios": {
//       "supportsTablet": true
//     },
//     "android": {
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       },
//         "permissions": ["INTERNET"],
//         "usesCleartextTraffic": true,
//       "package": "com.grycoproduction.lahorebasket"
//     },
//     "web": {
//       "favicon": "./assets/favicon.png"
//     },
//     "extra": {
//       "eas": {
//         "projectId": "7bff8ee3-580f-4a37-8bc6-49648caab61a"
//       }
//     }
//   }
// }


// App.config.js
// export default {
//   expo: {
//     name: "lahore-basket",
//     slug: "lahore-basket",
//     version: "1.0.0",
//     orientation: "portrait",
//     icon: "./assets/lb.png",
//     userInterfaceStyle: "light",
//     newArchEnabled: true,
//     splash: {
//       image: "./assets/splash-icon.png",
//       resizeMode: "contain",
//       backgroundColor: "#ffffff",
//     },
//     ios: {
//       supportsTablet: true,
//     },
//     android: {
//       adaptiveIcon: {
//         foregroundImage: "./assets/adaptive-icon.png",
//         backgroundColor: "#ffffff",
//       },
//       package: "com.grycoproduction.lahorebasket",
//       permissions: ["INTERNET"],
//       permissions: ["INTERNET", "ACCESS_NETWORK_STATE"],
//       usesCleartextTraffic: true,
//     },
//     web: {
//       favicon: "./assets/favicon.png",
//     },
//     extra: {
//       eas: {
//         projectId: "7bff8ee3-580f-4a37-8bc6-49648caab61a",
//       },
//       apiBaseUrl:
//       process.env.APP_ENV === "production"
//         ? "http://52.74.115.234:5000"
//         : "http://52.74.115.234:5000",
//     },
//   },
// };