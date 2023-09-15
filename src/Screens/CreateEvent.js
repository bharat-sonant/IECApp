import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCurrentDateMonthYear } from '../Services/commonServices';
import moment from 'moment';
import { ColorCode } from '../Services/colorCode';
import backImage from "../Assets/back.png";
import CustomSubmitAlertDialog from './CustomSubmitAlertDialog';
import { saveCreatedEvent } from '../Services/createEventService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateEvent = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [isPickerOpen, setPickerOpen] = useState(false);
    const [datevalue, setDateValue] = useState(getCurrentDateMonthYear().currentDate);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [isSubmitVisible, setIsSubmitVisible] = useState(false);
    const [buttonValueRoute, setButtonValueRoute] = useState('');
    const [indexKey, setIndexKey] = useState('');

    useEffect(() => {
        if (route.params && route.params.buttonKey) {
            const { buttonKey, title, description, activitydate, key } = route.params;
            if (buttonKey !== undefined) {
                setButtonValueRoute(buttonKey);
            }
            if (title !== undefined) {
                setTitle(title)
            }
            if (description !== undefined) {
                setDescription(description);
            }
            if (activitydate !== undefined) {
                setDateValue(activitydate)
            }
            if (key !== undefined) {
                setIndexKey(key)
            } else {
                setIndexKey(key)
            }
        }
    }, [])

    const handleSave = () => {
        setTitleError("");
        setDescriptionError("")
        if (checkInputFields()) {
            setIsSubmitVisible(true);
        }
    };

    const checkInputFields = () => {
        if (!title) {
            setTitleError("Title is Required");
            return false;
        } else if (!description) {
            setDescriptionError("Description is Required")
            return false;
        }
        return true;
    }

    const handleCancel = () => {
        if (buttonValueRoute === "createNewEvent") {
            navigation.navigate("EventList");
        } else if (buttonValueRoute === "createEditEvent") {
            navigation.navigate("EventList");
        } else if (buttonValueRoute === "createCaptureEvent") {
            navigation.navigate("Dashboard");
        }
    };

    const handlePickerClick = () => {
        setPickerOpen(!isPickerOpen);
    }

    const handleDateChange = (event, selectedDate) => {
        setPickerOpen(false);
        if (selectedDate) {
            selectedDate = moment(selectedDate).format("YYYY-MM-DD");
            setDateValue(selectedDate);
        }
    };

    const handleCloseDialog = () => {
        setIsSubmitVisible(false);
    }

    const handleConfirmDialog = async () => {
        setButtonVisible(true);
        let userId = await AsyncStorage.getItem("UserId");
        let { currentDate } = getCurrentDateMonthYear();
        const dataObject = {
            createdBy: userId,
            description: description,
            title: title,
            createdDate: currentDate,
        }
        let statusVal = await saveCreatedEvent(dataObject, datevalue, indexKey);
        if (statusVal.status === "Success") {
            if (buttonValueRoute === "createNewEvent") {
                setTitleError("");
                setDescriptionError("")
                setTitle("");
                setDescription("");
                setIsSubmitVisible(false);
                setButtonVisible(false);
            } else if (buttonValueRoute === "createEditEvent") {
                navigation.goBack();
                setButtonVisible(false);
                setIsSubmitVisible(false);
            } else if (buttonValueRoute === "createCaptureEvent") {
                navigation.navigate("UploadImage", {
                    title: title,
                    activitydate: datevalue,
                    key: statusVal.lastKey,
                });
                setButtonVisible(false);
                setIsSubmitVisible(false);
            }
        }
    }

    const handleGoBack = () => {
        if (buttonValueRoute === "createNewEvent") {
            navigation.navigate("EventList");
        } else if (buttonValueRoute === "createEditEvent") {
            navigation.navigate("EventList");
        } else if (buttonValueRoute === "createCaptureEvent") {
            navigation.navigate("Dashboard");
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={handleGoBack}>
                            <Image style={styles.headerBackIcon} source={backImage} />
                        </Pressable>
                        <Text style={styles.headerText}>Create Event</Text>
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={styles.datePickerView}>
                        <TouchableOpacity style={styles.datePickerbutton} onPress={handlePickerClick}>
                            <Text style={styles.datePickerbuttonText}>{moment(datevalue).format("DD MMM YYYY")}</Text>
                            <Image style={[styles.imagecalendar, { tintColor: ColorCode.primary }]} source={require('../Assets/calendar.png')} />
                            {isPickerOpen && (
                                <DateTimePicker style={styles.datePicker} mode="date"
                                    value={new Date(datevalue)}
                                    onChange={handleDateChange}
                                    minimumDate={new Date()}
                                />
                            )}
                        </TouchableOpacity >
                    </View>
                    <TextInput
                        style={[styles.titleInput, titleError ? styles.inputError : null]}
                        placeholder="Title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                    {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
                    <TextInput
                        style={[styles.descriptionInput, descriptionError ? styles.inputError : null]}
                        placeholder="Description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        multiline={true}
                        numberOfLines={7}
                    />
                    {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </Pressable>

                        <Pressable style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <CustomSubmitAlertDialog
                visible={isSubmitVisible}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDialog}
                show={buttonVisible}
                title="Alert!"
                message="Are you sure you want to save?"
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorCode.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: 60,
        backgroundColor: ColorCode.primary,
        padding: 15,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: ColorCode.white,
    },
    headerIcon: {
        height: 28,
        width: 28,
    },
    headerBackIcon: {
        height: 27,
        width: 27,
        marginRight: 15,
    },
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'blue',
    },
    titleInput: {
        height: 50,
        borderColor: ColorCode.transparentBlack,
        borderWidth: 0.5,
        marginBottom: 16,
        padding: 10,
        borderRadius: 5,
        fontSize: 15,
        color: ColorCode.black,
    },
    descriptionInput: {
        height: 150,
        borderColor: ColorCode.transparentBlack,
        borderWidth: 0.5,
        marginBottom: 16,
        padding: 10,
        borderRadius: 5,
        fontSize: 15,
        color: ColorCode.black,
        textAlignVertical: 'top'
    },
    errorText: {
        color: ColorCode.red,
        fontSize: 12,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePickerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    datePickerbutton: {
        minWidth: 120,
        flexDirection: 'row',
        backgroundColor: ColorCode.white,
        padding: 9,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: ColorCode.primary,
    },
    datePickerbuttonText: {
        color: ColorCode.primary,
        fontSize: 15,
        fontWeight: 'normal',
    },
    imagecalendar: {
        width: 25,
        height: 25,
        marginLeft: 6,
    },
    saveButton: {
        backgroundColor: ColorCode.primary,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: ColorCode.white,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: ColorCode.primary,
    },
    cancelButtonText: {
        color: ColorCode.primary,
        fontSize: 16,
        fontWeight: 'normal',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'normal',
    },
});

export default CreateEvent;
