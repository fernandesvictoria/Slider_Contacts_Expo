import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ContactsDemo from '../components/ContactsDemo';
import SliderDemo from '../components/SliderDemo';

const TelaPrincipal = () => {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <ScrollView style={estilos.scrollView}>
        <View style={estilos.container}>
          <Text style={estilos.cabecalho}>Demonstração Expo: Slider e Contacts</Text>
          <Text style={estilos.subtitulo}>Desenvolvido por Victoria e Pietro</Text>
          
          <SliderDemo />
          
          <ContactsDemo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  cabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
});

export default TelaPrincipal; 