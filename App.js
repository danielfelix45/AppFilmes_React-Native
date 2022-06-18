import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import api from './src/services/api'
import Filmes from './src/Filmes'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filmes: [],
      loading: true
    };
  }

  async componentDidMount() {
    const response = await api.get('r-api/?api=filmes');
    this.setState({
      filmes: response.data,
      loading: false
    });
  }

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.areaActivity}>
          <ActivityIndicator color='#09A6FF' size={60} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity style={styles.logo}>
              <Text style={styles.textoLogo}>NetFelix</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.filmes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Filmes data={item} />}
          />

        </View>
      );
    };


  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  header: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,

    borderBottomWidth: 0.2,
    shadowColor: '#000',
    elevation: 1
  },
  logo: {
    width: 100,
    height: 35,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  textoLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0000'
  },
  areaActivity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;