import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, Pressable, Linking } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const FlightBookingScreen = ({ flightData, Co2 }) => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Flight Booking",
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
            }
        })
    }, []);

    const [formData, setFormData] = useState({
        location_from: '',
        location_to: '',
        departure_date: '',
        return_date: '',
        adult_number: '',
        children_age: '',
    });
    const [flights, setFlights] = useState(flightData);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            // Make API request using formData
            const response = await axios.get('https://booking-com13.p.rapidapi.com/flights/return', {
                params: formData,
                headers: {
                    'X-RapidAPI-Key': 'bae448932emsh6e335567378fe30p1be387jsn9c4c319b5442',
                    'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
                }
            });
            setFlights(response.data.data.flights);
            // console.log(JSON.stringify(response.data.data.flights, null, 2));

            const flightStart = response.data.data.flights[0].bounds[0].segments[0].origin.code;
            const flightEnd = response.data.data.flights[0].bounds[0].segments[0].destination.code;

            // // Calling the CO2 calculation API with the extracted flight number
            await CO2calculation(flightStart, flightEnd);

        } catch (error) {
            console.error('Error fetching airport data:', error);
        } finally {
            setLoading(false);
        }
    };

    const [co2Data, setCo2Data] = useState([Co2]);

    const CO2calculation = async (flightStart, flightEnd) => {
        setLoading(true);
        try {
            // Make API request using formData
            const response = await axios.get('https://co2-emissions.p.rapidapi.com/flight', {
                params: {
                    passengers: formData.adult_number,
                    startAirport: flightStart,
                    endAirport: flightEnd,
                },
                headers: {
                    'X-RapidAPI-Key': 'bae448932emsh6e335567378fe30p1be387jsn9c4c319b5442',
                    'X-RapidAPI-Host': 'co2-emissions.p.rapidapi.com'
                }
            });
            // console.log(JSON.stringify(response.data, null, 2));
            setCo2Data(response.data);

        } catch (error) {
            console.error('Error fetching co2 data:', error);
        } finally {
            setLoading(false);
        }
    };
    console.log(co2Data);


    // Note: Code for DatePicker

    // const [departure_date, setDepartDate] = useState(new Date());
    // const [return_date, setReturnDate] = useState(new Date());

    // const [showDatePicker, setShowDatePicker] = useState(false);

    // const handleDateChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || formData.departure_date;
    //     setShowDatePicker(false);
    //     setFormData({ ...formData, departure_date: currentDate });
    // };

    // const handleReturnDateChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || formData.return_date;
    //     setShowDatePicker(false);
    //     setFormData({ ...formData, return_date: currentDate });
    // };

    // const showDatepicker = () => {
    //     setShowDatePicker(true);
    // };

    return (
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]} style={styles.page}>
                <View>
                    <ScrollView >
                        <Text style={styles.title}>Search Flights</Text>
                        <View style={styles.viewBox}>
                            <View style={styles.datePicker}>
                                <FontAwesome5 name="plane-departure" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="Departure: City, Country"
                                    placeholderTextColor="black"
                                    value={formData.location_from}
                                    onChangeText={value => handleChange('location_from', value)}
                                />
                            </View>

                            <View style={styles.datePicker}>
                                <FontAwesome5 name="plane-arrival" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="Arrival: City, Country"
                                    placeholderTextColor="black"
                                    value={formData.location_to}
                                    onChangeText={value => handleChange('location_to', value)}
                                />
                            </View>

                            {/* Note: Tried implementing the datePicker but wouldnt work with API. */}

                            {/* <View style={styles.datePicker}>
                                <Feather name="calendar" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="From (YYYY-MM-DD)"
                                    placeholderTextColor="black"
                                    value={formData.departure_date.toISOString().split('T')[0]}
                                    onTouchStart={showDatepicker}
                                    editable={false}
                                />
                                <Text
                                    style={{ marginLeft: 10, marginRight: 10, color: '#B19F8B', fontSize: 24 }}
                                >
                                    |
                                </Text>
                                <TextInput
                                    placeholder="To (YYYY-MM-DD)"
                                    placeholderTextColor="black"
                                    value={formData.return_date.toISOString().split('T')[0]}
                                    onTouchStart={() => setShowDatePicker(true)}
                                    editable={false}
                                />
                            </View>
                             <View style={{ flexDirection: 'row' }}>
                                // Note: Temporary Fix to choosing the date without having to manually inputing it.

                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={formData.departure_date}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}

                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={formData.return_date}
                                        mode="date"
                                        display="default"
                                        onChange={handleReturnDateChange}
                                    />
                                )}
                            </View> */}

                            <View style={styles.datePicker}>
                                <Feather name="calendar" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="From (YYYY-MM-DD)"
                                    placeholderTextColor="black"
                                    value={formData.departure_date}
                                    onChangeText={value => handleChange('departure_date', value)}
                                />
                                <Text style={{ color: '#B19F8B', fontSize: 24 }}>
                                    |
                                </Text>
                                <TextInput
                                    placeholder="To (YYYY-MM-DD)"
                                    placeholderTextColor="black"
                                    value={formData.return_date}
                                    onChangeText={value => handleChange('return_date', value)}
                                />
                            </View>

                            <View style={styles.datePicker}>
                                <Octicons name="person" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="Adults"
                                    placeholderTextColor="black"
                                    value={formData.adult_number}
                                    onChangeText={value => handleChange('adult_number', value)}
                                />
                                <Text style={{ color: '#B19F8B', fontSize: 24 }}>
                                    |
                                </Text>

                                <FontAwesome name="child" size={24} color="#B19F8B" />
                                <TextInput
                                    placeholder="Children ( e.g. 3,9 )"
                                    placeholderTextColor="black"
                                    value={formData.children_age}
                                    onChangeText={value => handleChange('children_age', value)}
                                />
                            </View>

                            <Pressable style={styles.search} onPress={handleSearch}>
                                <Text style={styles.searchText}>Search</Text>
                            </Pressable>
                        </View>

                        {/* Loading indicator */}
                        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}

                        {/* Loads flight information */}
                        <View style={styles.resultsContainer}>
                            {flights && flights.map((flight, index) => (
                                <View key={index} style={styles.flightCard}>
                                    <Text style={styles.sectionTitle}>Flight Details</Text>
                                    <Text> Flight Number: {flight.bounds && flight.bounds[0].segments[0].flightNumber}</Text>

                                    <Text style={styles.sectionTitle}>Departure Information</Text>
                                    <Text>Departure City: {flight.bounds[0].segments[0].origin.cityName}</Text>
                                    <Text>Departure Airport: {flight.bounds[0].segments[0].origin.cityCode}</Text>
                                    <Text>Departure Time: {flight.bounds && flight.bounds[0].segments[0].departuredAt}</Text>

                                    <Text style={styles.sectionTitle}>Arrival Information</Text>
                                    <Text>Arrival City: {flights[0].bounds[0].segments[0].destination.cityName}</Text>
                                    <Text>Arrival Airport: {flights[0].bounds[0].segments[0].destination.code}</Text>
                                    <Text>Arrival Time: {flights[0].bounds && flight.bounds[0].segments[0].arrivedAt}</Text>

                                    <Text style={styles.sectionTitle}>Pricing</Text>
                                    {/* {flight.travelerPrices[0] && flight.travelerPrices[0].price && flight.travelerPrices[0].price.markup && ( */}
                                        <Text>Price: £{flight.travelerPrices[0].price.markup && flight.travelerPrices[0].price.markup.value}</Text>
                                    {/* )} */}

                                    <Text style={styles.sectionTitle}>Booking Options</Text>
                                    <Pressable onPress={() => Linking.openURL(flight.shareableUrl)}>
                                        <Text style={styles.bookNow}>Book Now</Text>
                                    </Pressable>

                                    <View>
                                        <Text style={styles.sectionTitle}>CO2 Calculation Result:</Text>
                                        <Text>Departure Airport: {co2Data.startAirport && co2Data.startAirport.name}</Text>
                                        <Text>Departure Airport IATA Code: {co2Data.startAirport && co2Data.startAirport.iataCode}</Text>
                                        <Text>Arrival Airport: {co2Data.endAirport && co2Data.endAirport.name}</Text>
                                        <Text>Arrival Airport IATA Code: {co2Data.endAirport && co2Data.endAirport.iataCode}</Text>
                                        <Text>Passengers: {co2Data.passengers}</Text>
                                        <Text>Distance: {co2Data.distanceInKm} km</Text>
                                        <Text>Type: {co2Data.type}</Text>
                                        <Text>CO2 Equivalent Emissions: {co2Data.co2eInKg} kg ({co2Data.co2eInLb} lb)</Text>
                                        <Pressable onPress={() => navigation.navigate("Info")}>
                                            <Text style={styles.moreInfo}>More Information here</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))}
                        </View>

                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    viewBox: {
        margin: 20,
        borderColor: "#B19F8B",
        borderWidth: 3,
        borderRadius: 6
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 2,
        paddingVertical: 15,
        gap: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10,
        alignSelf: 'center',
        paddingTop: 20,
    },
    search: {
        paddingHorizontal: 10,
        borderColor: "#B19F8B",
        borderWidth: 2,
        paddingVertical: 15,
        backgroundColor: "#4D5E68",
    },
    searchText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
        color: "#B19F8B"
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    flightCard: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bookNow: {
        color: 'blue',
        marginTop: 5,
    },
    moreInfo: {
        color: 'blue',
        marginTop: 10,
    },
    page: {
        height: '100%'
    },
});


export default FlightBookingScreen;