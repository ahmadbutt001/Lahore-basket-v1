import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const { width: viewportWidth } = Dimensions.get('window');

// Define the type for the slider item
type SliderItem = {
  id: string;
  imageUrl: string;
  title: string;
};

const HomeSlider: React.FC = () => {
  const [sliderData, setSliderData] = useState<SliderItem[]>([]);

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await axios.get<SliderItem[]>('https://fakestoreapi.com/products');
      setSliderData(response.data);
    } catch (error) {
      console.error('Error fetching slider data:', error);
    }
  };

  const renderItem = ({ item }: { item: SliderItem }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.imageUrl }} style={styles.slideImage} />
        <Text style={styles.slideText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={sliderData}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.8}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  slideText: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeSlider;