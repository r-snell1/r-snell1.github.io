import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchItems} from 'app/api';

export default function HomePage({navigation}) {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const res = await fetchItems();
      setItems(res.data);
    } catch (err) {
      console.error('Failed to load items', err);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', loadItems);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={items}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditItem', {item})}>
            <Text style={styles.item}>
              {item.name} - {item.quantity}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 18, marginVertical: 5 },
});
