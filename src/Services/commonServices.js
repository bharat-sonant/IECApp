import moment from "moment";
import DeviceInfo from "react-native-device-info";
import { downloadImageFromStorage, getDataFromDatabase } from "./dbServices";

export const getCurrentDateMonthYear = () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const currentMonth = moment().format("MMMM");
    const currentYear = moment().format("YYYY");
    return { currentDate, currentMonth, currentYear };
}

export const CheckVersion = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const path = `Common/Settings/latestVersion.json`;
            const url = await downloadImageFromStorage(path);

            if (url !== null) {
                const response = await fetch(url);
                const data = await response.json();
                const version = DeviceInfo.getVersion();

                for (const key in data) {
                    const versionCode = data[key].WeVOISIEC;

                    if (versionCode === version) {
                        resolve("Success");
                        return;
                    }
                }

                resolve("Failed");
            } else {
                resolve("null");
            }
        } catch (err) {
            reject(err);
        }
    });
};


export const getUserDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const path = `Common/IECUserDetails.json`;
            const url = await downloadImageFromStorage(path);

            if (url !== null) {
                const response = await fetch(url);
                const data = await response.json();
                resolve(data);
            }
        } catch (err) {
            reject(err);
        }
    });
}

export const getCityDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const path = `CityDetails/IECCityDetails.json`;
            const url = await downloadImageFromStorage(path);

            if (url !== null) {
                const response = await fetch(url);
                const data = await response.json();
                resolve(data);
            }
        } catch (err) {
            reject(err);
        }
    });
}

export const monthList = () => {

    return new Promise((resolve, reject) => {
        try {
            let m = moment();
            let monthsArray = [];

            let currentMonth = m.format('MMMM');
            monthsArray.push({ "month": currentMonth });

            for (let i = 1; i < 12; i++) {
                m.add(1, 'month');
                monthsArray.push({ "month": m.format('MMMM') });
            }

            resolve(monthsArray)

        } catch (err) {
            reject(err);
        }
    })


}

export const yearList = () => {
    return new Promise((resolve, reject) => {
        try {
            let m = moment();
            let currentYear = m.format('YYYY');
            let yearsArray = [];

            for (let i = 0; i < 3; i++) {
                yearsArray.push({ "year": currentYear });
                currentYear = m.subtract(1, 'year').format('YYYY');
            }

            resolve(yearsArray)

        } catch (err) {
            reject(err);
        }

    })


}