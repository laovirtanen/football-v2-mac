// screens/TeamDetailsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import createStyles from '../styles';
import apiClient from '../api/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

export default function TeamDetailsScreen({ route }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const styles = createStyles({});

  const { teamId } = route.params;
  const [team, setTeam] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const seasonYear = 2024;

  // Fetch team details
  const fetchTeamDetails = async () => {
    try {
      const teamData = await apiClient.get(`/teams/${teamId}`);
      const statsData = await apiClient.get(
        `/teams/${teamId}/statistics?season_year=${seasonYear}`
      );
      setTeam(teamData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching team details:', error);
      Alert.alert('Error', 'Unable to fetch team details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamDetails();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff416c" />
      </View>
    );
  }

  if (!team || !stats) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading team details.</Text>
      </View>
    );
  }

  const renderTeamStatistics = (stats) => {
    const statsData = [
      { label: 'Matches Played', value: stats.matches_played },
      { label: 'Wins', value: stats.wins },
      { label: 'Draws', value: stats.draws },
      { label: 'Losses', value: stats.losses },
      { label: 'Goals For', value: stats.goals_for },
      { label: 'Goals Against', value: stats.goals_against },
      { label: 'Goal Difference', value: stats.goal_difference },
      { label: 'Clean Sheets', value: stats.clean_sheets },
      {
        label: 'Avg Shots on Target',
        value: stats.average_shots_on_target
          ? stats.average_shots_on_target.toFixed(2)
          : 'N/A',
      },
      {
        label: 'Avg Tackles',
        value: stats.average_tackles
          ? stats.average_tackles.toFixed(2)
          : 'N/A',
      },
      {
        label: 'Avg Pass Accuracy',
        value: stats.average_passes_accuracy
          ? `${stats.average_passes_accuracy.toFixed(2)}%`
          : 'N/A',
      },
    ];

    return (
      <View style={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statCardValue}>{stat.value}</Text>
            <Text style={styles.statCardLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Team Header */}
          <Animatable.View animation="fadeInDown" delay={200} style={styles.teamHeaderCard}>
            <View style={styles.teamHeaderContainer}>
              {team.logo ? (
                <Image source={{ uri: team.logo }} style={styles.teamLogo} />
              ) : (
                <View style={styles.placeholderLogo} />
              )}
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamDetail}>Founded: {team.founded || 'N/A'}</Text>
                <Text style={styles.teamDetail}>Country: {team.country}</Text>
              </View>
            </View>
          </Animatable.View>

          {/* Season Statistics */}
          <Animatable.View animation="fadeInUp" delay={300} style={styles.statisticsCard}>
            <Text style={styles.sectionTitle}>Season Statistics ({seasonYear})</Text>
            {renderTeamStatistics(stats)}
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
