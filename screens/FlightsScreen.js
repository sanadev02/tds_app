import {
    Button,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    TextInput,
    Text,
    View,
    Alert,
    Image
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import FlightOptionItem from '../components/FlightOptionItem';

const FlightsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    // const [selectedAirport, setSelectedAirport] = useState('');
    const [departDate, setDepartDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());

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

    const customButton = (onConfirm) => {
        return (
            <Button
                onPress={onConfirm}
                style={{
                    container: { width: "80%", marginHorizontal: "3%" },
                    text: { fontSize: 20 },
                }}
                color="#41729F"
                primary
                title="Submit"
            />
        );
    };

    console.log(route.params);

    const onSearch = async (FlightData) => {
        console.log(FlightData);
    }
    const onSearchPress = () => {
        onSearch({ from, to, departDate, returnDate });
    };

    // Function to handle selecting an airport
    const handleAirportSelect = (location) => {
        setSelectedAirport(location);
    };
    return (
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]}>
                <View>
                    <Header />
                    <ScrollView>
                        <View style={{
                            margin: 20,
                            borderColor: "#B19F8B",
                            borderWidth: 3,
                            borderRadius: 6
                        }}>

                            {/* Departures */}
                            <Pressable
                                onPress={() => navigation.navigate("AirportDestination")}
                                style={styles.pressable}>
                                <FontAwesome5 name="plane-departure" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="Enter Your Departure Location"
                                    placeholderTextColor="black"
                                    onChangeText={setFrom}
                                />
                                {/* <FlightOptionItem selectedAirport={selectedAirport} onAirportSelect={handleAirportSelect} /> */}
                            </Pressable>
                            {/* Arrivals */}
                            <Pressable
                                onPress={() => navigation.navigate("Airport")}
                                style={styles.pressable}>
                                <FontAwesome5 name="plane-arrival" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="Enter Your Arrival Location"
                                    placeholderTextColor="black"
                                    value={to}
                                    onChangeText={setTo}
                                />
                            </Pressable>

                            {/* Destination Dates */}
                            <View style={styles.datePicker}>
                                <Feather name="calendar" size={24} color="#B19F8B" />
                                <DateTimePicker
                                    value={departDate}
                                    minimumDate={new Date()}
                                    onChange={(event, date) =>
                                        setDepartDate(date || new Date())
                                    }
                                />
                                <Text
                                    style={{ marginLeft: 10, color: '#B19F8B', fontSize: 24 }}>
                                    |
                                </Text>
                                <DateTimePicker
                                    value={returnDate}
                                    minimumDate={departDate}
                                    onChange={(event, date) =>
                                        setReturnDate(date || new Date())
                                    }
                                />
                            </View>

                            {/* Rooms and Guests */}
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={styles.pressable}>
                                <Octicons name="person" size={24} color="#B19F8B" />
                                <TextInput
                                    style={{ flex: 1 }}
                                    placeholderTextColor="black"
                                    placeholder={`${adults} Adults • ${children} Children`} />
                            </Pressable>

                            {/* Eco-friendly Options Only */}
                            <View style={styles.pressable}>
                                {/* <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                onCheckColor={'#C1B891'}
                                style={{ borderColor: "#C1B891" }}
                            /> */}
                                <Text>Eco-friendly Options Only</Text>
                            </View>

                            {/* Search Button */}
                            {/* <Button title="Search Flights" onPress={searchFlights} />
                            {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}
                            {flightDetails && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Flight Details</Text>
                                    <Text>From ID: {flightDetails.fromId}</Text>
                                    <Text>To ID: {flightDetails.toId}</Text>
                                    <Text>Departure Date: {flightDetails.departDate}</Text>
                                    <Text>Return Date: {flightDetails.returnDate}</Text>
                                    <Text>Adults: {flightDetails.adults}</Text>
                                    <Text>Children: {flightDetails.children}</Text>
                                </View>
                            )} */}
                            <Pressable
                                onPress={onSearchPress}
                                style={styles.search}>
                                <Text style={styles.searchText}>
                                    Search
                                </Text>
                            </Pressable>
                        </View>


                        <Text
                            style={{
                                marginHorizontal: 20,
                                fontSize: 17,
                                fontWeight: "500"
                            }}
                        >
                            Explore Sustainable Travel
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Pressable style={styles.scrollStack}>
                                <FontAwesome name="plane" size={24} color="black" />
                                <Text style={styles.stackText}>
                                    Discover eco-friendly travel options to any destination, from anywhere
                                </Text>
                            </Pressable>

                            <Pressable style={styles.scrollStack}>
                                <Ionicons name="calendar-outline" size={24} color="black" />
                                <Text style={styles.stackText}>
                                    Compare flight options from a range of providers, and select the greenest tickets for your journey.
                                </Text>
                            </Pressable>

                            <Pressable style={styles.scrollStack}>
                                <AntDesign name="tago" size={24} color="black" />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "500",
                                        marginTop: 10
                                    }}
                                >
                                    Discover the most economical times to fly, and create Eco-Alerts to book when the price fits within your budget
                                </Text>
                            </Pressable>
                        </ScrollView>

                        <View>
                            <Text
                                style={{
                                    marginHorizontal: 20,
                                    marginTop: 15,
                                    fontSize: 17,
                                    fontWeight: "500"
                                }}
                            >
                                Trending Destinations
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <Pressable style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        Barcelona, Spain </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/barcelona-beach.jpeg')} />
                                </Pressable>

                                <Pressable style={styles.scrollStacks}>
                                    <Text style={styles.stackText}>
                                        Florence, Italy
                                    </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/florence.jpeg')} />
                                </Pressable>

                                <Pressable style={styles.scrollStacks}>
                                    <Text
                                        style={styles.stackText}
                                    >
                                        Santorini, Greece
                                    </Text>
                                    <Image style={styles.scrollImage} source={require('../assets/Santorini.jpeg')} />
                                </Pressable>
                            </ScrollView>
                        </View>
                        <View style={{ marginBottom: 80 }} />

                    </ScrollView>
                </View>

                {/* Rooms and guests - swipe up page */}
                <BottomModal
                    swipeThreshhold={200}
                    onBackPress={() => setModalVisible(!modalVisible)}
                    swipeDirection={['up', 'down']}
                    footer={<ModalFooter>
                        <ModalButton
                            text="Apply"
                            style={{
                                marginBottom: 10,
                                color: "#B19F8B",
                                backgroundColor: "#B1BEC4"
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </ModalFooter>
                    }
                    modalTitle={<ModalTitle title="Select guests" />}
                    modalAnimation={
                        new SlideAnimation({
                            slideFrom: "bottom"
                        })
                    }
                    onHardwareBackPress={() => setModalVisible(!modalVisible)}
                    visible={modalVisible}
                    onTouchOutside={() => setModalVisible(!modalVisible)}
                >
                    <ModalContent style={{ width: "100%", height: 310 }}>
                        {/* Rooms View */}
                        {/* <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 15
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}
                            >
                                <Pressable
                                    onPress={() => setRooms(Math.max(1, rooms - 1))}
                                    style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: 13,
                                        borderColor: "#BEBEBE",
                                        backgroundColor: "#E0E0E0"
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", paddingHorizontal: 6 }}>
                                        -
                                    </Text>
                                </Pressable>

                                <Pressable>
                                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "500", paddingHorizontal: 6 }}>
                                        {rooms}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setRooms((c) => c + 1)}
                                    style={{ width: 26, height: 26, borderRadius: 13, borderColor: "#BEBEBE", backgroundColor: "#E0E0E0" }}>
                                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", paddingHorizontal: 6 }}>
                                        +
                                    </Text>
                                </Pressable>
                            </Pressable>
                        </View> */}

                        {/* Adults View */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 15
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}
                            >
                                <Pressable
                                    onPress={() => setAdults(Math.max(1, adults - 1))}
                                    style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: 13,
                                        borderColor: "#BEBEBE",
                                        backgroundColor: "#E0E0E0"
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", paddingHorizontal: 6 }}>
                                        -
                                    </Text>
                                </Pressable>

                                <Pressable>
                                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "500", paddingHorizontal: 6 }}>
                                        {adults}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setAdults((c) => c + 1)}
                                    style={{ width: 26, height: 26, borderRadius: 13, borderColor: "#BEBEBE", backgroundColor: "#E0E0E0" }}>
                                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", paddingHorizontal: 6 }}>
                                        +
                                    </Text>
                                </Pressable>
                            </Pressable>
                        </View>

                        {/* Children View */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 15,

                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}
                            >
                                <Pressable
                                    onPress={() => setChildren(Math.max(0, children - 1))}
                                    style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: 13,
                                        borderColor: "#BEBEBE",
                                        backgroundColor: "#E0E0E0"
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", paddingHorizontal: 6 }}>
                                        -
                                    </Text>
                                </Pressable>

                                <Pressable>
                                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "500", paddingHorizontal: 6 }}>
                                        {children}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setChildren((c) => c + 1)}
                                    style={{ width: 26, height: 26, borderRadius: 13, borderColor: "#BEBEBE", backgroundColor: "#E0E0E0" }}>
                                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", paddingHorizontal: 6 }}>
                                        +
                                    </Text>
                                </Pressable>
                            </Pressable>
                        </View>
                    </ModalContent>
                </BottomModal>
            </LinearGradient>
        </>
    )
}

export default FlightsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
        paddingVertical: 15
    },
    search: {
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 2,
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
        // borderColor: "#5885AF",
        // borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 3,
        backgroundColor: "#B1BEC4",
        flexDirection: "column"
    },

    stackText: {
        color: "black",
        fontSize: 15,
        fontWeight: "500",
        // marginTop: 5
    },
    reactBox: {
        backgroundColor: 'white',
        borderRadius: 7,
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    table: {
        display: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
    },
    scrollImage: {
        width: 246,
        height: 160,
        marginTop: 10,
        // marginBottom:10,
        // borderColor: "#a2d2df",
        // borderWidth: 2,
        borderRadius: 10,
        // padding: 20,
        marginHorizontal: 10,
        marginLeft: -8
        // backgroundColor: "#B1BEC4",
        // backgroundImage:"",
    },
    scrollStacks: {
        width: 250,
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        // borderColor: "#5885AF",
        // borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 3,
        backgroundColor: "#a2d2df",
        flexDirection: "column"
    },
})