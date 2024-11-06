// screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Alert.alert(
        "Empty Search",
        "Please enter a team or player name to search."
      );
      return;
    }
    // Navigate to a Search screen or implement search functionality
    // Example:
    // navigation.navigate('SearchResults', { query: searchQuery });
    console.log("Search Query:", searchQuery);
    Alert.alert("Search", `You searched for "${searchQuery}"`);
  };

  return (
    <ImageBackground
      source={require("../assets/mainImage.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Welcome Message */}
          <Text style={styles.welcome}>Welcome to Football Stats!</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              label="Search Teams or Players"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              mode="outlined"
              right={<TextInput.Icon name="magnify" onPress={handleSearch} />}
              theme={{ colors: { text: "#fff", placeholder: "#fff" } }}
            />
          </View>

          {/* Navigation Buttons */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate("LeagueStandings")}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            League Standings
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("PlayerRankings")}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Player Rankings
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("Fixtures")}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Fixtures
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("HeadToHead")}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Head-to-Head
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("Predictions")}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Predictions
          </Button>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#ffffff",
  },
  searchContainer: {
    width: "100%",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  button: {
    marginVertical: 8,
    width: "100%",
    backgroundColor: "#1E90FF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
