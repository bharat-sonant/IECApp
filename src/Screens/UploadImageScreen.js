import { StyleSheet, Text, View, Pressable, Image, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { ColorCode } from '../Services/colorCode'
import backImage from "../Assets/back.png";
import { Card } from 'react-native-paper';
import { openGallery } from '../Services/uploadImageService';

const { width } = Dimensions.get('screen');
const numColumns = 3;
const itemWidth = width / numColumns - 20;

const UploadImageScreen = ({ navigation }) => {

    const images = [
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
        "https://img.freepik.com/free-photo/flowing-purple-mountain-spiral-bright-imagination-generated-by-ai_188544-9853.jpg",
    ]

    const handleUploadImage = () => {
        openGallery();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { navigation.navigate("Dashboard") }}>
                        <Image style={styles.headerBackIcon} source={backImage} />
                    </Pressable>
                    <Text style={styles.headerText}>Images</Text>
                </View>

                <Pressable onPress={handleUploadImage}>
                    <View style={styles.eventButton}>
                        <Text style={styles.eventText}>Upload Image</Text>
                    </View>
                </Pressable>

            </View>
            <Card style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Title</Text>
                </View>
            </Card>

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image style={[styles.imageStyle, { width: itemWidth }]} source={{ uri: item }} />
                )}
                numColumns={numColumns}
            />
        </View >
    )
}

export default UploadImageScreen

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
    eventButton: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCode.white,
        borderRadius: 5,
        padding: 5,
    },
    eventText: {
        color: ColorCode.primary,
        fontSize: 14,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        color: ColorCode.black,
        fontWeight: "500",
    },
    imageStyle: {
        height: itemWidth,
        aspectRatio: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    card: {
        margin: 10,
        backgroundColor: ColorCode.white,
        padding: 10,
    }
})




