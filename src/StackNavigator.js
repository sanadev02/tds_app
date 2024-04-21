import { StyleSheet, Tab, Screen, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.js';
import SavedScreen from '../screens/SavedScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import PlacesScreen from '../screens/PlacesScreen';
import MapScreen from '../screens/MapScreen.js';
import PropertyInfoScreen from '../screens/PropertyInfoScreen.js';
import RoomsScreen from '../screens/RoomsScreen.js';
import UsersScreen from '../screens/UsersScreen.js';
import ConfirmationScreen from '../screens/ConfirmationScreen.js';
import FlightsScreen from '../screens/FlightsScreen.js';
import FlightsHotelsScreen from '../screens/FlightsHotelsScreen.js';
import FlightOptionItem from '../components/FlightOptionItem.js';
import AirportDestination from '../components/AirportDestination.js';


const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator >
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarLabel: "Home", tabBarIcon: ({ focused }) => focused ? (
                        <Entypo name="home" size={24} color="#4D5E68" />
                    ) : (
                        <AntDesign name="home" size={24} color="black" />
                    ),
                }}
                />

                <Tab.Screen name="Saved" component={SavedScreen} options={{
                    tabBarLabel: "Saved", tabBarIcon: ({ focused }) => focused ? (
                        <AntDesign name="heart" size={24} color="#4D5E68" />
                    ) : (
                        <AntDesign name="hearto" size={24} color="black" />
                    ),
                }}
                />

                <Tab.Screen name="Bookings" component={BookingScreen} options={{
                    tabBarLabel: "Bookings", tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="notifications" size={24} color="#4D5E68" />
                    ) : (
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    ),
                }}
                />

                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarLabel: "Profile", tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="person" size={24} color="#4D5E68" />
                    ) : (
                        <Ionicons name="person-outline" size={24} color="black" />
                    ),
                }}
                />

            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Places" component={PlacesScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Info" component={PropertyInfoScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Rooms" component={RoomsScreen} options={{ headerShown: true }} />
                <Stack.Screen name="User" component={UsersScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Flights" component={FlightsScreen} options={{ headerShown: true }}/>
                <Stack.Screen name="FlightsHotels" component={FlightsHotelsScreen} options={{ headerShown: true }}/>
                <Stack.Screen name="Airport" component={FlightOptionItem} options={{ headerShown: true }}/>
                <Stack.Screen name="AirportDestination" component={AirportDestination} options={{ headerShown: true }}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})