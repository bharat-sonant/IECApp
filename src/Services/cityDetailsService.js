import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchCityDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cityDetails = await AsyncStorage.getItem("LoginCityDetails");
            if (cityDetails !== null) {
                let city = JSON.parse(cityDetails);
                resolve(city);
            } else {
                resolve("NoCity");
            }

        } catch (err) {
            reject(err)
        }

    })

}