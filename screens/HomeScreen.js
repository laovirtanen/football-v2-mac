// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/mainImage.jpg')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Football Stats App</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LeagueStandings')}
          style={styles.button}
        >
          League Standings
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Fixtures')}
          style={styles.button}
        >
          Fixtures
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PlayerRankings')}
          style={styles.button}
        >
          Player Rankings
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('HeadToHead')}
          style={styles.button}
        >
          Head-to-Head
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 60,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
    width: '80%',
    borderRadius: 25,
  },

});
