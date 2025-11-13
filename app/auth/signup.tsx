import React, { useState } from 'react';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from 'react-native-paper';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, name);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Signup Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.back();
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.onBackground,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 40,
    },
    form: {
      width: '100%',
    },
    input: {
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.onSurfaceVariant,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    linkButton: {
      marginTop: 20,
      alignItems: 'center',
    },
    linkText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    linkTextBold: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
  }), [theme]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={name}
              onChangeText={setName}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={navigateToLogin}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkTextBold}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
