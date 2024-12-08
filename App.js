// App.js

import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultThemeBase,
  DarkTheme as NavigationDarkThemeBase,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your screen components
import HomeScreen from './screens/HomeScreen';
import LeagueStandingsScreen from './screens/LeagueStandingsScreen';
import PlayerRankingsScreen from './screens/PlayerRankingsScreen';
import FixturesScreen from './screens/FixturesScreen';
import MatchDetailsScreen from './screens/MatchDetailsScreen';
import TeamDetailsScreen from './screens/TeamDetailsScreen';
import HeadToHeadScreen from './screens/HeadToHeadScreen';
import PlayerProfileScreen from './screens/PlayerProfileScreen';

// Font loading
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Create navigators
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigators for each tab (excluding MatchDetailsScreen)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MatchDetails" 
        component={MatchDetailsScreen} 
        options={{ 
          title: 'Match Details',
          headerShown: true, // Enable header for back button
        }} 
      />
      <Stack.Screen 
        name="TeamDetails" 
        component={TeamDetailsScreen} 
        options={{ title: 'Team Details' }} 
      />
      <Stack.Screen 
        name="PlayerProfile" 
        component={PlayerProfileScreen} 
        options={{ title: 'Player Profile' }} 
      />
      {/* Add navigation to PlayerRankingsScreen from HomeStack */}
      <Stack.Screen 
        name="PlayerRankings" 
        component={PlayerRankingsScreen} 
        options={{ title: 'Player Rankings' }} 
      />
    </Stack.Navigator>
  );
}

function LeagueStandingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LeagueStandingsMain" 
        component={LeagueStandingsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TeamDetails" 
        component={TeamDetailsScreen} 
        options={{ title: 'Team Details' }} 
      />
      <Stack.Screen 
        name="MatchDetails" 
        component={MatchDetailsScreen} 
        options={{ title: 'Match Details' }} 
      />
    </Stack.Navigator>
  );
}

function RankingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="RankingsMain" 
        component={PlayerRankingsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PlayerProfile" 
        component={PlayerProfileScreen} 
        options={{ title: 'Player Profile' }} 
      />
    </Stack.Navigator>
  );
}

function FixturesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FixturesMain" 
        component={FixturesScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MatchDetails" 
        component={MatchDetailsScreen} 
        options={{ title: 'Match Details' }} 
      />
      <Stack.Screen 
        name="TeamDetails" 
        component={TeamDetailsScreen} 
        options={{ title: 'Team Details' }} 
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the header for tab screens
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Assign icons based on route name
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'LeagueStandings':
              iconName = 'format-list-numbered';
              break;
            case 'Rankings':
              iconName = 'star';
              break;
            case 'Fixtures':
              iconName = 'calendar';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
        tabBarActiveTintColor: '#ff416c', // Example customization
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#0f0c29', // Example background color
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="LeagueStandings"
        component={LeagueStandingsStack}
        options={{ title: 'League Standings' }}
      />
      <Tab.Screen
        name="Rankings"
        component={RankingsStack}
        options={{ title: 'Rankings' }}
      />
      <Tab.Screen
        name="Fixtures"
        component={FixturesStack}
        options={{ title: 'Fixtures' }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  // State to manage theme; default is dark
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Merge react-native-paper and react-navigation themes
  const { LightTheme: NavigationDefaultTheme, DarkTheme: NavigationDarkTheme } =
    adaptNavigationTheme({
      reactNavigationLight: NavigationDefaultThemeBase,
      reactNavigationDark: NavigationDarkThemeBase,
    });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...NavigationDefaultTheme,
    dark: false,
    colors: {
      ...MD3LightTheme.colors,
      ...NavigationDefaultTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...NavigationDarkTheme,
    dark: true,
    colors: {
      ...MD3DarkTheme.colors,
      ...NavigationDarkTheme.colors,
    },
  };

  // Define font configuration
  const fontConfig = {
    fontFamily: 'Roboto',
    fonts: {
      labelLarge: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
      },
      // Add other variants if necessary
    },
  };

  const theme = {
    ...(isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme),
    fonts: {
      ...MD3LightTheme.fonts,
      ...fontConfig.fonts,
    },
  };

  return (
    <PaperProvider theme={theme} settings={{ isV3: true }}>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Main" component={BottomTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
