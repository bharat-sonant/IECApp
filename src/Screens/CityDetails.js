import { StyleSheet, Text, View, FlatList, Dimensions, Pressable, BackHandler, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorCode } from '../Services/colorCode'
import { fetchCityDetails } from '../Services/cityDetailsService'
import { handleCitySelect } from '../Services/firebase';

const windowWidth = Dimensions.get('window').width;

const CityDetails = ({ navigation }) => {
    const [cityDetails, setCitydetails] = useState([])
    const [imageLoad, setImageLoad] = useState(true);

    useEffect(() => {
        fetchCityDetails().then((cityValue) => {
            if (cityValue !== null) {
                setCitydetails(cityValue);
            } else if (cityValue === "NoCity") {
                console.log("No City Available");
            }

        }).catch((err) => {
            console.log("Error in City List: ", err);
        });
        
        const backAction = () => {
            navigation.navigate("Login");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [])

    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.cityContainer} onPress={() => { handleCitySelectButton(item) }}>
                {imageLoad && (<ActivityIndicator style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginLeft: -20,
                    marginTop: -20,
                }}
                    size={40}
                    color={ColorCode.primary} />)}

                <Image style={{
                    width: 90,
                    height: 90,
                    marginTop: 15
                }}
                    source={{ uri: item.images }}
                    onLoadEnd={() => setImageLoad(false)} />

                <View style={styles.citys}>
                    <Text style={styles.text}>{item.cityName}</Text>
                </View>
            </Pressable >
        )
    }

    const handleCitySelectButton = async (item) => {
        handleCitySelect(item).then((status) => {
            if (status === "Success") {
                navigation.navigate("Dashboard");
            }
        })
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Select City</Text>
                </View>

                <FlatList
                    data={cityDetails}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />

            </View>
        </>
    )
}

export default CityDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: ColorCode.primary,
        padding: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
        color: ColorCode.white,
    },
    cityContainer: {
        height: 150,
        width: windowWidth / 2 - 22,
        borderColor: ColorCode.primary,
        borderWidth: 2,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    text: {
        color: ColorCode.white,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',

    },
    citys: {
        width: '100%',
        backgroundColor: ColorCode.primary,
        padding: 9,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        marginTop: 6,

    }

})
