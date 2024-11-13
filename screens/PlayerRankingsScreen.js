// screens/PlayerRankingsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity, // Ensure this is imported
} from "react-native";
import apiClient from "../api/apiClient";
import { Picker } from "@react-native-picker/picker";
import { Avatar } from "react-native-paper";

export default function PlayerRankingsScreen({ navigation }) {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statType, setStatType] = useState("goals");

  const leagueId = 39; // Example league ID
  const seasonYear = 2024; // Example season year

  useEffect(() => {
    fetchRankings();
  }, [statType]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(
        `/players/stats/rankings/?stat_type=${statType}&league_id=${leagueId}&season_year=${seasonYear}&limit=10`
      );
      setRankings(data);
    } catch (error) {
      console.error("Error fetching player rankings:", error);
      Alert.alert("Error", "Unable to fetch player rankings.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("PlayerProfile", {
          playerId: item.player.player_id,
        })
      }
    >
      <Text style={styles.rank}>{item.rank}</Text>
      <Avatar.Image
        size={50}
        source={{ uri: item.player.photo }}
        style={styles.avatar}
      />
      <Text style={styles.playerName}>{item.player.name}</Text>
      <Text style={styles.statValue}>{item.stat_value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={statType}
        onValueChange={(itemValue) => setStatType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Goals" value="goals" />
        <Picker.Item label="Assists" value="assists" />
        <Picker.Item label="Yellow Cards" value="yellow_cards" />
        <Picker.Item label="Red Cards" value="red_cards" />
      </Picker>
      {loading ? (
        <ActivityIndicator size={24} style={styles.loader} color="#1E90FF" />
      ) : (
        <FlatList
          data={rankings}
          keyExtractor={(item) => item.player.player_id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  picker: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
  rank: {
    width: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    backgroundColor: "transparent",
    marginRight: 10,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
  },
  statValue: {
    width: 50,
    textAlign: "right",
    fontSize: 16,
  },
});
