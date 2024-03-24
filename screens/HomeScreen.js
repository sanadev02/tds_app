import {
    Button,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    TextInput,
    Text,
    View,
    CheckBox,
    Alert,
} from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-date-ranges';
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';

// import {
//     Button,
//     CalendarCell,
//     CalendarGrid,
//     DateInput,
//     DateRangePicker,
//     DateSegment,
//     Dialog,
//     Group,
//     Heading,
//     Label,
//     Popover,
//     RangeCalendar
// } from 'react-aria-components';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [selectedDates, setSelectedDates] = useState();
    // const handleDateChange = (range) => {
    //   setSelectedRange(range);
    // };


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
                backgroundColor: "#4D5E68",
                height: 75,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
            headerRight: () => {
                <Ionicons name="notifications-outline" size={24} color="#B19F8B" />
            }
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

    const searchPlaces = (place) => {
        if (!route.params || !selectedDates) {
            Alert.alert(
                "Invalid Details",
                "Please enter all the details",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            )
        }
        if (route.params && selectedDates) {
            navigation.navigate("Places", {
                rooms: rooms,
                adults: adults,
                selectedDates: selectedDates,
                children: children,
                place: place
            })
        }
    };

    return (
        <>
            <View>
                <Header />

                <ScrollView >
                    <View style={{
                        margin: 20,
                        borderColor: "#B19F8B",
                        borderWidth: 3,
                        borderRadius: 6
                    }}>
                        {/* Destination */}
                        <Pressable
                            onPress={() => navigation.navigate("Search")}
                            style={styles.pressable}>
                            <Feather name="search" size={24} color="#B19F8B" />
                            <TextInput
                                placeholderTextColor="black"
                                placeholder={route?.params ? route.params.input : "Enter Your Destination"} />
                        </Pressable>

                        {/* {Destination Dates} */}
                        <Pressable
                            style={styles.pressable}>
                            <Feather name="calendar" size={24} color="#B19F8B" />

                            <View>
                                <DatePicker
                                    style={{ width: 350, height: 45, borderRadius: 0, borderWidth: 0, boderColor: "transparent" }}
                                    customStyles={{
                                        placeholderText: {
                                            fontSize: 20,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginRight: "auto"
                                        },
                                        headerStyle: {
                                            backgroundColor: "#003580"
                                        },
                                        contentText: {
                                            fontSize: 15,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginRight: "auto"
                                        }
                                    }}
                                    selectedByColor="#0047AB"
                                    customButton={(onConfirm) => customButton(onConfirm)}
                                    onConfirm={(startDate, endDate) => setSelectedDates(startDate, endDate)}
                                    allowFontScaling={false}
                                    placeholder={'Apr 27, 2018 → Jul 10, 2018'}
                                    mode={'range'}
                                />
                            </View>

                            {/* <DateRangePicker >
                  <Label >Trip dates</Label>
                  <Group style={styles.reactAriaGroup}>
                    <DateInput style={styles.startSlotSpan} slot="start">
                      {(segment) => <DateSegment style={styles.reactAriaDateInput} segment={segment} />}
                    </DateInput>
                    <span style={styles.startSlotSpan} aria-hidden="true">–</span>
                    <DateInput style={styles.endSlot} slot="end">
                      {(segment) => <DateSegment style={styles.reactAriaDateInput} segment={segment} />}
                    </DateInput>
                    <Button style={styles.reactAriaButton}>▼</Button>
                  </Group>
                  <Popover style={styles.reactBox}>
                    <Dialog>
                      <RangeCalendar>
                        <header style={styles.header}>
                          <Button style={styles.reactAriaButton2} slot="previous">◀</Button>
                          <Heading />
                          <Button style={styles.reactAriaButton2} slot="next">▶</Button>
                        </header>
                        <CalendarGrid style={styles.table}>
                          {(date) => <CalendarCell date={date} />}
                        </CalendarGrid>
                      </RangeCalendar>
                    </Dialog>
                  </Popover>
                </DateRangePicker> */}
                        </Pressable>

                        {/* Rooms and Guests */}
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.pressable}>
                            <Octicons name="person" size={24} color="#B19F8B" />
                            <TextInput
                                style={{ flex: 1 }}
                                // placeholderTextColor="black"
                                placeholder={`${rooms} Room • ${adults} Adults • ${children} Children`} />
                        </Pressable>

                        {/* Eco-friendly Options Only */}
                        <View style={styles.pressable}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                onCheckColor={'#C1B891'}
                                style={{ borderColor: "#C1B891" }}
                            />
                            <Text>Eco-friendly Options Only</Text>
                        </View>

                        {/* Search Button */}
                        <Pressable
                            onPress={() => searchPlaces(route?.params.input)}
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
                modalTitle={<ModalTitle title="Select rooms and guests" />}
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
                    <View
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
                    </View>

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
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
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
        borderColor: "#4D5E68",
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
        marginHorizontal: 10,
        backgroundColor: "#B1BEC4",
    },
    stackText: {
        color: "black",
        fontSize: 15,
        fontWeight: "500",
        marginTop: 10
    },
    reactAriaGroup: {
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        minWidth: 'auto',
        maxWidth: 'auto',
        boxSizing: 'border-box',
        overflow: 'auto',
        position: 'relative',
        padding: 4,
        borderWidth: 1,
        borderStyle: 'transparent',
        borderRadius: 6,
        whiteSpace: 'nowrap',
    },
    pressed: {
        boxShadow: 'none',
        backgroundColor: 'white',
    },
    focusWithin: {
        outlineWidth: 2,
        outlineStyle: 'solid',
        outlineColor: 'var(--focus-ring-color)',
        outlineOffset: -1,
    },
    startSlotSpan: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        // minWidth: 100,
        // minHeight: 100,
        overflow: 'auto',
        whiteSpace: 'nowrap',
        display: 'flex',
        flexDirection: 'row'
    },
    endSlot: {
        // marginRight: 32, // Convert 2rem to pixels
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 0,
        paddingHorizontal: 0,
        minWidth: 10,
        // minHeight: 100,
        overflow: 'auto',
        whiteSpace: 'nowrap',
    },
    reactAriaButton: {
        backgroundColor: '#4D5E68',
        color: 'white',
        borderWidth: 0,
        borderRadius: 4,
        borderStyle: 'solid',
        marginLeft: 5,
        marginRight: 5,
        width: 22, // Convert 1.429rem to pixels
        height: 22, // Convert 1.429rem to pixels
        padding: 1,
        fontSize: 14, // Convert 0.857rem to pixels
        boxSizing: 'content-box',
        flexShrink: 0,
        position: 'sticky',
        right: 0,
    },
    reactAriaButton2: {
        backgroundColor: '#4D5E68',
        color: 'white',
        borderWidth: 0,
        borderRadius: 4,
        borderStyle: 'solid',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        width: 22, // Convert 1.429rem to pixels
        height: 22, // Convert 1.429rem to pixels
        padding: 1,
        fontSize: 14, // Convert 0.857rem to pixels
        boxSizing: 'content-box',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    focusVisible: {
        outlineWidth: 2,
        outlineStyle: 'solid',
        outlineColor: 'black',
        outlineOffset: 2,
    },
    reactAriaDateInput: {
        width: 'auto',
        minWidth: 'auto',
        padding: 0,
        borderWidth: 0,
        outlineWidth: 0,
    },
    reactAriaPopover: {
        backgroundColor: '#C1B891',
        color: 'black',
        borderWidth: 0,
        borderRadius: 4,
        borderStyle: 'solid',
        marginLeft: 5,
        marginRight: 5,
        width: 22, // Convert 1.429rem to pixels
        height: 22, // Convert 1.429rem to pixels
        padding: 1,
        fontSize: 14, // Convert 0.857rem to pixels
        boxSizing: 'content-box',
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
})