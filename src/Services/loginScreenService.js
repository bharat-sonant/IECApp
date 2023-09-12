import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLoginStatus = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDetails = await AsyncStorage.getItem("LoginUserDetails");
            if (userDetails !== null) {
                let data = JSON.parse(userDetails)
                const userFound = false;

                for (const key in data) {
                    if (key !== "lastKey") {
                        const userData = data[key];
                        const { username: user, password: pass, name: name, userId: userId } = userData;

                        if (user === username) {
                            if (pass === password) {
                                if (userData.status === "yes") {
                                    resolve('loginSuccess');
                                    AsyncStorage.setItem("UserId", userId)
                                    AsyncStorage.setItem("Name", name)
                                    userFound = true;
                                    break;
                                } else {
                                    resolve('notActive');
                                    return
                                }
                            } else {
                                resolve('passwordIncorrect');
                                return
                            }
                        }
                    }
                }
                if (!userFound) {
                    resolve('usernameIncorrect');
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}