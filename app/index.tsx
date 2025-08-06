import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handlePress = () => {
    setButtonPressed(!buttonPressed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🚀</Text>
        </View>
        
        <Text style={styles.title}>Welcome to Your App</Text>
        <Text style={styles.subtitle}>
          Ready to build something amazing?
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.button,
            buttonPressed ? styles.buttonPressed : styles.buttonDefault
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {buttonPressed ? '✨ Awesome!' : '🎉 Get Started'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Lightning Fast</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🎨</Text>
            <Text style={styles.featureText}>Beautiful Design</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>Mobile Ready</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  logoContainer: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#a1a1aa',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 50,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDefault: {
    backgroundColor: '#6366f1',
  },
  buttonPressed: {
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    color: '#71717a',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});