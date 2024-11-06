// screens/MatchDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import apiClient from "../api/apiClient";
import { Avatar } from "react-native-paper";

export default function MatchDetailsScreen({ route }) {
  const { fixtureId } = route.params;
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchDetails();
  }, []);

  const fetchMatchDetails = async () => {
    try {
      const data = await apiClient.get(`/fixtures/${fixtureId}`);
      setFixture(data);
    } catch (error) {
      console.error("Error fetching match details:", error);
      Alert.alert("Error", "Unable to fetch match details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" style={styles.loader} color="#1E90FF" />
    );
  }

  if (!fixture) {
    return (
      <View style={styles.container}>
        <Text>Error loading match details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {new Date(fixture.date).toLocaleDateString()}
      </Text>
      <View style={styles.teamContainer}>
        <Avatar.Image
          size={80}
          source={{ uri: fixture.home_team.logo }}
          style={styles.avatar}
        />
        <Text style={styles.score}>
          {fixture.goals_home} - {fixture.goals_away}
        </Text>
        <Avatar.Image
          size={80}
          source={{ uri: fixture.away_team.logo }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.teams}>
        {`${fixture.home_team.name} vs ${fixture.away_team.name}`}
      </Text>
      <Text>Status: {fixture.status_long}</Text>
      {/* Display odds and predictions if available */}
      {fixture.prediction && (
        <>
          <Text style={styles.predictionTitle}>Prediction:</Text>
          <Text>{fixture.prediction.advice}</Text>
        </>
      )}
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
  date: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: "transparent",
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  teams: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 16,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
});
