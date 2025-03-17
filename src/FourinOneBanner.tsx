// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';

// // Local data for banners (replace this with API data later)
// const localBanners = [
//       'https://i.pinimg.com/736x/ae/5f/66/ae5f6662095edb5f32ca78a859283d6d.jpg', // First banner (long height)
//       'https://img.freepik.com/premium-psd/fresh-healthy-vegetable-fruit-grocery-delivery-social-media-instagram-post-template_677506-24.jpg', // Middle banner 1
//       'https://img.freepik.com/premium-psd/psd-vegetable-fruit-grocery-delivery-social-media-instagram-social-media-post-template_824582-43.jpg', // Middle banner 2
//       'https://img.freepik.com/premium-psd/vegetable-grocery-delivery-social-media-post-promotion-instagram-template_512161-25.jpg', // Last banner (long height)
// ];



// useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await fetch('YOUR_API_ENDPOINT_HERE'); // Replace with your API endpoint
//         const data = await response.json();
//         setBanners(data); // Assuming API returns an array of banner URLs
//       } catch (error) {
//         console.error('Error fetching banners:', error);
//       }
//     };
  
//     fetchBanners();
//   }, []);



// const FourinOneBanner = () => {
//   const [banners, setBanners] = useState<string[]>([]);

//   useEffect(() => {
//     // Simulate fetching data from local storage
//     setBanners(localBanners);
//   }, []);

//   if (banners.length < 4) {
//     return null; // or a loading spinner
//   }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.banner, styles.firstBanner]}>
//         <Image source={{ uri: banners[0] }} style={styles.image} />
//       </View>
//       <View style={[styles.banner, styles.middleBanner]}>
//         <Image source={{ uri: banners[1] }} style={styles.image} />
//       </View>
//       <View style={[styles.banner, styles.middleBanner]}>
//         <Image source={{ uri: banners[2] }} style={styles.image} />
//       </View>
//       <View style={[styles.banner, styles.lastBanner]}>
//         <Image source={{ uri: banners[3] }} style={styles.image} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 10,
    
//   },
//   banner: {
//     width: '48%', // Adjust as needed
//     marginBottom: 5,
//   },
//   firstBanner: {
//     height: 250, // Adjust as needed
//   },
//   middleBanner: {
//     height: 150, // Adjust as needed
//   },
//   lastBanner: {
//     height: 250, // Adjust as needed
//     position:'absolute',
//     flexDirection:'row',
//     alignSelf:'flex-end',
//     right:10
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10, // Optional: for rounded corners
//   },
// });

// export default FourinOneBanner;










import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Define the types
type Banner = {
  id: number;
  imageUrl: string;
  link: string;
  position: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  banners: Banner[];
};

