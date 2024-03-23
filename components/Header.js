import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View
            style={{
                backgroundColor: "#4D5E68",
                height: 65,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
            }}>
            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "#B19F8B",
                borderWidth: 2,
                borderRadius: 25,
                padding: 8
            }}>
                <MaterialCommunityIcons name="island" size={24} color="#B19F8B" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "#B19F8B",
                    fontSize: 15
                }}>
                    Flights + Hotel</Text>
            </Pressable>

            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                // borderColor:"white",
                // borderWidth:2,
                // borderRadius:25,
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

            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                // borderColor:"white",
                // borderWidth:2,
                // borderRadius:25,
                padding: 8
            }}>
                <FontAwesome name="hotel" size={20} color="#B19F8B" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "#B19F8B",
                    fontSize: 15
                }}>
                    Hotels</Text>
            </Pressable>
        </View>
    );
};

export default Header

const styles = StyleSheet.create({})