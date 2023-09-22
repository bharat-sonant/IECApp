import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorCode } from '../Services/colorCode';
import logoutImage from "../Assets/logouticon.png";
import CustomSubmitAlertDialog from './CustomSubmitAlertDialog';

const DashboardScreen = ({ navigation }) => {

    const [isSubmitVisible, setIsSubmitVisible] = useState(false);
    const [submitDialogShow, setSubmitDialogShow] = useState(false);

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();

    }, [])

    const handleLogoutButtonPress = () => {
        setIsSubmitVisible(true);
    }

    const handleCaptureEvent = async () => {
        navigation.navigate("CreateEvent", {
            buttonKey: "createCaptureEvent"
        });
    }

    const handleCloseDialog = () => {
        setIsSubmitVisible(false);
    }

    const handleConfirmDialog = () => {
        setSubmitDialogShow(true);
        AsyncStorage.clear();
        navigation.navigate("Splash");
        setIsSubmitVisible(false)
        setSubmitDialogShow(false);
    }

    const handleEventSchedule = () => {
        navigation.navigate("EventList");
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Dashboard</Text>
                    <Pressable onPress={handleLogoutButtonPress}>
                        <Image style={styles.headerIcon} source={logoutImage} />
                    </Pressable>
                </View>
                <Pressable style={styles.Button} onPress={handleCaptureEvent}>

                    <Image style={{ width: 180, height: 55, marginRight: 6 }} source={require('../Assets/capture-icon.png')} />
                </Pressable>

                <Pressable style={styles.Button} onPress={handleEventSchedule}>
                    <Image style={{ width: 180, height: 55, marginRight: 6 }} source={require('../Assets/event-icon.png')} />
                </Pressable>

                <CustomSubmitAlertDialog
                    visible={isSubmitVisible}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmDialog}
                    show={submitDialogShow}
                    title="Logout"
                    message="Are you sure you want to Logout?"
                />
            </View>


        </>
    );
}

export default DashboardScreen;

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
        height: 28,
        width: 28,
    },
    Button: {
        height: 130,
        backgroundColor: ColorCode.white,
        borderColor: ColorCode.primary,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
    },
    ButtonText: {
        color: ColorCode.black,
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,

    },
});
