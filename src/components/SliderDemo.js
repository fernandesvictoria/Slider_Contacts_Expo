import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SliderDemo = () => {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(50);
  const [valor3, setValor3] = useState(5);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Demonstração de Slider</Text>
      
      {/* Slider básico com valores mínimos e máximos */}
      <Text style={estilos.label}>
        Slider com minimumValue e maximumValue: {valor1.toFixed(1)}
      </Text>
      <Slider
        style={estilos.slider}
        minimumValue={0}
        maximumValue={100}
        value={valor1}
        onValueChange={setValor1}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#CCCCCC"
      />

      {/* Slider com step para controle preciso */}
      <Text style={estilos.label}>
        Slider com step e thumbTintColor: {valor2}
      </Text>
      <Slider
        style={estilos.slider}
        minimumValue={0}
        maximumValue={100}
        step={10}
        value={valor2}
        onValueChange={setValor2}
        thumbTintColor="#FF9500"
      />

      {/* Slider com tapToSeek para comportamento personalizado */}
      <Text style={estilos.label}>
        Slider com tapToSeek e invertido: {valor3.toFixed(1)}
      </Text>
      <Slider
        style={estilos.slider}
        minimumValue={0}
        maximumValue={10}
        value={valor3}
        onValueChange={setValor3}
        tapToSeek={true}
        inverted={true}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 15,
  },
});

export default SliderDemo; 