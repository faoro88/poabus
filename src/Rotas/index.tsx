import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  DatePickerIOSBase,
} from 'react-native';
import {lotacao} from '../services/api';

export function Rotas() {
  const navigation = useNavigation();
  const {itemid} = route.params;

  return (
    <SafeAreaView>
      <Text> {itemid} </Text>
    </SafeAreaView>
  );
}
