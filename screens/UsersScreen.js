import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const UsersScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "User Details",
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
            },
        });
    }, []);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const finalStep = () => {
        if (!firstName || !lastName || !email || !phoneNo) { //Checks to see if there are none of these details
            Alert.alert( //shows alert message saying missing details.
                "Invalide Details",
                "Please enter all the fields",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ],
                { cancelable: false }
            );
        }
        if (firstName && lastName && email && phoneNo) { //Once all details inputed - navigates to confimation screen
            navigation.navigate("Confirmation", {
                oldPrice: route.params.oldPrice,
                newPrice: route.params.newPrice,
                name: route.params.name,
                children: route.params.children,
                adults: route.params.adults,
                rating: route.params.rating,
                startDate: route.params.startDate,
                endDate: route.params.endDate,
            });
        }
    };
    return (
        <>
            <View style={styles.padd}>
                <View style={styles.viewName}>
                    <Text>First Name</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        style={styles.textName}
                    />
                </View>

                <View style={styles.viewName}>
                    <Text>Last Name</Text>
                    <TextInput
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        style={styles.textName}
                    />
                </View>

                <View style={styles.viewName}>
                    <Text>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.textName}
                    />
                </View>

                <View style={styles.viewName}>
                    <Text>Phone No</Text>
                    <TextInput
                        value={phoneNo}
                        onChangeText={(text) => setPhoneNo(text)}
                        style={styles.textName}
                    />
                </View>
            </View>

            <Pressable style={styles.pressRouteprice}>
                <View>
                    <View style={styles.viewRoutePrice}>
                        <Text style={styles.textRoutePrice}>
                            £{route.params.oldPrice * route.params.adults}
                        </Text>
                        <Text style={styles.textRouteNewPrice}>
                            £{route.params.newPrice * route.params.adults}
                        </Text>
                    </View>
                    <Text>
                        You Saved {route.params.oldPrice - route.params.adults} pounds.
                    </Text>
                </View>
                <Pressable
                    onPress={finalStep}
                    style={styles.pressFinal}
                >
                    <Text style={styles.textFinal}>
                        Final Step
                    </Text>
                </Pressable>
            </Pressable>
        </>
    )
}

export default UsersScreen

const styles = StyleSheet.create({
    padd: {
        padding: 20
    },
    viewName: {
        flexDirection: "column",
        gap: 10
    },
    textName: {
        padding: 10,
        borderColor: "gray",
        borderWidth: 1
    },
    pressRouteprice: {
        backgroundColor: "white",
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
        padding: 10,
    },
    viewRoutePrice: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 8,
    },
    textRoutePrice: {
        color: "red",
        fontSize: 20,
        textDecorationLine: "line-through",
    },
    textRouteNewPrice: {
        fontSize: 20
    },
    pressFinal: {
        backgroundColor: "#007FFF",
        padding: 10,
        borderRadius: 5
    },
    textFinal: {
        textAlign: "center",
        color: "white",
        fontSize: 15
    }
})