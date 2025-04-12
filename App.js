import React from 'react';
import { StatusBar } from 'react-native';
import TelaPrincipal from './src/screens/MainScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TelaPrincipal />
    </>
  );
}
