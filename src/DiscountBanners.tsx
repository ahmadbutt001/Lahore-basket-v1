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
      const response = await fetch('http://192.168.18.31:5000/api/banners');
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
    <View>
    {/* <Text style={{fontWeight:'bold' , padding:15, fontSize:15}}>Discounts:</Text> */}
    <View 
    style={styles.slide}
    >
        {/* <Text style={{fontWeight:'bold' , padding:10,}}>jsjkugkvhjkkjlvjhvjlhvhlj</Text> */}
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      
    </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
   <View>
    <Text style={{fontWeight:'bold' , padding:10, fontSize:20}}>Discounts:</Text> 
    <View style={styles.container}>
        
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
    marginTop:10,
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