import { get, ref as ref_database, update } from "firebase/database"
import { database, storage } from "./firebase"
import { getDownloadURL, ref as ref_storage, uploadBytes } from "firebase/storage";

export const getDataFromDatabase = (path) => {
    return new Promise((resolve, reject) => {
        console.log(database,path)
        get(ref_database(database, path)).then((snapshot) => {
            let data = snapshot.val();
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const writeDataToDatabase = (path, data) => {
    return new Promise((resolve) => {
        update(ref_database(database, path), data);
        resolve("Success");
    })
}

export function uploadFileToStorage(imageUri, filePath) {
    return new Promise((resolve, reject) => {
        fetch(imageUri).then((res) => {
            return res.blob();
        }).catch((error) => {
            reject(error.message)
        }).then((blob) => {
            uploadBytes(ref_storage(storage, filePath), blob).then((uploadTask) => {
                resolve(uploadTask.metadata.fullPath);
            }).catch((error) => {
                reject(error.message)
            })
        }).catch((error) => {
            reject(error.message)
        })
    })
}

export function downloadImageFromStorage(filePath) {
    return new Promise((resolve) => {
        getDownloadURL(ref_storage(storage, filePath)).then((url) => {
            resolve(url);
        })
    })
}