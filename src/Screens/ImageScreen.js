import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, ActivityIndicator, BackHandler } from 'react-native';
import backImage from "../Assets/back.png";
import { ColorCode } from '../Services/colorCode';

const ImageScreen = ({ navigation, route }) => {
    const [imageUrl, setImageurl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (route.params) {
            const { originalUri } = route.params;
            if (originalUri !== undefined) {
                setImageurl(originalUri);
            }
        }
    }, [])

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();

    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.navigate("UploadImage")}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </Pressable>
                    <Text style={styles.headerText}>Images View</Text>
                </View>
            </View>

            {imageUrl !== null && (
                <Image style={styles.image}
                    source={{ uri: imageUrl }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)} />
            )}
            {loading && <ActivityIndicatorElement />}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        () => navigation.navigate("UploadImage")
                    }
                >
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ActivityIndicatorElement = () => (
    <View style={styles.activityContainer}>
        <View style={styles.indicatorContainer}>
            <ActivityIndicator color={ColorCode.black} size={50} />
            <Text
                style={styles.activityText}>
                Please wait....
            </Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: 60,
        backgroundColor: ColorCode.primary,
        padding: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
        color: ColorCode.white,
    },
    headerIcon: {
        height: 28,
        width: 28,
    },
    headerBackIcon: {
        height: 22,
        width: 22,
        marginRight: 10,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    button: {
        backgroundColor: ColorCode.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
    activityContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityText: {
        fontSize: 17,
        fontWeight: '400',
        color: ColorCode.black,
        marginStart: 5,
    },
});

export default ImageScreen;
