import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, FlatList, View, ActivityIndicator } from 'react-native';

const PAGE_SIZE = 10;

const Item = ({ title, email, phone }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Name:{title}</Text>
    <Text style={styles.subtitle}>Email:{email}</Text>
    <Text style={styles.subtitle}>Phone No:{phone}</Text>
  </View>
);

const App = () => {
  const [text, onChangeText] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const filteredData = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${PAGE_SIZE}`);
      const result = await response.json();
      setData(prevData => [...prevData, ...result]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log('err', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndReached = () => {
    if (!loading) {
      fetchData();
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Movie List</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Search"
        value={text}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            email={item.email}
            phone={item.phone}
          />
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (loading ? <ActivityIndicator size="large" color="blue" /> : null)}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  headerText:
    { alignSelf: 'center', fontSize: 20, color: 'red' },
  item: {

    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'red',
  },
});

export default App;