import React, {useState} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './Home';
import {Onibus} from './Onibus';
import {Lotacoes} from './Lotacoes';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Linhas de Poa',
            headerStyle: {borderBottomWidth: 3, elevation: 2},
          }}
        />
        <Stack.Screen
          name="Onibus"
          component={Onibus}
          options={{
            title: 'Ônibus',
            headerStyle: {borderBottomWidth: 3, elevation: 2},
          }}
        />
        <Stack.Screen
          name="Lotacoes"
          component={Lotacoes}
          options={{
            title: 'Lotações',
            headerStyle: {borderBottomWidth: 3, elevation: 2},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
