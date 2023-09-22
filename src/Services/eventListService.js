// import moment from "moment";
// import { getDataFromDatabase } from "./dbServices";

// export const getEventListData = async () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const path = 'IECActivity/EventActivity';
//             const eventArray = [];
//             const value = await getDataFromDatabase(path);
//             if (value !== null) {
//                 for (const dateKey in value) {
//                     if (value.hasOwnProperty(dateKey)) {
//                         const data = value[dateKey];
//                         for (const idKey in data) {
//                             if (idKey !== "lastKey" && data.hasOwnProperty(idKey)) {
//                                 const { createdBy, description, title } = data[idKey];
//                                 let formatedDate = moment(dateKey).format("DD MMM YYYY");
//                                 eventArray.push({
//                                     createdBy,
//                                     description,
//                                     title,
//                                     activityDate: dateKey,
//                                     activityKey: idKey,
//                                     formatedDate: formatedDate
//                                 });
//                             }
//                         }
//                     }
//                 }
//                 resolve(eventArray)
//             } else {
//                 resolve(null)
//             }
//         } catch (err) {
//             reject(err)
//         }
//     })
// };


import moment from "moment";
import { getDataFromDatabase } from "./dbServices";

export const getEventListData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const path = 'IECActivity/EventActivity';
            const eventArray = [];
            const value = await getDataFromDatabase(path);

            if (value !== null) {
                Object.keys(value).forEach(dateKey => {
                    const data = value[dateKey];
                    for (const idKey in data) {
                        if (idKey !== "lastKey" && data.hasOwnProperty(idKey)) {
                            const { createdBy, description, title } = data[idKey];
                            const formattedDate = moment(dateKey).format("DD MMM YYYY");
                            eventArray.push({
                                createdBy,
                                description,
                                title,
                                activityDate: dateKey,
                                activityKey: idKey,
                                formattedDate,
                            });
                        }
                    }
                });
                resolve(eventArray);
            } else {
                resolve(null);
            }
        } catch (err) {
            reject(err);
        }
    });
};
