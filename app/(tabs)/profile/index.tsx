import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from 'react-native-paper';
import { useMemo } from 'react';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    profileSection: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 20,
      color: theme.colors.onBackground,
    },
    infoContainer: {
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    label: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 5,
    },
    value: {
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
    },
    logoutButtonText: {
      color: theme.colors.onError,
      fontSize: 16,
      fontWeight: '600',
    },
  }), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Not available'}</Text>
        </View>

        {user?.displayName && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Display Name</Text>
            <Text style={styles.value}>{user.displayName}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
