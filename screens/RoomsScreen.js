import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from '../components/Amenities';

const RoomsScreen = () => {
    const route = useRoute();
    console.log(route.params);
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Available Rooms",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#B19F8B",
                alignItems: "center"
            },
            headerStyle: {
                backgroundColor: "#455D64",
                height: 80,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            }
        })
    }, []);
    const [selected, setSelected] = useState([]);
    return (
        <>
            <ScrollView>
                {route.params.rooms.map((item, index) => (
                    <Pressable
                        style={styles.routePress}
                        key={index}
                    >
                        <View style={styles.routeView}>
                            <Text style={styles.textName}>
                                {item.name}
                            </Text>
                            <AntDesign name="infocirlceo" size={24} color="#007FFF" />
                        </View>
                        <Text style={styles.textProp}>
                            Pay at the property
                        </Text>
                        <View style={styles.viewPrice}>
                            <Text style={styles.textOldPrice}>
                                {route.params.oldPrice}
                            </Text>
                            <Text style={styles.textNewPrice}>
                                {route.params.newPrice}
                            </Text>
                        </View>
                        <Amenities />

                        {selected.includes(item.name) ? (
                            <Pressable style={styles.selectedPress}>
                                <Text style={styles.selectedText}>
                                    SELECTED
                                </Text>
                                <Entypo
                                    onPress={() => setSelected([])}
                                    name="circle-with-cross"
                                    size={24}
                                    color="red"
                                />
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => setSelected(item.name)}
                                style={styles.selectPress}
                            >
                                <Text style={styles.selectText}>
                                    SELECT
                                </Text>
                            </Pressable>
                        )}
                    </Pressable>
                ))}
            </ScrollView>

            {selected.length > 0 ? (
                <Pressable
                    onPress={() =>
                        navigation.navigate("User", {
                            oldPrice: route.params.oldPrice,
                            newPrice: route.params.newPrice,
                            name: route.params.name,
                            children: route.params.children,
                            adults: route.params.adults,
                            rating: route.params.rating,
                            departDate: route.params.departDate,
                            returnDate: route.params.returnDate,
                        })
                    }
                    style={styles.reservePress}
                >
                    <Text style={styles.reserveText}>
                        Reserve
                    </Text>
                </Pressable>
            ) : null}
        </>
    )
}

export default RoomsScreen

const styles = StyleSheet.create({
    routePress: {
        margin: 10,
        backgroundColor: "white",
        padding: 10,
    },
    routeView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textName: {
        color: "#007FFF",
        fontSize: 17,
        fontWeight: "500",
    },
    textProp: {
        marginTop: 3,
        fontSize: 16,
    },
    textCancel: {
        marginTop: 3,
        color: "green",
        fontSize: 16,
    },
    viewPrice: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    textOldPrice: {
        fontSize: 18,
        color: "red",
        textDecorationLine: "line-through",
    },
    textNewPrice: {
        fontSize: 18,
    },
    selectedPress: {
        borderColor: "#318CE7",
        backgroundColor: "#F0F8FF",
        borderWidth: 2,
        width: "100%",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    selectedText: {
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        color: "#318CE7",
        fontWeight: "bold",
        fontSize: 16,
    },
    selectPress: {
        borderColor: "#007FFF",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
    },
    selectText: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
        color: "#007FFF",
    },
    reservePress:{
        backgroundColor: "#007FFF",
        padding: 8,
        marginBottom: 30,
        borderRadius: 3,
        marginHorizontal: 15,
    },
    reserveText:{
        textAlign: "center", 
        color: "white", 
        fontWeight: "bold",
    }
})