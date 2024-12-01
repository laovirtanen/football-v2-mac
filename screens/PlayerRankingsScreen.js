// screens/PlayerRankingsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import apiClient from '../api/apiClient';
import createStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function PlayerRankingsScreen({ navigation }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // Import styles from updated styles.js
  const styles = createStyles({});

  // State variables
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statType, setStatType] = useState('goals');
  const [statItems] = useState([
    { label: 'Goals', value: 'goals' },
    { label: 'Assists', value: 'assists' },
    { label: 'Yellow Cards', value: 'yellow_cards' },
    { label: 'Red Cards', value: 'red_cards' },
  ]);
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState(39);
  const [seasonYear] = useState(2024);

  // Fetch leagues and include country flags
  const fetchLeagues = async () => {
    try {
      const data = await apiClient.get('/leagues/');
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      Alert.alert('Error', 'Unable to fetch leagues.');
    }
  };

  // Function to fetch rankings
  const fetchRankings = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(
        `/players/stats/rankings/?stat_type=${statType}&league_id=${leagueId}&season_year=${seasonYear}&limit=10`
      );
      setRankings(data);
    } catch (error) {
      console.error('Error fetching player rankings:', error);
      Alert.alert('Error', 'Unable to fetch player rankings.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect hooks
  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [statType, leagueId]);

  // Ensure all hooks and functions are called before any conditional return
  if (!fontsLoaded) {
    return null; // Optionally, display a loading indicator
  }

  const handleLeagueSelect = (selectedLeagueId) => {
    setLeagueId(selectedLeagueId);
  };

  const handleStatTypeSelect = (selectedStatType) => {
    setStatType(selectedStatType);
  };

  const renderItem = ({ item }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={200}
      style={styles.rankingsItemWrapper}
    >
      <TouchableOpacity
        style={styles.rankingsItemContainer}
        onPress={() =>
          navigation.navigate('PlayerProfile', {
            playerId: item.player?.player_id,
          })
        }
      >
        <Text style={styles.rankingsRank}>{item.rank ?? 'N/A'}</Text>
        {item.player?.photo ? (
          <Image
            source={{ uri: item.player.photo }}
            style={styles.rankingsAvatar}
          />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
        <View style={styles.rankingsPlayerInfo}>
          <Text style={styles.rankingsPlayerName}>
            {item.player?.name ?? 'Unknown Player'}
          </Text>
          <Text style={styles.rankingsTeamName}>
            {item.player?.team?.name ?? 'Unknown Team'}
          </Text>
        </View>
        <Text style={styles.rankingsStatValue}>{item.stat_value ?? '0'}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animatable.View
          animation="fadeInDown"
          delay={200}
          style={styles.headerContainer}
        >
          <Text style={styles.sectionTitle}>Player Rankings</Text>
        </Animatable.View>
        <View style={styles.container}>
          {/* League Selector */}
          <View style={styles.leagueSelectorContainer}>
            {leagues.map((league) => (
              <TouchableOpacity
                key={league.league_id}
                style={[
                  styles.leagueButton,
                  league.league_id === leagueId && styles.leagueButtonSelected,
                ]}
                onPress={() => handleLeagueSelect(league.league_id)}
              >
                <View style={styles.leagueButtonContent}>
                  {league.country && league.country.flag ? (
                    <Image
                      source={{ uri: league.country.flag }}
                      style={styles.leagueFlag}
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.leagueButtonText,
                      league.league_id === leagueId &&
                        styles.leagueButtonTextSelected,
                    ]}
                  >
                    {league.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Stat Type Selector */}
          <View style={styles.statTypeSelectorContainer}>
            {statItems.map((stat) => (
              <TouchableOpacity
                key={stat.value}
                style={[
                  styles.statButton,
                  stat.value === statType && styles.statButtonSelected,
                ]}
                onPress={() => handleStatTypeSelect(stat.value)}
              >
                <Text
                  style={[
                    styles.statButtonText,
                    stat.value === statType && styles.statButtonTextSelected,
                  ]}
                >
                  {stat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ff416c" />
            </View>
          ) : (
            <FlatList
              data={rankings}
              keyExtractor={(item) =>
                item.player?.player_id?.toString() ?? item.rank.toString()
              }
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
