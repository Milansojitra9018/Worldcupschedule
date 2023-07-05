import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamDetailsScreen from './TeamDetailsScreen';
import Locationofmatch from './Location';
import TabViewEx from './TabViewEx';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabViewEx}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} options={{headerShown: false}} />
        <Stack.Screen name="Venues" component={TabViewEx} options={{headerShown: false}} />
        <Stack.Screen
          name="Locationofmatch"
          component={Locationofmatch}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




