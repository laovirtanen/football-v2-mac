// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

// Import your screens
import HomeScreen from "./screens/HomeScreen";
import LeagueStandingsScreen from "./screens/LeagueStandingsScreen";
import PlayerRankingsScreen from "./screens/PlayerRankingsScreen";
import FixturesScreen from "./screens/FixturesScreen";
import MatchDetailsScreen from "./screens/MatchDetailsScreen";
import TeamDetailsScreen from "./screens/TeamDetailsScreen";
import HeadToHeadScreen from "./screens/HeadToHeadScreen";
import PlayerProfileScreen from "./screens/PlayerProfileScreen"; // We'll create this screen later

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Define all your screens here */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTransparent: true,
              headerTitle: "",
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="LeagueStandings"
            component={LeagueStandingsScreen}
            options={{ title: "League Standings" }}
          />
          <Stack.Screen
            name="PlayerRankings"
            component={PlayerRankingsScreen}
            options={{ title: "Player Rankings" }}
          />
          <Stack.Screen
            name="Fixtures"
            component={FixturesScreen}
            options={{ title: "Fixtures" }}
          />
          <Stack.Screen
            name="MatchDetails"
            component={MatchDetailsScreen}
            options={{ title: "Match Details" }}
          />
          <Stack.Screen
            name="TeamDetails"
            component={TeamDetailsScreen}
            options={{ title: "Team Details" }}
          />
          <Stack.Screen
            name="HeadToHead"
            component={HeadToHeadScreen}
            options={{ title: "Head-to-Head" }}
          />
          <Stack.Screen
            name="PlayerProfile"
            component={PlayerProfileScreen}
            options={{ title: "Player Profile" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
