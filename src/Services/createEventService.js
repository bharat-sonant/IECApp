import { getDataFromDatabase, writeDataToDatabase } from "./dbServices";

export const saveCreatedEvent = (data, activityDate, indexKey) => {
    return new Promise(async (resolve, reject) => {

        if (indexKey === undefined) {
            try {
                let path = `IECActivity/EventActivity/${activityDate}`;
                let dataValue = await getDataFromDatabase(path);
                if (dataValue !== null) {
                    let lastKey = dataValue.lastKey + 1
                    let status = await saveEventData(data, activityDate, lastKey);
                    resolve(status);
                } else {
                    let lastKey = 1
                    let status = await saveEventData(data, activityDate, lastKey);
                    resolve(status);
                }
            } catch (err) {
                reject(err);
            }

            async function saveEventData(data, activityDate, lastKey) {
                try {
                    let path = `IECActivity/EventActivity/${activityDate}/${lastKey}`;
                    const last = {
                        lastKey: lastKey
                    }
                    let lastKeyPath = `IECActivity/EventActivity/${activityDate}`;
                    await writeDataToDatabase(lastKeyPath, last);
                    let status = await writeDataToDatabase(path, data);
                    return status;
                } catch (err) {
                    return err;
                }

            }
        } else {
            let path = `IECActivity/EventActivity/${activityDate}/${indexKey}`;
            let status = await writeDataToDatabase(path, data);
            resolve(status);
        }
    })
}