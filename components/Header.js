import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen.js';
import FlightsScreen from '../screens/FlightsScreen.js';
import { useNavigation, useRoute } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <>
            <View
                style={{
                    backgroundColor: "#455D64",
                    height: 65,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding:10
                }}>
                <Pressable 
                onPress={() => navigation.navigate('Home')}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft:12
                }}
            //     options={{  icon: ({ focused }) => focused ? (
            //         <FontAwesome name="hotel" size={20} color="#B19F8B" />
            //     ) : (
            //         <FontAwesome name="hotel-outline" size={20} color="#B19F8B" />>
            //     ),
            // }}
                >
                    <FontAwesome name="hotel" size={20} color="#B19F8B" />
                    <Text style={{
                        marginLeft: 8,
                        fontWeight: "bold",
                        color: "#B19F8B",
                        fontSize: 15
                    }}>
                        Hotels</Text>
                </Pressable>

                <Pressable 
                onPress={() => navigation.navigate('Flights')}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8
                }}>
                    <FontAwesome name="plane" size={24} color="#B19F8B" />
                    <Text style={{
                        marginLeft: 8,
                        fontWeight: "bold",
                        color: "#B19F8B",
                        fontSize: 15
                    }}>
                        Flights</Text>
                </Pressable>

                <Pressable 
                onPress={() => navigation.navigate('FlightsHotels')}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 8
                }}>

                    <MaterialCommunityIcons name="island" size={24} color="#B19F8B" />
                    <Text style={{
                        marginLeft: 8,
                        fontWeight: "bold",
                        color: "#B19F8B",
                        fontSize: 15
                    }}>
                        Flights + Hotels</Text>
                </Pressable>
            </View></>
    );
};

export default Header

const styles = StyleSheet.create({})