import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TeamDetailsScreen = ({ route }) => {
    const { team } = route.params;
    const [teamDetails, setTeamDetails] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchTeamDetails();
    }, []);

    const goback1 = () => {
        navigation.navigate('Home')
      }

    const fetchTeamDetails = () => {
        const jsonData = require('./matchdetails.json');
        const teamData = jsonData.filter((item) => item.teams.team1 === team || item.teams.team2 === team);

        setTeamDetails(teamData);
    };

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.dateContainer}>
                <Text style={{ color: 'black', paddingTop: 8 }}>{item.matchDay}, {item.matchDate}</Text>
            </View>
            <View>
                <Text style={{ backgroundColor: 'white', paddingLeft: 10 }}>{item.matchLocation}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: 5, backgroundColor: 'white', paddingLeft: 10 }}>
                <Image source={{ uri: item.teams.team1Flag }} style={styles.flagImage} />
                <Text style={styles.infoText}>{item.teams.team1}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: 5, backgroundColor: 'white', paddingLeft: 10 }}>
                <Image source={{ uri: item.teams.team2Flag }} style={styles.flagImage} />
                <Text style={styles.infoText}>{item.teams.team2}</Text>
            </View>
            <View>
                <Text style={{ backgroundColor: 'white', color: '#FF7A68', paddingLeft: 10, paddingBottom: 10 }}>{item.matchTime}</Text>
            </View>
        </View>
    );
    
    return (
            <>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#01b48a' }}>
            <TouchableOpacity onPress={() => goback1()}>
                <Image style={{ width: 20, height: 20, resizeMode: 'cover', marginLeft: 15, }} source={require('./Images/Left-Arrow-256.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 10, paddingLeft: 15, color: 'white' }}>
                  {team} Matches
            </Text>
        </View>
        <FlatList
                data={teamDetails}
                renderItem={renderItem}
                keyExtractor={(item) => item.matchId.toString()} />
       </>
    );
};

export default TeamDetailsScreen;

const styles = StyleSheet.create({
    flagImage: {
        width: 22,
        height: 25,
    },
    infoText: {
        color: 'black',
        padding: 5,
    },
    dateContainer: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        backgroundColor: '#ECF0F1'
    },
})
