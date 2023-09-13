import { launchImageLibrary } from 'react-native-image-picker';

export const openGallery = () => {
    return new Promise(async (resolve, reject) => {
        const options = {
            mediaType: 'photo',
            quality: 1.0,
            maxWidth: 800,
            maxHeight: 800,
            selectionLimit: 10,
        };

        await launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                reject(new Error('Image picker canceled'));
                return;
            }

            if (response.error) {
                reject(new Error('Image picker error'));
                return;
            }

            if (response.customButton) {
                reject(new Error('Custom button selected'));
                return;
            }

            for (const value of response.assets) {
                const imageUri = value.uri;
                console.log(imageUri);
            }
        });
    })
}