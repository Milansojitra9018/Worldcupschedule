import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const teams = [
  { team: 'India', flag: 'https://cdn-icons-png.flaticon.com/512/206/206606.png' },
  { team: 'Afghanistan', flag: 'https://cdn-icons-png.flaticon.com/512/206/206741.png' },
  { team: 'Pakistan', flag: 'https://cdn-icons-png.flaticon.com/512/206/206752.png' },
  { team: 'Australia', flag: 'https://cdn-icons-png.flaticon.com/512/206/206618.png' },
  { team: 'Bangladesh', flag: 'https://cdn-icons-png.flaticon.com/512/206/206705.png' },
  { team: 'England', flag: 'https://cdn-icons-png.flaticon.com/512/206/206636.png' },
  { team: 'South Africa', flag: 'https://cdn-icons-png.flaticon.com/512/555/555604.png' },
  { team: 'New Zealand', flag: 'https://cdn-icons-png.flaticon.com/512/206/206731.png' },
];

const CustomDropdown = () => {
  const [selectedTeam, setSelectedTeam] = useState('Teams');
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const handleTeamSelection = (team) => {
    setSelectedTeam('Teams');
    setShowModal(false); 
    navigation.navigate('TeamDetails', { team });
  };

  const handleGoBack = () => {
    setShowModal(false); 
  };
  
  const arrowImage = showModal ? require('./Images/downarrow1.png') : require('./Images/downarrow1.png');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownSelector} onPress={() => setShowModal(!showModal)}>
        <Text style={styles.dropdownText}>{selectedTeam}</Text>
        <Image source={arrowImage} style={styles.arrowIcon} />
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.dropdownModal}>
          <View style={{ borderRadius: 5 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#01b48a', paddingTop: 10 }}>
              <TouchableOpacity onPress={handleGoBack}>
                <Image style={{ width: 25, height: 25, resizeMode: 'cover', marginLeft: 15, marginTop: 8 }} source={require('./Images/Left-Arrow-256.png')} />
              </TouchableOpacity>
              <Text style={{ paddingBottom: 15, fontSize: 25, alignSelf: 'center', color: 'white', paddingLeft: 20, marginTop: 3 }}>International Teams</Text>
            </View>
            <FlatList
              data={teams}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleTeamSelection(item.team)}>
                  <Image source={{ uri: item.flag }} style={styles.flagIcon} />
                  <Text style={styles.teamText}>{item.team}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  dropdownText: {
    fontSize: 15,
    color: 'white',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  dropdownModal: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  dropdownItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ECF0F1',
    paddingTop: 5,
  },
  flagIcon: {
    width: 34,
    height: 34,
    marginRight: 10,
    marginLeft: 12,
  },
  teamText: {
    fontSize: 20,
    color: '#333',
  },
});

export default CustomDropdown;
