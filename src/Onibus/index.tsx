import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {onibus} from '../services/api';

export function Onibus() {
  const [onibusArray, setOnibusArray] = useState([]);
  const [itinerarioArray, setItinerarioArray] = useState([]);
  const [titleText, setTitleText] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [text, onChangeText] = useState('');

  async function getOnibus() {
    const {data} = await onibus.get('');
    setOnibusArray(data);
    setTitleText('Ônibus');
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(!modalVisible);
      }}>
      <Text style={{padding: 8}}>
        {titleText}: {item.nome} {item.codigo}
      </Text>
      <Divider />
    </TouchableOpacity>
  );

  useEffect(() => {
    const found = onibusArray.filter(
      element => element.nome === text.toUpperCase(),
    );
    console.log(found);
    if (found.length > 0) {
      setOnibusArray(found);
    }
  }, [text]);

  useEffect(() => {
    getOnibus();
    console.log(text);
  }, [isStarted]);

  return (
    <View style={styles.view}>
      <TextInput
        mode="outlined"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Pesquisar por Nome"
        label="Pesquisar por Nome"
      />
      <FlatList
        data={onibusArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Pressable
        style={({pressed}) => [
          styles.button,
          {backgroundColor: pressed ? '#8e44ad' : 'white'},
          {opacity: pressed ? 0.5 : 1},
        ]}
        onPress={() => getOnibus()}>
        <Text style={styles.textStyle}>Atualizar</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Não foi possível achar a rota específica</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonscr: {
    alignContent: 'flex-end',
    padding: 10,
  },
  input: {
    height: 46,
    elevation: 2,
    margin: 12,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 20,
    width: 100,
    padding: 10,
    elevation: 2,
    margin: 10,
    borderColor: '#8e44ad',
    backgroundColor: 'white',
  },
  buttonOpen: {
    backgroundColor: 'white',
  },
  buttonClose: {
    widht: 24,
    elevation: 2,
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
