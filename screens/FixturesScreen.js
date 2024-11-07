// screens/FixturesScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import apiClient from "../api/apiClient";
import { Card } from "react-native-paper";

export default function FixturesScreen({ navigation }) {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  const leagueId = 39; // Example league ID

  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    try {
      const data = await apiClient.get(
        `/fixtures/?league_id=${leagueId}&status=NS&limit=20`
      );
      console.log("Fetched fixtures:", data);
      setFixtures(data);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      Alert.alert("Error", "Unable to fetch fixtures.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("MatchDetails", { fixtureId: item.fixture_id })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.teamContainer}>
          <View style={styles.team}>
            <Image
              source={{ uri: item.home_team?.logo }}
              style={styles.teamLogo}
            />
            <Text style={styles.teamName}>
              {item.home_team?.name ?? "Home Team"}
            </Text>
          </View>
          <Text style={styles.vsText}>vs</Text>
          <View style={styles.team}>
            <Image
              source={{ uri: item.away_team?.logo }}
              style={styles.teamLogo}
            />
            <Text style={styles.teamName}>
              {item.away_team?.name ?? "Away Team"}
            </Text>
          </View>
        </View>
        <Text style={styles.date}>{formatDateTime(item.date)}</Text>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fixtures}
        keyExtractor={(item) => item.fixture_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f2f5",
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    backgroundColor: "#fff",
  },
  cardContent: {
    padding: 16,
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: {
    alignItems: "center",
    flex: 4,
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: "contain",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  vsText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
  },
  date: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
