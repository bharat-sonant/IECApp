import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from "@react-native-community/netinfo";
import CustomAlertDialog from './CustomAlertDialog';
import { CheckVersion, getCityDetails, getUserDetails } from '../Services/commonServices';
import RNExitApp from 'react-native-exit-app';
import { ColorCode } from '../Services/colorCode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
    const [dialogBoxMessage, setDialogBoxMessage] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (isFocused) {
            checkInternetConnection();
        }

    }, [isFocused])

    const checkInternetConnection = async () => {
        const state = await NetInfo.fetch();
        if (state.isConnected === true) {
            const versionStatus = await CheckVersion();
            if (versionStatus === "Success") {
                getLoginStatusFromAsyn();
                getCityDetail();
                getLoginUserDetails();
            } else if (versionStatus === "Failed") {
                setLoading(false);
                setDialogBoxVisible(true);
                setDialogBoxMessage("Your App version is not Matched !. Please update your app.");
            } else if (versionStatus === "null") {
                setLoading(false);
                setDialogBoxVisible(true);
                setDialogBoxMessage("Your App version is not Matched !!. Please update your app.");
            }
        } else {
            setDialogBoxVisible(true);
            setDialogBoxMessage("Connect to Internet");
        }
    }

    const getLoginStatusFromAsyn = async () => {
        let loginStatus = await AsyncStorage.getItem("LoginStatus");
        if (loginStatus !== null) {
            if (loginStatus === "True") {
                setLoading(false)
                navigation.replace("Dashboard")
            }
        } else {
            setLoading(false)
            navigation.replace("Login")
        }
    }

    const getLoginUserDetails = async () => {
        const data = await getUserDetails();
        await AsyncStorage.setItem("LoginUserDetails", JSON.stringify(data));
    }

    const getCityDetail = async () => {
        const data = await getCityDetails();
        await AsyncStorage.setItem("LoginCityDetails", JSON.stringify(data));
    }

    const handleOnClose = () => {
        setLoading(true);
        setDialogBoxVisible(false);
        RNExitApp.exitApp();
    }

    return (
        <>
            {loading ? (<ActivityIndicatorElement />) : (null)}
            <CustomAlertDialog
                visible={dialogBoxVisible}
                title={"Splash"}
                message={dialogBoxMessage}
                onClose={handleOnClose} />
        </>
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

export default SplashScreen

const styles = StyleSheet.create({
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


