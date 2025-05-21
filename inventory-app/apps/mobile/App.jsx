import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import AppNavigator from 'app/AppNavigator';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View>
      <Text>{message}</Text>
      <AppNavigator/>
    </View>
  );
}
