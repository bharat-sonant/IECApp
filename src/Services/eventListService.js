import { getDataFromDatabase } from "./dbServices";

export const getEventListData = () => {
    return new Promise((resolve, reject) => {
        try {
            const path = 'IECActivity';
            getDataFromDatabase(path).then((value) => {
                console.log("KKK", value);
            })
        } catch (err) {
            reject(err);
        }
    })
}