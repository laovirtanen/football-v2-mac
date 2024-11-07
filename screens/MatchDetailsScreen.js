import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import apiClient from "../api/apiClient";
import { PieChart, LineChart } from "react-native-chart-kit";

export default function MatchDetailsScreen({ route }) {
  const { fixtureId } = route.params;
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFixtureDetails();
  }, []);

  const fetchFixtureDetails = async () => {
    try {
      const data = await apiClient.get(`/fixtures/${fixtureId}`);
      setFixture(data);
    } catch (error) {
      console.error(`Error fetching /fixtures/${fixtureId}:`, error);
      Alert.alert("Error", "Unable to fetch match details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" style={styles.loader} color="#1E90FF" />
    );
  }

  if (!fixture) {
    return (
      <View style={styles.container}>
        <Text>No match details available.</Text>
      </View>
    );
  }

  // Helper function to get the best odds and bookmaker
  const getBestOdds = () => {
    let bestOdd = null;
    let bestBookmaker = null;

    if (fixture.odds && fixture.odds.fixture_bookmakers) {
      fixture.odds.fixture_bookmakers.forEach((fb) => {
        fb.bets.forEach((bet) => {
          if (bet.bet_type.name === "Match Winner") {
            bet.odd_values.forEach((oddValue) => {
              const isPredictedOutcome =
                (oddValue.value === "Home" &&
                  fixture.prediction.winner_team_id ===
                    fixture.home_team.team_id) ||
                (oddValue.value === "Away" &&
                  fixture.prediction.winner_team_id ===
                    fixture.away_team.team_id) ||
                (oddValue.value === "Draw" &&
                  !fixture.prediction.winner_team_id);

              if (isPredictedOutcome) {
                if (
                  !bestOdd ||
                  parseFloat(oddValue.odd) > parseFloat(bestOdd)
                ) {
                  bestOdd = oddValue.odd;
                  bestBookmaker = fb.bookmaker.name;
                }
              }
            });
          }
        });
      });
    }

    return { bestOdd, bestBookmaker };
  };

  const { bestOdd, bestBookmaker } = getBestOdds();

  // Prepare data for the pie chart
  const pieChartData = [
    {
      name: fixture.home_team.name,
      percentage: parseFloat(fixture.prediction.percent_home),
      color: "#1E90FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Draw",
      percentage: parseFloat(fixture.prediction.percent_draw),
      color: "#32CD32",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: fixture.away_team.name,
      percentage: parseFloat(fixture.prediction.percent_away),
      color: "#FF4500",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  // Screen width for charts
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      {/* Teams Section */}
      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          <Image
            source={{ uri: fixture.home_team.logo }}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{fixture.home_team.name}</Text>
        </View>
        <Text style={styles.vsText}>vs</Text>
        <View style={styles.team}>
          <Image
            source={{ uri: fixture.away_team.logo }}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{fixture.away_team.name}</Text>
        </View>
      </View>

      {/* Match Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.dateText}>
          {`Date: ${new Date(fixture.date).toLocaleString()}`}
        </Text>
        <Text style={styles.venueText}>
          {`Venue: ${fixture.venue.name}, ${fixture.venue.city}`}
        </Text>
        <Text style={styles.refereeText}>
          {`Referee: ${fixture.referee || "N/A"}`}
        </Text>
        <Text style={styles.leagueText}>
          {`League: ${fixture.league.name}`}
        </Text>
      </View>

      {/* Prediction Section */}
      <View style={styles.predictionContainer}>
        <Text style={styles.sectionTitle}>Prediction</Text>
        <Text style={styles.adviceText}>{fixture.prediction.advice}</Text>

        {/* Pie Chart for Prediction Percentages */}
        <PieChart
          data={pieChartData}
          width={screenWidth - 32} // Adjust for padding
          height={220}
          chartConfig={chartConfig}
          accessor={"percentage"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>

      {/* Best Odds Section */}
      {bestOdd && bestBookmaker && (
        <View style={styles.oddsContainer}>
          <Text style={styles.sectionTitle}>Best Odds</Text>
          <Text style={styles.oddsText}>
            {`Odds: ${bestOdd} (via ${bestBookmaker})`}
          </Text>
        </View>
      )}

      {/* Additional Stats Section (if available) */}
      {/* You can include more charts here, such as recent form, goals scored, etc. */}
    </ScrollView>
  );
}

// Chart configuration
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  team: {
    alignItems: "center",
    flex: 1,
  },
  teamLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  vsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 4,
  },
  venueText: {
    fontSize: 16,
    marginBottom: 4,
  },
  refereeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  leagueText: {
    fontSize: 16,
    marginBottom: 4,
  },
  predictionContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  adviceText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  oddsContainer: {
    marginBottom: 24,
  },
  oddsText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
