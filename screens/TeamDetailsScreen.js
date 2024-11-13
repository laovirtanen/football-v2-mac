// screens/TeamDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import apiClient from "../api/apiClient";
import { Avatar } from "react-native-paper";

export default function TeamDetailsScreen({ route }) {
  const { teamId } = route.params;
  const [team, setTeam] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const seasonYear = 2024; // Example season year

  useEffect(() => {
    fetchTeamDetails();
  }, []);

  const fetchTeamDetails = async () => {
    try {
      const teamData = await apiClient.get(`/teams/${teamId}`);
      const statsData = await apiClient.get(
        `/teams/${teamId}/statistics?season_year=${seasonYear}`
      );
      setTeam(teamData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching team details:", error);
      Alert.alert("Error", "Unable to fetch team details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size={24} style={styles.loader} color="#1E90FF" />
    );
  }

  if (!team || !stats) {
    return (
      <View style={styles.container}>
        <Text>Error loading team details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{ uri: team.logo }}
        style={styles.avatar}
      />
      <Text style={styles.teamName}>{team.name}</Text>
      <Text style={styles.stat}>Matches Played: {stats.matches_played}</Text>
      <Text style={styles.stat}>Wins: {stats.wins}</Text>
      <Text style={styles.stat}>Draws: {stats.draws}</Text>
      <Text style={styles.stat}>Losses: {stats.losses}</Text>
      <Text style={styles.stat}>Goals For: {stats.goals_for}</Text>
      <Text style={styles.stat}>Goals Against: {stats.goals_against}</Text>
      <Text style={styles.stat}>Goal Difference: {stats.goal_difference}</Text>
      {/* Add more details as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  teamName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  stat: {
    fontSize: 18,
    marginVertical: 4,
  },
});
