import { ActivityIndicator, View, Image } from 'react-native'
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

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                checkInternetConnection();
            }, 2000)
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
                setDialogBoxVisible(true);
                setDialogBoxMessage("Your App version is not Matched !. Please update your app.");
            } else if (versionStatus === "null") {
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
                navigation.replace("Dashboard")
            }
        } else {
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
        setDialogBoxVisible(false);
        RNExitApp.exitApp();
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{
                    flex: 1,
                    height: "100%",
                    width: "100%"
                }} source={require("../Assets/splash.jpg")} />
                <View style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}>
                    <ActivityIndicator size={50} color={ColorCode.primary} />
                </View>
                <CustomAlertDialog
                    visible={dialogBoxVisible}
                    title={"Splash"}
                    message={dialogBoxMessage}
                    onClose={handleOnClose} />
            </View>
        </>
    )
}

export default SplashScreen



