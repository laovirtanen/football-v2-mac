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
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const styles = createStyles({});

  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [statType, setStatType] = useState('goals');
  const [statItems] = useState([
    { label: 'Goals', value: 'goals' },
    { label: 'Assists', value: 'assists' },
    { label: 'Yellow Cards', value: 'yellow_cards' },
    { label: 'Red Cards', value: 'red_cards' },
  ]);
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState(null); 
  const [seasonYear] = useState(2024);

  // Fetch leagues and include country flags
  const fetchLeagues = async () => {
    try {
      console.log('Fetching leagues...');
      const data = await apiClient.get('/leagues/');
      console.log('Leagues fetched:', data);
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      Alert.alert('Error', 'Unable to fetch leagues.');
    }
  };

  // Function to fetch rankings
  const fetchRankings = async () => {
    if (!leagueId) {
      console.log('No league selected. Clearing rankings.');
      setRankings([]);
      return;
    }

    setLoading(true);
    try {
      console.log(
        `Fetching player rankings for stat_type: ${statType}, league_id: ${leagueId}, season_year: ${seasonYear}`
      );
      const response = await apiClient.get(
        `/players/stats/rankings/?stat_type=${statType}&league_id=${leagueId}&season_year=${seasonYear}&limit=10`
      );
      console.log('Player rankings fetched:', response);
      setRankings(response);
    } catch (error) {
      console.error('Error fetching player rankings:', error);
      Alert.alert('Error', 'Unable to fetch player rankings.');
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [statType, leagueId]);

  if (!fontsLoaded) {
    return null; 
  }

  const handleLeagueSelect = (selectedLeagueId) => {
    console.log(`League selected: ${selectedLeagueId}`);
    setLeagueId(selectedLeagueId);
  };

  const handleStatTypeSelect = (selectedStatType) => {
    console.log(`Stat type selected: ${selectedStatType}`);
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
        <View style={styles.container}>
          {/* Header Section */}
          <Animatable.View
            animation="fadeInDown"
            delay={200}
            style={styles.headerContainer}
          >
            <Text style={styles.sectionTitle}>Player Rankings</Text>
          </Animatable.View>

          {/* League Selector Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={leagueId}
              onValueChange={(itemValue, itemIndex) => handleLeagueSelect(itemValue)}
              style={styles.picker}
              dropdownIconColor="#ff416c"
              prompt="Select a League" // For Android
            >
              <Picker.Item label="Select a League..." value={null} />
              {leagues.map((league) => (
                <Picker.Item
                  key={league.league_id}
                  label={league.name}
                  value={league.league_id}
                />
              ))}
            </Picker>
          </View>

          {/* Stat Type Selector Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={statType}
              onValueChange={(itemValue, itemIndex) => handleStatTypeSelect(itemValue)}
              style={styles.picker}
              dropdownIconColor="#ff416c"
              prompt="Select a Statistic" // For Android
            >
              {statItems.map((stat) => (
                <Picker.Item
                  key={stat.value}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </Picker>
          </View>

          {/* Standings List or Loading */}
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ff416c" />
            </View>
          ) : rankings.length > 0 ? (
            <FlatList
              data={rankings}
              keyExtractor={(item) =>
                item.player?.player_id?.toString() ?? item.rank.toString()
              }
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <View style={styles.noRankingsContainer}>
              <Text style={styles.noRankingsText}>
                {leagueId
                  ? 'No player rankings available for the selected league and statistic.'
                  : 'Please select a league and statistic to view player rankings.'}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
