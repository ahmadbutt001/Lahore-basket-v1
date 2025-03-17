import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

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

const DiscountBanners: React.FC = () => {
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

  const renderItem = ({ item }: { item: Banner }) => (
    <>
    {item.type == "DISCOUNT"?
    <View>
    {/* <Text style={{fontWeight:'bold' , padding:15, fontSize:15}}>Discounts:</Text> */}
    <View 
    style={styles.slide}
    >
        {/* <Text style={{fontWeight:'bold' , padding:10,}}>jsjkugkvhjkkjlvjhvjlhvhlj</Text> */}
      <Image 
      // source={{ uri: item.imageUrl }} 
      source={{ uri: "https://api.g3studio.co/"+item?.imageUrl}}
      style={styles.image} />
      
    </View>
    </View>:<></> }
    
    </>
    
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
   <View>
    {/* <Text style={{fontWeight:'bold' , padding:10, fontSize:20, }}>Promotions:</Text>  */}
    <View style={styles.container}>
    <Text style={{fontWeight:'bold' , padding:0, fontSize:20,  alignSelf:'flex-start', left:10, top:15 }}>Promotions:</Text> 
        
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:0,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
  },
});

export default DiscountBanners;