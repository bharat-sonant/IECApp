import { launchImageLibrary } from 'react-native-image-picker';
import { downloadImageFromStorage, getDataFromDatabase, uploadFileToStorage, writeDataToDatabase } from './dbServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';

const compressImage = async (imageUri) => {
    try {
        const compressedImage = await ImageResizer.createResizedImage(
            imageUri,
            150,
            150,
            "JPEG",
            80
        );
        return compressedImage.uri;
    } catch (error) {
        console.error('Error compressing the image:', error);
        throw error;
    }
};

const fetchDataFromDatabase = async (originalImageUri, tempImageUri, indexKey, i, cityName) => {
    try {
        const path = `IECActivity/EventImages/${indexKey}`;
        const dataValue = await getDataFromDatabase(path);
        const lastKey = dataValue?.lastKey + i || i;
        await saveDataToDatabase(originalImageUri, tempImageUri, indexKey, lastKey, cityName);
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        throw error;
    }
};

const saveDataToDatabase = async (originalImageUri, tempImageUri, indexKey, lastKey, cityName) => {
    try {
        const imageName = `${lastKey}.jpg`;
        const path = `IECActivity/EventImages/${indexKey}`;
        const lastKeyPath = `IECActivity/EventImages/${indexKey}`;
        const filePathOriginal = `${cityName}/IECActivity/EventImages/${indexKey}/Original/${imageName}`;
        const filePathTemp = `${cityName}/IECActivity/EventImages/${indexKey}/Thumb/${imageName}`;

        await Promise.all([
            uploadFileToStorage(originalImageUri, filePathOriginal),
            uploadFileToStorage(tempImageUri, filePathTemp),
            writeDataToDatabase(lastKeyPath, { lastKey }),
            writeDataToDatabase(path, { [lastKey]: imageName }),
        ]);
    } catch (error) {
        console.error('Error saving data to the database:', error);
        throw error;
    }
};

export const openGallery = (indexKey) => {
    return new Promise(async (resolve, reject) => {
        const options = {
            mediaType: 'photo',
            quality: 1.0,
            maxWidth: 800,
            maxHeight: 800,
            selectionLimit: 5,
        };

        try {
            const response = await launchImageLibrary(options);

            if (response.didCancel || response.error || response.customButton) {
                reject(response.didCancel || response.error || response.customButton);
                return;
            }

            const cityName = await AsyncStorage.getItem("cityName");

            if (cityName) {
                let i = 1;
                const promises = [];

                for (const value of response.assets) {
                    const originalImageUri = value.uri;
                    const tempImageUri = await compressImage(originalImageUri);
                    promises.push(fetchDataFromDatabase(originalImageUri, tempImageUri, indexKey, i, cityName));
                    i++;
                }

                await Promise.all(promises);
                resolve("Uploadsuccessful");
            }
        } catch (error) {
            reject(error);
            console.error('Error opening the image gallery:', error);
        }
    });
};

export const getThumnailImages = (indexKey) => {
    return new Promise(async (resolve) => {
        const cityName = await AsyncStorage.getItem("cityName");
        if (cityName) {
            const path = "IECActivity/EventImages/" + indexKey;
            let dataValue = await getDataFromDatabase(path);
            let imageUriArray = []

            if (dataValue !== null) {
                for (let key in dataValue) {
                    if (key !== "lastKey") {
                        let uri = `https://firebasestorage.googleapis.com/v0/b/dtdnavigator.appspot.com/o/${cityName}%2FIECActivity%2FEventImages%2F${indexKey}%2FThumb%2F${dataValue[key]}?alt=media`;
                        let originalUri = `https://firebasestorage.googleapis.com/v0/b/dtdnavigator.appspot.com/o/${cityName}%2FIECActivity%2FEventImages%2F${indexKey}%2FOriginal%2F${dataValue[key]}?alt=media`;
                        imageUriArray.push({ "imageUri": uri, "originalUri": originalUri });
                    }
                }
                resolve(imageUriArray);
            } else {
                resolve(null);
            }
        }
    });
}


export const downloadImageUri = (indexKey, imageName) => {
    return new Promise(async (resolve, reject) => {
        const cityName = await AsyncStorage.getItem("cityName");
        if (cityName) {
            try {
                const filePathOriginal = `${cityName}/IECActivity/EventImages/${indexKey}/Original/${imageName}`;
                let uri = await downloadImageFromStorage(filePathOriginal);
                if (uri !== null) {
                    resolve(uri)
                } else {
                    resolve(null)
                }
            } catch (err) {
                reject(err)
            }
        }
    })
}




