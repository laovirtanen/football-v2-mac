import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Optionally, display a loading indicator
  }

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']} // Deep purple gradient
      style={styles.background}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <Animatable.View animation="fadeInDown" delay={200} style={styles.header}>
          <Image
            source={require('../assets/fd_logo.png')} // Ensure you have a logo image
            style={styles.logo}
          />
          <Text style={styles.title}>Data Driven decisions</Text>
        </Animatable.View>
        <View style={styles.buttonContainer}>
          <AppButton
            icon="trophy"
            title="League Standings"
            onPress={() => navigation.navigate('LeagueStandings')}
            animation="fadeInUp"
            delay={400}
          />
          <AppButton
            icon="calendar-month"
            title="Fixtures"
            onPress={() => navigation.navigate('Fixtures')}
            animation="fadeInUp"
            delay={600}
          />
          <AppButton
            icon="account-star"
            title="Player Rankings"
            onPress={() => navigation.navigate('PlayerRankings')}
            animation="fadeInUp"
            delay={800}
          />
          <AppButton
            icon="account-switch"
            title="Head-to-Head"
            onPress={() => navigation.navigate('HeadToHead')}
            animation="fadeInUp"
            delay={1000}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const AppButton = ({ icon, title, onPress, animation, delay }) => (
  <Animatable.View animation={animation} delay={delay} style={styles.buttonWrapper}>
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#ff416c', '#ff4b2b']} // Vibrant red gradient
        start={[0, 0]}
        end={[1, 1]}
        style={styles.buttonBackground}
      >
        <Icon name={icon} size={26} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </Animatable.View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: '#ccc',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '90%',
    borderRadius: 30,
    marginVertical: 10,
    overflow: 'hidden',
  },
  button: {
    width: '100%',
  },
  buttonBackground: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat_400Regular',
  },
});
