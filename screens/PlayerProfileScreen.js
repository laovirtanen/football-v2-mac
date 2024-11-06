// screens/PlayerProfileScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import apiClient from "../api/apiClient";

export default function PlayerProfileScreen({ route }) {
  const { playerId } = route.params;
  const [player, setPlayer] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  const fetchPlayerDetails = async () => {
    try {
      const playerData = await apiClient.get(`/players/${playerId}`);
      const statsData = await apiClient.get(
        `/player_statistics/?player_id=${playerId}&season_year=2024`
      );
      setPlayer(playerData);
      setStatistics(statsData[0]); // Assuming the first item is the relevant one
    } catch (error) {
      console.error("Error fetching player details:", error);
      Alert.alert("Error", "Unable to fetch player details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" style={styles.loader} color="#1E90FF" />
    );
  }

  if (!player) {
    return (
      <View style={styles.container}>
        <Text>Error loading player details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image
            size={100}
            source={{ uri: player.photo || "default_photo_url" }}
            style={styles.avatar}
          />
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.info}>Age: {player.age}</Text>
          <Text style={styles.info}>Nationality: {player.nationality}</Text>
          <Text style={styles.info}>
            Team: {player.team ? player.team.name : "N/A"}
          </Text>
          <Text style={styles.info}>Position: {player.position}</Text>
        </Card.Content>
      </Card>

      {statistics && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Statistics:</Text>

          {/* General Statistics */}
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Appearances:</Text>
            <Text style={styles.statValue}>
              {statistics.appearances || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Lineups:</Text>
            <Text style={styles.statValue}>{statistics.lineups || "0"}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Minutes Played:</Text>
            <Text style={styles.statValue}>{statistics.minutes || "0"}</Text>
          </View>

          {/* Goals & Assists */}
          <Text style={styles.sectionTitle}>Goals & Assists</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Goals:</Text>
            <Text style={styles.statValue}>
              {statistics.goals_total || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Assists:</Text>
            <Text style={styles.statValue}>
              {statistics.goals_assists || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Shots Total:</Text>
            <Text style={styles.statValue}>
              {statistics.shots_total || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Shots On Target:</Text>
            <Text style={styles.statValue}>{statistics.shots_on || "0"}</Text>
          </View>

          {/* Passing */}
          <Text style={styles.sectionTitle}>Passing</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Passes:</Text>
            <Text style={styles.statValue}>
              {statistics.passes_total || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Key Passes:</Text>
            <Text style={styles.statValue}>{statistics.passes_key || "0"}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Pass Accuracy:</Text>
            <Text style={styles.statValue}>
              {statistics.passes_accuracy || "0"}
            </Text>
          </View>

          {/* Defensive */}
          <Text style={styles.sectionTitle}>Defensive</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Tackles:</Text>
            <Text style={styles.statValue}>
              {statistics.tackles_total || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Blocks:</Text>
            <Text style={styles.statValue}>
              {statistics.tackles_blocks || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Interceptions:</Text>
            <Text style={styles.statValue}>
              {statistics.tackles_interceptions || "0"}
            </Text>
          </View>

          {/* Discipline */}
          <Text style={styles.sectionTitle}>Discipline</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Yellow Cards:</Text>
            <Text style={styles.statValue}>
              {statistics.cards_yellow || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Red Cards:</Text>
            <Text style={styles.statValue}>{statistics.cards_red || "0"}</Text>
          </View>

          {/* Dribbles */}
          <Text style={styles.sectionTitle}>Dribbles</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Attempts:</Text>
            <Text style={styles.statValue}>
              {statistics.dribbles_attempts || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Success:</Text>
            <Text style={styles.statValue}>
              {statistics.dribbles_success || "0"}
            </Text>
          </View>

          {/* Duels */}
          <Text style={styles.sectionTitle}>Duels</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Duels:</Text>
            <Text style={styles.statValue}>
              {statistics.duels_total || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Duels Won:</Text>
            <Text style={styles.statValue}>{statistics.duels_won || "0"}</Text>
          </View>

          {/* Fouls */}
          <Text style={styles.sectionTitle}>Fouls</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Fouls Drawn:</Text>
            <Text style={styles.statValue}>
              {statistics.fouls_drawn || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Fouls Committed:</Text>
            <Text style={styles.statValue}>
              {statistics.fouls_committed || "0"}
            </Text>
          </View>

          {/* Penalties */}
          <Text style={styles.sectionTitle}>Penalties</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Penalties Won:</Text>
            <Text style={styles.statValue}>
              {statistics.penalty_won || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Penalties Scored:</Text>
            <Text style={styles.statValue}>
              {statistics.penalty_scored || "0"}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Penalties Missed:</Text>
            <Text style={styles.statValue}>
              {statistics.penalty_missed || "0"}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    marginTop: 20,
  },
  card: {
    width: "90%",
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 20,
  },
  cardContent: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  playerName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    marginVertical: 4,
  },
  statsContainer: {
    marginTop: 20,
    width: "90%",
    paddingHorizontal: 16,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#1E90FF",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 16,
    color: "#555",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
