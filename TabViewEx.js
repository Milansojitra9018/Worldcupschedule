import React from 'react';
import { useNavigation } from '@react-navigation/native';
import matchdetails from './matchdetails.json';
import CustomDropdown from './Dropdown';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';

const Maches = () => {
  const renderMatchItem = ({ item, index }) => {
    const previousItem = matchdetails[index - 1];
    const isSameDayAndDate =
      previousItem &&
      previousItem.matchDay === item.matchDay &&
      previousItem.matchDate === item.matchDate;

    return (
      <View style={styles.matchContainer}>
        {!isSameDayAndDate && (
          <View style={styles.dateContainer}>
            <Text style={{ color: 'black' }}>
              {item.matchDay}, {item.matchDate}
            </Text>
          </View>
        )}

        {isSameDayAndDate && <View style={styles.spaceContainer} />}

        <View style={styles.infoContainer}>
          <Text style={{ color: 'grey', paddingLeft: 10, paddingBottom: 10, paddingTop: 5 }}>
            {item.matchId} Match.{item.matchLocation}
          </Text>
        </View>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingBottom: 10, paddingLeft: 10 }}>
          <Image style={styles.flagImage} source={{ uri: item.teams.team1Flag }} />
          <Text style={styles.infoText}>{item.teams.team1}</Text>
        </View>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingLeft: 10 }}>
          <Image style={styles.flagImage} source={{ uri: item.teams.team2Flag }} />
          <Text style={styles.infoText}>{item.teams.team2}</Text>
        </View>
        <View style={{ backgroundColor: 'white', paddingBottom: 10, paddingLeft: 10 }}>
          <Text style={{ color: '#FF7A68' }}>{item.matchTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={matchdetails}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.matchId.toString()}
      />
    </View>
  );
};

const Venues = () => {
  const navigation = useNavigation();

  const handlematchLocation = (matchLocation) => {
    navigation.navigate('Locationofmatch', { matchLocation });
  };

  const uniqueLocations = [...new Set(matchdetails.map((item) => item.matchLocation))];

  const renderLocation = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ECF0F1', borderBottomWidth: 1, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10 }}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handlematchLocation(item)}>
        <Image style={{ width: 60, height: 50, marginLeft: 12,}} source={{ uri: "https://www.cricbuzz.com/a/img/v1/205x152/i1/c189174/narendra-modi-stadium.jpg"}} />
          <Text style={{ fontSize: 18, color: 'black', padding: 10, }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {uniqueLocations && (
        <FlatList data={uniqueLocations} renderItem={renderLocation} keyExtractor={(index) => index.toString()} />
      )}
    </View>
  );
};

const renderScene = SceneMap({
  first: Maches,
  second: Venues,
});

const TabViewEx = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'MATCHES' },
    { key: 'second', title: 'VENUES' },
  ]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', marginLeft: 15 }}>
          Icc Cricket World Cup 2023
        </Text>
        <CustomDropdown />
      </View>
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#01b48a',}} indicatorStyle={{backgroundColor: 'white', height: 3,}} />}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: { 
    backgroundColor: '#01b48a',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerSection: {
    color: 'white',
    opacity: 0.7,
    fontWeight: '500',
    fontSize: 12.5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  matchContainer: {
    backgroundColor: 'white',
  },
  dateContainer: {
    backgroundColor: '#ECF0F1',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  infoText: {
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
  flagImage: {
    width: 22,
    height: 25,
  },
  spaceContainer: {
    backgroundColor: '#ECF0F1',
    paddingBottom: 2,
  },
});

export default TabViewEx;


                    