const FourinOneBanner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('https://api.g3studio.co/api/banners');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setBanners(data.banners); // Set the banners array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Filter banners with type "DISCOUNT" and limit to 4
  const discountBanners = banners
    .filter((item) => item.type === 'DISCOUNT')
    // fourinone 
    .slice(0, 4);

  return (
    <View>
      {/* <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 20 }}>Discounts:</Text> */}
      <View style={styles.gridContainer}>
        {discountBanners.map((item,index) => (
          <>
          {index == 0 || index == 1 ? <View key={item.createdAt} style={[styles.bannerContainer ,styles.lastBanner]}>
          <Image
            source={{ uri: `https://api.g3studio.co/${item.imageUrl}` }}
            style={styles.image2}
          />
        </View>:<View key={item.createdAt} style={styles.bannerContainer}>
          <Image
            source={{ uri: `https://api.g3studio.co/${item.imageUrl}` }}
            style={styles.image}
          />
        </View>}

        </>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lastBanner: {
        height: 250, // Adjust as needed
        // position:'absolute',
        flexDirection:'row',
        alignSelf:'flex-end',
        // right:
      },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  bannerContainer: {
    width: '48%', // Adjust width to fit 2 banners in a row
    marginBottom: 10, // Space between rows
  },
  image: {
    width: '100%',
    height: 150, // Adjust height as needed
    borderRadius: 10,
  },
  image2: {
    width: '100%',
    height: 250, // Adjust height as needed
    borderRadius: 10,
  },
});

export default FourinOneBanner;




// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Text } from 'react-native';

// // Define the types
// type Banner = {
//   id: number;
//   imageUrl: string;
//   link: string;
//   position: number;
//   type: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type ApiResponse = {
//   banners: Banner[];
// };



// const FourinOneBanner = () => {
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     try {
//       const response = await fetch('https://api.g3studio.co/api/banners');
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data: ApiResponse = await response.json();
//       setBanners(data.banners); // Set the banners array
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }
 

//   // if (banners.length < 4) {
//   //   return null; // or a loading spinner
//   // }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.banner, styles.firstBanner]}>
//         <Image 
//         // source={{ uri: banners[0] }} 
//         source={{ uri: `https://api.g3studio.co/${item.imageUrl}` }}
//         style={styles.image} />
//       </View>
//       {/* <View style={[styles.banner, styles.middleBanner]}>
//         <Image source={{ uri: banners[1] }} style={styles.image} />
//       </View>
//       <View style={[styles.banner, styles.middleBanner]}>
//         <Image source={{ uri: banners[2] }} style={styles.image} />
//       </View>
//       <View style={[styles.banner, styles.lastBanner]}>
//         <Image source={{ uri: banners[3] }} style={styles.image} />
//       </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 10,
//   },
//   banner: {
//     width: '48%', // Adjust as needed
//     marginBottom: 5,
//   },
//   firstBanner: {
//     height: 250, // Adjust as needed
//   },
//   middleBanner: {
//     height: 150, // Adjust as needed
//   },
//   lastBanner: {
//     height: 250, // Adjust as needed
//     position: 'absolute',
//     flexDirection: 'row',
//     alignSelf: 'flex-end',
//     right: 10,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10, // Optional: for rounded corners
//   },
// });

// export default FourinOneBanner;












// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

// // Local data for banners (replace this with API data later)
// const localBanners = [
//     { id: 1, url: 'https://i.pinimg.com/736x/ae/5f/66/ae5f6662095edb5f32ca78a859283d6d.jpg', title: 'Online Jobs | Freels...' },
//     { id: 2, url: 'https://i.pinimg.com/736x/ae/5f/66/ae5f6662095edb5f32ca78a859283d6d.jpg', title: 'Generate - Coolors...' },
//     { id: 3, url: 'https://i.pinimg.com/736x/ae/5f/66/ae5f6662095edb5f32ca78a859283d6d.jpg', title: 'Pixabay for pics gfa...' },
//     { id: 4, url: 'https://i.pinimg.com/736x/ae/5f/66/ae5f6662095edb5f32ca78a859283d6d.jpg', title: 'Get Fresh 99+ Defo...' },
//   ];
  
// const FourinOneBanner = () => {
//   const [banners, setBanners] = useState<{ id: number; url: string; title: string }[]>([]);

//   useEffect(() => {
//     // Simulate fetching data from local storage
//     setBanners(localBanners);
//   }, []);

//   if (banners.length < 4) {
//     return null; // or a loading spinner
//   }

//   return (
//     <View style={styles.container}>
//       {/* First Banner */}
//       <View style={[styles.banner, styles.firstBanner]}>
//         <Image source={{ uri: banners[0].url }} style={styles.image} />
//         <Text style={styles.bannerTitle}>{banners[0].title}</Text>
//       </View>

//       {/* Middle Banners */}
//       <View style={styles.middleBannerContainer}>
//         <View style={[styles.banner, styles.middleBanner]}>
//           <Image source={{ uri: banners[1].url }} style={styles.image} />
//           <Text style={styles.bannerTitle}>{banners[1].title}</Text>
//         </View>
//         <View style={[styles.banner, styles.middleBanner]}>
//           <Image source={{ uri: banners[2].url }} style={styles.image} />
//           <Text style={styles.bannerTitle}>{banners[2].title}</Text>
//         </View>
//       </View>

//       {/* Last Banner */}
//       <View style={[styles.banner, styles.lastBanner]}>
//         <Image source={{ uri: banners[3].url }} style={styles.image} />
//         <Text style={styles.bannerTitle}>{banners[3].title}</Text>
//       </View>

//       {/* See All Button */}
//       <TouchableOpacity style={styles.seeAllButton}>
//         <Text style={styles.seeAllText}>See All</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#F5F5F5',
//     // flexDirection:'row',
//     // flexWrap:'wrap'
//   },
//   banner: {
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 10,
//     position: 'relative',
//   },
//   firstBanner: {
//     height: 150,
//   },
//   middleBannerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   middleBanner: {
//     height: 100,
//     width: '48%',
//   },
//   lastBanner: {
//     height: 150,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   bannerTitle: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   seeAllButton: {
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   seeAllText: {
//     color: '#000000',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default FourinOneBanner;