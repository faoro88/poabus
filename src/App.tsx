import React, {useState} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './Home';
import {Onibus} from './Onibus';
import {Lotacoes} from './Lotacoes';
import {Rotas} from './Rotas';

//import {onibus, lotacao} from './services/api';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'PoaBus'}}
        />
        <Stack.Screen
          name="Onibus"
          component={Onibus}
          options={{title: 'My home'}}
        />
        <Stack.Screen
          name="Lotacoes"
          component={Lotacoes}
          options={{title: 'Lotações'}}
        />
        <Stack.Screen
          name="Rotas"
          component={Rotas}
          options={{title: 'My home'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
