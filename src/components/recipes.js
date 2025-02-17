import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
    const navigation = useNavigation();

    const renderItem = ({ item, index }) => (
        <ArticleCard item={item} index={index} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={foods}
                keyExtractor={(item) => item.recipeId}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const ArticleCard = ({ item, index, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
            testID="articleDisplay"
        >
            <Image source={{ uri: item.recipeImage }} style={styles.articleImage} />
            <Text style={styles.articleText}>{item.recipeName}</Text>
            <Text style={styles.articleDescription}>{item.recipeOrigin}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp(4),
        marginTop: hp(2),
    },
    listContainer: {
        justifyContent: "space-between",
    },
    cardContainer: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: hp(2),
        margin: hp(1),
        flex: 1,
        maxWidth: "47%", // Adjust width to be more balanced
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    articleImage: {
        width: "100%",
        height: hp(15),
        borderRadius: 15,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    articleText: {
        fontSize: hp(2),
        fontWeight: "600",
        color: "#52525B",
        marginTop: hp(1),
        textAlign: "center",
    },
    articleDescription: {
        fontSize: hp(1.5),
        color: "#6B7280",
        marginTop: hp(0.5),
        textAlign: "center",
    },
});
