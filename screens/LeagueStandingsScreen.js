// screens/LeagueStandingsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import apiClient from "../api/apiClient";
import { Card } from "react-native-paper";

export default function LeagueStandingsScreen({ navigation }) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  const leagueId = 39; // Example league ID
  const seasonYear = 2024; // Example season year

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    try {
      const data = await apiClient.get(
        `/standings/${leagueId}?season_year=${seasonYear}`
      );
      setStandings(data);
    } catch (error) {
      console.error("Error fetching standings:", error);
      Alert.alert("Error", "Unable to fetch standings.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TeamDetails", { teamId: item.team.team_id })
      }
    >
      <Card style={styles.card}>
        <Card.Content style={styles.itemContainer}>
          <Text style={styles.rank}>{item.rank}</Text>
          <Text style={styles.teamName}>{item.team.name}</Text>
          <Text style={styles.points}>{item.points}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator size={24} style={styles.loader} color="#1E90FF" />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={standings}
        keyExtractor={(item) => item.team.team_id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rank: {
    width: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
  teamName: {
    flex: 1,
    fontSize: 16,
  },
  points: {
    width: 50,
    textAlign: "right",
    fontSize: 16,
  },
});
