import { View, Text, TouchableOpacity, Modal, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { ColorCode } from '../Services/colorCode';

const CustomSubmitAlertDialog = ({ visible, onClose, onConfirm, title, message, show }) => {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    {show ? (<ActivityIndicatorElement />) : (<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={onConfirm}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={onClose}>
                            <Text style={styles.buttonText2}>Cancel</Text>
                        </TouchableOpacity>
                    </View>)}

                </View>
            </View>
        </Modal >
    );
};

const ActivityIndicatorElement = () => (
    <View style={styles.activityContainer}>
        <View style={styles.indicatorContainer}>
            <ActivityIndicator color={ColorCode.black} size={50} />
            <Text
                style={styles.activityText}>
                Please wait....
            </Text>
        </View>
    </View>
)

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCode.transparentBlack,
    },
    dialog: {
        backgroundColor: ColorCode.white,
        padding: 20,
        borderRadius: 8,
        width: windowWidth * 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: ColorCode.black
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: ColorCode.primary,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    buttonText: {
        color: ColorCode.white,
        fontSize: 16,
        fontWeight: 'normal',
    },
    button2: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: ColorCode.primary,
    },
    buttonText2: {
        color: ColorCode.primary,
        fontSize: 16,
        fontWeight: 'normal',
    },
    activityContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityText: {
        fontSize: 17,
        fontWeight: '400',
        color: ColorCode.black,
        marginStart: 5,
    },
});

export default CustomSubmitAlertDialog;
