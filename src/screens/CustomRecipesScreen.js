import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomRecipesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const recipe = route.params?.recipe;

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>No Recipe Details Available</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.imageContainer} testID="imageContainer">
                <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                />
            </View>
            <View style={styles.topButtonsContainer} testID="topButtonsContainer">
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer} testID="contentContainer">
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View>
                    <Text style={styles.contentLabel}>Content</Text>
                    <Text style={styles.recipeDescription}>{recipe.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // white
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: hp(5),
        paddingTop: hp(2),
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(2),
    },
    recipeImage: {
        width: wp(90),
        height: hp(30),
        borderRadius: 20,
        marginTop: hp(2),
    },
    topButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        marginBottom: hp(2),
    },
    backButton: {
        padding: hp(1.5),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
    },
    backButtonText: {
        fontSize: hp(2),
        color: '#333',
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: wp(4),
    },
    recipeTitle: {
        fontSize: hp(3),
        fontWeight: 'bold',
        color: '#4B5563', // text-neutral-700
        textAlign: 'center',
        marginBottom: hp(2),
    },
    contentLabel: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: hp(1),
    },
    recipeDescription: {
        fontSize: hp(2),
        color: '#444',
        lineHeight: hp(3),
        textAlign: 'justify',
    },
});

export default CustomRecipesScreen;