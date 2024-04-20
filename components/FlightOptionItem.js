import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';


const FlightOptionItem = ({ selectedAirport, onAirportSelect }) => {
  const [airportInfo, setAirportInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('IATA'); // Default to searching by IATA code

  // Define the API URL
  const url = 'https://airport-info.p.rapidapi.com/airport';

  // Define headers object
  const headers = {
    'X-RapidAPI-Key': 'bae448932emsh6e335567378fe30p1be387jsn9c4c319b5442',
    'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
  };

  // Function to handle selecting an airport
  // const handleAirportSelect = (airport) => {
  //   onAirportSelect(airport.location);
  // };

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://airport-info.p.rapidapi.com/airport?${searchType.toLowerCase()}=${searchQuery}`, { headers });
      setAirportInfo(response.data);
    } catch (error) {
      console.error('Error fetching airport information:', error);
      setAirportInfo(null);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
          placeholder="Enter airport code"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button
          title="Search"
          onPress={handleSearch}
        />
      </View>
       {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}
    {airportInfo ? (
      <>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Airport Information</Text>
        <Text>Name: {airportInfo.name}, {airportInfo.location}</Text>
      </>
    ) : (
      !loading && <Text>No airport information available</Text>
    )}
  </View>
  );
};

// export default AirportInfo;

// const FlightOptionItem = ({ flight }) => {
//   const FlightData = [
//     {
//       "price": "£118",
//       "to": {
//         "airline": "Iberia Express",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Ryanair",
//         "departAt": "06:05",
//         "arriveAt": "08:15",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£142",
//       "to": {
//         "airline": "Ryanair",
//         "departAt": "20:10",
//         "arriveAt": "23:59",
//         "duration": "2h 49"
//       },
//       "from": {
//         "airline": "Ryanair",
//         "departAt": "06:05",
//         "arriveAt": "08:15",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£140",
//       "to": {
//         "airline": "Iberia",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Ryanair",
//         "departAt": "06:05",
//         "arriveAt": "08:15",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£329",
//       "to": {
//         "airline": "Iberia Express",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Iberia Express",
//         "departAt": "23:30",
//         "arriveAt": "01:35+1",
//         "duration": "3h 05"
//       }
//     },
//     {
//       "price": "£366",
//       "to": {
//         "airline": "Iberia Express",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Iberia Express",
//         "departAt": "11:25",
//         "arriveAt": "13:35",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£346",
//       "to": {
//         "airline": "Iberia",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Iberia",
//         "departAt": "23:30",
//         "arriveAt": "01:35+1",
//         "duration": "3h 05"
//       }
//     },
//     {
//       "price": "£233",
//       "to": {
//         "airline": "Vueling Airlines",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Ryanair",
//         "departAt": "06:05",
//         "arriveAt": "08:15",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£385",
//       "to": {
//         "airline": "Iberia",
//         "departAt": "06:50",
//         "arriveAt": "10:40",
//         "duration": "2h 50"
//       },
//       "from": {
//         "airline": "Iberia",
//         "departAt": "11:25",
//         "arriveAt": "13:35",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£259",
//       "to": {
//         "airline": "Iberia Express",
//         "departAt": "14:20",
//         "arriveAt": "18:15",
//         "duration": "2h 55"
//       },
//       "from": {
//         "airline": "Ryanair",
//         "departAt": "06:05",
//         "arriveAt": "08:15",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£276",
//       "to": {
//         "airline": "Iberia",
//         "departAt": "14:20",
//         "arriveAt": "18:15",
//         "duration": "2h 55"
//       },
//       "from": {
//         "airline": "Ryanair",
//         "departAt": "06:05",
//         "arriveAt": "08:15",
//         "duration": "3h 10"
//       }
//     },
//     {
//       "price": "£195",
//       "to": {
//         "airline": "Ryanair",
//         "departAt": "20:10",
//         "arriveAt": "23:59",
//         "duration": "2h 49"
//       },
//       "from": {
//         "airline": "Ryanair + Binter Canarias",
//         "departAt": "06:15",
//         "arriveAt": "10:20",
//         "duration": "5h 05"
//       }
//     }
//   ]
//   const option1 = FlightData[0];
//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.routes}>
//           <View style={styles.route}>
//             <Text style={styles.time}>
//               {flight.from.departAt}{' '}
//               <Ionicons name="airplane" size={16} color="gray" />{' '}
//               {flight.from.arriveAt}
//             </Text>
//             <Text style={styles.airline}>{flight.from.airline}</Text>
//           </View>

//           <View style={styles.route}>
//             <Text style={styles.time}>
//               {flight.to.departAt}{' '}
//               <Ionicons name="airplane" size={16} color="gray" />{' '}
//               {flight.to.arriveAt}
//             </Text>
//             <Text style={styles.airline}>{flight.to.airline}</Text>
//           </View>
//         </View>

//         <Text style={styles.price}>{flight.price}</Text>
//       </View>
//     </>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
  },
  routes: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'gainsboro',
    gap: 10,
    paddingRight: 10,
  },
  route: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'dimgray',
    fontFamily: 'Courier New',
  },
  airline: {
    color: 'gray',
  },
  price: {
    width: 75,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default FlightOptionItem;