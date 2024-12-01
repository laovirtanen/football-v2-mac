// screens/PlayerProfileScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import createStyles from '../styles';
import apiClient from '../api/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

export default function PlayerProfileScreen({ route }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // Import styles from updated styles.js
  const styles = createStyles({});

  // State variables
  const { playerId } = route.params;
  const [player, setPlayer] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch player details
  const fetchPlayerDetails = async () => {
    try {
      const playerData = await apiClient.get(`/players/${playerId}`);
      const statsData = await apiClient.get(
        `/player_statistics/?player_id=${playerId}&season_year=2024`
      );
      setPlayer(playerData);
      setStatistics(statsData[0]); // Assuming the first item is the relevant one
    } catch (error) {
      console.error('Error fetching player details:', error);
      Alert.alert('Error', 'Unable to fetch player details.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect hooks
  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  // Ensure all hooks and functions are called before this conditional return
  if (!fontsLoaded) {
    return null; // Optionally, display a loading indicator
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff416c" />
      </View>
    );
  }

  if (!player) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading player details.</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Player Information */}
          <Animatable.View animation="fadeInDown" delay={200} style={styles.card}>
            <View style={styles.cardContent}>
              {player.photo ? (
                <Image
                  source={{ uri: player.photo }}
                  style={styles.playerAvatar}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={100}
                  color="#ff416c"
                  style={styles.playerIcon}
                />
              )}
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.infoText}>Age: {player.age}</Text>
              <Text style={styles.infoText}>Nationality: {player.nationality}</Text>
              <Text style={styles.infoText}>
                Team: {player.team ? player.team.name : 'N/A'}
              </Text>
              <Text style={styles.infoText}>Position: {player.position}</Text>
            </View>
          </Animatable.View>

          {/* Statistics */}
          {statistics && (
            <Animatable.View animation="fadeInUp" delay={300} style={styles.card}>
              <Text style={styles.sectionTitle}>Statistics</Text>

              {/* General Statistics */}
              <Text style={styles.subSectionTitle}>General</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Appearances:</Text>
                <Text style={styles.statValue}>{statistics.appearances || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Lineups:</Text>
                <Text style={styles.statValue}>{statistics.lineups || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Minutes Played:</Text>
                <Text style={styles.statValue}>{statistics.minutes || '0'}</Text>
              </View>

              {/* Goals & Assists */}
              <Text style={styles.subSectionTitle}>Goals & Assists</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Goals:</Text>
                <Text style={styles.statValue}>{statistics.goals_total || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Assists:</Text>
                <Text style={styles.statValue}>{statistics.goals_assists || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Shots Total:</Text>
                <Text style={styles.statValue}>{statistics.shots_total || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Shots On Target:</Text>
                <Text style={styles.statValue}>{statistics.shots_on || '0'}</Text>
              </View>

              {/* Passing */}
              <Text style={styles.subSectionTitle}>Passing</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Passes:</Text>
                <Text style={styles.statValue}>{statistics.passes_total || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Key Passes:</Text>
                <Text style={styles.statValue}>{statistics.passes_key || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Pass Accuracy:</Text>
                <Text style={styles.statValue}>
                  {statistics.passes_accuracy ? `${statistics.passes_accuracy}%` : '0%'}
                </Text>
              </View>

              {/* Defensive */}
              <Text style={styles.subSectionTitle}>Defensive</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Tackles:</Text>
                <Text style={styles.statValue}>{statistics.tackles_total || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Blocks:</Text>
                <Text style={styles.statValue}>{statistics.tackles_blocks || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Interceptions:</Text>
                <Text style={styles.statValue}>
                  {statistics.tackles_interceptions || '0'}
                </Text>
              </View>

              {/* Discipline */}
              <Text style={styles.subSectionTitle}>Discipline</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Yellow Cards:</Text>
                <Text style={styles.statValue}>{statistics.cards_yellow || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Red Cards:</Text>
                <Text style={styles.statValue}>{statistics.cards_red || '0'}</Text>
              </View>

              {/* Dribbles */}
              <Text style={styles.subSectionTitle}>Dribbles</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Attempts:</Text>
                <Text style={styles.statValue}>{statistics.dribbles_attempts || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Success:</Text>
                <Text style={styles.statValue}>{statistics.dribbles_success || '0'}</Text>
              </View>

              {/* Duels */}
              <Text style={styles.subSectionTitle}>Duels</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Duels:</Text>
                <Text style={styles.statValue}>{statistics.duels_total || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Duels Won:</Text>
                <Text style={styles.statValue}>{statistics.duels_won || '0'}</Text>
              </View>

              {/* Fouls */}
              <Text style={styles.subSectionTitle}>Fouls</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Fouls Drawn:</Text>
                <Text style={styles.statValue}>{statistics.fouls_drawn || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Fouls Committed:</Text>
                <Text style={styles.statValue}>{statistics.fouls_committed || '0'}</Text>
              </View>

              {/* Penalties */}
              <Text style={styles.subSectionTitle}>Penalties</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Penalties Won:</Text>
                <Text style={styles.statValue}>{statistics.penalty_won || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Penalties Scored:</Text>
                <Text style={styles.statValue}>{statistics.penalty_scored || '0'}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Penalties Missed:</Text>
                <Text style={styles.statValue}>{statistics.penalty_missed || '0'}</Text>
              </View>
            </Animatable.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
