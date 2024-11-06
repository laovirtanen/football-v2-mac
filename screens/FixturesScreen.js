// screens/FixturesScreen.js
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
      setFixtures(data);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      Alert.alert("Error", "Unable to fetch fixtures.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("MatchDetails", { fixtureId: item.fixture_id })
      }
    >
      <Card.Content>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.teams}>
          {`${item.home_team.name} vs ${item.away_team.name}`}
        </Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" style={styles.loader} color="#1E90FF" />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fixtures}
        keyExtractor={(item) => item.fixture_id.toString()}
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
    marginBottom: 10,
  },
  date: {
    fontWeight: "bold",
    fontSize: 16,
  },
  teams: {
    fontSize: 18,
    marginTop: 5,
  },
});
