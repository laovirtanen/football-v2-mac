// styles.js

import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const createStyles = (colors) =>
  StyleSheet.create({
    // ----------------------------------------
    // General Styles
    // ----------------------------------------
    container: {
      flex: 1,
      paddingHorizontal: 16, // Add horizontal padding
      paddingVertical: 8, // Optional vertical padding
      backgroundColor: colors.background || '#0f0c29',
    },
    scrollContainer: {
      paddingBottom: 20,
      backgroundColor: colors.background || '#0f0c29',
      paddingHorizontal: 16,
    },
    headerContainer: {
      paddingHorizontal: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background || '#0f0c29',
    },

    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background || '#0f0c29',
      padding: 16,
    },
    errorText: {
      fontSize: 16,
      color: colors.text || '#fff',
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background || '#0f0c29',
    },
    background: {
      flex: 1,
      width: width,
      height: height,
    },
    card: {
      marginBottom: 16,
      elevation: 4,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      width: '100%',
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    cardContent: {
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },
    subSectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 12,
      textAlign: 'center',
      color: colors.primary || '#ff416c',
      fontFamily: 'Montserrat_700Bold',
    },
    infoText: {
      fontSize: 16,
      marginVertical: 4,
      color: colors.text || '#fff',
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    adviceText: {
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'center',
      fontStyle: 'italic',
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },
    oddsText: {
      fontSize: 16,
      marginBottom: 4,
      color: colors.text || '#fff',
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    noFixturesText: {
      marginTop: 16,
      textAlign: 'center',
      fontSize: 16,
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },
    noPlayersText: {
      textAlign: 'center',
      fontSize: 16,
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },
    datePickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      width: '100%',
    },
    dateText: {
      fontSize: 16,
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },

    // ----------------------------------------
    // MatchDetailsScreen Styles
    // ----------------------------------------
    teamsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
      width: '100%',
      marginTop: 16,
    },
    team: {
      alignItems: 'center',
      flex: 1,
    },
    vsContainer: {
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    teamLogoLarge: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
      marginBottom: 8,
    },
    placeholderLogo: {
      width: 70,
      height: 70,
      backgroundColor: colors.border || '#ccc',
      marginBottom: 8,
      borderRadius: 40,
    },
    scoreText: {
      color: colors.accent,
      fontFamily: 'Montserrat_700Bold',
      fontSize: 28, // Increased font size for better visibility
      textAlign: 'center',
    },

    teamName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      maxWidth: 120,
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },
    vsText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary || '#ff416c',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 8,
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary || '#ff416c',
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
    },
    filterButtonActive: {
      backgroundColor: colors.primary || '#ff416c',
    },
    filterButtonText: {
      color: colors.text || '#fff',
      fontSize: 14,
      fontFamily: 'Montserrat_400Regular',
    },
    filterButtonTextActive: {
      color: colors.onPrimary || '#fff',
      fontWeight: 'bold',
    },
    formContainer: {
      marginTop: 8,
      width: '100%',
    },
    formItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ccc',
      justifyContent: 'space-between',
      width: '100%',
    },
    outcomeBadge: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    winBadge: {
      backgroundColor: '#32CD32',
    },
    drawBadge: {
      backgroundColor: '#FFD700',
    },
    lossBadge: {
      backgroundColor: '#FF4500',
    },
    outcomeText: {
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    formText: {
      fontSize: 14,
      color: colors.text || '#fff',
      flexShrink: 1,
      flex: 3,
      fontFamily: 'Montserrat_400Regular',
    },
    opponentLogo: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      marginRight: 8,
    },
    resultText: {
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 8,
      width: 60,
      textAlign: 'right',
    },
    winText: {
      color: '#32CD32',
      fontFamily: 'Montserrat_700Bold',
    },
    drawText: {
      color: '#FFD700',
      fontFamily: 'Montserrat_700Bold',
    },
    lossText: {
      color: '#FF4500',
      fontFamily: 'Montserrat_700Bold',
    },
    showMoreButton: {
      marginVertical: 8,
      alignItems: 'center',
    },
    showMoreText: {
      color: colors.primary || '#ff416c',
      fontSize: 16,
      fontFamily: 'Montserrat_700Bold',
    },
    // Team Statistics Styles
    statsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    statsTeam: {
      alignItems: 'center',
      width: '45%',
    },
    statsTeamLogo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 8,
    },
    placeholderLogoSmall: {
      width: 50,
      height: 50,
      backgroundColor: colors.border || '#ccc',
      marginBottom: 8,
      borderRadius: 25,
    },
    statsTeamName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    statsTable: {
      width: '100%',
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      borderRadius: 12,
      overflow: 'hidden',
      padding: 8,
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ccc',
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary || '#ccc',
      flex: 2,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    statValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    topPlayersContainer: {
      marginBottom: 16,
      width: '100%',
    },
    playerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: 12,
      width: '100%',
    },
    playerAvatarContainer: {
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playerAvatar: {
      width: 90,
      height: 90,
      borderRadius: 20,
    },
    playerIcon: {
      width: 40,
      height: 40,
    },
    playerInfo: {
      flex: 2,
    },
    playerName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },
    playerPosition: {
      fontSize: 12,
      color: colors.textSecondary || '#ccc',
      marginTop: 2,
      fontFamily: 'Montserrat_400Regular',
    },
    playerStats: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    playerStat: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      fontSize: 12,
      color: colors.text || '#fff',
      marginLeft: 4,
      fontFamily: 'Montserrat_400Regular',
    },
    pieChart: {
      marginVertical: 8,
    },
    // ----------------------------------------
    // FixturesScreen Styles
    // ----------------------------------------
    fixtureCard: {
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      elevation: 3,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    fixturesItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 8,
      width: '100%',
    },
    time: {
      fontSize: 16,
      color: colors.text || '#fff',
      textAlign: 'center',
      minWidth: 70,
      fontFamily: 'Montserrat_400Regular',
    },
    teamContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
      maxWidth: 100,
    },
    teamLogoSmall: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
      marginRight: 8,
    },
    vsTextSmall: {
      fontSize: 18,
      color: colors.text || '#fff',
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    teamNameSmall: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      flexShrink: 1,
      fontFamily: 'Montserrat_700Bold',
    },
    dropDownPicker: {
      marginVertical: 8,
      zIndex: 10,
      width: '100%',
    },
    dropDownStyle: {
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      borderColor: colors.border || '#ccc',
    },
    dropDownContainerStyle: {
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      borderColor: colors.border || '#ccc',
    },
    dropDownTextStyle: {
      fontSize: 14,
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },
    dropDownLabelStyle: {
      fontWeight: 'bold',
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },
    dropDownSelectedLabelStyle: {
      fontWeight: 'bold',
      color: colors.primary || '#ff416c',
      fontFamily: 'Montserrat_700Bold',
    },
    dropDownArrowIconStyle: {
      tintColor: colors.text || '#fff',
    },
    dropDownTickIconStyle: {
      tintColor: colors.primary || '#ff416c',
    },
    dropDownWrapper: {
      zIndex: 1000, // High zIndex to ensure it appears above other components
      elevation: 1000, // For Android
      marginBottom: 16,
      width: '100%',
    },
    
    // If you have multiple DropDownPickers, adjust zIndex accordingly
    dropDownWrapperSecond: {
      zIndex: 1000,
      elevation: 1000,
    },

    // ----------------------------------------
    // StandingsScreen Styles
    // ----------------------------------------
    standingsContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background || '#0f0c29',
    },
    standingsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ccc',
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      width: '100%',
      paddingHorizontal: 16, // Added padding to prevent text from touching edges
    },
    headerRank: {
      fontSize: 14,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    headerTeam: {
      fontSize: 14,
      color: colors.text || '#fff',
      flex: 1,
      marginLeft: 8,
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    headerPlayed: {
      fontSize: 14,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    headerWins: {
      fontSize: 14,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    headerDraws: {
      fontSize: 14,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    headerLosses: {
      fontSize: 14,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    headerPoints: {
      fontSize: 14,
      color: colors.text || '#fff',
      width: 40,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    standingsItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ccc',
      width: '100%',
      paddingHorizontal: 16, // Added padding to align items properly
    },
    standingsRank: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    standingsTeamLogo: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginRight: 8,
    },
    standingsTeamName: {
      fontSize: 16,
      color: colors.text || '#fff',
      flex: 1,
      fontFamily: 'Montserrat_400Regular',
    },
    standingsPlayed: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    standingsWins: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    standingsDraws: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    standingsLosses: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    standingsPoints: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 40,
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    leagueSelectorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow buttons to wrap to next line
      marginBottom: 16,
    },
    leagueButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8, // Add margin bottom for spacing between rows
      alignItems: 'center',
      justifyContent: 'center',
    },
    leagueButtonSelected: {
      backgroundColor: colors.primary || '#ff416c',
    },
    leagueButtonText: {
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
      textAlign: 'center',
    },
    leagueButtonTextSelected: {
      color: colors.onPrimary || '#fff',
      fontFamily: 'Montserrat_700Bold',
      textAlign: 'center',
    },


    // ----------------------------------------
    // PlayerProfileScreen Styles
    // ----------------------------------------
    statsContainer: {
      width: '100%',
      padding: 16,
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      marginBottom: 24,
      elevation: 4,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    statsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      marginBottom: 16,
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    playerName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary || '#ff416c',
      marginTop: 16,
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    avatar: {
      marginBottom: 16,
      alignSelf: 'center',
    },
    infoText: {
      fontSize: 16,
      color: colors.textSecondary || '#ccc',
      marginBottom: 8,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text || '#fff',
      marginVertical: 12,
      fontFamily: 'Montserrat_700Bold',
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    statLabel: {
      fontSize: 16,
      color: colors.textSecondary || '#ccc',
      fontFamily: 'Montserrat_400Regular',
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },

    // ----------------------------------------
    // Player Styles (used in various screens)
    // ----------------------------------------
    playerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    playerIcon: {
      marginRight: 8,
    },
    playerText: {
      fontSize: 16,
      color: colors.text || '#fff',
      flexShrink: 1,
      fontFamily: 'Montserrat_400Regular',
    },

    // ----------------------------------------
    // LeagueRankingsScreen Styles
    // ----------------------------------------
    rankingsItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ccc',
      width: '100%',
    },
    rankingsRank: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 30,
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    rankingsAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    rankingsPlayerInfo: {
      flex: 1,
    },
    rankingsPlayerName: {
      fontSize: 16,
      color: colors.text || '#fff',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },
    rankingsTeamName: {
      fontSize: 14,
      color: colors.textSecondary || '#ccc',
      fontFamily: 'Montserrat_400Regular',
    },
    rankingsStatValue: {
      fontSize: 16,
      color: colors.text || '#fff',
      width: 40,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },

    // ----------------------------------------
    // DropDownPicker Styles
    // ----------------------------------------
    dropDownPicker: {
      zIndex: 1000,
      marginBottom: 16,
      width: '100%',
    },
    dropDownStyle: {
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      borderColor: colors.border || '#ccc',
    },
    dropDownContainerStyle: {
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      borderColor: colors.border || '#ccc',
    },
    dropDownTextStyle: {
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },
    dropDownLabelStyle: {
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
    },
    dropDownSelectedLabelStyle: {
      fontWeight: 'bold',
      color: colors.primary || '#ff416c',
      fontFamily: 'Montserrat_700Bold',
    },
    dropDownArrowIconStyle: {
      tintColor: colors.text || '#fff',
    },
    dropDownTickIconStyle: {
      tintColor: colors.primary || '#ff416c',
    },

    // ----------------------------------------
    // Picker Styles
    // ----------------------------------------
    picker: {
      marginBottom: 16,
      height: 50,
      width: '100%',
      color: colors.text || '#fff',
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
    },

    // ----------------------------------------
    // Button Styles
    // ----------------------------------------
    button: {
      backgroundColor: colors.primary || '#ff416c',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8,
      width: '80%',
      alignSelf: 'center',
    },
    buttonText: {
      color: colors.onPrimary || '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Montserrat_700Bold',
    },

    // ----------------------------------------
    // TeamDetailsScreen Styles
    // ----------------------------------------
    teamHeaderCard: {
      marginBottom: 24,
      borderRadius: 16,
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      elevation: 6,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    teamHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    teamLogo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      borderRadius: 60,
      borderWidth: 2,
      borderColor: colors.primary || '#ff416c',
    },
    teamInfo: {
      marginLeft: 20,
      flex: 1,
      justifyContent: 'center',
    },
    teamName: {
      fontSize: 26,
      fontWeight: 'bold',
      color: colors.primary || '#ff416c',
      marginBottom: 10,
      fontFamily: 'Montserrat_700Bold',
    },
    teamDetail: {
      fontSize: 16,
      color: colors.textSecondary || '#ccc',
      marginBottom: 6,
      fontFamily: 'Montserrat_400Regular',
    },
    statisticsCard: {
      borderRadius: 16,
      backgroundColor: colors.surface || 'rgba(255, 255, 255, 0.1)',
      elevation: 6,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      padding: 20,
      marginBottom: 24,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statCard: {
      width: '47%',
      backgroundColor: colors.background || '#302b63',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
    statCardLabel: {
      fontSize: 14,
      color: colors.textSecondary || '#ccc',
      textAlign: 'center',
      marginTop: 6,
      fontFamily: 'Montserrat_400Regular',
    },
    statCardValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text || '#fff',
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },

    // ----------------------------------------
    // Stat Type Selector Styles
    // ----------------------------------------
    statTypeSelectorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    statButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 20,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      marginHorizontal: 4,
      minWidth: 80,
    },
    statButtonSelected: {
      backgroundColor: colors.primary || '#ff416c',
    },
    statButtonText: {
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
      textAlign: 'center',
      flexShrink: 1,
    },
    statButtonTextSelected: {
      color: colors.onPrimary || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },

    // ----------------------------------------
    // Match Events Styles
    // ----------------------------------------
    eventsContainer: {
      marginTop: 8, // Optional: Adjust if needed
      width: '100%',
    },
    eventRow: {
      flexDirection: 'row',
      marginVertical: 4, // Reduced from 8 to 4
    },
    eventRowHome: {
      justifyContent: 'flex-start',
    },
    eventRowAway: {
      justifyContent: 'flex-end',
    },
    eventBubble: {
      maxWidth: '75%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10, // Optional: Reduced from 12 to 10
      padding: 8, // Reduced from 10 to 8
    },
    eventHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2, // Reduced from 4 to 2
    },
    eventMinute: {
      fontSize: 10, // Reduced from 12 to 10
      color: colors.textSecondary || '#ccc',
      marginRight: 6, // Optional: Adjusted from 8 to 6
      fontFamily: 'Montserrat_400Regular',
    },
    eventPlayer: {
      fontSize: 12, // Reduced from 14 to 12
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
    },
    eventAssist: {
      fontSize: 10, // Reduced from 12 to 10
      color: colors.textSecondary || '#ccc',
      fontFamily: 'Montserrat_400Regular',
    },
    eventDetail: {
      fontSize: 10, // Reduced from 12 to 10
      color: colors.textSecondary || '#ccc',
      fontFamily: 'Montserrat_400Regular',
    },
    noEventsText: {
      fontSize: 14, // Reduced from 16 to 14
      color: colors.textSecondary || '#ccc',
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },


    // ----------------------------------------
    // Prediction Comparison Styles
    // ----------------------------------------


    predictionContainer: {
      marginTop: 16,
    },
    radarChartContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    radarChart: {
      marginVertical: 8,
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 8,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    legendColorBox: {
      width: 16,
      height: 16,
      marginRight: 4,
    },
    legendLabel: {
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_400Regular',
      fontSize: 12,
      fontWeight: 'bold',
    },
    barChartsContainer: {
      marginTop: 16,
    },
    barChartItem: {
      marginBottom: 16,
    },
    barChartLabel: {
      color: colors.text || '#fff',
      fontFamily: 'Montserrat_700Bold',
      fontSize: 14,
      marginBottom: 4,
    },
    barChart: {
      flexDirection: 'column',
      marginBottom: 4,
    },
    barChartTeamLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    barChartTeamLabel: {
      color: colors.textSecondary || '#ccc',
      fontFamily: 'Montserrat_400Regular',
      fontSize: 12,
    },
    bar: {
      flexDirection: 'row',
      height: 20,
      marginVertical: 2,
      backgroundColor: colors.border,
      overflow: 'hidden',
    },
    barSegment: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    barText: {
      fontSize: 10,
      color: '#fff',
      textAlign: 'center',
    },
    noPredictionText: {
      fontSize: 16,
      color: colors.textSecondary || '#ccc',
      textAlign: 'center',
      fontFamily: 'Montserrat_400Regular',
    },
    predictionAdviceContainer: {
      backgroundColor: colors.accent,
      padding: 8,
      borderRadius: 8,
      marginVertical: 8,
    },
    adviceText: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
      fontFamily: 'Montserrat_700Bold',
    },
    resultTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      position: 'absolute',
      top: 40, // Adjust based on device and header height
      left: 10,
      zIndex: 1,
    },

      });

    export default createStyles;
