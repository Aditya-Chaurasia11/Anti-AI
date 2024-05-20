// index.jsx
import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Index = () => {
  //here is img stored
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      } else {
        console.log('Camera permission granted');
      }
    })();
  }, []);

  const captureImage = async () => {
    try {
      console.log('Opening camera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Camera result:', result);

      if (!result.cancelled) {
        console.log('Image URI:', result.assets[0].uri);
        setImageUri(result.assets[0].uri);
      } else {
        console.log('Image capture cancelled');
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      // Alert.alert('Error', 'An error occurred while capturing the image. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Capture Image" onPress={captureImage} />
      {imageUri && (
        <>
          <Text>Image URI: {imageUri}</Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
  },
});

export default Index;
