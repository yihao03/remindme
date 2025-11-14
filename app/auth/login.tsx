import React, { useState, useMemo } from "react";
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
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "react-native-paper";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert("Login Error", error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    router.push("/auth/signup");
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          justifyContent: "center",
        },
        title: {
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 8,
          color: theme.colors.onBackground,
        },
        subtitle: {
          fontSize: 16,
          color: theme.colors.onSurfaceVariant,
          marginBottom: 40,
        },
        form: {
          width: "100%",
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
          alignItems: "center",
          marginTop: 10,
        },
        buttonDisabled: {
          backgroundColor: theme.colors.surfaceDisabled,
        },
        buttonText: {
          color: theme.colors.onPrimary,
          fontSize: 16,
          fontWeight: "600",
        },
        linkButton: {
          marginTop: 20,
          alignItems: "center",
        },
        linkText: {
          color: theme.colors.onSurfaceVariant,
          fontSize: 14,
        },
        linkTextBold: {
          color: theme.colors.primary,
          fontWeight: "600",
        },
      }),
    [theme],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.form}>
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

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={navigateToSignup}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                Don&apos;t have an account?{" "}
                <Text style={styles.linkTextBold}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
