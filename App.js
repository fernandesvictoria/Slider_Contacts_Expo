import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import Slider from "@react-native-community/slider";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const toggleFavorite = (contactId) => {
    setFavorites((prev) => {
      if (prev[contactId]) {
        const newFavs = { ...prev };
        delete newFavs[contactId];
        return newFavs;
      } else {
        return { ...prev, [contactId]: { level: 5 } };
      }
    });
  };

  const updateFriendLevel = (contactId, level) => {
    setFavorites((prev) => ({
      ...prev,
      [contactId]: { ...prev[contactId], level },
    }));
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar contatos negada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Contatos</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text
              style={styles.contactName}
              onPress={() => toggleFavorite(item.id)}
            >
              {item.name} {favorites[item.id] ? "★" : "☆"}
            </Text>

            {favorites[item.id] && (
              <View style={styles.sliderContainer}>
                <Text>Nível de amizade: {favorites[item.id].level}</Text>
                <Slider
                  style={styles.slider}
                  value={favorites[item.id].level}
                  onValueChange={(value) => updateFriendLevel(item.id, value)}
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  minimumTrackTintColor="#1fb28a"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#1a9274"
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  contactItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
