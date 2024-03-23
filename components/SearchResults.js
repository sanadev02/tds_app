import { StyleSheet, FlatList, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import { FlatList } from 'react-native-web';

const SearchResults = ({data,input,setInput}) => {
    const navigation = useNavigation();
  return (
    <View style={{padding:10}}>
        <FlatList data={data} renderItem={({item}) => {
            if(item.place.toLowerCase().includes(input.toLowerCase())){
                if(input === ""){
                    return null;
                }
                return(
                    <Pressable 
                    onPress={() => {
                        setInput(item.place);
                        navigation.navigate("Home", {
                            input:item.place
                        })
                    }}>
                        <View style={styles.image}>
                            <Image style={{width:70,height:70}} source={{uri:item.placeImage}}/>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.textPlace}>{item.place}</Text>
                            <Text style={styles.textDesc} >{item.shortDescription}</Text>
                            <Text style={styles.textProps} >{item.properties.length} Properties</Text>
                        </View>
                    </Pressable>
                )
            }
        }}/>
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({
    image: {
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
    },
    textDesc:{
        marginVertical:4
    },
    textPlace:{
        fontSize:15,
        fontWeight:'500'
    },
    textProps:{
        color:'grey',
        fontSize:15
    }
})