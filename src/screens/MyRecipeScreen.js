import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyRecipeScreen = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchRecipes();
        }
    }, [isFocused]);

    const fetchRecipes = async () => {
        try {
            const storedRecipes = await AsyncStorage.getItem('customrecipes');
            const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
            setRecipes(recipes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoading(false);
        }
    };

    const handleRecipeClick = (recipe) => {
        navigation.navigate('CustomRecipesScreen', { recipe });
    };

    const handleAddRecipe = () => {
        navigation.navigate('RecipesFormScreen', { onRecipeEdited: fetchRecipes });
    };

    const deleteRecipe = async (index) => {
        try {
            const updatedRecipes = [...recipes];
            updatedRecipes.splice(index, 1);
            await AsyncStorage.setItem('customrecipes', JSON.stringify(updatedRecipes));
            setRecipes(updatedRecipes);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const editRecipe = (recipe, index) => {
        navigation.navigate('RecipesFormScreen', { recipeToEdit: recipe, recipeIndex: index, onRecipeEdited: fetchRecipes });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddRecipe} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add New Recipe</Text>
            </TouchableOpacity>
            {recipes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No recipes available</Text>
                </View>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleRecipeClick(item)} style={styles.recipeCard} testID="handleRecipeBtn">
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                            ) : (
                                <Text style={styles.placeholder}>No Image</Text>
                            )}
                            <View style={styles.recipeContent}>
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                                <Text style={styles.recipeDescription} testID="recipeDescp">
                                    {item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}
                                </Text>
                                <View style={styles.editDeleteButtons} testID="editDeleteButtons">
                                    <TouchableOpacity onPress={() => editRecipe(item, index)} style={styles.editButton}>
                                        <Text style={styles.editButtonText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteRecipe(index)} style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // white
        paddingTop: hp(2), // pt-14 equivalent
    },
    goBackButton: {
        padding: hp(1.5),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
        marginHorizontal: wp(4),
        marginBottom: hp(2),
    },
    goBackButtonText: {
        fontSize: hp(2),
        color: '#333',
        fontWeight: 'bold',
    },
    addButton: {
        padding: hp(1.5),
        borderRadius: 10,
        backgroundColor: '#F59E0B', // amber-400
        marginHorizontal: wp(4),
        marginBottom: hp(2),
    },
    addButtonText: {
        fontSize: hp(2),
        color: '#FFFFFF', // white
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: hp(2.5),
        color: '#52525B', // neutral-600
    },
    listContainer: {
        paddingBottom: hp(5),
    },
    recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(1),
        marginBottom: hp(1),
        backgroundColor: '#FFF9E1',
        borderRadius: 10,
        elevation: 2,
        marginHorizontal: wp(4),
    },
    recipeImage: {
        width: wp(20),
        height: hp(10),
        borderRadius: 10,
        marginRight: wp(4),
    },
    placeholder: {
        width: wp(20),
        height: hp(10),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: hp(10),
        color: '#9CA3AF', // neutral-500
        marginRight: wp(4),
    },
    recipeContent: {
        flex: 1,
    },
    recipeTitle: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: '#333',
    },
    recipeDescription: {
        fontSize: hp(2),
        color: '#444',
        marginBottom: hp(1),
    },
    editDeleteButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        padding: hp(1),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
        marginRight: wp(2),
    },
    editButtonText: {
        fontSize: hp(2),
        color: '#333',
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: hp(1),
        borderRadius: 10,
        backgroundColor: '#F3F4F6', // gray-100
    },
    deleteButtonText: {
        fontSize: hp(2),
        color: '#333',
        fontWeight: 'bold',
    },
});

export default MyRecipeScreen;