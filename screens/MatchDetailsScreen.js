// screens/MatchDetailsScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import createStyles from "../styles";
import apiClient from "../api/apiClient";
import { PieChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MatchDetailsScreen({ route, navigation }) {
  const { colors, dark } = useTheme();
  const styles = createStyles(colors);
  const { fixtureId } = route.params;
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);

  // New state variables
  const [homeRecentForm, setHomeRecentForm] = useState([]);
  const [awayRecentForm, setAwayRecentForm] = useState([]);
  const [homeTeamStats, setHomeTeamStats] = useState(null);
  const [awayTeamStats, setAwayTeamStats] = useState(null);
  const [homeTopPlayers, setHomeTopPlayers] = useState([]);
  const [awayTopPlayers, setAwayTopPlayers] = useState([]);

  // Recent form filter states
  const [homeFormFilter, setHomeFormFilter] = useState("All");
  const [awayFormFilter, setAwayFormFilter] = useState("All");

  useEffect(() => {
    fetchFixtureDetails();
  }, []);

  const fetchFixtureDetails = async () => {
    try {
      const response = await apiClient.get(`/fixtures/${fixtureId}/detailed`);
      const data = response;
      setFixture(data);

      // Set new data
      setHomeRecentForm(data.home_recent_form || []);
      setAwayRecentForm(data.away_recent_form || []);
      setHomeTeamStats(data.home_team_stats);
      setAwayTeamStats(data.away_team_stats);
      setHomeTopPlayers(data.home_top_players);
      setAwayTopPlayers(data.away_top_players);
    } catch (error) {
      console.error(`Error fetching /fixtures/${fixtureId}/detailed:`, error);
      Alert.alert("Error", "Unable to fetch match details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size={24} style={styles.loader} color={colors.primary} />
    );
  }

  if (!fixture) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>No match details available.</Text>
      </View>
    );
  }

  const { prediction } = fixture;

  // Helper function to get the best odds and bookmaker
  const getBestOdds = () => {
    let bestOdd = null;
    let bestBookmaker = null;

    if (fixture.odds && fixture.odds.fixture_bookmakers && prediction) {
      const predictedOutcome = getPredictedOutcome();
      if (!predictedOutcome) {
        return { bestOdd: null, bestBookmaker: null };
      }

      fixture.odds.fixture_bookmakers.forEach((fb) => {
        fb.bets.forEach((bet) => {
          if (bet.bet_type?.name === "Match Winner") {
            bet.odd_values.forEach((oddValue) => {
              if (oddValue.value === predictedOutcome) {
                if (!bestOdd || parseFloat(oddValue.odd) > parseFloat(bestOdd)) {
                  bestOdd = oddValue.odd;
                  bestBookmaker = fb.bookmaker?.name || "Unknown";
                }
              }
            });
          }
        });
      });
    }

    return { bestOdd, bestBookmaker };
  };

  // Function to determine the predicted outcome as a string
  const getPredictedOutcome = () => {
    if (!prediction) return null;
    if (prediction.winner_team_id === fixture.home_team?.team_id) {
      return "Home";
    } else if (prediction.winner_team_id === fixture.away_team?.team_id) {
      return "Away";
    } else if (prediction.winner_team_id === null) {
      return "Draw";
    }
    return null;
  };

  const { bestOdd, bestBookmaker } = getBestOdds();

  // Prepare data for the pie chart if prediction is available
  let pieChartData = [];
  if (prediction) {
    pieChartData = [
      {
        name: fixture.home_team?.name || "Home Team",
        percentage: parseFloat(prediction.percent_home) || 0,
        color: colors.primary,
        legendFontColor: colors.text,
        legendFontSize: 12,
      },
      {
        name: "Draw",
        percentage: parseFloat(prediction.percent_draw) || 0,
        color: colors.secondary,
        legendFontColor: colors.text,
        legendFontSize: 12,
      },
      {
        name: fixture.away_team?.name || "Away Team",
        percentage: parseFloat(prediction.percent_away) || 0,
        color: colors.accent,
        legendFontColor: colors.text,
        legendFontSize: 12,
      },
    ];
  }

  // Screen width for charts
  const screenWidth = Dimensions.get("window").width - 32; // Adjust for padding

  // Filter recent form matches
  const filterRecentForm = (data, filter) => {
    let filteredData = data;
    if (filter !== "All") {
      filteredData = data.filter((item) => item.home_or_away === filter);
    }
    // Ensure at least 5 matches are displayed
    return filteredData.slice(0, 5);
  };

  // Helper function to render team statistics
  const renderStatistics = (homeStats, awayStats) => {
    const statsData = [
      {
        label: "Matches Played",
        home: homeStats.matches_played,
        away: awayStats.matches_played,
      },
      { label: "Wins", home: homeStats.wins, away: awayStats.wins },
      { label: "Draws", home: homeStats.draws, away: awayStats.draws },
      { label: "Losses", home: homeStats.losses, away: awayStats.losses },
      { label: "Goals For", home: homeStats.goals_for, away: awayStats.goals_for },
      {
        label: "Goals Against",
        home: homeStats.goals_against,
        away: awayStats.goals_against,
      },
      {
        label: "Goal Difference",
        home: homeStats.goal_difference,
        away: awayStats.goal_difference,
      },
      {
        label: "Clean Sheets",
        home: homeStats.clean_sheets,
        away: awayStats.clean_sheets,
      },
      {
        label: "Avg Shots on Target",
        home: homeStats.average_shots_on_target
          ? homeStats.average_shots_on_target.toFixed(2)
          : "N/A",
        away: awayStats.average_shots_on_target
          ? awayStats.average_shots_on_target.toFixed(2)
          : "N/A",
      },
      {
        label: "Avg Tackles",
        home: homeStats.average_tackles
          ? homeStats.average_tackles.toFixed(2)
          : "N/A",
        away: awayStats.average_tackles
          ? awayStats.average_tackles.toFixed(2)
          : "N/A",
      },
      {
        label: "Avg Pass Accuracy",
        home: homeStats.average_passes_accuracy
          ? homeStats.average_passes_accuracy.toFixed(2) + "%"
          : "N/A",
        away: awayStats.average_passes_accuracy
          ? awayStats.average_passes_accuracy.toFixed(2) + "%"
          : "N/A",
      },
    ];

    return statsData.map((stat, index) => (
      <View key={index} style={styles.statRow}>
        <Text style={styles.statValue}>{stat.home}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
        <Text style={styles.statValue}>{stat.away}</Text>
      </View>
    ));
  };

  return (
    <LinearGradient
      colors={dark ? ["#121212", "#1E1E1E"] : ["#f0f4f7", "#d9e2ec"]}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Teams Section */}
        <View style={styles.teamsContainer}>
          <TouchableOpacity
            style={styles.team}
            onPress={() =>
              navigation.navigate("TeamDetails", {
                teamId: fixture.home_team?.team_id,
              })
            }
          >
            {fixture.home_team?.logo ? (
              <Image
                source={{ uri: fixture.home_team.logo }}
                style={styles.teamLogoLarge}
              />
            ) : (
              <View style={styles.placeholderLogo} />
            )}
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
              {fixture.home_team?.name || "Home Team"}
            </Text>
          </TouchableOpacity>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>vs</Text>
          </View>
          <TouchableOpacity
            style={styles.team}
            onPress={() =>
              navigation.navigate("TeamDetails", {
                teamId: fixture.away_team?.team_id,
              })
            }
          >
            {fixture.away_team?.logo ? (
              <Image
                source={{ uri: fixture.away_team.logo }}
                style={styles.teamLogoLarge}
              />
            ) : (
              <View style={styles.placeholderLogo} />
            )}
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
              {fixture.away_team?.name || "Away Team"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Match Details */}
        <View style={styles.card}>
          <Text style={styles.infoText}>
            {`Date: ${
              fixture.date ? new Date(fixture.date).toLocaleString() : "Unknown"
            }`}
          </Text>
          <Text style={styles.infoText}>
            {`Venue: ${fixture.venue?.name || "Unknown"}, ${
              fixture.venue?.city || ""
            }`}
          </Text>
          <Text style={styles.infoText}>
            {`Referee: ${fixture.referee || "N/A"}`}
          </Text>
          <Text style={styles.infoText}>
            {`League: ${fixture.league?.name || "Unknown"}`}
          </Text>
        </View>

        {/* Prediction Section */}
        {prediction ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Prediction</Text>
            <Text style={styles.adviceText}>
              {prediction.advice || "No advice available"}
            </Text>

            {/* Pie Chart for Prediction Percentages */}
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
                labelColor: (opacity = 1) => colors.text,
                strokeWidth: 2,
                barPercentage: 0.5,
                useShadowColorFromDataset: false,
              }}
              accessor={"percentage"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
              style={styles.pieChart}
            />
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Prediction</Text>
            <Text style={styles.adviceText}>
              No prediction available for this match.
            </Text>
          </View>
        )}

        {/* Best Odds Section */}
        {bestOdd && bestBookmaker ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Best Odds</Text>
            <Text style={styles.oddsText}>
              {`Odds: ${bestOdd} (via ${bestBookmaker})`}
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Best Odds</Text>
            <Text style={styles.oddsText}>
              Odds not available for the predicted outcome.
            </Text>
          </View>
        )}

        {/* Recent Form */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recent Form</Text>
          {/* Home Team Recent Form */}
          <Text style={styles.subSectionTitle}>
            {fixture.home_team?.name || "Home Team"}
          </Text>
          <View style={styles.filterContainer}>
            {["All", "Home", "Away"].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  homeFormFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setHomeFormFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    homeFormFilter === filter && styles.filterButtonTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.formContainer}>
            {filterRecentForm(homeRecentForm, homeFormFilter).map((item) => (
              <View key={item.fixture_id} style={styles.formItem}>
                <View
                  style={[
                    styles.outcomeBadge,
                    item.outcome === "W"
                      ? styles.winBadge
                      : item.outcome === "D"
                      ? styles.drawBadge
                      : styles.lossBadge,
                  ]}
                >
                  <Text style={styles.outcomeText}>{item.outcome}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TeamDetails", {
                      teamId: item.opponent_team_id,
                    })
                  }
                >
                  <Image
                    source={{ uri: item.opponent_logo }}
                    style={styles.opponentLogo}
                  />
                </TouchableOpacity>
                <Text style={styles.formText}>
                  {`${item.date.substring(0, 10)} vs ${item.opponent} (${item.home_or_away})`}
                </Text>
              </View>
            ))}
          </View>
          {/* Away Team Recent Form */}
          <Text style={styles.subSectionTitle}>
            {fixture.away_team?.name || "Away Team"}
          </Text>
          <View style={styles.filterContainer}>
            {["All", "Home", "Away"].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  awayFormFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setAwayFormFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    awayFormFilter === filter && styles.filterButtonTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.formContainer}>
            {filterRecentForm(awayRecentForm, awayFormFilter).map((item) => (
              <View key={item.fixture_id} style={styles.formItem}>
                <View
                  style={[
                    styles.outcomeBadge,
                    item.outcome === "W"
                      ? styles.winBadge
                      : item.outcome === "D"
                      ? styles.drawBadge
                      : styles.lossBadge,
                  ]}
                >
                  <Text style={styles.outcomeText}>{item.outcome}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TeamDetails", {
                      teamId: item.opponent_team_id,
                    })
                  }
                >
                  <Image
                    source={{ uri: item.opponent_logo }}
                    style={styles.opponentLogo}
                  />
                </TouchableOpacity>
                <Text style={styles.formText}>
                  {`${item.date.substring(0, 10)} vs ${item.opponent} (${item.home_or_away})`}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Team Statistics */}
        {homeTeamStats && awayTeamStats && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Team Statistics</Text>
            <View style={styles.statsTable}>
              <View style={styles.statsHeader}>
                <Text style={styles.statsTeamName}>
                  {fixture.home_team?.name || "Home"}
                </Text>
                <Text style={styles.statLabel}>Stat</Text>
                <Text style={styles.statsTeamName}>
                  {fixture.away_team?.name || "Away"}
                </Text>
              </View>
              {renderStatistics(homeTeamStats, awayTeamStats)}
            </View>
          </View>
        )}

        {/* Top Players */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Players</Text>
          {/* Home Team Top Players */}
          <Text style={styles.subSectionTitle}>
            {fixture.home_team?.name || "Home Team"}
          </Text>
          {homeTopPlayers.map((item) => (
            <View key={item.player_id} style={styles.playerItem}>
              <MaterialCommunityIcons
                name="soccer"
                size={20}
                color={colors.primary}
                style={styles.playerIcon}
              />
              <Text style={styles.playerText}>
                {`${item.name} (${item.position}) - Goals: ${item.goals}`}
              </Text>
            </View>
          ))}
          {/* Away Team Top Players */}
          <Text style={styles.subSectionTitle}>
            {fixture.away_team?.name || "Away Team"}
          </Text>
          {awayTopPlayers.map((item) => (
            <View key={item.player_id} style={styles.playerItem}>
              <MaterialCommunityIcons
                name="soccer"
                size={20}
                color={colors.primary}
                style={styles.playerIcon}
              />
              <Text style={styles.playerText}>
                {`${item.name} (${item.position}) - Goals: ${item.goals}`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
