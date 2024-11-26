// screens/FixturesScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import apiClient from "../api/apiClient";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { IconButton, Card, useTheme } from "react-native-paper";
import createStyles from "../styles";

export default function FixturesScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leagueId, setLeagueId] = useState(39);
  const [seasonYear, setSeasonYear] = useState(2024);
  const [leagues, setLeagues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [leagueItems, setLeagueItems] = useState([]);

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchFixtures();
  }, [leagueId, selectedDate]);

  const fetchLeagues = async () => {
    try {
      const data = await apiClient.get("/leagues/");
      setLeagues(data);
      setLeagueItems(
        data.map((league) => ({
          label: league.name,
          value: league.league_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching leagues:", error);
      Alert.alert("Error", "Unable to fetch leagues.");
    }
  };

  const fetchFixtures = async () => {
    setLoading(true);
    try {
      const dateString = `${selectedDate.getFullYear()}-${(
        selectedDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${selectedDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      const data = await apiClient.get(
        `/fixtures/?league_id=${leagueId}&season_year=${seasonYear}&date_from=${dateString}&date_to=${dateString}`
      );

      // Sort fixtures by start time
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setFixtures(data);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      Alert.alert("Error", "Unable to fetch fixtures.");
    } finally {
      setLoading(false);
    }
  };

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

  // Update the renderItem function
const renderItem = ({ item }) => (
  <Card
    style={styles.card}
    onPress={() =>
      navigation.navigate("MatchDetails", { fixtureId: item.fixture_id })
    }
  >
    <Card.Content>
      <View style={styles.fixturesItemContainer}>
        <Text style={styles.time}>
          {new Date(item.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
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
          <Text
            style={styles.teamNameSmall}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
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
          <Text
            style={styles.teamNameSmall}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.away_team.name}
          </Text>
        </View>
      </View>
    </Card.Content>
  </Card>
);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={leagueOpen}
        value={leagueId}
        items={leagueItems}
        setOpen={setLeagueOpen}
        setValue={setLeagueId}
        setItems={setLeagueItems}
        placeholder="Select a league"
        containerStyle={styles.dropDownPicker}
        onChangeValue={(value) => setLeagueId(value)}
        searchable={true}
        searchablePlaceholder="Search leagues..."
        zIndex={1000}
        zIndexInverse={3000}
        style={styles.dropDownStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        textStyle={styles.dropDownTextStyle}
        labelStyle={styles.dropDownLabelStyle}
        selectedItemLabelStyle={styles.dropDownSelectedLabelStyle}
        arrowIconStyle={styles.dropDownArrowIconStyle}
        tickIconStyle={styles.dropDownTickIconStyle}
        listItemContainerStyle={{ backgroundColor: colors.surface }}
        listItemLabelStyle={{ color: colors.text }}
      />
      <TouchableOpacity
        style={styles.datePickerContainer}
        onPress={showDatePicker}
      >
        <IconButton icon="calendar" size={24} color={colors.primary} />
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
        textColor={colors.primary}
      />
      {loading ? (
        <ActivityIndicator size={24} style={styles.loader} color={colors.primary} />
      ) : fixtures.length > 0 ? (
        <FlatList
          data={fixtures}
          keyExtractor={(item) => item.fixture_id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noFixturesText}>
          No fixtures found for this date.
        </Text>
      )}
    </View>
  );
}
