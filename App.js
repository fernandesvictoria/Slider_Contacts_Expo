import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState(50);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        setContacts(data.map(contact => ({ ...contact, importance: 50 })));
      }
    })();
  }, []);

  const updateImportance = (id, value) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, importance: value } : contact
    ));
  };

  const filteredContacts = contacts.filter(c => c.importance >= filter);

  return (
    <View style={styles.container}>
      <Text>Filtrar contatos (≥ {filter}%):</Text>
      <Slider
        value={filter}
        onValueChange={setFilter}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor="#007AFF" // iOS/Android
        thumbTintColor="#007AFF"       // Android
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text>{item.phoneNumbers?.[0]?.number || 'Sem telefone'}</Text>
            <Slider
              value={item.importance}
              onValueChange={(value) => updateImportance(item.id, value)}
              minimumValue={0}
              maximumValue={100}
              step={5}
            />
            <Text>Importância: {Math.round(item.importance)}%</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  contactCard: { padding: 15, marginVertical: 8, backgroundColor: '#fff', borderRadius: 8 },
  contactName: { fontWeight: 'bold' }
});