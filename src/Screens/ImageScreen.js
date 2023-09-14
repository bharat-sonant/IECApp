import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

const ImageScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./your-image.jpg')} // Replace with your image source
                style={styles.image}
            >
                {/* Add any other components/content here */}
            </ImageBackground>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // Handle button press here
                    }}
                >
                    <Text style={styles.buttonText}>Button</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover', // You can adjust this as needed
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20, // Adjust this value to change the button's vertical position
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue', // Change the button's background color as needed
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white', // Change the button's text color as needed
        fontSize: 16,
    },
});

export default ImageScreen;
