import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { toggleFavorite } from '../redux/favoritesSlice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecipeDetailScreen = (props) => {
    const recipe = props.route.params.recipe;
    console.log('Recipe data:', recipe); // Tambahkan log ini untuk memeriksa data yang diterima
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes || []); // Pastikan array kosong jika undefined
    const isFavorite = favoriteRecipes.some((item) => item.idFood === recipe.idFood);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(recipe));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.imageContainer} testID="imageContainer">
                <Image source={{ uri: recipe.recipeImage }} style={styles.recipeImage} />
            </View>
            <View style={styles.topButtonsContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                    <Text style={styles.favoriteButtonText}>{isFavorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.recipeDetailsContainer}>
                    <Text style={styles.recipeTitle} testID="recipeTitle">{recipe.recipeName}</Text>
                    <Text style={styles.recipeCategory} testID="recipeCategory">{recipe.recipeCategory}</Text>
                </View>
                <View style={styles.miscContainer} testID="miscContainer">
                    <View style={styles.miscItem}>
                        <Text style={styles.miscIcon}>🕒</Text>
                        <Text style={styles.miscText}>{recipe.time} Mins</Text>
                    </View>
                    <View style={styles.miscItem}>
                        <Text style={styles.miscIcon}>👥</Text>
                        <Text style={styles.miscText}>{recipe.servings} Servings</Text>
                    </View>
                    <View style={styles.miscItem}>
                        <Text style={styles.miscIcon}>🔥</Text>
                        <Text style={styles.miscText}>{recipe.calories} Cal</Text>
                    </View>
                    <View style={styles.miscItem}>
                        <Text style={styles.miscIcon}>🎚️</Text>
                        <Text style={styles.miscText}>{recipe.difficulty}</Text>
                    </View>
                </View>
                <View style={styles.sectionContainer} testID="sectionContainer">
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    <View style={styles.ingredientsList} testID="ingredientsList">
                        {Array.isArray(recipe.ingredients) && recipe.ingredients.map((i, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <View style={styles.ingredientBullet} />
                                <Text style={styles.ingredientText}>
                                    {i.ingredientName} {i.measure}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    <ScrollView style={styles.instructionsContainer}>
                        <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    scrollContent: {
        paddingBottom: hp(5),
        paddingTop: hp(2), // pt-14 equivalent
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: hp(2),
    },
    recipeImage: {
        width: wp(90),
        height: hp(30),
        borderRadius: 20,
        marginTop: hp(2),
    },
    topButtonsContainer: {
        width: "100%",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: hp(4),
        paddingHorizontal: wp(4),
    },
    backButton: {
        padding: hp(1),
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    backButtonText: {
        fontSize: hp(2),
        color: "#333",
        fontWeight: "bold",
    },
    favoriteButton: {
        padding: hp(1),
        borderRadius: 20,
    },
    favoriteButtonText: {
        fontSize: hp(2),
        color: "red",
    },
    contentContainer: {
        paddingHorizontal: wp(4),
        paddingTop: hp(4),
    },
    recipeDetailsContainer: {
        marginBottom: hp(2),
    },
    recipeTitle: {
        fontSize: hp(3),
        fontWeight: "bold",
        color: "#4B5563", // text-neutral-700
        textAlign: "center",
    },
    recipeCategory: {
        fontSize: hp(2),
        fontWeight: "500",
        color: "#9CA3AF", // text-neutral-500
        textAlign: "center",
        marginBottom: hp(2),
    },
    miscContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: hp(2),
        paddingHorizontal: wp(4),
    },
    miscItem: {
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        paddingVertical: hp(1),
        paddingHorizontal: wp(4),
        borderRadius: 10,
        elevation: 3,
    },
    miscIcon: {
        fontSize: hp(3),
        marginBottom: hp(0.5),
    },
    miscText: {
        fontSize: hp(2),
        fontWeight: "600",
        fontFamily: "Lato",
    },
    sectionContainer: {
        marginHorizontal: wp(5),
        marginBottom: hp(2),
    },
    sectionTitle: {
        fontSize: hp(2.5),
        fontWeight: "bold",
        color: "#333",
        marginBottom: hp(1),
        fontFamily: "Lato",
    },
    ingredientsList: {
        marginLeft: wp(4),
    },
    ingredientItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(1),
        padding: hp(1),
        backgroundColor: "#FFF9E1",
        borderRadius: 8,
        elevation: 2,
    },
    ingredientBullet: {
        backgroundColor: "#FFD700",
        borderRadius: 50,
        height: hp(1.5),
        width: hp(1.5),
        marginRight: wp(2),
    },
    ingredientText: {
        fontSize: hp(1.9),
        color: "#333",
        fontFamily: "Lato",
    },
    instructionsContainer: {
        maxHeight: hp(30), // Set a maximum height for the instructions container
    },
    instructionsText: {
        fontSize: hp(2),
        color: "#444",
        lineHeight: hp(3),
        textAlign: "justify",
        fontFamily: "Lato",
    },
});

export default RecipeDetailScreen;