import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ColorCode } from '../Services/colorCode'
import addImage from "../Assets/add.png";
import backImage from "../Assets/back.png";
import pencilImage from "../Assets/pencil.png";
import { Dropdown } from 'react-native-element-dropdown';
import { monthList, yearList } from '../Services/commonServices';
import { Card, Title } from 'react-native-paper';
import { getEventListData } from '../Services/eventListService';

const EventList = ({navigation}) => {
    const [monthListval, setMonthListVal] = useState();
    const [yearListVal, setyearListVal] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();

    // var events = [
    //     { title: "Annual Charity Gala" },
    //     { title: "Tech Conference 2023" },
    //     { title: "Music Festival" },
    //     { title: "Sports Championship" },
    //     { title: "Art Exhibition Opening" },
    //     { title: "Community Cleanup Day" }
    // ];

    const eventTitles = [
        "Annual Charity Gala",
        "Tech Conference 2023",
        "Music Festival",
        "Sports Championship",
        "Art Exhibition Opening",
        "Community Cleanup Day"
    ];

    useEffect(() => {
        monthList().then((month) => {
            setMonthListVal(month)
            setLoading(false)
        });
        yearList().then((year) => {
            setyearListVal(year)
            setLoading(false);
        });

        getEventListData();
    }, [selectedMonth, selectedYear])

    const handleOkClick = () => {
        console.log(selectedMonth, selectedYear)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={()=>{navigation.goBack()}}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </Pressable>
                    <Text style={styles.headerText}>Event List</Text>
                </View>
                <Pressable>
                    <View style={styles.eventButton}>
                        <Image style={styles.headerIcon} source={addImage} />
                        <Text style={styles.eventText}>Create Event</Text>
                    </View>
                </Pressable>
            </View>

            {/* {loading ? (<ActivityIndicatorElement />) :
                (<View style={styles.dropdownContainer}>
                    <Dropdown
                        style={styles.yearDropdown}
                        data={yearListVal}
                        maxHeight={600}
                        labelField="year"
                        valueField="year"
                        placeholder="Select Year"
                        value={selectedYear}
                        onChange={item => {
                            setSelectedYear(item.year)
                        }}
                    />
                    <Dropdown
                        style={styles.monthDropdown}
                        data={monthListval}
                        maxHeight={600}
                        labelField="month"
                        valueField="month"
                        placeholder="Select Month"
                        value={selectedMonth}
                        onChange={item => {
                            setSelectedMonth(item.month)
                        }}
                    />
                    <Pressable style={styles.okButton} onPress={handleOkClick}>
                        <Text style={styles.okText}>Ok</Text>
                    </Pressable>
                </View>)} */}

            <FlatList
                data={eventTitles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={{ fontSize: 17, color: ColorCode.black, width: 100 }}>12 Jan 2023</Text>
                            <Text style={{ fontSize: 17, color: ColorCode.black, width: 200, fontWeight: '600' }}>{item}</Text>
                            <Text style={{ fontSize: 16, width: 25 }}>60</Text>
                            <Image style={styles.cardImage} source={pencilImage} />
                        </View>
                    </Card>
                )}
            />

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
    yearDropdown: {
        height: 50,
        width: 140,
        borderBottomColor: ColorCode.transparentBlack,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 8,
    },
    monthDropdown: {
        height: 50,
        width: 190,
        borderBottomColor: ColorCode.transparentBlack,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 8,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
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


