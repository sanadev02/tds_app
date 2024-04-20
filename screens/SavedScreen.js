import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const SavedScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Saved",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#B19F8B",
        alignItems: "center"
      },
      headerStyle: {
        backgroundColor: "#455D64",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      }
    })
  }, []);
  return (
    <View>
      <Text>SavedScreen</Text>

    </View>
  )
}

export default SavedScreen

const styles = StyleSheet.create({})