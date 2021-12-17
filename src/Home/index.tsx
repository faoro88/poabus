import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';

export function Home() {
  const navigation = useNavigation();
  const [text, onChangeText] = useState('');

  const onPressHandler = route => {
    navigation.navigate(route);
  };

  return (
    <View>
      <View style={styles.containerrow}>
        <Pressable
          style={styles.button}
          onPress={() => onPressHandler('Lotacoes')}>
          <Text style={styles.text}>Lotação</Text>
        </Pressable>
        <Divider orientation="vertical" width={2} />
        <Pressable
          style={styles.button}
          onPress={() => onPressHandler('Onibus')}>
          <Text style={styles.text}>Ônibus</Text>
        </Pressable>
      </View>
      <Divider orientation="horizontal" width={2} />
      <TextInput
        mode="outlined"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        label="Pesquisa de linha por Código"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerrow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '50%',
    height: 50,

    elevation: 1,
    //backgroundColor: 'white',
  },
  input: {
    height: 46,
    elevation: 2,
    margin: 12,
    fontWeight: 'bold',
  },
});
