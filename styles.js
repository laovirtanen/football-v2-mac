// styles.js

import { StyleSheet } from "react-native";

const createStyles = (colors) =>
  StyleSheet.create({
    // Container Styles
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      alignItems: "center",
      paddingBottom: 20,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 20,
    },

    // Background Style (for LinearGradient)
    background: {
      flex: 1,
    },

    // Card Styles
    card: {
      marginBottom: 16,
      elevation: 2,
      borderRadius: 12,
      padding: 16,
      backgroundColor: colors.surface,
      width: '100%',
    },
    cardContent: {
      alignItems: "center",
    },

    // Text Styles
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: colors.text,
    },
    subSectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 8,
      textAlign: "center",
      color: colors.text,
    },
    infoText: {
      fontSize: 16,
      marginVertical: 4,
      color: colors.text,
      textAlign: 'center',
    },
    statLabel: {
      fontSize: 16,
      color: colors.text,
      flex: 2,
      textAlign: "center",
    },
    statValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      flex: 1,
      textAlign: "center",
    },
    teamName: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      maxWidth: 120,
      color: colors.text,
    },
    teamInfo: {
      fontSize: 16,
      textAlign: "center",
      color: colors.text,
    },
    adviceText: {
      fontSize: 16,
      marginBottom: 16,
      textAlign: "center",
      fontStyle: "italic",
      color: colors.text,
    },
    oddsText: {
      fontSize: 16,
      marginBottom: 4,
      color: colors.text,
    },
    noFixturesText: {
      marginTop: 16,
      textAlign: "center",
      fontSize: 16,
      color: colors.text,
    },

    // Teams Container Styles
    teamsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: 24,
      width: '100%',
      marginTop: 16,
    },
    team: {
      alignItems: "center",
      flex: 1,
    },
    vsContainer: {
      flex: 0.5,
      alignItems: "center",
      justifyContent: "center",
    },
    teamLogoLarge: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginBottom: 8,
    },
    placeholderLogo: {
      width: 80,
      height: 80,
      backgroundColor: colors.border,
      marginBottom: 8,
      borderRadius: 40,
    },
    vsText: {
      fontSize: 24,
      fontWeight: "bold",
      marginHorizontal: 8,
      color: colors.primary,
    },

    // Filter Styles
    filterContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 8,
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.surface,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
    },
    filterButtonText: {
      color: colors.text,
      fontSize: 14,
    },
    filterButtonTextActive: {
      color: colors.onPrimary,
      fontWeight: "bold",
    },

    // Form Styles
    formContainer: {
      marginTop: 8,
      width: "100%",
    },
    formItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    outcomeBadge: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    winBadge: {
      backgroundColor: "#32CD32",
    },
    drawBadge: {
      backgroundColor: "#FFD700",
    },
    lossBadge: {
      backgroundColor: "#FF4500",
    },
    outcomeText: {
      color: "#fff",
      fontWeight: "bold",
    },
    formText: {
      fontSize: 16,
      color: colors.text,
      flexShrink: 1,
    },
    opponentLogo: {
      width: 24,
      height: 24,
      resizeMode: "contain",
      marginRight: 8,
    },

    // Statistics Styles
    statsTable: {
      marginTop: 16,
    },
    statsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    statsTeamName: {
      fontSize: 18,
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
      color: colors.text,
    },
    statRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },

    // Player Profile Styles
    statsContainer: {
      width: '100%',
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 16,
    },
    statsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    playerName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 12,
      textAlign: 'center',
    },
    infoText: {
      fontSize: 18,
      color: colors.text,
      marginVertical: 2,
      textAlign: 'center',
    },
    avatar: {
      marginBottom: 8,
    },

    // Player Styles
    playerItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
    },
    playerIcon: {
      marginRight: 8,
    },
    playerText: {
      fontSize: 16,
      color: colors.text,
      flexShrink: 1,
    },

    // League Standings Styles
    standingsContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    standingsItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    standingsHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    headerRank: {
      fontSize: 14,
      color: colors.text,
      width: 30,
      textAlign: "center",
      fontWeight: "bold",
    },
    headerTeam: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
      marginLeft: 8,
      fontWeight: "bold",
    },
    headerPlayed: {
      fontSize: 14,
      color: colors.text,
      width: 40,
      textAlign: "center",
      fontWeight: "bold",
    },
    headerPoints: {
      fontSize: 14,
      color: colors.text,
      width: 40,
      textAlign: "center",
      fontWeight: "bold",
    },
    standingsRank: {
      fontSize: 16,
      color: colors.text,
      width: 30,
      textAlign: "center",
    },
    standingsTeamLogo: {
      width: 30,
      height: 30,
      resizeMode: "contain",
      marginRight: 8,
    },
    standingsTeamName: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    standingsPlayed: {
      fontSize: 16,
      color: colors.text,
      width: 40,
      textAlign: "center",
    },
    standingsPoints: {
      fontSize: 16,
      color: colors.text,
      width: 40,
      textAlign: "center",
    },

    // Pie Chart Styles
    pieChart: {
      marginVertical: 8,
    },

    // Picker Styles
    picker: {
      marginBottom: 16,
      height: 50,
      width: "100%",
      color: colors.text,
      backgroundColor: colors.surface,
    },

    // DropDownPicker Styles (For FixturesScreen)
    dropDownPicker: {
      zIndex: 1000,
      marginBottom: 16,
    },
    dropDownStyle: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    dropDownContainerStyle: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    dropDownTextStyle: {
      color: colors.text,
    },
    dropDownLabelStyle: {
      color: colors.text,
    },
    dropDownSelectedLabelStyle: {
      fontWeight: "bold",
      color: colors.primary,
    },
    dropDownArrowIconStyle: {
      tintColor: colors.text,
    },
    dropDownTickIconStyle: {
      tintColor: colors.primary,
    },

    // Additional Styles
    datePickerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    dateText: {
      fontSize: 16,
      color: colors.text,
    },

    // Item Container for FlatList Items (FixturesScreen)
    fixturesItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around", // Adjusted from 'space-between' to 'space-around'
        paddingVertical: 8,
        flexWrap: 'nowrap',
      },
      time: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
        minWidth: 70,  // Ensure enough space for the time
        flexShrink: 0, // Prevent the time from shrinking
      },
      teamContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexShrink: 1,
        maxWidth: 100,  // Adjust as needed to prevent names from pushing other elements
      },
      
    teamLogoSmall: {
      width: 24,
      height: 24,
      resizeMode: "contain",
      marginRight: 8,
    },
    vsTextSmall: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
        width: 30,      // Fixed width to center the "vs" text
        flexShrink: 0,  // Prevent the "vs" text from shrinking
      },
    teamNameSmall: {
        fontSize: 16,
        color: colors.text,
        flexShrink: 1,
      },

     // Standings Header Styles
     standingsHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surface,
      },
      headerRank: {
        fontSize: 14,
        color: colors.text,
        width: 30,
        textAlign: "center",
        fontWeight: "bold",
      },
      headerTeam: {
        fontSize: 14,
        color: colors.text,
        flex: 1,
        marginLeft: 8,
        fontWeight: "bold",
      },
      headerPlayed: {
        fontSize: 14,
        color: colors.text,
        width: 30,
        textAlign: "center",
        fontWeight: "bold",
      },
      headerWins: {
        fontSize: 14,
        color: colors.text,
        width: 30,
        textAlign: "center",
        fontWeight: "bold",
      },
      headerDraws: {
        fontSize: 14,
        color: colors.text,
        width: 30,
        textAlign: "center",
        fontWeight: "bold",
      },
      headerLosses: {
        fontSize: 14,
        color: colors.text,
        width: 30,
        textAlign: "center",
        fontWeight: "bold",
      },
      headerPoints: {
        fontSize: 14,
        color: colors.text,
        width: 40,
        textAlign: "center",
        fontWeight: "bold",
      },
  
      // Standings Item Styles
      standingsItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      standingsRank: {
        fontSize: 16,
        color: colors.text,
        width: 30,
        textAlign: "center",
      },
      standingsTeamLogo: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        marginRight: 8,
      },
      standingsTeamName: {
        fontSize: 16,
        color: colors.text,
        flex: 1,
      },
      standingsPlayed: {
        fontSize: 16,
        color: colors.text,
        width: 30,
        textAlign: "center",
      },
      standingsWins: {
        fontSize: 16,
        color: colors.text,
        width: 30,
        textAlign: "center",
      },
      standingsDraws: {
        fontSize: 16,
        color: colors.text,
        width: 30,
        textAlign: "center",
      },
      standingsLosses: {
        fontSize: 16,
        color: colors.text,
        width: 30,
        textAlign: "center",
      },
      standingsPoints: {
        fontSize: 16,
        color: colors.text,
        width: 40,
        textAlign: "center",
      },
  
      // Rankings Item Styles
      rankingsItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      rankingsRank: {
        fontSize: 16,
        color: colors.text,
        width: 30,
        textAlign: "center",
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
        color: colors.text,
        fontWeight: "bold",
      },
      rankingsTeamName: {
        fontSize: 14,
        color: colors.text,
      },
      rankingsStatValue: {
        fontSize: 16,
        color: colors.text,
        width: 40,
        textAlign: "center",
        fontWeight: "bold",
      },
  });

export default createStyles;
