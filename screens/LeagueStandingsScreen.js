// screens/LeagueStandingsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
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

export default function LeagueStandingsScreen({ navigation }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const styles = createStyles({});

  // State variables
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [leagueId, setLeagueId] = useState(null);
  const [seasonYear, setSeasonYear] = useState(2024);
  const [leagues, setLeagues] = useState([]);  

  // Fetch leagues and include country flags
  const fetchLeagues = async () => {
    try {
      console.log('Fetching leagues...');
      const response = await apiClient.get('/leagues/');
      console.log('Leagues fetched:', response); // Log the entire response
  
      if (Array.isArray(response)) {
        setLeagues(response);
      } else {
        console.error('Leagues data is not an array:', response);
        setLeagues([]);
        Alert.alert('Error', 'Unexpected data format received from server.');
      }
    } catch (error) {
      console.error('Error fetching leagues:', error);
      Alert.alert('Error', 'Unable to fetch leagues.');
      setLeagues([]);
    }
  };

  // Fetch standings for the selected league
  const fetchStandings = async (selectedLeagueId) => {
    if (!selectedLeagueId) {
      console.log('No league selected. Clearing standings.');
      setStandings([]);
      return;
    }
  
    setLoading(true);
    try {
      console.log(`Fetching standings for league_id: ${selectedLeagueId}, season_year: ${seasonYear}`);
      const data = await apiClient.get(`/standings/${selectedLeagueId}?season_year=${seasonYear}`);
      console.log('Standings fetched:', data); 
  
      if (Array.isArray(data)) {
        setStandings(data);
      } else {
        console.error('Standings data is not an array:', data);
        setStandings([]);
        Alert.alert('Error', 'Unexpected data format received from server.');
      }
    } catch (error) {
      console.error('Error fetching standings:', error);
      Alert.alert('Error', 'Unable to fetch standings.');
      setStandings([]);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchStandings(leagueId);
  }, [leagueId, seasonYear]);

  // Ensure all hooks and functions are called before any conditional return
  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff416c" />
      </View>
    );
  }

  // Debugging: Log leagues state
  console.log('Leagues state before render:', leagues);

  const handleLeagueSelect = (selectedLeagueId) => {
    console.log(`League selected: ${selectedLeagueId}`);
    setLeagueId(selectedLeagueId);
  };

  const renderItem = ({ item }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={200}
      style={styles.standingsItemWrapper}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TeamDetails', { teamId: item.team.team_id })
        }
      >
        <View style={styles.standingsItemContainer}>
          <Text style={styles.standingsRank}>{item.rank}</Text>
          {item.team.logo ? (
            <Image
              source={{ uri: item.team.logo }}
              style={styles.standingsTeamLogo}
            />
          ) : (
            <View style={styles.placeholderLogo} />
          )}
          <Text style={styles.standingsTeamName}>{item.team.name}</Text>
          <Text style={styles.standingsPlayed}>
            {item.matches_played ?? 0}
          </Text>
          <Text style={styles.standingsWins}>{item.wins ?? 0}</Text>
          <Text style={styles.standingsDraws}>{item.draws ?? 0}</Text>
          <Text style={styles.standingsLosses}>{item.losses ?? 0}</Text>
          <Text style={styles.standingsPoints}>{item.points ?? 0}</Text>
        </View>
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
          <Animatable.View
            animation="fadeInDown"
            delay={200}
            style={styles.headerContainer}
          >
            <Text style={styles.sectionTitle}>League Standings</Text>
          </Animatable.View>

          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={leagueId}
              onValueChange={(itemValue, itemIndex) => handleLeagueSelect(itemValue)}
              style={styles.picker}
              dropdownIconColor="#ff416c"
              prompt="Select a League" // For Android
            >
              <Picker.Item label="Select a League..." value={null} />
              {Array.isArray(leagues) && leagues.length > 0 ? (
                leagues.map((league) => (
                  <Picker.Item
                    key={league.league_id}
                    label={league.name}
                    value={league.league_id}
                  />
                ))
              ) : (
                <Picker.Item label="Loading leagues..." value={null} />
              )}
            </Picker>
          </View>

          <View style={styles.standingsHeader}>
            <Text style={styles.headerRank}>#</Text>
            <Text style={styles.headerTeam}>Team</Text>
            <Text style={styles.headerPlayed}>P</Text>
            <Text style={styles.headerWins}>W</Text>
            <Text style={styles.headerDraws}>D</Text>
            <Text style={styles.headerLosses}>L</Text>
            <Text style={styles.headerPoints}>Pts</Text>
          </View>

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ff416c" />
            </View>
          ) : standings.length > 0 ? (
            <FlatList
              data={standings}
              keyExtractor={(item) => item.team.team_id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <View style={styles.noStandingsContainer}>
              <Text style={styles.noStandingsText}>
                {leagueId
                  ? 'No standings available for the selected league.'
                  : 'Please select a league to view standings.'}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
