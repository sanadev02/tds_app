import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Amenities = () => {
    const services = [
        {
            id: "0",
            name: "Room Service",
        },
        {
            id: "2",
            name: "Free Wifi",
        },
        {
            id: "3",
            name: "Family Rooms",
        },
        {
            id: "4",
            name: "Free Parking",
        },
        {
            id: "5",
            name: "Swimming Pool",
        },
        {
            id: "6",
            name: "Restaurant",
        },
        {
            id: "7",
            name: "Fitness Center",
        },
    ];
    return (
        <View style={styles.viewFacilities}>
            <Text style={styles.textFacilities}>
                Most Popular Facilities
            </Text>
            <View style={styles.viewServices}>
                {services.map((item, index) => (
                    <View
                        style={styles.indexView}
                        key={index}
                    >
                        <Text style={styles.textItem}>
                            {item.name}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
};

export default Amenities;

const styles = StyleSheet.create({
    viewFacilities: {
        padding: 10
    },
    textFacilities: {
        fontSize: 17,
        fontWeight: "600"
    },
    viewServices: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    mapServices: {
        margin: 10,
        backgroundColor: "#007FFF",
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 25,
    },
    indexView:{
        margin: 10,
              backgroundColor: "#007FFF",
              paddingHorizontal: 11,
              paddingVertical: 5,
              borderRadius: 25,
    },
    textItem:{
        textAlign:"center",
        color:"white"
    },
});