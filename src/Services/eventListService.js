import { getDataFromDatabase } from "./dbServices";

export const getEventListData = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const path = 'IECActivity/EventActivity';
            const eventArray = [];

            const value = await getDataFromDatabase(path);

            if (value !== null) {
                for (const dateKey in value) {
                    if (value.hasOwnProperty(dateKey)) {
                        const data = value[dateKey];

                        for (const idKey in data) {
                            if (idKey !== "lastKey" && data.hasOwnProperty(idKey)) {
                                const { createdBy, description, title } = data[idKey];

                                eventArray.push({
                                    createdBy,
                                    description,
                                    title,
                                    activityDate: dateKey,
                                    activityKey: idKey
                                });
                            }
                        }
                    }
                }
                resolve(eventArray)
            } else {
                resolve(null)
            }
        } catch (err) {
            reject(err)
        }
    })
};
