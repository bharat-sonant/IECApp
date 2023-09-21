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
            buttonKey: 'eventList'
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
                        <Text style={styles.eventText}>Event </Text>
                    </View>
                </Pressable>
            </View>
            {renderItem()}
            {loading === true ? (<ActivityIndicatorElement />) :
                (

                    <FlatList
                        data={eventListData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                        (<Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={{
                                    fontSize: 16,
                                    color: ColorCode.black,
                                    width: '35%'
                                }}>{item.formatedDate}</Text>
                                <Text style={{
                                    fontSize: 16,
                                    color: ColorCode.black,
                                    width: '55%',
                                    fontWeight: '500'
                                }}
                                    onPress={() => { handleOpenEvent(item) }}>
                                    {item.title.length > 15 ?
                                        `${item.title.substring(0, 20)}...` :
                                        item.title
                                    }
                                </Text>
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

const renderItem = () => (
    <View style={{ backgroundColor: ColorCode.lightGrey, padding: 10, }}>
        <View style={styles.cardHeaderContainer}>
            <View style={styles.cardHeader}>
                <View style={{width:'33.33%',height:'100%', borderRightWidth:1,alignItems:'flex-start'}}>
                <Text style={{
                    fontSize: 16,
                    color: ColorCode.black,
                    width: '35%', fontWeight: '500',
                }}>Date</Text>
                </View>
                <View style={{width:'33.33%',height:'100%', borderRightWidth:1 ,alignItems:'center'}}>
                <Text style={{
                    fontSize: 16,
                    color: ColorCode.black,
                    width: '55%', fontWeight: '500'
                }}>Task</Text>
                </View>
                <View style={{width:'33.33%' ,height:'100%', alignItems:'flex-end'}}>
                <Text style={{
                    fontSize: 16,
                    color: ColorCode.black, fontWeight: '500'

                }}>Action</Text>
                 </View>
            </View>
        </View >
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
        backgroundColor: ColorCode.primary,
        padding: 13,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
        color: ColorCode.white,
    },
    headerIcon: {
        height: 20,
        width: 20,
        tintColor: ColorCode.primary,
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
        fontSize: 13,
        marginLeft: 2
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
        padding: 10
    },
    cardImage: {
        height: 20,
        width: 20,
        padding: 10,
    },
    cardContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    cardHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 10,
        paddingEnd: 10,
        alignItems: 'center',

    },
    cardHeaderContainer: {
        backgroundColor: ColorCode.lightGrey,
        // margin: 10,
        padding:10
    },

})


