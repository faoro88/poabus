import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  View,
  FlatList,
  Modal,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {lotacao} from '../services/api';

export function Home() {
  const navigation = useNavigation();
  const [text, onChangeText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [lotacaoArray, setLotacaoArray] = useState([]);
  const [listArray, setListArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const onPressHandler = route => {
    navigation.navigate(route);
  };

  async function getLotacao() {
    const {data} = await lotacao.get('');
    setLotacaoArray(data);
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item.id);
        setModalVisible(!modalVisible);
        const result = lotacaoArray.find(element => element.id === item.id);
      }}>
      <Text style={{padding: 8}}>
        Lotação: {item.nome} {item.codigo}
      </Text>
      <Divider />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (text.length > 1) {
      const found = lotacaoArray.filter(el => el.codigo.indexOf(text.toUpperCase()) > -1);
      console.log(found);
      if (found.length > 0) {
        setListArray(found);
      }
    } else {
      setListArray([]);
    }
  }, [text]);


  useEffect(() => {
    getLotacao();
    console.log(text);
  }, [isStarted]);

  return (
    <View>
      <View style={styles.containerrow}>
        <Pressable
          style={styles.buttons}
          onPress={() => onPressHandler('Lotacoes')}>
          <Text style={styles.text}>Lotação</Text>
        </Pressable>
        <Divider orientation="vertical" width={2} />
        <Pressable
          style={styles.buttons}
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
        placeholder="10.7-2"
        keyboardType="decimal-pad"
      />
      <FlatList
        data={listArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  containerrow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonClose: {
    widht: 24,
    elevation: 2,
    backgroundColor: 'white',
  },
  buttons: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '50%',
    height: 50,

    elevation: 1,
    //backgroundColor: 'white',
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
  input: {
    height: 46,
    elevation: 2,
    margin: 12,
    fontWeight: 'bold',
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
