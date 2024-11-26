// screens/LeagueStandingsScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import apiClient from "../api/apiClient";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "react-native-paper";
import createStyles from "../styles";

export default function LeagueStandingsScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leagueId, setLeagueId] = useState(39);
  const [seasonYear, setSeasonYear] = useState(2024);
  const [leagues, setLeagues] = useState([]);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [leagueItems, setLeagueItems] = useState([]);

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    fetchStandings();
  }, [leagueId]);

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

  const fetchStandings = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(
        `/standings/${leagueId}?season_year=${seasonYear}`
      );
      setStandings(data);
    } catch (error) {
      console.error("Error fetching standings:", error);
      Alert.alert("Error", "Unable to fetch standings.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TeamDetails", { teamId: item.team.team_id })
      }
    >
      <View style={styles.standingsItemContainer}>
        <Text style={styles.standingsRank}>{item.rank}</Text>
        <Image
          source={{ uri: item.team.logo }}
          style={styles.standingsTeamLogo}
        />
        <Text style={styles.standingsTeamName}>{item.team.name}</Text>
        <Text style={styles.standingsPlayed}>{item.matches_played ?? 0}</Text>
        <Text style={styles.standingsWins}>{item.wins ?? 0}</Text>
        <Text style={styles.standingsDraws}>{item.draws ?? 0}</Text>
        <Text style={styles.standingsLosses}>{item.losses ?? 0}</Text>
        <Text style={styles.standingsPoints}>{item.points ?? 0}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator size={24} style={styles.loader} color={colors.primary} />
    );
  }

  return (
    <View style={styles.standingsContainer}>
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
      <View style={styles.standingsHeader}>
        <Text style={styles.headerRank}>#</Text>
        <Text style={styles.headerTeam}>Team</Text>
        <Text style={styles.headerPlayed}>P</Text>
        <Text style={styles.headerWins}>W</Text>
        <Text style={styles.headerDraws}>D</Text>
        <Text style={styles.headerLosses}>L</Text>
        <Text style={styles.headerPoints}>Pts</Text>
      </View>
      <FlatList
        data={standings}
        keyExtractor={(item) => item.team.team_id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
