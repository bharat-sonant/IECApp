import { StyleSheet, Text, View, Pressable, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorCode } from '../Services/colorCode'
import backImage from "../Assets/back.png";
import { Card } from 'react-native-paper';
import { getThumnailImages, openGallery } from '../Services/uploadImageService';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('screen');
const numColumns = 3;
const itemWidth = width / numColumns - 20;

const UploadImageScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [indexKey, setIndexKey] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [imageArray, setImageArray] = useState([]);
    const isFocused = useIsFocused();
    const [upload, setUpload] = useState('');

    useEffect(() => {
        if (isFocused) {
            setUpload('')
            if (route.params) {
                const { title, activitydate, key } = route.params;

                if (title !== undefined) {
                    setTitle(title)
                }
                if (activitydate !== undefined) {
                    setActivityDate(activitydate)
                }
                if (key !== undefined) {
                    setIndexKey(key)
                    getThumnailImages(key).then((imageUrl) => {
                        if (imageUrl !== null) {
                            setLoading(false);
                            setImageArray(imageUrl)
                        } else {
                            setLoading(false);
                        }
                    }).catch((err) => {
                        console.log("Error fetching image: ", err);
                    })
                }
            }
        }
    }, [isFocused, upload])

    const handleUploadImage = async () => {
        setLoading(true);
        openGallery(indexKey).then((status) => {
            if (status === "Uploadsuccessful") {
                setLoading(false);
                setUpload(status);
            }
        }).catch((err) => {
            console.log("Error in Open Gallery", err);
        });
    }

    const handleImageView = (item) => {
        navigation.navigate("ImageView", { imageName: item.imageName, indexKey: indexKey });
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.navigate("Dashboard") }}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </Pressable>
                    <Text style={styles.headerText}>Images</Text>
                </View>

                <Pressable onPress={handleUploadImage}>
                    <View style={styles.eventButton}>
                        <Text style={styles.eventText}>Upload Image</Text>
                    </View>
                </Pressable>

            </View>
            {loading ? (<ActivityIndicatorElement />) :
                (<>
                    <Card style={styles.card}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                    </Card>

                    <FlatList
                        data={imageArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => { handleImageView(item) }}>
                                <Image style={[styles.imageStyle, { width: itemWidth }]} source={{ uri: item.imageUri }} />
                            </Pressable>
                        )}
                        numColumns={numColumns}
                    />
                </>)}

        </View >
    )
}

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

export default UploadImageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorCode.white,
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
        fontSize: 20,
        fontWeight: "600",
        color: ColorCode.white,
    },
    headerIcon: {
        height: 28,
        width: 28,
    },
    headerBackIcon: {
        height: 27,
        width: 27,
        marginRight: 15,
    },
    eventButton: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCode.white,
        borderRadius: 5,
        padding: 5,
    },
    eventText: {
        color: ColorCode.primary,
        fontSize: 14,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        color: ColorCode.black,
        fontWeight: "500",
    },
    imageStyle: {
        height: itemWidth,
        aspectRatio: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    card: {
        margin: 10,
        backgroundColor: ColorCode.white,
        padding: 10,
    },
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
})




