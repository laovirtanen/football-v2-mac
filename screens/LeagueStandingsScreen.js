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

export default function LeagueStandingsScreen({ navigation }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // Import styles from updated styles.js
  const styles = createStyles({});

  // State variables
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leagueId, setLeagueId] = useState(39);
  const [seasonYear, setSeasonYear] = useState(2024);
  const [leagues, setLeagues] = useState([]);

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

  // Fetch standings for the selected league
  const fetchStandings = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(
        `/standings/${leagueId}?season_year=${seasonYear}`
      );
      setStandings(data);
    } catch (error) {
      console.error('Error fetching standings:', error);
      Alert.alert('Error', 'Unable to fetch standings.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect hooks
  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchStandings();
  }, [leagueId]);

  // Ensure all hooks and functions are called before any conditional return
  if (!fontsLoaded) {
    return null; // Optionally, display a loading indicator
  }

  const handleLeagueSelect = (selectedLeagueId) => {
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
          <Image
            source={{ uri: item.team.logo }}
            style={styles.standingsTeamLogo}
          />
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff416c" />
      </View>
    );
  }

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
            <Text style={styles.sectionTitle}>League Standings</Text>
          </Animatable.View>

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
                      league.league_id === leagueId && styles.leagueButtonTextSelected,
                    ]}
                  >
                    {league.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Standings Header */}
          <View style={styles.standingsHeader}>
            <Text style={styles.headerRank}>#</Text>
            <Text style={styles.headerTeam}>Team</Text>
            <Text style={styles.headerPlayed}>P</Text>
            <Text style={styles.headerWins}>W</Text>
            <Text style={styles.headerDraws}>D</Text>
            <Text style={styles.headerLosses}>L</Text>
            <Text style={styles.headerPoints}>Pts</Text>
          </View>

          {/* Standings List */}
          <FlatList
            data={standings}
            keyExtractor={(item) => item.team.team_id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
