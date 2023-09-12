import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { ColorCode } from '../Services/colorCode';

const CustomAlertDialog = ({ visible, title, message, onClose }) => {
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
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const windowWidth = Dimensions.get('window').width;

export default CustomAlertDialog;

const styles = {
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
        color: ColorCode.black,
        fontWeight: '500',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: ColorCode.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: ColorCode.white,
        fontWeight: '600',
    },
};

