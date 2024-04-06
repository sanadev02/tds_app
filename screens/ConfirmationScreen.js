import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { savedPlaces } from "../SavedReducer";
// import { setDoc,doc } from "firebase/firestore";
// import { auth, db } from "../firebase";

const ConfirmationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Confirmation",
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
    const dispatch = useDispatch();
    const uid = auth.currentUser.uid;
    const confirmBooking = async () => {
        dispatch(savedPlaces(route.params));

        await setDoc(
            doc(db, "users", `${uid}`),
            {
                bookingDetails: { ...route.params },
            },
            {
                merge: true,
            }
        );

        navigation.navigate("Main");
    }
    return (
        <View>
            <Pressable style={styles.pressRouteName}>
                <View style={styles.viewRouteName}>
                    <View>
                        <Text style={styles.textRouteName}>
                            {route.params.name}
                        </Text>
                        <View style={styles.pressRouteName}>
                            <MaterialIcons name="stars" size={24} color="green" />
                            <Text>{route.params.rating}</Text>
                            <View style={styles.viewLevel}>
                                <Text style={styles.textLevel}>
                                    Genius Level
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={styles.viewTravel}
                    >
                        <Text style={styles.textTravel}>
                            Travel sustainable
                        </Text>
                    </View>
                </View>

                <View
                    style={styles.viewCheckIn}
                >
                    <View>
                        <Text style={styles.textCheck}>
                            Check In
                        </Text>
                        <Text
                            style={styles.textRouteDate}
                        >
                            {route.params.startDate}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.textCheck}>
                            Check Out
                        </Text>
                        <Text
                            style={styles.textRouteDate}>
                            {route.params.endDate}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewMargin}>
                    <Text style={styles.textRooms}>
                        Rooms and Guests
                    </Text>
                    <Text style={styles.textRoomsRoute}>
                        {route.params.rooms} rooms {route.params.adults} adults{" "}
                        {route.params.children} children
                    </Text>
                </View>

                <Pressable
                    onPress={confirmBooking}
                    style={styles.pressConfirm}
                >
                    <Text style={styles.textBooking}>Book Now</Text>
                </Pressable>
            </Pressable>
        </View>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
    pressRouteName: {
        backgroundColor: "white",
        margin: 10
    },
    viewRouteName: {
        marginHorizontal: 12,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textRouteName: {
        fontSize: 25,
        fontWeight: "bold"
    },
    viewRoutRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 7,
    },
    viewLevel: {
        backgroundColor: "#003580",
        paddingVertical: 3,
        borderRadius: 5,
        width: 100,
    },
    textLevel: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
    },
    viewTravel: {
        backgroundColor: "#17B169",
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 6,
    },
    textTravel: {
        color: "white",
        fontSize: 13
    },
    viewCheckIn: {
        margin: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 60,
    },
    textCheck: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3
    },
    textRouteDate: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007FFF"
    },
    viewMargin: {
        margin: 12
    },
    textRooms: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3
    },
    textRoomsRoute: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007FFF"
    },
    pressConfirm: {
        backgroundColor: "#003580",
        width: 120,
        padding: 5,
        marginHorizontal: 12,
        marginBottom: 20,
        borderRadius: 4
    },
    textBooking: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },

})