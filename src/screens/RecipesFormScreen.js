import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecipesFormScreen = ({ route }) => {
    const { recipeToEdit, recipeIndex, onRecipeEdited } = route.params || {};
    const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : '');
    const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : '');
    const [description, setDescription] = useState(recipeToEdit ? recipeToEdit.description : '');
    const navigation = useNavigation();

    const saveRecipe = async () => {
        if (!title || !image || !description) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        try {
            const newRecipe = { title, image, description };
            const storedRecipes = await AsyncStorage.getItem('customrecipes');
            const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

            if (recipeToEdit) {
                recipes[recipeIndex] = newRecipe;
                if (onRecipeEdited) onRecipeEdited();
            } else {
                recipes.push(newRecipe);
            }

            await AsyncStorage.setItem('customrecipes', JSON.stringify(recipes));
            navigation.goBack();
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Recipe Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            />
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Text style={styles.placeholder}>Upload Image URL</Text>
            )}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity onPress={saveRecipe} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Recipe</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // white
        padding: wp(4),
    },
    backButton: {
        padding: hp(1.5),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
        marginBottom: hp(2),
    },
    backButtonText: {
        fontSize: hp(2),
        color: '#333',
        fontWeight: 'bold',
    },
    input: {
        height: hp(6),
        borderColor: '#CCCCCC', // gray-300
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: wp(4),
        marginBottom: hp(2),
        backgroundColor: '#F9FAFB', // gray-50
    },
    textArea: {
        height: hp(20),
        textAlignVertical: 'top',
    },
    image: {
        width: wp(90),
        height: hp(30),
        borderRadius: 10,
        marginBottom: hp(2),
    },
    placeholder: {
        width: wp(90),
        height: hp(30),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: hp(30),
        color: '#9CA3AF', // neutral-500
        marginBottom: hp(2),
    },
    saveButton: {
        backgroundColor: '#F59E0B', // amber-400
        paddingVertical: hp(1.5),
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: hp(2.5),
        color: '#FFFFFF', // white
        fontWeight: 'bold',
    },
});

export default RecipesFormScreen;