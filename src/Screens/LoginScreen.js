import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, BackHandler, Image } from 'react-native';
import { ColorCode } from '../Services/colorCode';
import { getLoginStatus } from '../Services/loginScreenService';
import CustomAlertDialog from './CustomAlertDialog';
import CustomSubmitAlertDialog from './CustomSubmitAlertDialog';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
    const [dialogBoxMessage, setDialogBoxMessage] = useState("");
    const [buttonVisible, setButtonVisible] = useState(false);
    const [isSubmitVisible, setIsSubmitVisible] = useState(false);

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

    const handleLogin = async () => {
        setUsernameError('');
        setPasswordError('');
        setButtonVisible(true);

        if (!username) {
            setButtonVisible(false);
            setUsernameError('Username is required');
            return;
        }

        if (!password) {
            setButtonVisible(false);
            setPasswordError('Password is required');
            return;
        }

        const status = await getLoginStatus(username, password);
        if (status === "loginSuccess") {
            setButtonVisible(false);
            navigation.navigate("CityList")
        } else if (status === "usernameIncorrect") {
            setButtonVisible(false);
            setDialogBoxVisible(true);
            setDialogBoxMessage("Username is incorrect")
        } else if (status === "passwordIncorrect") {
            setButtonVisible(false);
            setDialogBoxVisible(true);
            setDialogBoxMessage("Password is incorrect")
        } else if (status === "error") {
            setButtonVisible(false);
            setDialogBoxVisible(true);
            setDialogBoxMessage("Please contact to Admin!!");
        } else if (status === "notActive") {
            setButtonVisible(false);
            setDialogBoxVisible(true);
            setDialogBoxMessage("Please contact to Admin!! Your Account is not Active.");
        }
    };

    const handleClose = () => {
        setDialogBoxVisible(false);
    }

    const handleCloseDialog = () => {
        setIsSubmitVisible(false);
    }

    const handleConfirmDialog = () => {
        BackHandler.exitApp()
        setIsSubmitVisible(false);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.loginImage}>
                        <Image style={{ width: 100, height: 110 }} source={require('../Assets/wevoislogo.png')} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, usernameError ? styles.inputError : null]}
                            placeholder="Username"
                            onChangeText={(text) => setUsername(text)}
                            autoCapitalize='none'
                        />
                        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

                        <TextInput
                            style={[styles.input, passwordError ? styles.inputError : null]}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    {buttonVisible ? (<ActivityIndicatorElement />) :
                        (<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.buttonText}>
                                Login
                            </Text>
                        </TouchableOpacity>)}

                    <CustomAlertDialog
                        visible={dialogBoxVisible}
                        title={"Login"}
                        message={dialogBoxMessage}
                        onClose={handleClose}
                    />

                    <CustomSubmitAlertDialog
                        visible={isSubmitVisible}
                        onClose={handleCloseDialog}
                        onConfirm={handleConfirmDialog}
                        title="Hold on!"
                        message="Are you sure you want to go back?"
                    />
                </View>

            </View>


        </>
    );
};

const ActivityIndicatorElement = () => (
    <View style={styles.activityContainer}>
        <View style={styles.indicatorContainer}>
            <ActivityIndicator color={ColorCode.black} size={40} />
            <Text
                style={styles.activityText}>
                Please wait....
            </Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorCode.white
    },
    content: {
        flex: 1,
        padding: 16,
        marginTop: 20
    },
    input: {
        borderRadius: 6,
        backgroundColor: ColorCode.white,
        marginBottom: 30,
        paddingLeft: 23,
        padding: 3,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
        height: 50,
        fontSize: 17,
        color: ColorCode.black,
    },
    inputError: {
        borderColor: ColorCode.red,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginTop:-20
    },
    loginButton: {
        display: "flex",
        width: '100%',
        backgroundColor: ColorCode.primary,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        marginTop: 5,
        color: ColorCode.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    activityContainer: {
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
        fontSize: 15,
        fontWeight: '400',
        color: ColorCode.black,
        marginStart: 5,
    },
    loginImage: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },

});
export default LoginScreen;


