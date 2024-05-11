import {
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    Button,
    Alert,
    Pressable,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const SearchScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Hotel Booking",
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

    const [loading, setLoading] = useState(false);
    const [LangData, setLangData] = useState([]);

    const getLang = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://booking-com13.p.rapidapi.com/languages', {
                headers: {
                    'X-RapidAPI-Key': '4d321057ccmsh61ab16c112c5f33p1f7eb2jsn236cc1c13cfc',
                    'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
                }
            });
            setLangData(response.data);

            console.log(JSON.stringify(response.data[0], null, 2));

            const LangData = response.data.data[0].code;
            await handleSearch(LangData);

        } catch (error) {
            console.error('Error fetching config data:', error);
        } finally {
            setLoading(false);
        }
    };

    const [currency, setCurrency] = useState([]);
    const getCurrency = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://booking-com13.p.rapidapi.com/languages', {
                headers: {
                    'X-RapidAPI-Key': '4d321057ccmsh61ab16c112c5f33p1f7eb2jsn236cc1c13cfc',
                    'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
                }
            });
            setCurrency(response.data);

            console.log(JSON.stringify(response.data[35], null, 2));

            const currency = response.data.data[35].code;
            await handleSearch(currency);

        } catch (error) {
            console.error('Error fetching config data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [formData, setFormData] = useState({
        location: '',
        checkin_date: '',
        checkout_date: '',
        language_code: 'en-gb',
        currency_code: 'GBP'

    });

    const [locationSearch, setLocationSearch] = useState([]);
    const handleSearch = async (currency, langData) => {
        setLoading(true);
        try {
            // Make API request using formData
            const response = await axios.get('https://booking-com13.p.rapidapi.com/stays/properties/list-v2', {
                params: {
                    location: formData.location,
                    checkin_date: formData.checkin_date,
                    checkout_date: formData.checkout_date,
                    language_code: formData.language_code,
                    currency_code: formData.currency_code
                },
                headers: {
                    'X-RapidAPI-Key': '4d321057ccmsh61ab16c112c5f33p1f7eb2jsn236cc1c13cfc',
                    'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
                }
            });
            setLocationSearch(response.data.data);
            console.log(JSON.stringify(response.data.data[0], null, 2));
            console.log(JSON.stringify(response.data.data[0].blocks[0].finalPrice.amount, null, 2));

        } catch (error) {
            console.error('Error fetching location data:', error);
            Alert.alert(
                'Search Alert',
                'Error fetching location data: \n Input your search as such: \n Location: City, County, Country \n Check in: YYYY-MM-DD. \n Check out: YYYY-MM-DD',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              );
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]} style={styles.page}>
                <View >
                    <View style={styles.viewBox}>
                        <View style={styles.datePicker}>
                            <Feather name="search" size={24} color="black" />
                            <TextInput
                                placeholder="Enter location here"
                                placeholderTextColor={'black'}
                                value={formData.location}
                                onChangeText={value => handleChange('location', value)}
                            />
                        </View>
                        <View style={styles.datePicker}>
                            <FontAwesome5 name="calendar-alt" size={24} color="black" />
                            <TextInput
                                placeholder="Check in (YYYY-MM-DD)"
                                placeholderTextColor={'black'}
                                value={formData.checkin_date}
                                onChangeText={value => handleChange('checkin_date', value)}
                            />
                        </View>
                        <View style={styles.datePicker}>
                        <FontAwesome5 name="calendar-alt" size={24} color="black" />
                            <TextInput
                                placeholder="Check out(YYYY-MM-DD)"
                                placeholderTextColor={'black'}
                                value={formData.checkout_date}
                                onChangeText={value => handleChange('checkout_date', value)}
                            />
                        </View>

                        <Pressable style={styles.search} onPress={handleSearch}>
                        {/* <Button title="Show Alert" onPress={showAlert} /> */}
                            <Text style={styles.searchText}>Search Hotels</Text>
                        </Pressable>
                    </View>
                    {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}

                    <ScrollView>
                        {locationSearch && locationSearch.map((hotel, index) => (
                            <View style={styles.hotelContainer} key={index}>
                                <Text style={styles.hotelName}>Hotel Name: {hotel.displayName && hotel.displayName.text}</Text>
                                {/* <Text>Photos: {hotel.basicPropertyDwwata && hotel.basicPropertyData.photos.main.highResUrl.relativeUrl}</Text> */}
                                <Text style={styles.hotelInfo}>Address: {hotel.basicPropertyData && hotel.basicPropertyData.location.address}</Text>
                                <Text style={styles.hotelInfo}>City: {hotel.basicPropertyData && hotel.basicPropertyData.location.city}</Text>
                                <Text style={styles.hotelInfo}>Location: {hotel.location && hotel.location.displayLocation}</Text>
                                <Text style={styles.hotelInfo}>Distance from Centre: {hotel.location && hotel.location.mainDistance}</Text>
                                {/* <Text>Price: {hotel.PriceDisplayInfoIrene && hotel.PriceDisplayInfoIrene.displayPrice.amountPerStay.amountRounded}</Text> */}
                                <Text style={styles.hotelPrice}>Price: £{hotel.blocks[0] && hotel.blocks[0].finalPrice.amount}</Text>
                            </View>
                            // No links to the hotels - later version would need to add this in, along with photos of the accomodation.
                        ))}
                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    hotelContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#96ABBB', 
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Shadow elevation (for Android)
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    hotelInfo: {
        fontSize: 16,
        marginBottom: 3,
    },
    hotelPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    page: {
        height: '100%'
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
        gap: 10
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
})