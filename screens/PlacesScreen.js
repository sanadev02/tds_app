import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const PlacesScreen = () => {
  const route = useRoute();
  console.log(route.params);
  return (
    <View>
      <Text>PlacesScreen</Text>
    </View>
  )
}

export default PlacesScreen

const styles = StyleSheet.create({})