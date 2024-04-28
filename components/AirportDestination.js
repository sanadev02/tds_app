import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, Pressable, Linking } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AirportDestination = ({ flightData, Co2 }) => {
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
    // const [departure_date, setDepartDate] = useState(new Date());
    // const [return_date, setReturnDate] = useState(new Date());

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
            // console.log(response.bounds[0].segments[0].flightNumber);
            console.log(JSON.stringify(response.data.data.flights[0].bounds[0].segments[0].destination.code, null, 2));
            console.log(JSON.stringify(response.data.data.flights[0].bounds[0].segments[0].origin.code, null, 2));


            // const firstFlight = response.data.data.flights[0];
            const flightStart = response.data.data.flights[0].bounds[0].segments[0].origin.code;
            const flightEnd = response.data.data.flights[0].bounds[0].segments[0].destination.code;

            // // Call the CO2 calculation API with the extracted flight number
            await CO2calculation(flightStart,flightEnd);

        } catch (error) {
            console.error('Error fetching airport data:', error);
        } finally {
            setLoading(false);
        }
    };

    const [co2Data, setCo2Data] = useState([Co2]);

    const CO2calculation = async (flightStart,flightEnd) => {
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
                    'X-RapidAPI-Key': '4d321057ccmsh61ab16c112c5f33p1f7eb2jsn236cc1c13cfc',
                    'X-RapidAPI-Host': 'co2-emissions.p.rapidapi.com'
                }
            });
            // console.log(JSON.stringify(responses.data, null, 2));
            // console.log(JSON.stringify(response.data, null, 2));
            setCo2Data(response.data); // Assuming the response contains CO2 calculation data

        } catch (error) {
            console.error('Error fetching co2 data:', error);
        } finally {
            setLoading(false);
        }
    };
    console.log(co2Data);
    return (
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]} style={styles.page}>
                <View>
                    <ScrollView >
                        <Text style={styles.title}>Search Flights</Text>
                        <View style={styles.viewBox}>

                            {/* Input fields */}
                            <TextInput
                                style={styles.datePicker}
                                placeholder="Departure"
                                placeholderTextColor="black"
                                value={formData.location_from}
                                onChangeText={value => handleChange('location_from', value)}
                            />
                            <TextInput
                                style={styles.datePicker}
                                placeholder="Arrival"
                                placeholderTextColor="black"
                                value={formData.location_to}
                                onChangeText={value => handleChange('location_to', value)}
                            />

                            {/* <View style={styles.datePicker}>
                                <DateTimePicker
                                    value={departure_date}
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
                                    value={return_date}
                                    minimumDate={new Date()}
                                    onChange={(event, date) =>
                                        setReturnDate(date || new Date())
                                    }
                                />
                            </View> */}
                            <TextInput
                                style={styles.datePicker}
                                placeholder="From (YYYY-MM-DD)"
                                placeholderTextColor="black"
                                value={formData.departure_date}
                                onChangeText={value => handleChange('departure_date', value)}
                            />
                            <TextInput
                                style={styles.datePicker}
                                placeholder="To(YYYY-MM-DD)"
                                placeholderTextColor="black"
                                value={formData.return_date}
                                onChangeText={value => handleChange('return_date', value)}
                            />
                            <TextInput
                                style={styles.datePicker}
                                placeholder="Adults"
                                placeholderTextColor="black"
                                value={formData.adult_number}
                                onChangeText={value => handleChange('adult_number', value)}
                            />
                            <TextInput
                                style={styles.datePicker}
                                placeholder="Children"
                                placeholderTextColor="black"
                                value={formData.children_age}
                                onChangeText={value => handleChange('children_age', value)}
                            />

                            {/* Search button
                                <Button title="Search" onPress={handleSearch} /> */}
                            {/* Search button */}
                            <Pressable style={styles.search} onPress={handleSearch}>
                                <Text style={styles.searchText}>Search</Text>
                            </Pressable>

                            {/* <Pressable style={styles.search} onPress={CO2calculation}>
                                <Text style={styles.searchText}>Additional CO2 Calculator</Text>
                            </Pressable> */}
                        </View>

                        {/* Loading indicator */}
                        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}

                        <View style={styles.resultsContainer}>
                            {/* <Text style={styles.resultsTitle}>Flight Results</Text> */}

                            {flights && flights.map((flight, index) => (

                                <View key={index} style={{ margin: 10, padding: 10, borderWidth: 1, borderRadius: 10 }}>

                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Flight Details</Text>
                                    <Text> Flight Number: {flight.bounds && flight.bounds[0].segments[0].flightNumber}</Text>

                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Departure Information</Text>
                                    <Text>Departure City: {flight.bounds[0].segments[0].origin.cityName}</Text>
                                    <Text>Departure Airport: {flight.bounds[0].segments[0].origin.cityCode}</Text>
                                    <Text>Departure Time: {flight.bounds && flight.bounds[0].segments[0].departuredAt}</Text>

                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Arrival Information</Text>
                                    <Text>Arrival City: {flights[0].bounds[0].segments[0].destination.cityName}</Text>
                                    <Text>Arrival Airport: {flights[0].bounds[0].segments[0].destination.code}</Text>
                                    {/* response.data.data.flights[0].bounds[0].segments[0].destination.code */}
                                    <Text>Arrival Time: {flights[0].bounds && flight.bounds[0].segments[0].arrivedAt}</Text>

                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Pricing</Text>
                                    {flight.travelerPrices[0] && flight.travelerPrices[0].price && flight.travelerPrices[0].price.markup && (
                                        <Text>Price: ${flight.travelerPrices[0].price.markup.value}</Text>
                                    )}

                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Booking Options</Text>
                                    <Pressable onPress={() => Linking.openURL(flight.shareableUrl)}>
                                        <Text style={{ color: 'blue' }}>Book Now</Text>
                                    </Pressable>

                                    <View>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>CO2 Calculation Result:</Text>
                                        <Text>Departure Airport: {co2Data.startAirport && co2Data.startAirport.name}</Text>
                                        <Text>Departure Airport IATA Code: {co2Data.startAirport && co2Data.startAirport.iataCode}</Text>
                                        <Text>Arrival Airport: {co2Data.endAirport && co2Data.endAirport.name}</Text>
                                        <Text>Arrival Airport IATA Code: {co2Data.endAirport && co2Data.endAirport.iataCode}</Text>
                                        <Text>Passengers: {co2Data.passengers}</Text>
                                        <Text>Distance: {co2Data.distanceInKm} km</Text>
                                        <Text>Type: {co2Data.type}</Text>
                                        <Text>CO2 Equivalent Emissions: {co2Data.co2eInKg} kg ({co2Data.co2eInLb} lb)</Text>
                                    </View>
                                </View>
                            ))}
                            {/* <View>
                                <Text>CO2 Calculation Result:</Text>
                                <Text>Start Airport: {co2Data.startAirport && co2Data.startAirport.name}</Text>
                                <Text>Start Airport IATA Code: {co2Data.startAirport && co2Data.startAirport.iataCode}</Text>
                                <Text>End Airport: {co2Data.endAirport && co2Data.endAirport.name}</Text>
                                <Text>End Airport IATA Code: {co2Data.endAirport && co2Data.endAirport.iataCode}</Text>
                                <Text>Passengers: {co2Data.passengers}</Text>
                                <Text>Distance: {co2Data.distanceInKm} km</Text>
                                <Text>Type: {co2Data.type}</Text>
                                <Text>CO2 Equivalent Emissions: {co2Data.co2eInKg} kg ({co2Data.co2eInLb} lb)</Text>
                            </View> */}
                            <View>
                                {/* {
                                    Array.isArray(co2Data) && co2Data.length > 0 ? (
                                        // co2Data && co2Data.map((data, index) => (
                                            <View >
                                                <Text>CO2 Calculation Result:</Text>
                                                <Text>Origin: {co2Data.origin}</Text>
                                                <Text>Destination: {co2Data.destination}</Text>
                                                <Text>Aircraft: {co2Data.aircraft}</Text>
                                                <Text>Distance: {co2Data.distance.value} {co2Data.distance.unit}</Text>
                                                <Text>Weight: {co2Data.weight.value} {co2Data.weight.unit}</Text>
                                                <Text>CO2 Emissions (Takeoff to Wheels Up): {co2Data.co2TTW.value} {co2Data.co2TTW.unit}</Text>
                                                <Text>CO2 Emissions (Wheels Up to Wheels Down): {co2Data.co2WTW.value} {co2Data.co2WTW.unit}</Text>
                                                <Text>CO2 Equivalent Emissions (Takeoff to Wheels Up): {co2Data.co2eTTW.value} {co2Data.co2eTTW.unit}</Text>
                                                <Text>CO2 Equivalent Emissions (Wheels Up to Wheels Down): {co2Data.co2eWTW.value} {co2Data.co2eWTW.unit}</Text>
                                                <Text>CO2 Efficiency Score: {co2Data.co2EfficiencyScore}</Text>
                                                <Text>CO2 Efficiency Industry Average: {co2Data.co2EfficiencyIndustry}</Text>
                                            </View>
                                        
                                    ) : (
                                        <Text>No CO2 data available.</Text>
                                    )
                                } */}

                            </View>
                        </View>

                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
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
        // marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10,
        alignSelf: 'center',
        paddingTop: 20,
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
        backgroundColor: "#4D5E68",
        // marginBottom: 10
    },
    searchText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
        color: "#B19F8B"
    },
    resultsContainer: {
        marginTop: 20,
        padding: 20
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10,
        padding: 10
    },
    flightItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5
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
    stackText: {
        color: "black",
        fontSize: 15,
        fontWeight: "500",
    },
    page: {
        height: '100%'
    },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10
//     },
//     resultsContainer: {
//         marginTop: 20
//     },
//     resultsTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     flightItem: {
//         marginBottom: 10,
//         padding: 10,
//         backgroundColor: '#e0e0e0',
//         borderRadius: 5
//     }
// });

export default AirportDestination;