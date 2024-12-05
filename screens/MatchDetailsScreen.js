// screens/MatchDetailsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import createStyles from '../styles';
import apiClient from '../api/apiClient';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryBar,
  VictoryGroup,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function MatchDetailsScreen({ route, navigation }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // Define color scheme
  const colors = {
    background: '#0f0c29',
    primary: '#ff416c',
    secondary: '#ff4b2b',
    accent: '#FFD700',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#444',
    shadow: '#000',
    success: '#32CD32',
    warning: '#FFD700',
    danger: '#FF4500',
  };

  // Import styles from updated styles.js
  const styles = createStyles(colors);

  // State variables
  const { fixtureId } = route.params;
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);

  const [homeRecentForm, setHomeRecentForm] = useState([]);
  const [awayRecentForm, setAwayRecentForm] = useState([]);
  const [homeTeamStats, setHomeTeamStats] = useState(null);
  const [awayTeamStats, setAwayTeamStats] = useState(null);
  const [homeTopPlayers, setHomeTopPlayers] = useState([]);
  const [awayTopPlayers, setAwayTopPlayers] = useState([]);

  // New state variables for match statistics and events
  const [matchStatistics, setMatchStatistics] = useState(null);
  const [matchEvents, setMatchEvents] = useState([]);

  // Recent form filter states
  const [homeFormFilter, setHomeFormFilter] = useState('All');
  const [awayFormFilter, setAwayFormFilter] = useState('All');

  // Show more state for recent form
  const [homeShowMore, setHomeShowMore] = useState(false);
  const [awayShowMore, setAwayShowMore] = useState(false);

  // Fetch fixture details on component mount
  useEffect(() => {
    fetchFixtureDetails();
  }, []);

  const fetchFixtureDetails = async () => {
    try {
      // Assuming apiClient returns data directly
      const data = await apiClient.get(`/fixtures/${fixtureId}/detailed`);
      setFixture(data);

      // Set data
      setHomeRecentForm(data.home_recent_form || []);
      setAwayRecentForm(data.away_recent_form || []);
      setHomeTeamStats(data.home_team_stats);
      setAwayTeamStats(data.away_team_stats);
      setHomeTopPlayers(data.home_top_players);
      setAwayTopPlayers(data.away_top_players);

      // Set match statistics and events if available
      setMatchStatistics(data.match_statistics || null);
      setMatchEvents(data.match_events || []);

      // Log the prediction and comparison data
      console.log('Prediction Data:', data.prediction);
      console.log('Comparison Data:', data.prediction?.comparison);
    } catch (error) {
      console.error(`Error fetching /fixtures/${fixtureId}/detailed:`, error);
      Alert.alert('Error', 'Unable to fetch match details.');
      setLoading(false); // Ensure loading state is updated in case of error
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getBestOdds = () => {
    let bestOdd = null;
    let bestBookmaker = null;

    if (fixture?.odds?.fixture_bookmakers && fixture.prediction) {
      const predictedOutcome = getPredictedOutcome();
      if (!predictedOutcome) {
        return { bestOdd: null, bestBookmaker: null };
      }

      fixture.odds.fixture_bookmakers.forEach((fb) => {
        fb.bets.forEach((bet) => {
          if (bet.bet_type?.name === 'Match Winner') {
            bet.odd_values.forEach((oddValue) => {
              if (oddValue.value === predictedOutcome) {
                if (
                  !bestOdd ||
                  parseFloat(oddValue.odd) > parseFloat(bestOdd)
                ) {
                  bestOdd = oddValue.odd;
                  bestBookmaker = fb.bookmaker?.name || 'Unknown';
                }
              }
            });
          }
        });
      });
    }

    return { bestOdd, bestBookmaker };
  };

  const getPredictedOutcome = () => {
    const { prediction } = fixture;
    if (!prediction) return null;
    if (prediction.winner_team_id === fixture.home_team?.team_id) {
      return 'Home';
    } else if (prediction.winner_team_id === fixture.away_team?.team_id) {
      return 'Away';
    } else if (prediction.winner_team_id === null) {
      return 'Draw';
    }
    return null;
  };

  const filterRecentForm = (data, filter, showMore) => {
    let filteredData = data;
    if (filter !== 'All') {
      filteredData = data.filter((item) => item.home_or_away === filter);
    }
    const limit = showMore ? 10 : 5;
    return filteredData.slice(0, limit);
  };

  const renderStatistics = (homeStats, awayStats) => {
    const statsData = [
      {
        label: 'Matches Played',
        home: homeStats.matches_played,
        away: awayStats.matches_played,
      },
      { label: 'Wins', home: homeStats.wins, away: awayStats.wins },
      { label: 'Draws', home: homeStats.draws, away: awayStats.draws },
      { label: 'Losses', home: homeStats.losses, away: awayStats.losses },
      { label: 'Goals For', home: homeStats.goals_for, away: awayStats.goals_for },
      {
        label: 'Goals Against',
        home: homeStats.goals_against,
        away: awayStats.goals_against,
      },
      {
        label: 'Goal Difference',
        home: homeStats.goal_difference,
        away: awayStats.goal_difference,
      },
      {
        label: 'Clean Sheets',
        home: homeStats.clean_sheets,
        away: awayStats.clean_sheets,
      },
      {
        label: 'Avg Shots on Target',
        home: homeStats.average_shots_on_target
          ? homeStats.average_shots_on_target.toFixed(2)
          : 'N/A',
        away: awayStats.average_shots_on_target
          ? awayStats.average_shots_on_target.toFixed(2)
          : 'N/A',
      },
      {
        label: 'Avg Tackles',
        home: homeStats.average_tackles
          ? homeStats.average_tackles.toFixed(2)
          : 'N/A',
        away: awayStats.average_tackles
          ? awayStats.average_tackles.toFixed(2)
          : 'N/A',
      },
      {
        label: 'Avg Pass Accuracy',
        home: homeStats.average_passes_accuracy
          ? `${homeStats.average_passes_accuracy.toFixed(2)}%`
          : 'N/A',
        away: awayStats.average_passes_accuracy
          ? `${awayStats.average_passes_accuracy.toFixed(2)}%`
          : 'N/A',
      },
    ];

    return (
      <View style={styles.statsTable}>
        {statsData.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statValue}>{stat.home}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.away}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderTopPlayers = (players, teamName) => {
    if (players.length === 0) {
      return (
        <Text style={styles.noPlayersText}>No top players available.</Text>
      );
    }

    return (
      <View style={styles.topPlayersContainer}>
        <Text style={styles.subSectionTitle}>{teamName}</Text>
        {players.map((player, index) => (
          <Animatable.View
            key={player.player_id}
            style={styles.playerCard}
            animation="fadeInUp"
            delay={index * 100}
          >
            {/* Player Image */}
            <View style={styles.playerAvatarContainer}>
              {player.photo ? (
                <Image
                  source={{ uri: player.photo }}
                  style={styles.playerAvatar}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={40}
                  color={colors.primary}
                  style={styles.playerIcon}
                />
              )}
            </View>
            {/* Player Info */}
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerPosition}>{player.position}</Text>
            </View>
            {/* Player Stats */}
            <View style={styles.playerStats}>
              <View style={styles.playerStat}>
                <MaterialCommunityIcons
                  name="soccer"
                  size={18}
                  color={colors.secondary}
                />
                <Text style={styles.statText}>{player.goals || 0} Goals</Text>
              </View>
              {/* Add more stats if available */}
            </View>
          </Animatable.View>
        ))}
      </View>
    );
  };

  // Function to get event icon based on event type
  const getEventIcon = (event) => {
    const iconSize = 24;
    switch (event.type) {
      case 'Goal':
        if (event.detail === 'Penalty') {
          return (
            <FontAwesome5 name="futbol" size={iconSize} color={colors.success} />
          );
        } else if (event.detail === 'Own Goal') {
          return (
            <MaterialCommunityIcons name="alert-circle-outline" size={iconSize} color={colors.danger} />
          );
        } else {
          return (
            <FontAwesome5 name="futbol" size={iconSize} color={colors.success} />
          );
        }
      case 'Card':
        if (event.detail === 'Yellow Card') {
          return (
            <MaterialCommunityIcons name="card" size={iconSize} color={colors.warning} />
          );
        } else if (event.detail === 'Red Card') {
          return (
            <MaterialCommunityIcons name="card" size={iconSize} color={colors.danger} />
          );
        } else if (event.detail === 'Second Yellow Card') {
          return (
            <MaterialCommunityIcons name="card-multiple" size={iconSize} color={colors.danger} />
          );
        } else {
          return (
            <MaterialCommunityIcons name="card" size={iconSize} color={colors.primary} />
          );
        }
      case 'Substitution':
        return (
          <MaterialCommunityIcons name="swap-horizontal" size={iconSize} color={colors.accent} />
        );
      case 'Var':
      case 'VAR':
        return (
          <MaterialCommunityIcons name="eye" size={iconSize} color={colors.accent} />
        );
      default:
        return (
          <MaterialCommunityIcons name="information-outline" size={iconSize} color={colors.primary} />
        );
    }
  };

  // Function to render match events
  const renderMatchEvents = (events) => {
    if (!events || events.length === 0) {
      return (
        <Text style={styles.noEventsText}>No match events available.</Text>
      );
    }

    // Sort events by minute ascending
    const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

    return (
      <View style={styles.eventsContainer}>
        {sortedEvents.map((event, index) => {
          const isHomeTeam = event.team_id === fixture.home_team?.team_id;
          const alignmentStyle = isHomeTeam ? styles.eventRowHome : styles.eventRowAway;
          const eventIcon = getEventIcon(event);

          return (
            <View key={index} style={[styles.eventRow, alignmentStyle]}>
              <View style={styles.eventBubble}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventMinute}>{event.minute}'</Text>
                  {eventIcon}
                </View>
                <Text style={styles.eventPlayer}>{event.player_name || 'N/A'}</Text>
                {event.assist_name ? (
                  <Text style={styles.eventAssist}>Assist: {event.assist_name}</Text>
                ) : null}
                <Text style={styles.eventDetail}>{event.detail}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  // Function to render match statistics
  const renderMatchStatistics = (stats) => {
    if (!stats || !stats.home || !stats.away) {
      return (
        <Text style={styles.noStatsText}>No match statistics available.</Text>
      );
    }

    const statisticTypes = Object.keys(stats.home);

    return (
      <View style={styles.statsTable}>
        {statisticTypes.map((statType, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statValue}>{stats.home[statType] || 'N/A'}</Text>
            <Text style={styles.statLabel}>{statType}</Text>
            <Text style={styles.statValue}>{stats.away[statType] || 'N/A'}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render the radar chart and bar charts for prediction comparison
  const renderPredictionComparison = (comparison) => {
    if (!comparison) {
      return (
        <Text style={styles.noPredictionText}>No comparison data available.</Text>
      );
    }

    console.log('Comparison Data:', comparison);

    // Define metrics with labels
    const metrics = [
      { key: 'strength', label: 'Strength' },
      { key: 'att', label: 'Attacking Potential' },
      { key: 'def', label: 'Defensive Potential' },
      { key: 'form', label: 'Form' },
      { key: 'h2h', label: 'H2H' },
      { key: 'goals', label: 'Goals' },
      { key: 'poisson_distribution', label: 'Poisson Distribution' },
      { key: 'total', label: 'Total' },
    ];

    // Prepare data for radar chart
    const radarData = [];

    metrics.forEach((metric) => {
      if (comparison[metric.key]) {
        const homeValue = parseFloat(comparison[metric.key].home.replace('%', '')) || 0;
        const awayValue = parseFloat(comparison[metric.key].away.replace('%', '')) || 0;

        radarData.push({
          x: metric.label,
          home: homeValue,
          away: awayValue,
        });
      }
    });

    // Prepare data for bar charts
    const barData = radarData;

    const screenWidth = Dimensions.get('window').width - 64; // Adjust for padding

    return (
      <View style={styles.predictionContainer}>
        {/* Radar Chart */}
        {radarData.length > 0 && (
          <View style={styles.radarChartContainer}>
            <Text style={styles.subSectionTitle}>Team Comparison</Text>
            <VictoryChart
              polar
              width={screenWidth}
              height={400}
              domain={{ y: [0, 100] }}
            >
              <VictoryPolarAxis
                dependentAxis
                style={{
                  axisLabel: { padding: 30, fill: colors.text },
                  tickLabels: { fill: colors.text, fontSize: 12 },
                  grid: { stroke: colors.border },
                }}
              />
              <VictoryPolarAxis
                style={{
                  axisLabel: { fill: colors.text },
                  tickLabels: { fill: colors.text, fontSize: 12 },
                  grid: { stroke: colors.border },
                }}
                labelPlacement="vertical"
                tickValues={radarData.map((d) => d.x)}
                tickFormat={radarData.map((d) => d.x)}
              />
              <VictoryGroup
                colorScale={[colors.primary, colors.secondary]}
                style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
              >
                <VictoryArea
                  data={radarData.map((d) => ({ x: d.x, y: d.home }))}
                />
                <VictoryArea
                  data={radarData.map((d) => ({ x: d.x, y: d.away }))}
                />
              </VictoryGroup>
            </VictoryChart>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: colors.primary }]} />
                <Text style={styles.legendLabel}>{fixture.home_team?.name || 'Home Team'}</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: colors.secondary }]} />
                <Text style={styles.legendLabel}>{fixture.away_team?.name || 'Away Team'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Bar Charts */}
        {barData.length > 0 && (
          <View style={styles.barChartsContainer}>
            <Text style={styles.subSectionTitle}>Performance Metrics</Text>
            {barData.map((item, index) => (
              <View key={index} style={styles.barChartItem}>
                <Text style={styles.barChartLabel}>{item.x}</Text>
                <View style={styles.barChartTeamLabels}>
                  <Text style={styles.barChartTeamLabel}>
                    {fixture.home_team?.name || 'Home'}: {item.home}%
                  </Text>
                  <Text style={styles.barChartTeamLabel}>
                    {fixture.away_team?.name || 'Away'}: {item.away}%
                  </Text>
                </View>
                <View style={styles.bar}>
                  <View
                    style={[
                      styles.barSegment,
                      {
                        width: `${item.home}%`,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Text style={styles.barText}>{item.home}%</Text>
                  </View>
                  <View
                    style={[
                      styles.barSegment,
                      {
                        width: `${item.away}%`,
                        backgroundColor: colors.secondary,
                      },
                    ]}
                  >
                    <Text style={styles.barText}>{item.away}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Ensure that the conditional return comes after all hooks and functions
  if (!fontsLoaded) {
    return null; // Optionally, display a loading indicator
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!fixture) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No match details available.</Text>
      </View>
    );
  }

  const { prediction } = fixture;

  const { bestOdd, bestBookmaker } = getBestOdds();

  // Screen width for charts
  const screenWidth = Dimensions.get('window').width - 32; // Adjust for padding

  // Check if the match is played or upcoming
  const isMatchPlayed =
    ['FT', 'AET', 'PEN', 'AWD', 'WO'].includes(fixture.status_short);

  return (
    <LinearGradient
      colors={[colors.background, '#302b63', '#24243e']}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Teams Section */}
          <Animatable.View
            animation="fadeInDown"
            delay={200}
            style={styles.teamsContainer}
          >
            <TouchableOpacity
              style={styles.team}
              onPress={() =>
                navigation.navigate('TeamDetails', {
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
              <Text
                style={styles.teamName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {fixture.home_team?.name || 'Home Team'}
              </Text>
            </TouchableOpacity>
            <View style={styles.vsContainer}>
              {isMatchPlayed ? (
                <Text style={styles.scoreText}>
                  {fixture.goals_home} - {fixture.goals_away}
                </Text>
              ) : (
                <Text style={styles.vsText}>vs</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.team}
              onPress={() =>
                navigation.navigate('TeamDetails', {
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
              <Text
                style={styles.teamName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {fixture.away_team?.name || 'Away Team'}
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Match Details */}
          <Animatable.View
            animation="fadeInUp"
            delay={300}
            style={styles.card}
          >
            <Text style={styles.infoText}>
              {`Date: ${
                fixture.date ? new Date(fixture.date).toLocaleString() : 'Unknown'
              }`}
            </Text>
            <Text style={styles.infoText}>
              {`Venue: ${fixture.venue?.name || 'Unknown'}, ${
                fixture.venue?.city || ''
              }`}
            </Text>
            <Text style={styles.infoText}>
              {`Referee: ${fixture.referee || 'N/A'}`}
            </Text>
            <Text style={styles.infoText}>
              {`League: ${fixture.league?.name || 'Unknown'}`}
            </Text>
          </Animatable.View>

          {/* Conditional Rendering Based on Match Status */}
          {isMatchPlayed ? (
            // Match has been played, display results and statistics
            <>
              {/* Match Events */}
              <Animatable.View
                animation="fadeInUp"
                delay={400}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>Match Events</Text>
                {renderMatchEvents(matchEvents)}
              </Animatable.View>

              {/* Match Statistics */}
              <Animatable.View
                animation="fadeInUp"
                delay={500}
                style={styles.card}
              >
                <Text style={styles.sectionTitle}>Match Statistics</Text>
                {renderMatchStatistics(matchStatistics)}
              </Animatable.View>
            </>
          ) : (
            // Match is upcoming, display predictions and odds
            <>
                        {/* Prediction Section */}
          {prediction ? (
            <Animatable.View
              animation="fadeInUp"
              delay={400}
              style={styles.card}
            >
              <Text style={styles.sectionTitle}>Prediction</Text>
              <View style={styles.predictionAdviceContainer}>
                <Text style={styles.adviceText}>
                  {prediction.advice || 'No advice available'}
                </Text>
              </View>

              {/* Prediction Comparison Charts */}
              {renderPredictionComparison(prediction.comparison)}
            </Animatable.View>
          ) : (
            <Animatable.View
              animation="fadeInUp"
              delay={400}
              style={styles.card}
            >
              <Text style={styles.sectionTitle}>Prediction</Text>
              <Text style={styles.adviceText}>
                No prediction available for this match.
              </Text>
            </Animatable.View>
          )}


              {/* Best Odds Section */}
              {bestOdd && bestBookmaker ? (
                <Animatable.View
                  animation="fadeInUp"
                  delay={500}
                  style={styles.card}
                >
                  <Text style={styles.sectionTitle}>Best Odds</Text>
                  <Text style={styles.oddsText}>
                    {`Odds: ${bestOdd} (via ${bestBookmaker})`}
                  </Text>
                </Animatable.View>
              ) : (
                <Animatable.View
                  animation="fadeInUp"
                  delay={500}
                  style={styles.card}
                >
                  <Text style={styles.sectionTitle}>Best Odds</Text>
                  <Text style={styles.oddsText}>
                    Odds not available for the predicted outcome.
                  </Text>
                </Animatable.View>
              )}
            </>
          )}

          {/* Recent Form */}
          <Animatable.View
            animation="fadeInUp"
            delay={600}
            style={styles.card}
          >
            <Text style={styles.sectionTitle}>Recent Form</Text>
            {/* Home Team Recent Form */}
            <Text style={styles.subSectionTitle}>
              {fixture.home_team?.name || 'Home Team'}
            </Text>
            <View style={styles.filterContainer}>
              {['All', 'Home', 'Away'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    homeFormFilter === filter && styles.filterButtonActive,
                  ]}
                  onPress={() => {
                    setHomeFormFilter(filter);
                    setHomeShowMore(false);
                  }}
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
              {filterRecentForm(
                homeRecentForm,
                homeFormFilter,
                homeShowMore
              ).map((item, index) => (
                <Animatable.View
                  key={item.fixture_id}
                  style={styles.formItem}
                  animation="fadeInRight"
                  delay={index * 100}
                >
                  <View
                    style={[
                      styles.outcomeBadge,
                      item.outcome === 'W'
                        ? styles.winBadge
                        : item.outcome === 'D'
                        ? styles.drawBadge
                        : styles.lossBadge,
                    ]}
                  >
                    <Text style={styles.outcomeText}>{item.outcome}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TeamDetails', {
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
                  <Text
                    style={[
                      styles.resultText,
                      item.outcome === 'W'
                        ? styles.winText
                        : item.outcome === 'D'
                        ? styles.drawText
                        : styles.lossText,
                    ]}
                  >
                    {`${item.goals_for} - ${item.goals_against}`}
                  </Text>
                </Animatable.View>
              ))}
              {filterRecentForm(
                homeRecentForm,
                homeFormFilter,
                homeShowMore
              ).length <
                filterRecentForm(homeRecentForm, homeFormFilter, true).length && (
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setHomeShowMore(!homeShowMore)}
                >
                  <Text style={styles.showMoreText}>
                    {homeShowMore ? 'Show Less' : 'Show More'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Away Team Recent Form */}
            <Text style={styles.subSectionTitle}>
              {fixture.away_team?.name || 'Away Team'}
            </Text>
            <View style={styles.filterContainer}>
              {['All', 'Home', 'Away'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    awayFormFilter === filter && styles.filterButtonActive,
                  ]}
                  onPress={() => {
                    setAwayFormFilter(filter);
                    setAwayShowMore(false);
                  }}
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
              {filterRecentForm(
                awayRecentForm,
                awayFormFilter,
                awayShowMore
              ).map((item, index) => (
                <Animatable.View
                  key={item.fixture_id}
                  style={styles.formItem}
                  animation="fadeInRight"
                  delay={index * 100}
                >
                  <View
                    style={[
                      styles.outcomeBadge,
                      item.outcome === 'W'
                        ? styles.winBadge
                        : item.outcome === 'D'
                        ? styles.drawBadge
                        : styles.lossBadge,
                    ]}
                  >
                    <Text style={styles.outcomeText}>{item.outcome}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TeamDetails', {
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
                  <Text
                    style={[
                      styles.resultText,
                      item.outcome === 'W'
                        ? styles.winText
                        : item.outcome === 'D'
                        ? styles.drawText
                        : styles.lossText,
                    ]}
                  >
                    {`${item.goals_for} - ${item.goals_against}`}
                  </Text>
                </Animatable.View>
              ))}
              {filterRecentForm(
                awayRecentForm,
                awayFormFilter,
                awayShowMore
              ).length <
                filterRecentForm(awayRecentForm, awayFormFilter, true).length && (
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setAwayShowMore(!awayShowMore)}
                >
                  <Text style={styles.showMoreText}>
                    {awayShowMore ? 'Show Less' : 'Show More'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Animatable.View>

          {/* Team Statistics */}
          {homeTeamStats && awayTeamStats && (
            <Animatable.View
              animation="fadeInUp"
              delay={700}
              style={styles.card}
            >
              <Text style={styles.sectionTitle}>Team Statistics</Text>
              <View style={styles.statsHeader}>
                <View style={styles.statsTeam}>
                  {fixture.home_team?.logo ? (
                    <Image
                      source={{ uri: fixture.home_team.logo }}
                      style={styles.statsTeamLogo}
                    />
                  ) : (
                    <View style={styles.placeholderLogoSmall} />
                  )}
                  <Text style={styles.statsTeamName}>
                    {fixture.home_team?.name || 'Home'}
                  </Text>
                </View>
                <View style={styles.statsTeam}>
                  {fixture.away_team?.logo ? (
                    <Image
                      source={{ uri: fixture.away_team.logo }}
                      style={styles.statsTeamLogo}
                    />
                  ) : (
                    <View style={styles.placeholderLogoSmall} />
                  )}
                  <Text style={styles.statsTeamName}>
                    {fixture.away_team?.name || 'Away'}
                  </Text>
                </View>
              </View>
              {renderStatistics(homeTeamStats, awayTeamStats)}
            </Animatable.View>
          )}

          {/* Match Statistics */}
          {isMatchPlayed && matchStatistics && (
            <Animatable.View
              animation="fadeInUp"
              delay={800}
              style={styles.card}
            >
              <Text style={styles.sectionTitle}>Match Statistics</Text>
              {renderMatchStatistics(matchStatistics)}
            </Animatable.View>
          )}

          {/* Top Players */}
          <Animatable.View
            animation="fadeInUp"
            delay={900}
            style={styles.card}
          >
            <Text style={styles.sectionTitle}>Top Players</Text>
            {/* Home Team Top Players */}
            {renderTopPlayers(
              homeTopPlayers,
              fixture.home_team?.name || 'Home Team'
            )}
            {/* Away Team Top Players */}
            {renderTopPlayers(
              awayTopPlayers,
              fixture.away_team?.name || 'Away Team'
            )}
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
