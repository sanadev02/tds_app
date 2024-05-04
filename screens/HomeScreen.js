// Main Page - Hotel Booking
import {
    Button,
    StyleSheet,
    ScrollView,
    Pressable,
    Text,
    View,
    Image
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Travel Destination System",
            headerTitleStyle: {
                fontSize: 24,
                fontWeight: "bold",
                color: "#B19F8B",
                alignItems: "center"
            },
            headerStyle: {
                backgroundColor: "#455D64",
                height: 100,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
            headerRight: () => (
                <Ionicons name="notifications-outline" size={24} color="#B19F8B" style={{ marginRight: 12 }} />
            )
        })

    }, []);
    console.log(route.params);

    return (
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]} style={styles.page}>
                <View>
                    <ScrollView >
                        <View style={styles.viewBox}>
                            <Pressable
                                onPress={() => navigation.navigate("Search")}
                                style={styles.search}>
                                <Text style={styles.searchText}>
                                    Press Here to Search Hotel Deals!
                                </Text>
                            </Pressable>
                        </View>
                        <View>
                          <Pressable
                          >
                          </Pressable>
                        </View>

                        <View style={styles.scrolls}>
                            <Text style={styles.scrollTitle}>
                                Explore Sustainable Travel
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStack}>
                                    <FontAwesome6 name="hotel" size={24} color="black" />
                                    <Text style={styles.stackText}>
                                        Discover eco-friendly accomodation for any destination, from anywhere
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStack}>
                                    <Fontisto name="holiday-village" size={24} color="black" />
                                    <Text style={styles.stackText}>
                                        Compare accomodation options from a range of providers, and select the greenest options
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStack}>
                                    <AntDesign name="tago" size={24} color="black" />
                                    <Text style={styles.stackText}>
                                        Reward yourself guilt free with sustainable stays
                                    </Text>
                                </LinearGradient>
                            </ScrollView>
                        </View>

                        <View style={styles.scrolls}>
                            <Text style={styles.scrollTitle}>
                                Trending Destinations
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <LinearGradient colors={['#96BBBB', 'white',]} style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        London, United Kingdom</Text>
                                    <Image style={styles.scrollImage} source={require('../assets/London.jpeg')} />
                                </LinearGradient>

                                <LinearGradient colors={['#96BBBB', 'white',]} style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        Edinburgh, Scotland
                                    </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/Edinburgh.jpeg')} />
                                </LinearGradient>

                                <LinearGradient colors={['#96BBBB', 'white',]} style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        Manchester, United Kingdom
                                    </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/Manchester.jpeg')} />
                                </LinearGradient>
                            </ScrollView>
                        </View>

                        <View style={styles.scrolls}>
                            <Text style={styles.scrollTitle}>
                                Plan your next stay:
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackHotel}>
                                    <FontAwesome6 name="hotel" size={24} color="black" style={styles.stackTextHotel} />
                                    <Text style={styles.stackTextHotel}>
                                        Hotels
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackHotel}>
                                    <MaterialIcons name="apartment" size={24} color="black" style={styles.stackTextHotel} />
                                    <Text style={styles.stackTextApart}>
                                        Apartments
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackHotel}>
                                    <Fontisto name="holiday-village" size={24} color="black" style={styles.stackTextHotel} />
                                    <Text style={styles.stackTextHotel}>
                                        Villas
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackHotel}>
                                    <Fontisto name="tent" size={24} color="black" style={styles.stackTextHotel} />
                                    <Text style={styles.stackTextHotel}>
                                        Glamping
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackHotel}>
                                    <MaterialIcons name="castle" size={24} color="black" style={styles.stackTextHotel} />
                                    <Text style={styles.stackTextHotel}>
                                        Castles
                                    </Text>
                                </LinearGradient>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    )
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewBox: {
        margin: 20,
    },
    page: {
        height: '100%'
    },
    scrolls: {
        padding: 10
    },
    search: {
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 4,
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: "#4D5E68"
    },
    searchText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
        color: "#B19F8B"
    },
    scrollStack: {
        width: 200,
        height: 180,
        marginTop: 10,
        textAlign: "center",
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 3,
        backgroundColor: "#96CCCC",
        flexDirection: "column"
    },
    scrollStackHotel: {
        width: 140,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 3,
        backgroundColor: "#96CCCC",
        flexDirection: "column"
    },
    stackTextHotel: {
        color: "black",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    stackTextApart: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
    stackText: {
        color: "black",
        fontSize: 15,
        fontWeight: "500",
    },
    scrollImage: {
        width: 246,
        height: 160,
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        marginLeft: -8
    },
    scrollStacks: {
        width: 250,
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 3,
        backgroundColor: "#a2d2df",
        flexDirection: "column"
    },
    scrollTitle: {
        marginHorizontal: 20,
        fontSize: 17,
        fontWeight: "500"
    },
});