import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  DatePickerIOSBase,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {lotacao, itinerario} from '../services/api';

export function Lotacoes() {
  const [lotacaoArray, setLotacaoArray] = useState([]);
  const [itinerarioArray, setItinerarioArray] = useState([]);
  const [titleText, setTitleText] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [text, onChangeText] = useState('');
  var cont = 0;

  async function getLotacao() {
    const {data} = await lotacao.get('');
    setLotacaoArray(data);
    setTitleText('Lotação');
  }

  async function getItinerario(id) {
    const {data} = await itinerario.get('', {params: {p: id}});
    setItinerarioArray(data);
    setModalVisible(!modalVisible);
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item.id);
        const result = lotacaoArray.find(element => element.id === item.id);
        getItinerario(item.id);
      }}>
      <Text style={{padding: 8}}>
        {titleText}: {item.nome} {item.codigo}
      </Text>
      <Divider />
    </TouchableOpacity>
  );

  useEffect(() => {
    const found = lotacaoArray.filter(element => element.nome === text);
    console.log(found);
    if (found.length > 0) {
      console.log('entrou aqui');
      cont = cont + 1;
      setLotacaoArray(found);
    }
  }, [text]);

  useEffect(() => {
    getLotacao();

    console.log(text);
  }, [isStarted]);

  return (
    <View style={styles.view}>
      <TextInput
        mode="outlined"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        label="Pesquisar por Nome"
      />

      <FlatList
        data={lotacaoArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Pressable
        style={({pressed}) => [
          styles.button,
          {backgroundColor: pressed ? '#8e44ad' : 'white'},
          {opacity: pressed ? 0.5 : 1},
        ]}
        onPress={() => getLotacao()}>
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
