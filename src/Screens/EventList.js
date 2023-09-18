import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ColorCode } from '../Services/colorCode'
import addImage from "../Assets/add.png";
import backImage from "../Assets/back.png";
import pencilImage from "../Assets/pencil.png";
import { Card } from 'react-native-paper';
import { getEventListData } from '../Services/eventListService';
import { useIsFocused } from '@react-navigation/native';

const EventList = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [eventListData, setEventListData] = useState([]);

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getEventListData().then((eventData) => {
                if (eventData !== null) {
                    setLoading(false);
                    setEventListData(eventData);
                } else {
                    setLoading(false);
                }
            }).catch((err) => {
                setLoading(false);
                console.log("Event Error: ", err);
            });
        }
    }, [isFocused])

    const handleOpenEvent = (item) => {
        let title = item.title;
        let activitydate = item.activityDate;
        let key = item.activityKey;
        navigation.navigate('UploadImage', {
            title: title,
            activitydate: activitydate,
            key: key,
            buttonKey:'eventList'
        });
    }

    const handleCreateEvent = () => {
        navigation.navigate('CreateEvent', { buttonKey: "createNewEvent" });
    }

    const handleEdit = (item) => {
        let title = item.title;
        let description = item.description;
        let activitydate = item.activityDate;
        let key = item.activityKey;
        navigation.navigate('CreateEvent',
            {
                buttonKey: "createEditEvent",
                title: title,
                description: description,
                activitydate: activitydate,
                key: key,
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </Pressable>
                    <Text style={styles.headerText}>Event List</Text>
                </View>
                <Pressable onPress={handleCreateEvent}>
                    <View style={styles.eventButton}>
                        <Image style={styles.headerIcon} source={addImage} />
                        <Text style={styles.eventText}>Create Event</Text>
                    </View>
                </Pressable>
            </View>

            {loading === true ? (<ActivityIndicatorElement />) :
                (
                    <FlatList
                        data={eventListData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                        (<Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={{
                                    fontSize: 17,
                                    color: ColorCode.black,
                                    width: 100
                                }}>{item.formatedDate}</Text>
                                <Text style={{
                                    fontSize: 17,
                                    color: ColorCode.black,
                                    width: 200,
                                    fontWeight: '600'
                                }}
                                    onPress={() => { handleOpenEvent(item) }}>{item.title}</Text>
                                {/* <Text style={{ fontSize: 16, width: 25 }}>60</Text> */}
                                <Pressable onPress={() => { handleEdit(item) }}>
                                    <Image style={styles.cardImage} source={pencilImage} />
                                </Pressable>
                            </View>
                        </Card>
                        )}
                    />
                )}
        </View>
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

export default EventList

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
        alignItems: 'center',
    },
    eventText: {
        color: ColorCode.white,
        fontSize: 12,
    },
    okButton: {
        height: 50,
        width: 50,
        backgroundColor: ColorCode.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    okText: {
        color: ColorCode.white,
        fontSize: 17
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
    card: {
        margin: 10,
        backgroundColor: ColorCode.white,
    },
    cardImage: {
        height: 20,
        width: 20,
        padding: 8,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    }

})


