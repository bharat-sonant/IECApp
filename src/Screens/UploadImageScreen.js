import { StyleSheet, Text, View, Pressable, Image, FlatList, Dimensions, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState, PureComponent } from 'react'
import { ColorCode } from '../Services/colorCode'
import backImage from "../Assets/back.png";
import { Card } from 'react-native-paper';
import { getThumnailImages, openGallery } from '../Services/uploadImageService';
import { useIsFocused } from '@react-navigation/native';
import uploadImage from "../Assets/upload-icon.png";

const { width } = Dimensions.get('screen');
const numColumns = 4;
const itemWidth = width / numColumns - 10;

class MyListItem extends PureComponent {
    render() {
        const { item, handleImageView } = this.props;

        return (
            <Pressable onPress={() => handleImageView(item)}>
                <Image style={styles.imageStyle} source={{ uri: item.imageUri }} />
            </Pressable>
        );
    }
}

const UploadImageScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [indexKey, setIndexKey] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [imageArray, setImageArray] = useState([]);
    const isFocused = useIsFocused();
    const [upload, setUpload] = useState('');
    const [buttonValueRoute, setButtonValueRoute] = useState('');
    const [imageLoad, setImageLoad] = useState(true);

    useEffect(() => {
        if (isFocused) {
            setUpload('');
            if (route.params) {
                const { title, activitydate, key, buttonKey } = route.params;

                if (title !== undefined) {
                    setTitle(title);
                }
                if (activitydate !== undefined) {
                    setActivityDate(activitydate);
                }
                if (buttonKey !== undefined) {
                    setButtonValueRoute(buttonKey);
                }
                if (key !== undefined) {
                    setIndexKey(key);
                    getThumnailImages(key)
                        .then((imageUrl) => {
                            if (imageUrl !== null) {
                                setLoading(false);
                                setImageArray(imageUrl);
                            } else {
                                setLoading(false);
                            }
                        })
                        .catch((err) => {
                            console.log('Error fetching image: ', err);
                        });
                }
            } else {
                getThumnailImages(indexKey)
                    .then((imageUrl) => {
                        if (imageUrl !== null) {
                            setLoading(false);
                            setImageArray(imageUrl);
                        } else {
                            setLoading(false);
                        }
                    })
                    .catch((err) => {
                        console.log('Error fetching image: ', err);
                    });
            }

            const backAction = () => {
                if (route.params.buttonKey === "createEvent") {
                    navigation.navigate("Dashboard")
                } else {
                    navigation.goBack();
                }

                return true;
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();

        }
    }, [isFocused, upload]);

    const handleUploadImage = async () => {
        setLoading(true);
        openGallery(indexKey)
            .then((status) => {
                if (status === 'Uploadsuccessful') {
                    setLoading(false);
                    setUpload(status);
                }
            })
            .catch((err) => {
                setUpload("error");
                console.log('Error in Open Gallery', err);
            });
    };

    const handleImageView = (item) => {
        navigation.navigate("ImageView", { originalUri: item.originalUri });
    }

    const handleGoBack = () => {
        if (buttonValueRoute === "eventList") {
            navigation.navigate("EventList")
        } else if (buttonValueRoute === "createEvent") {
            navigation.navigate("Dashboard")
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={handleGoBack}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </Pressable>
                    <Text style={styles.headerText}>Event Images</Text>
                </View>

                <Pressable onPress={handleUploadImage}>
                    <View style={styles.eventButton}>
                        <Image style={styles.headerIcon} source={uploadImage} />
                        <Text style={styles.eventText}>Images</Text>
                    </View>
                </Pressable>

            </View>
            {loading ? (<ActivityIndicatorElement />) :
                (<>
                    <Card style={styles.card}>
                        <Text style={{
                            fontSize: 18,
                            color: ColorCode.black,
                            marginTop: -20,
                            backgroundColor: ColorCode.white,
                            width: "12%",
                            marginStart: 5,
                            fontWeight: '500',
                        }}>Title</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                    </Card>

                    <FlatList
                        data={imageArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <MyListItem
                                item={item}
                                handleImageView={handleImageView}
                            />
                            // <>
                            //     <Pressable onPress={() => { handleImageView(item) }}>
                            //         {imageLoad && (<Image style={
                            //             [styles.imageStyleTemp,
                            //             { width: itemWidth }]
                            //         } source={require("../Assets/light-grey.jpg")} />)}
                            //         <Image style={[styles.imageStyle,
                            //         { width: itemWidth }]}
                            //             source={{ uri: item.imageUri }}
                            //             onLoadEnd={() => setImageLoad(false)} />
                            //     </Pressable>
                            // </>
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
        // height: 60,
        backgroundColor: ColorCode.primary,
        padding: 13,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
        color: ColorCode.white,
    },
    headerIcon: {
        height: 2,
        width: 2,
    },
    headerBackIcon: {
        height: 22,
        width: 22,
        marginRight: 10,
    },
    eventButton: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorCode.white,
        padding: 8,
        borderRadius: 5
    },
    eventText: {
        color: ColorCode.primary,
        fontSize: 14,
        marginLeft: 5
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 17,
        color: ColorCode.transparentBlack,
    },
    imageStyle: {
        height: itemWidth,
        aspectRatio: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: ColorCode.primary,
    },
    imageStyleTemp: {
        height: itemWidth,
        aspectRatio: 1,
        marginVertical: 5,
        marginHorizontal: 5,
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
    headerIcon: {
        height: 22,
        width: 22,
        tintColor: ColorCode.primary
    },
})


// import React, { PureComponent, useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Pressable, Image, FlatList, Dimensions, ActivityIndicator, BackHandler } from 'react-native';
// import { Card } from 'react-native-paper';
// import { getThumnailImages, openGallery } from '../Services/uploadImageService';
// import { useIsFocused } from '@react-navigation/native';
// import uploadImage from "../Assets/upload-icon.png";
// import { ColorCode } from '../Services/colorCode';
// import backImage from "../Assets/back.png";

// const { width } = Dimensions.get('screen');
// const numColumns = 4;
// const itemWidth = width / numColumns - 10;

// class MyListItem extends PureComponent {
//     render() {
//         const { item, imageLoad, loading, handleImageView } = this.props;

//         return (
//             <Pressable onPress={() => handleImageView(item)}>
//                 {/* {imageLoad && loading && <ActivityIndicator style={styles.activityIndicator} size={40} color={ColorCode.primary} />} */}
//                 <Image style={styles.imageStyle} source={{ uri: item.imageUri }}/>
//                 {/* {!imageLoad && <Image style={styles.imageStyle} source={{ uri: item.imageUri }} onLoadEnd={() => setImageLoad(false)} />} */}
//             </Pressable>
//         );
//     }
// }

// const UploadImageScreen = ({ navigation, route }) => {
//     const [title, setTitle] = useState('');
//     const [indexKey, setIndexKey] = useState('');
//     const [activityDate, setActivityDate] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [imageArray, setImageArray] = useState([]);
//     const isFocused = useIsFocused();
//     const [upload, setUpload] = useState('');
//     const [buttonValueRoute, setButtonValueRoute] = useState('');
//     const [imageLoad, setImageLoad] = useState(true);

//     useEffect(() => {
//         if (isFocused) {
//             setUpload('');
//             if (route.params) {
//                 const { title, activitydate, key, buttonKey } = route.params;

//                 if (title !== undefined) {
//                     setTitle(title);
//                 }
//                 if (activitydate !== undefined) {
//                     setActivityDate(activitydate);
//                 }
//                 if (buttonKey !== undefined) {
//                     setButtonValueRoute(buttonKey);
//                 }
//                 if (key !== undefined) {
//                     setIndexKey(key);
//                     getThumnailImages(key)
//                         .then((imageUrl) => {
//                             if (imageUrl !== null) {
//                                 setLoading(false);
//                                 setImageArray(imageUrl);
//                             } else {
//                                 setLoading(false);
//                             }
//                         })
//                         .catch((err) => {
//                             console.log('Error fetching image: ', err);
//                         });
//                 }
//             } else {
//                 getThumnailImages(indexKey)
//                     .then((imageUrl) => {
//                         if (imageUrl !== null) {
//                             setLoading(false);
//                             setImageArray(imageUrl);
//                         } else {
//                             setLoading(false);
//                         }
//                     })
//                     .catch((err) => {
//                         console.log('Error fetching image: ', err);
//                     });
//             }

//             const backAction = () => {
//                 if (route.params.buttonKey === "createEvent") {
//                     navigation.navigate("Dashboard")
//                 } else {
//                     navigation.goBack();
//                 }

//                 return true;
//             };

//             const backHandler = BackHandler.addEventListener(
//                 'hardwareBackPress',
//                 backAction,
//             );

//             return () => backHandler.remove();
//         }
//     }, [isFocused, upload]);

//     const handleUploadImage = async () => {
//         setLoading(true);
//         openGallery(indexKey)
//             .then((status) => {
//                 if (status === 'Uploadsuccessful') {
//                     setLoading(false);
//                     setUpload(status);
//                 }
//             })
//             .catch((err) => {
//                 setUpload("error");
//                 console.log('Error in Open Gallery', err);
//             });
//     };

//     const handleImageView = (item) => {
//         navigation.navigate("ImageView", { originalUri: item.originalUri });
//     }

//     const handleGoBack = () => {
//         if (buttonValueRoute === "eventList") {
//             navigation.navigate("EventList")
//         } else if (buttonValueRoute === "createEvent") {
//             navigation.navigate("Dashboard")
//         }
//     }

//     const ActivityIndicatorElement = () => (
//         <View style={styles.activityContainer}>
//             <View style={styles.indicatorContainer}>
//                 <ActivityIndicator color={ColorCode.black} size={50} />
//                 <Text
//                     style={styles.activityText}>
//                     Please wait....
//                 </Text>
//             </View>
//         </View>
//     )

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <Pressable onPress={handleGoBack}>
//                         <Image style={styles.headerBackIcon} source={backImage} />
//                     </Pressable>
//                     <Text style={styles.headerText}>Event Images</Text>
//                 </View>

//                 <Pressable onPress={handleUploadImage}>
//                     <View style={styles.eventButton}>
//                         <Image style={styles.headerIcon} source={uploadImage} />
//                         <Text style={styles.eventText}>Images</Text>
//                     </View>
//                 </Pressable>

//             </View>
//             {loading ? (<ActivityIndicatorElement />) :
//                 (<>
//                     <Card style={styles.card}>
//                         <Text style={{
//                             fontSize: 18,
//                             color: ColorCode.black,
//                             marginTop: -20,
//                             backgroundColor: ColorCode.white,
//                             width: "12%",
//                             marginStart: 5,
//                             fontWeight: '500',
//                         }}>Title</Text>
//                         <View style={styles.textContainer}>
//                             <Text style={styles.titleText}>{title}</Text>
//                         </View>
//                     </Card>

//                     <FlatList
//                         data={imageArray}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             <MyListItem
//                                 item={item}
//                                 imageLoad={imageLoad}
//                                 loading={loading}
//                                 handleImageView={handleImageView}
//                             />
//                         )}
//                         numColumns={numColumns}
//                     />
//                 </>)}
//         </View >
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: ColorCode.white,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         alignItems: 'center',
//         backgroundColor: ColorCode.primary,
//         padding: 13,
//     },
//     headerText: {
//         fontSize: 18,
//         fontWeight: "500",
//         color: ColorCode.white,
//     },
//     headerIcon: {
//         height: 2,
//         width: 2,
//     },
//     headerBackIcon: {
//         height: 22,
//         width: 22,
//         marginRight: 10,
//     },
//     eventButton: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         backgroundColor: ColorCode.white,
//         padding: 8,
//         borderRadius: 5
//     },
//     eventText: {
//         color: ColorCode.primary,
//         fontSize: 14,
//         marginLeft: 5
//     },
//     textContainer: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     titleText: {
//         fontSize: 17,
//         color: ColorCode.transparentBlack,
//     },
//     imageStyle: {
//         height: itemWidth,
//         aspectRatio: 1,
//         marginVertical: 5,
//         marginHorizontal: 5,
//     },
//     card: {
//         margin: 10,
//         backgroundColor: ColorCode.white,
//         padding: 10,
//     },
//     activityContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     indicatorContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     activityText: {
//         fontSize: 17,
//         fontWeight: '400',
//         color: ColorCode.black,
//         marginStart: 5,
//     },
// });

// export default UploadImageScreen;


