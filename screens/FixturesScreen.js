import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import apiClient from '../api/apiClient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import createStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { IconButton } from 'react-native-paper';

export default function FixturesScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const styles = createStyles({});

  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leagueId, setLeagueId] = useState(39);
  const [seasonYear, setSeasonYear] = useState(2024);
  const [leagues, setLeagues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const fetchLeagues = async () => {
    try {
      const data = await apiClient.get('/leagues/');
      setLeagues(data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      Alert.alert('Error', 'Unable to fetch leagues.');
    }
  };

  const fetchFixtures = async () => {
    setLoading(true);
    try {
      const dateString = `${selectedDate.getFullYear()}-${(
        selectedDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${selectedDate
        .getDate()
        .toString()
        .padStart(2, '0')}`;

      const data = await apiClient.get(
        `/fixtures/?league_id=${leagueId}&season_year=${seasonYear}&date_from=${dateString}&date_to=${dateString}`
      );

      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFixtures(data);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      Alert.alert('Error', 'Unable to fetch fixtures.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchFixtures();
  }, [leagueId, selectedDate]);

  if (!fontsLoaded) {
    return null;
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleLeagueSelect = (selectedLeagueId) => {
    setLeagueId(selectedLeagueId);
  };

  const renderItem = ({ item }) => (
    <Animatable.View animation="fadeInUp" delay={200} style={styles.fixtureCardWrapper}>
      <TouchableOpacity
        style={styles.fixtureCard}
        onPress={() => navigation.navigate('MatchDetails', { fixtureId: item.fixture_id })}
      >
        <View style={styles.fixturesItemContainer}>
          <Text style={styles.time}>
            {new Date(item.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <View style={styles.teamContainer}>
            {item.home_team.logo ? (
              <Image
                source={{ uri: item.home_team.logo }}
                style={styles.teamLogoSmall}
              />
            ) : (
              <View style={styles.placeholderLogo} />
            )}
            <Text style={styles.teamNameSmall} numberOfLines={1}>
              {item.home_team.name}
            </Text>
          </View>
          <Text style={styles.vsTextSmall}>vs</Text>
          <View style={styles.teamContainer}>
            {item.away_team.logo ? (
              <Image
                source={{ uri: item.away_team.logo }}
                style={styles.teamLogoSmall}
              />
            ) : (
              <View style={styles.placeholderLogo} />
            )}
            <Text style={styles.teamNameSmall} numberOfLines={1}>
              {item.away_team.name}
            </Text>
          </View>
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
        <Animatable.View animation="fadeInDown" delay={200} style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>Fixtures</Text>
        </Animatable.View>

        <View style={styles.container}>
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

          <TouchableOpacity style={styles.datePickerContainer} onPress={showDatePicker}>
            <IconButton icon="calendar" size={24} color="#ff416c" />
            <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={selectedDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date(2023, 0, 1)}
            maximumDate={new Date(2025, 11, 31)}
            headerTextIOS="Select a date"
            textColor="#ff416c"
          />

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ff416c" />
            </View>
          ) : fixtures.length > 0 ? (
            <FlatList
              data={fixtures}
              keyExtractor={(item) => item.fixture_id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Text style={styles.noFixturesText}>No fixtures found for this date.</Text>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
