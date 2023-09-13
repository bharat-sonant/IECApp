import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirebaseConfig } from "./firebaseConfig";

let initialApp = initializeApp(getFirebaseConfig("https://dtdnavigator.firebaseio.com/"));

async function changeDatabaseUrl(dbPath, cityName) {
    try {
        if (dbPath) {
            const updatedConfig = getFirebaseConfig(dbPath);
            let updatedApp = initializeApp(updatedConfig, cityName);

            database = getDatabase(updatedApp);
            storage = getStorage(updatedApp);
        }
    } catch (error) {
        console.error("Error updating database URL:", error);
    }
}

export let database = getDatabase(initialApp);
export let storage = getStorage(initialApp);

(async () => {
    const dbPath = await AsyncStorage.getItem("dbPath");
    const cityName = await AsyncStorage.getItem("cityName");
    await changeDatabaseUrl(dbPath, cityName);
})();


export const handleCitySelect = async (item) => {
    const cityName = item.cityName
    const key = item.key
    const dbPath = item.dbPath
    const storagePath = item.storagePath

    try {
        await AsyncStorage.setItem("cityName", cityName);
        await AsyncStorage.setItem("dbPath", dbPath);
        await AsyncStorage.setItem("LoginStatus", "True");

        await AsyncStorage.setItem("key", key);
        await AsyncStorage.setItem("storagePath", storagePath);

        await changeDatabaseUrl(dbPath, cityName);

        return "Success";
    } catch (error) {
        console.error("Error handling city selection:", error);
    }
};


// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirebaseConfig } from "./firebaseConfig";

// let initialApp = initializeApp(getFirebaseConfig("https://dtdnavigator.firebaseio.com/"));
// export let database = getDatabase(initialApp);
// export let storage = getStorage(initialApp);

// export async function changeDatabaseUrl(dbPath) {
//     try {
//         if (dbPath) {
//             const updatedConfig = getFirebaseConfig(dbPath);

//             // Reinitialize the initial app with the updated configuration
//             initialApp = initializeApp(updatedConfig);
//             database = getDatabase(initialApp);
//             storage = getStorage(initialApp);
//         }
//     } catch (error) {
//         console.error("Error updating database URL:", error);
//     }
// }

// export const handleCitySelect = async (item) => {
//     const cityName = item.cityName;
//     const key = item.key;
//     const dbPath = item.dbPath;
//     const storagePath = item.storagePath;

//     try {
//         await AsyncStorage.setItem("cityName", cityName);
//         await AsyncStorage.setItem("dbPath", dbPath);
//         await AsyncStorage.setItem("LoginStatus", "True");
//         await AsyncStorage.setItem("key", key);
//         await AsyncStorage.setItem("storagePath", storagePath);

//         // Call changeDatabaseUrl to update the database URL with the new dbPath
//         await changeDatabaseUrl(dbPath);

//         return "Success";
//     } catch (error) {
//         console.error("Error handling city selection:", error);
//     }
// };
