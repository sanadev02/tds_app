import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AirportDestination = () => {
    const [airportData, setAirportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const options = {
                method: 'GET',
                url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination',
                params: { query: searchQuery },
                headers: {
                    'X-RapidAPI-Key': 'bae448932emsh6e335567378fe30p1be387jsn9c4c319b5442',
                    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setAirportData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch data only if searchQuery is not empty
        if (searchQuery.trim() !== '') {
            fetchData();
        } else {
            // Reset airportData if searchQuery is empty
            setAirportData([]);
        }
    }, 
    [searchQuery]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Airport Destinations</Text>
            <TextInput
                style={styles.input}
                placeholder="Search Airport Locations"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    {Array.isArray(airportData) && airportData.length > 0 ? (
                        airportData.map((airport, index) => (
                            <TouchableOpacity key={index} style={styles.airportItem}>
                                <Text>{airport.name}</Text>
                                <Text>{airport.city}, {airport.country}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No airport data available</Text>
                    )}
                </View>
            )}
        </View>
    ); 
};


export default AirportDestination

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    airportItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5
    }
})