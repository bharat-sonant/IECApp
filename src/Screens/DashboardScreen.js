import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorCode } from '../Services/colorCode';
import logoutImage from "../Assets/logouticon.png";
import CustomSubmitAlertDialog from './CustomSubmitAlertDialog';

const DashboardScreen = ({ navigation }) => {

    const [isSubmitVisible, setIsSubmitVisible] = useState(false);
    const [submitDialogShow, setSubmitDialogShow] = useState(false);

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
                    <Text style={styles.ButtonText}>Capture Event</Text>
                </Pressable>

                <Pressable style={styles.Button} onPress={handleEventSchedule}>
                    <Text style={styles.ButtonText}>Event Schedule</Text>
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
    Button: {
        height: 50,
        backgroundColor: ColorCode.primary,
        borderColor: ColorCode.primary,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    ButtonText: {
        color: ColorCode.white,
        fontSize: 18,
        fontWeight: '500',
    },
});
