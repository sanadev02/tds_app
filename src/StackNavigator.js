import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlightsScreen from '../screens/FlightsScreen.js';
import AirportDestination from '../screens/AirportDestination.js';
import InfoScreen from '../screens/InfoScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import SearchScreen from '../screens/SearchScreen.js';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarLabel: "Hotels", tabBarIcon: ({ focused }) => focused ? (
                        <FontAwesome name="building" size={24} color="#4D5E68" />
                    ) : (
                        <FontAwesome name="building-o" size={24} color="black" />
                    ),
                }} />
                <Tab.Screen name="Flights" component={FlightsScreen} options={{
                    tabBarLabel: "Flights", tabBarIcon: ({ focused }) => focused ? (
                        <FontAwesome name="plane" size={24} color="#4D5E68" />
                    ) : (
                        <SimpleLineIcons name="plane" size={24} color="black" />
                    ),
                }} />
                <Tab.Screen name="Info" component={InfoScreen} options={{
                    tabBarLabel: "Sustainability", tabBarIcon: ({ focused }) => focused ? (
                        <MaterialCommunityIcons name="leaf-circle-outline" size={24} color="#4D5E68" />
                    ) : (
                        <MaterialCommunityIcons name="leaf-circle-outline" size={24} color="black" />
                    ),
                }} />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Flights" component={FlightsScreen} options={{ headerShown: true }} />
                <Stack.Screen name="AirportDestination" component={AirportDestination} options={{ headerShown: true }} />
                <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Info" component={InfoScreen} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
