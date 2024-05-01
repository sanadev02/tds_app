import {
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    Text,
    View,
    Image
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';


const FlightsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Travel Destination System",
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
            },
            headerRight: () => (
                <Ionicons name="notifications-outline" size={24} color="#B19F8B" style={{ marginRight: 12 }} />
            )
        })
    }, []);

    console.log(route.params);

    return (
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]}>
                <View>
                    <ScrollView>
                        <View style={styles.viewBox}>
                            <Pressable
                                onPress={() => navigation.navigate("FlightBooking")}
                                style={styles.search}>
                                <Text style={styles.searchText}>
                                    Press Here to Search Flight Deals!
                                </Text>
                            </Pressable>
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text
                                style={styles.stackTitle}
                            >
                                Explore Sustainable Travel
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStack}>
                                    <FontAwesome name="plane" size={24} color="black" />
                                    <Text style={styles.stackText}>
                                        Discover eco-friendly travel options to any destination, from anywhere
                                    </Text>
                                </LinearGradient>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStack}>
                                    <Ionicons name="calendar-outline" size={24} color="black" />
                                    <Text style={styles.stackText}>
                                        Compare flight options from a range of providers, and select the greenest tickets for your journey.
                                    </Text>
                                </LinearGradient>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStack}>
                                    <AntDesign name="tago" size={24} color="black" />
                                    <Text
                                        style={styles.stackText}
                                    >
                                        Discover the most economical times to fly, and create Eco-Alerts to book when the price fits within your budget
                                    </Text>
                                </LinearGradient>
                            </ScrollView>
                        </View>

                        <View style={styles.scrolls}>
                            <Text
                                style={styles.stackTitle}
                            >
                                Trending Destinations
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <LinearGradient colors={['#96BBBB', 'white',]} style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        Barcelona, Spain </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/barcelona-beach.jpeg')} />
                                </LinearGradient>

                                <LinearGradient colors={['#96BBBB', 'white',]} style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        Florence, Italy
                                    </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/florence.jpeg')} />
                                </LinearGradient>

                                <LinearGradient colors={['#96BBBB', 'white',]} style={styles.scrollStacks}>
                                    <Text
                                        style={styles.stackText}
                                    >
                                        Santorini, Greece
                                    </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/Santorini.jpeg')} />
                                </LinearGradient>
                            </ScrollView>
                        </View>

                        <View style={styles.scrolls}>
                            <Text
                                style={styles.stackTitle}
                            >
                                Extras
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackExtra}>
                                    <MaterialIcons name="free-cancellation" size={24} color="black" style={styles.stackIcon} />
                                    <Text style={styles.stackText}>
                                        Delays and Cancellations
                                    </Text>
                                </LinearGradient>

                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackExtra}>
                                    <FontAwesome name="wheelchair" size={24} color="black" style={styles.stackIcon} />
                                    <Text style={styles.stackText}>

                                        Special assistance
                                    </Text>
                                </LinearGradient>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackExtra}>
                                    <MaterialIcons name="airline-seat-recline-normal" size={24} color="black" style={styles.stackIcon} />
                                    <Text style={styles.stackText}>

                                        Allocated seating
                                    </Text>
                                </LinearGradient>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackExtra}>
                                    <FontAwesome name="plane" size={24} color="black" style={styles.stackIcon} />
                                    <Text style={styles.stackText}>

                                        Cancelling flights
                                    </Text>
                                </LinearGradient>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackExtra}>
                                    <MaterialIcons name="airplane-ticket" size={24} color="black" style={styles.stackIcon} />
                                    <Text style={styles.stackText}>

                                        Boarding
                                    </Text>
                                </LinearGradient>
                                <LinearGradient colors={['white', '#96BBBB',]} style={styles.scrollStackExtra}>
                                    <MaterialIcons name="luggage" size={24} color="black" style={styles.stackIcon} />
                                    <Text style={styles.stackText}>
                                        Baggage
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

export default FlightsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
    },
    viewBox: {
        margin: 20,
    },
    scrolls: {
        padding: 10,
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 2,
        paddingVertical: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10,
        alignSelf: 'center',
    },
    pressable: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 2,
        paddingVertical: 15,
    },
    search: {
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 4,
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: "#4D5E68",
    },
    searchText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
        color: "#B19F8B",
    },
    scrollStack: {
        width: 200,
        height: 180,
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 3,
        backgroundColor: "#B1BEC4",
        flexDirection: "column",
    },
    scrollStackExtra: {
        width: 150,
        height: 120,
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 3,
        backgroundColor: "#B1BEC4",
        textAlign: 'center',
        flexDirection: "column",

    },
    stackTitle: {
        marginHorizontal: 20,
        fontSize: 17,
        fontWeight: "500",
    },
    stackText: {
        color: "black",
        fontSize: 15,
        fontWeight: "500",
    },
    stackIcon: {
        color: "black",
        fontSize: 24,
        fontWeight: "500",
        textAlign: 'center',
    },
    scrollImage: {
        width: 246,
        height: 160,
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        marginLeft: -8,
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
        flexDirection: "column",
    },
    searchInfo: {
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 4,
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: "#4D5E68",
        margin: 10,
    },
})