// screens/HeadToHeadScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import apiClient from "../api/apiClient";
import { Card } from "react-native-paper";

export default function HeadToHeadScreen({ navigation }) {
  const [team1Id, setTeam1Id] = useState(null);
  const [team2Id, setTeam2Id] = useState(null);
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingFixtures, setLoadingFixtures] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await apiClient.get("/teams/?limit=1000"); // Adjust limit as needed
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      Alert.alert("Error", "Unable to fetch teams.");
    } finally {
      setLoadingTeams(false);
    }
  };

  useEffect(() => {
    if (team1Id && team2Id && team1Id !== team2Id) {
      fetchHeadToHeadFixtures();
    } else if (team1Id && team2Id && team1Id === team2Id) {
      Alert.alert("Invalid Selection", "Please select two different teams.");
      setFixtures([]);
    }
  }, [team1Id, team2Id]);

  const fetchHeadToHeadFixtures = async () => {
    setLoadingFixtures(true);
    try {
      const data = await apiClient.get(
        `/head-to-head/?team1_id=${team1Id}&team2_id=${team2Id}&limit=5`
      );
      setFixtures(data);
    } catch (error) {
      console.error("Error fetching head-to-head fixtures:", error);
      Alert.alert("Error", "Unable to fetch head-to-head fixtures.");
    } finally {
      setLoadingFixtures(false);
    }
  };

  const renderFixtureItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("MatchDetails", { fixtureId: item.fixture_id })
      }
    >
      <Card.Content>
        <Text style={styles.fixtureDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.fixtureTeams}>
          {`${item.home_team.name} ${item.goals_home ?? "-"} - ${
            item.goals_away ?? "-"
          } ${item.away_team.name}`}
        </Text>
        <Text style={styles.fixtureLeague}>{item.league.name}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {loadingTeams ? (
        <ActivityIndicator size="large" style={styles.loader} color="#1E90FF" />
      ) : (
        <>
          <Text style={styles.label}>Select Team 1:</Text>
          <Picker
            selectedValue={team1Id}
            onValueChange={(itemValue) => setTeam1Id(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a team" value={null} />
            {teams.map((team) => (
              <Picker.Item
                key={team.team_id}
                label={team.name}
                value={team.team_id}
              />
            ))}
          </Picker>

          <Text style={styles.label}>Select Team 2:</Text>
          <Picker
            selectedValue={team2Id}
            onValueChange={(itemValue) => setTeam2Id(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a team" value={null} />
            {teams.map((team) => (
              <Picker.Item
                key={team.team_id}
                label={team.name}
                value={team.team_id}
              />
            ))}
          </Picker>

          {team1Id && team2Id && team1Id === team2Id && (
            <Text style={styles.errorText}>
              Please select two different teams.
            </Text>
          )}

          {loadingFixtures ? (
            <ActivityIndicator
              size="large"
              style={styles.loader}
              color="#1E90FF"
            />
          ) : fixtures.length > 0 ? (
            <>
              <Text style={styles.resultsHeader}>Head-to-Head Results:</Text>
              <FlatList
                data={fixtures}
                keyExtractor={(item) => item.fixture_id.toString()}
                renderItem={renderFixtureItem}
              />
            </>
          ) : (
            team1Id &&
            team2Id && (
              <Text style={styles.noResultsText}>
                No head-to-head fixtures found between these teams.
              </Text>
            )
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
  },
  picker: {
    marginVertical: 8,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  card: {
    marginBottom: 10,
  },
  fixtureDate: {
    fontSize: 14,
    color: "#888",
  },
  fixtureTeams: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fixtureLeague: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
