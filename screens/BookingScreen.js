import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const bookings = useSelector((state) => state.booking.booking);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
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
  return (
    <SafeAreaView>
      {bookings.length > 0 && bookings.map((item) => (
        <Pressable style={styles.pressName}>
          <View>
            <Text style={styles.textName}>
              {item.name}
            </Text>
            <View style={styles.viewRating}>
              <MaterialIcons name="stars" size={24} color="green" />
              <Text style={styles.textRating}>
                {item.rating}
              </Text>
              <Text style={styles.textDot}>•</Text>
              <View style={styles.viewLevel}>
                <Text style={styles.textLevel}>
                  Genius Level
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  pressName: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 14,
    borderRadius: 6,
  },
  textName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  textRating: {
    marginLeft: 3,
    fontSize: 15,
    fontWeight: "400",
  },
  textDot: {
    marginLeft: 3,
  },
  viewLevel: {
    padding: 6,
    borderRadius: 4,
    width: 100,
    backgroundColor: "#0039a6",
    marginLeft: 4,
    borderRadius: 5,
  },
  textLevel: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "400",
  }
});