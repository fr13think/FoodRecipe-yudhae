import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function FoodItems({ foods }) {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
        >
            <Image source={{ uri: item.recipeImage }} style={styles.foodImage} />
            <View style={styles.textContainer}>
                <Text style={styles.foodName}>{item.recipeName}</Text>
                <Text style={styles.foodOrigin}>{item.recipeOrigin}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={foods}
            keyExtractor={(item) => item.recipeId}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    foodImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    textContainer: {
        marginLeft: 10,
    },
    foodName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    foodOrigin: {
        fontSize: 14,
        color: "#666",
    },
});
