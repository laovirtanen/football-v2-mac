// screens/PlayerRankingsScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import apiClient from "../api/apiClient";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "react-native-paper";
import createStyles from "../styles";

export default function PlayerRankingsScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statType, setStatType] = useState("goals");
  const [statItems, setStatItems] = useState([
    { label: "Goals", value: "goals" },
    { label: "Assists", value: "assists" },
    { label: "Yellow Cards", value: "yellow_cards" },
    { label: "Red Cards", value: "red_cards" },
  ]);
  const [statOpen, setStatOpen] = useState(false);

  const leagueId = 39; // Example league ID
  const seasonYear = 2024; // Example season year

  useEffect(() => {
    fetchRankings();
  }, [statType]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(
        `/players/stats/rankings/?stat_type=${statType}&league_id=${leagueId}&season_year=${seasonYear}&limit=10`
      );
      setRankings(data);
    } catch (error) {
      console.error("Error fetching player rankings:", error);
      Alert.alert("Error", "Unable to fetch player rankings.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rankingsItemContainer}
      onPress={() =>
        navigation.navigate("PlayerProfile", {
          playerId: item.player?.player_id,
        })
      }
    >
      <Text style={styles.rankingsRank}>{item.rank ?? 'N/A'}</Text>
      <Image
        source={{ uri: item.player?.photo }}
        style={styles.rankingsAvatar}
      />
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
  );
  

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={statOpen}
        value={statType}
        items={statItems}
        setOpen={setStatOpen}
        setValue={setStatType}
        setItems={setStatItems}
        placeholder="Select a stat"
        containerStyle={styles.dropDownPicker}
        onChangeValue={(value) => setStatType(value)}
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
      {loading ? (
        <ActivityIndicator
          size={24}
          style={styles.loader}
          color={colors.primary}
        />
      ) : (
        <FlatList
          data={rankings}
          keyExtractor={(item) => item.player?.player_id?.toString() ?? item.rank.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
