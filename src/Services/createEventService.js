import { getDataFromDatabase, writeDataToDatabase } from "./dbServices";

export const saveCreatedEvent = (data, activityDate, indexKey, previousDate) => {
    return new Promise(async (resolve, reject) => {
        if (indexKey === undefined) {
            try {
                let path = `IECActivity/EventActivity`;
                let dataValue = await getDataFromDatabase(path);
                if (dataValue !== null) {
                    let lastKey = dataValue.lastKey + 1
                    let status = await saveEventData(data, activityDate, lastKey, previousDate);
                    resolve({ status: status, lastKey: lastKey });
                } else {
                    let lastKey = 1
                    let status = await saveEventData(data, activityDate, lastKey, previousDate);
                    resolve({ status: status, lastKey: lastKey });
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
                    let lastKeyPath = `IECActivity/EventActivity`;
                    await writeDataToDatabase(lastKeyPath, last);
                    let status = await writeDataToDatabase(path, data);
                    return status;
                } catch (err) {
                    return err;
                }
            }
        } else {
            let path = `IECActivity/EventActivity/${activityDate}/${indexKey}`;
            let removePath = `IECActivity/EventActivity/${previousDate}`;
            await writeDataToDatabase(removePath, { [indexKey]: null });
            let status = await writeDataToDatabase(path, data);
            resolve({ status: status });
        }
    })
}

export const getValueFromDatabase = (indexKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            let path = `IECActivity/EventImages/${indexKey}`;
            let dataValue = await getDataFromDatabase(path);
            if (dataValue !== null) {
                resolve("notNull")
            } else {
                resolve("null")
            }
        } catch (err) {
            reject(err);
        }

    })

}