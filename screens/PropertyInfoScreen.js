import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { pixelNormalise } from '../components/Normalise';
import { MaterialIcons } from "@expo/vector-icons";
import Amenities from "../components/Amenities";

const PropertyInfoScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: `${route.params.name}`,
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#B19F8B",
                alignItems: "center"
            },
            headerStyle: {
                backgroundColor: "#4D5E68",
                height: 80,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            }
        })
    }, []);
    const difference = route.params.oldPrice - route.params.newPrice;
    const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100;
    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <Pressable style={styles.pressImage}>
                        {/* https://youtu.be/3QcMq90iD5Q?t=10139 */}
                        {/* {route.params.photos.slice(0, 5).map((photo) => (
                            <View style={styles.imageView}>
                                <Image
                                    style={{
                                        width: 120,
                                        height: pixelNormalise(80),
                                        borderRadius: pixelNormalise(4)
                                    }}
                                    source={{ uri: photo.image }}
                                />
                            </View>
                            
                        ))} */}
                        <Pressable style={styles.morePress}>
                            <Text>Show More</Text>
                        </Pressable>
                    </Pressable>

                    <View style={styles.pageView}>
                        <View >
                            <Text style={styles.nameText}>
                                {route.params.name}
                            </Text>
                            <View style={styles.ratingView}>
                                <MaterialIcons name="stars" size={24} color="green" />
                                <Text>{route.params.rating}</Text>
                                <View style={styles.levelView}>
                                    <Text style={styles.levelText}>
                                        Genius Level
                                    </Text>
                                </View>
                                <View style={styles.travelView}>
                                    <Text style={styles.travelText}>
                                        Travel Sustainable
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <Text style={styles.text} />
                    <Text style={styles.priceText}>
                        Price for 1 Night and {route.params.adults} adults
                    </Text>
                    <View style={styles.oldPriceView}>
                        <Text style={styles.oldPriceText}>
                            £{route.params.oldPrice * route.params.adults}
                        </Text>
                        <Text style={styles.newPriceText}>
                            £{route.params.newPrice * route.params.adults}
                        </Text>
                    </View>
                    <View style={styles.offerView}>
                        <Text style={styles.offerText}>
                            {offerPrice.toFixed(0)}% OFF
                        </Text>
                    </View>

                    <Text style={styles.text} />
                    <View style={styles.viewGap}>
                        <View>
                            <Text style={styles.checkDates}>
                                Check In
                            </Text>
                            <Text style={styles.DateRoutes}>
                                {route.params.selectedDates.startDate}
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.checkDates}>
                                Check Out
                            </Text>
                            <Text style={styles.DateRoutes}>
                                {route.params.selectedDates.endDate}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.roomsView}>
                        <Text style={styles.checkDates}>
                            Rooms and Guests
                        </Text>
                        <Text style={styles.DateRoutes}>
                            {route.params.rooms} rooms {route.params.adults} adults {" "}
                            {route.params.children} children
                        </Text>
                    </View>

                    <Text style={styles.text} />
                    <Amenities />
                    <Text style={styles.text} />

                </ScrollView>
            </SafeAreaView>

            <Pressable
                onPress={() => navigation.navigate("Rooms", {
                    rooms: route.params.availableRooms,
                    oldPrice: route.params.oldPrice,
                    newPrice: route.params.newPrice,
                    name: route.params.name,
                    children: route.params.children,
                    adults: route.params.adults,
                    rating: route.params.rating,
                    startDate: route.params.selectedDates.startDate,
                    endDate: route.params.selectedDates.endDate
                })}
                style={styles.pressableAvailablity}
            >
                <Text style={styles.textAvailability}>
                    Select Availability
                </Text>
            </Pressable>
        </>
    );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({
    pressImage: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10
    },
    imageView: {
        margin: 6
    },
    morePress: {
        alignItems: "center",
        justifyContent: "center"
    },
    moreText: {
        textAlign: "center",
        marginLeft: 20
    },
    pageView: {
        marginHorizontal: 12,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    nameText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    ratingView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 7,
    },
    levelView: {
        backgroundColor: "#003580",
        paddingVertical: 3,
        borderRadius: 5,
        width: 100,
    },
    levelText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
    },
    travelView: {
        backgroundColor: "#17B169",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 5,
    },
    travelText: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    text: {
        borderColor: "#E0E0E0",
        borderWidth: 3,
        height: 1,
        marginTop: 15,
    },
    priceText: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "500",
        marginHorizontal: 12,
    },
    oldPriceView: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 12,
        marginTop: 4,
        gap: 8,
    },
    oldPriceText: {
        color: "red",
        fontSize: 16,
        textDecorationLine: "line-through",
    },
    newPriceText: {
        fontSize: 20
    },
    offerView: {
        marginHorizontal: 12,
        marginTop: 7,
        backgroundColor: "green",
        paddingHorizontal: 4,
        paddingVertical: 5,
        width: 78,
        borderRadius: 4,
    },
    offerText: {
        textAlign: "center",
        color: "white"
    },
    viewGap: {
        margin: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 60,
    },
    checkDates: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3
    },
    DateRoutes: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007FFF"
    },
    roomsView: {
        margin: 12
    },
    pressableAvailablity: {
        backgroundColor: "#6CB4EE",
        position: "absolute",
        bottom: 20,
        padding: 15,
        width: "95%",
        marginHorizontal: 10,
    },
    textAvailability: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    }
});