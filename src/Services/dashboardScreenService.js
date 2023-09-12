import { PermissionsAndroid, Linking } from "react-native";
import { Camera } from "react-native-vision-camera";
import { downloadImageFromStorage, getDataFromDatabase, uploadFileToStorage, writeDataToDatabase } from "./dbServices";
import { getCurrentDateMonthYear } from "./commonServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const requestCameraPermission = async () => {
    return new Promise(async (resolve, reject) => {
        try {

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // const cameraPermission = await Camera.getCameraPermissionStatus();
                // console.log(cameraPermission);
                resolve(true);
            } else {
                showCameraPermissionBlockedDialog();
            }
        } catch (error) {
            console.error('Camera permission error: ', error);
            reject(error);
        }
    });
}

const showCameraPermissionBlockedDialog = () => {
    Alert.alert(
        'Camera Permission Required !',
        'Click "Open Settings" button then click on "Permissions" then click on "Camera" and grant permission "Allow only while using the app',
        [
            {
                text: 'Open Settings',
                onPress: () => openAppSettings(),
            },
        ],
    );
};

const openAppSettings = () => {
    Linking.openSettings();
}

export const UploadImageToStorage = (imageUri) => {
    return new Promise(async (resolve, reject) => {
    })

}