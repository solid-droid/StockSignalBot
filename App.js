import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Navigator from './routes/Drawer'



export default function App() {



  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? 20 : 0
  },
});
