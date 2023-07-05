import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import matchdetails from './matchdetails.json';
import { useNavigation } from '@react-navigation/native';

const Locationofmatch = ({ route }) => {
  const { matchLocation } = route.params;
  const navigation = useNavigation();


  const goback = () => {
    navigation.navigate('Home')
  }

  const matches = matchdetails.filter(item => item.matchLocation === matchLocation);

  const renderMatch = ({ item }) => (
    <View style={{ backgroundColor: 'white' }}>
      <Text style={{ padding: 10, paddingLeft: 10, color: 'black', backgroundColor: '#ECF0F1' }}>{item.matchDay}, {item.matchDate}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, backgroundColor: 'white', paddingLeft: 10, paddingBottom: 10 }}>
        <Image source={{ uri: item.teams.team1Flag }} style={{ width: 22, height: 25 }} />
        <Text style={{ paddingLeft: 10 , color: 'black'}}>{item.teams.team1} </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginBottom: 5, paddingLeft: 10, paddingBottom: 15 }}>
        <Image source={{ uri: item.teams.team2Flag }} style={{ width: 22, height: 25 }} />
        <Text style={{ paddingLeft: 10 , color: 'black'}}>{item.teams.team2}</Text>
      </View>
    </View>
  );

  return (
    <View >
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#01b48a' }}>
        <TouchableOpacity onPress={() => goback()}>
          <Image style={{ width: 19, height: 19, resizeMode: 'cover', marginLeft: 15, }} source={require('./Images/Left-Arrow-256.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', marginVertical: 10, paddingLeft: 20, color: 'white' }}>
          Matches in {matchLocation}
        </Text>
      </View>
      <FlatList
        data={matches}
        renderItem={renderMatch}
        keyExtractor={item => item.matchId}
      />
    </View>
  );
};

export default Locationofmatch;
