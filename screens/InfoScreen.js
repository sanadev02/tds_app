import { Pressable, ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const InfoScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Travel Sustainable",
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
        <>
            <LinearGradient colors={['#4D5E68', '#96BBBB', 'white',]} style={styles.page}>
                {/* <ScrollView style={styles.container}>
                    <Text style={styles.title}>Sustainable Travel Experiences:</Text>
                    <Text style={styles.text}>
                        At Travel Destination Systems,
                        we're committed to providing you with unforgettable travel experiences
                        while minimizing our environmental impact and promoting sustainable practices.
                    </Text>
                    <Text style={styles.text}>
                        Here's how we enhance visitor experience, promote eco-friendly traveling,
                        educate users on cultural and environmental significance, and measure and
                        report environmental impact:
                    </Text>
                    <Text style={styles.title}> Enhancing Visitor Experience:</Text>
                    <Text style={styles.text}>
                        Interactive Guides and Tours:
                        Explore our interactive guides and virtual tours that immerse you
                        in the cultural and environmental richness of destinations like
                        Manchester and Barcelona. Discover hidden gems, local traditions,
                        and sustainable attractions.
                    </Text>
                    <Text style={styles.text}>
                        Cultural Immersion Experiences: Engage with local communities through
                        cultural exchange programs, workshops, and heritage walks.
                        Experience authentic cuisines, traditions, and lifestyles while
                        supporting local artisans and businesses.
                    </Text>
                    <Text style={styles.title}>Start Your Sustainable Journey Today! </Text>
                    <Text style={styles.text}>
                        Embark on a journey of discovery, sustainability, and cultural
                        enrichment with Sustainable Travel Experience. Together,
                        let's create meaningful travel experiences that leave a positive
                        impact on destinations and communities worldwide. Join us in
                        preserving our planet's natural and cultural heritage for
                        generations to come.
                    </Text>
                </ScrollView> */}
                <ScrollView style={styles.container}>
                    <Text style={styles.Header}>
                        3 Tips for Sustainable Travel:
                    </Text>
                    <View style={styles.textBox}>
                        <Text style={styles.tip}>
                            1.Choose Eco-Friendly Accommodations
                        </Text>
                        <Text style={styles.tipText}>
                            Choose for stays that prioritize eco-friendly practices such as recycling, energy conservation, and water-saving measures.
                        </Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.tip}>
                            2.Reduce Single-Use Plastic
                        </Text>
                        <Text style={styles.tipText}>
                            Bring reusable water bottles, bags, and utensils to minimize single-use plastic waste while traveling.
                        </Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.tip}>
                            3.Support Local Communities
                        </Text>
                        <Text style={styles.tipText}>
                            Embrace local culture, traditions, and cuisine by going to locally-owned businesses.
                        </Text>
                    </View>

                    <Text style={styles.alert}>
                        Remember your support helps boost the local economy and preserves cultural heritage!
                    </Text>

                    <Text style={styles.title}>Sustainable Travel Experiences:</Text>
                    <Text style={styles.text}>
                        Explore unforgettable travel experiences while minimising environmental impact and promoting sustainability.
                    </Text>
                    <Text style={styles.text}>
                        Explore interactive guides and virtual tours to immerse yourself in cultural and environmental richness.
                    </Text>
                    <Text style={styles.text}>
                        Engage with local communities through cultural exchange programs and support sustainable attractions.
                    </Text>
                    <Text style={styles.title}>Start Your Sustainable Journey Today!</Text>
                    {/* <Text style={styles.text}>
                        Join us in creating meaningful travel experiences that leave a positive impact on destinations and communities.
                    </Text> */}
                    <View style={styles.pageEnd}>
                        <Text style={styles.title}>
                            Learn more about sustainable travel:
                        </Text>
                        <Pressable onPress={() => Linking.openURL('https://sustainabletravel.org')}>
                            <Text style={styles.links}> Sustainable Travel International </Text>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL('https://www.responsibletravel.org')}>
                            <Text style={styles.links}> Center for Responsible Travel </Text>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL('https://www.nationalgeographic.com/travel/article/what-sustainable-tourism-means')}>
                            <Text style={styles.links}> What Sustainable Tourism Means </Text>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL('https://www.nationalgeographic.com/travel/article/how-to-travel-better-a-beginners-guide-to-sustainable-travel-in-2023-and-beyond')}>
                            <Text style={styles.links}> How to travel better </Text>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL('https://www.nytimes.com/2021/04/22/travel/sustainable-travel.html')}>
                            <Text style={styles.links}> How to Travel More Sustainably </Text>
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL('https://www.bbc.com/travel/article/20240109-10-destinations-welcoming-sustainable-travellers-in-2024')}>
                            <Text style={styles.links}> 10 sustainable travel destinations to visit in 2024 </Text>
                        </Pressable>
                    </View>
                    <Text style={styles.page}></Text>
                </ScrollView>
                
            </LinearGradient>
        </>
    )
}

export default InfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginTop: 0,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'center',
        color: '#023020'
    },
    Header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'center',
        color: '#023020'
    },
    text: {
        fontSize: 16,
        padding: 15,
        alignItems: "center",
        paddingHorizontal: 10,
        textAlign: 'justify',
        borderColor: "#023020",
        borderWidth: 2,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 10,
    },
    textBox: {
        paddingHorizontal: 10,
        borderColor: 'green',
        borderWidth: 2,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 10,
    },
    alert: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 10,
        alignSelf: 'center',
        paddingVertical: 15,
        color: 'green'
    },
    page: {
        height: '100%',
        paddingBottom: 5
    },
    tip: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'flex-start',
        color: '#023020'
    },
    tipText: {
        fontSize: 16,
        alignItems: "center",
        paddingHorizontal: 10,
    },
    pageEnd:{
        backgroundColor:'white',
        borderColor: 'green',
        borderWidth: 2,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 10,
    },
    links:{
        color: 'green', 
        fontSize: 16, 
        textDecorationLine: 'underline',
        padding:5
    }
});