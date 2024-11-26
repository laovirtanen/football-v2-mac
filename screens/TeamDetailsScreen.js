// screens/TeamDetailsScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper"; // Ensure correct import
import apiClient from "../api/apiClient";
import createStyles from "../styles"; // Adjust the path as necessary

export default function TeamDetailsScreen({ route }) {
  const { colors, dark } = useTheme(); // Destructure 'dark' correctly
  const styles = createStyles(colors); // Pass only 'colors' if 'dark' is not used in styles.js
  const { teamId } = route.params;
  const [team, setTeam] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const seasonYear = 2024;

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
    return <ActivityIndicator size="large" style={styles.loader} color={colors.primary} />;
  }

  if (!team || !stats) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>Error loading team details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.teamContainer}>
        <Image source={{ uri: team.logo }} style={styles.teamLogo} />
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.teamInfo}>Founded: {team.founded || "N/A"}</Text>
        <Text style={styles.teamInfo}>Country: {team.country}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Season Statistics</Text>
        {renderTeamStatistics(stats, colors)}
      </View>
    </ScrollView>
  );
}

// Helper function to render team statistics
const renderTeamStatistics = (stats, colors) => {
  const statsData = [
    { label: "Matches Played", value: stats.matches_played },
    { label: "Wins", value: stats.wins },
    { label: "Draws", value: stats.draws },
    { label: "Losses", value: stats.losses },
    { label: "Goals For", value: stats.goals_for },
    { label: "Goals Against", value: stats.goals_against },
    { label: "Goal Difference", value: stats.goal_difference },
    { label: "Clean Sheets", value: stats.clean_sheets },
    {
      label: "Avg Shots on Target",
      value: stats.average_shots_on_target
        ? stats.average_shots_on_target.toFixed(2)
        : "N/A",
    },
    {
      label: "Avg Tackles",
      value: stats.average_tackles
        ? stats.average_tackles.toFixed(2)
        : "N/A",
    },
    {
      label: "Avg Pass Accuracy",
      value: stats.average_passes_accuracy
        ? stats.average_passes_accuracy.toFixed(2) + "%"
        : "N/A",
    },
  ];

  return statsData.map((stat, index) => (
    <View key={index} style={styles.statRow}>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={styles.statValue}>{stat.value}</Text>
    </View>
  ));
};
