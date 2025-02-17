import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FavoriteScreen = () => {
  const favoriteRecipesList = useSelector((state) => state.favorites.favoriteRecipes || []);
  const navigation = useNavigation();

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>
        {item.recipeName.length > 20 ? `${item.recipeName.substring(0, 20)}...` : item.recipeName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
      {favoriteRecipesList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>My Favorite Recipes</Text>
          <FlatList
            data={favoriteRecipesList}
            keyExtractor={(item) => item.idFood}
            renderItem={renderRecipeItem}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // white
    paddingTop: hp(2),
  },
  topButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  goBackButton: {
    padding: hp(1.5),
    borderRadius: 10,
    backgroundColor: '#F3F4F6', // gray-100
  },
  goBackButtonText: {
    fontSize: hp(2),
    color: '#333',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: hp(2.5),
    color: '#52525B', // neutral-600
    marginBottom: hp(2),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  heading: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#52525B', // neutral-600
    marginBottom: hp(2),
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
  },
  recipeImage: {
    width: wp(20),
    height: hp(10),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    color: '#333',
    fontWeight: 'bold',
  },
});

export default FavoriteScreen;