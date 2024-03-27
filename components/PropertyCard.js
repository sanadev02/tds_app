import { Dimensions, Pressable, StyleSheet, Text, View, Image, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const PropertyCard = ({ rooms, children, property, adults, selectedDates, AvailableRooms }) => {
    const { width, height } = Dimensions.get("window");
    return (
        <SafeAreaView style={styles.container} >
            <View>
                <Pressable style={styles.props}>
                    <View>
                        <Image style={{ height: height / 3.5, width: width - 270 }} source={{ uri: property.image }} />
                    </View>
                    <View style={styles.PropContainer}>
                        <View style={styles.propName}>
                            <Text style={styles.name}>{property.name}</Text>
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                        <View style={styles.ratingView}>
                            <MaterialIcons name="stars" size={24} color="black" />
                            <Text>{property.rating}</Text>
                            <View style={styles.propRating}>
                                <Text style={styles.ratingText}>Genius Level</Text>
                            </View>
                        </View>
                        <Text style={styles.address}>
                            {property.address.length > 50
                                ? property.address.substr(0, 50)
                                : property.address}
                        </Text>
                        <Text style={styles.priceProp}>
                            Prices for 1 Night and {adults} adults
                        </Text>
                        <View style={styles.priceChange}>
                            <Text style={styles.oldPrice}>
                                £{property.oldPrice * adults}
                            </Text>
                            <Text style={styles.newPrice}>
                                £{property.newPrice * adults}
                            </Text>
                        </View>

                        <View style={styles.roomView}>
                            <Text style={styles.roomText} >Delux Room</Text>
                            <Text style={styles.roomText} >Hotel Room : 1 bed</Text>
                        </View>

                        <View style={styles.dealsView}>
                            <Text style={styles.dealText}>Limited Time Deal</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default PropertyCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },

    props: {
        margin: 15,
        flexDirection: "row",
        backgroundColor: "white"
    },

    propName: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name: {
        width: 200,
        fontSize:16
    },
    PropContainer: {
        padding: 10
    },
    propRating: {
        backgroundColor: "#6CB4EE",
        paddingVertical:3,
        borderRadius: 5,
        width: 100,
    },
    ratingView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 7
    },
    ratingText: {
        textAlign: "center",
        color: "white",
        fontSize: 15
    },
    address: {
        width: 200,
        marginTop: 6,
        color: "grey",
        fontWeight: "bold"
    },
    priceProp: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "500"
    },
    priceChange:{
        marginTop:5,
        flexDirection:"row",
        alignItems:"center",
        gap:8
    },
    oldPrice:{
        color:"red",
        fontSize:14,
        textDecorationLine:"line-through"
    },
    newPrice:{
        fontSize:18
    },
    roomView:{
        marginTop:6
    },
    roomText:{
       fontSize:16,
       color:"grey", 
    },
    dealsView: {
        backgroundColor: "#6082B6",
        paddingVertical:3,
        marginTop:3,
        borderRadius: 5,
        width: 150,
    },
    dealText:{
        textAlign:"center",
        color:"white"
    }
})