import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, BackHandler } from 'react-native';
import backImage from "../Assets/back.png";
import { ColorCode } from '../Services/colorCode';

const ImageScreen = ({ navigation, route }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (route.params) {
            const { originalUri } = route.params;
            if (originalUri !== undefined) {
                setImageUrl(originalUri);
            }
        }
    }, []);

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
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("UploadImage")}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Images View</Text>
                </View>
            </View>

            {imageUrl !== null && (
                <Image
                    style={styles.image}
                    source={{ uri: imageUrl }}
                    resizeMode='contain'
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            )}

            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator color={ColorCode.white} size={50} />
                    <Text style={styles.activityText}>Please wait....</Text>
                </View>
            )}

            {loading === false && (<View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("UploadImage")}
                >
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>)}

        </View>
    );
};

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
        marginLeft: 10,
    },
    headerBackIcon: {
        height: 22,
        width: 22,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityText: {
        fontSize: 17,
        fontWeight: '400',
        color: ColorCode.white,
        marginStart: 5,
        marginTop: 10,
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
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
});

export default ImageScreen;

