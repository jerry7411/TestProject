/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, FlatList, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import request from './src/services/request';

interface FormData {
  id: number,
  userId: number,
  title: string,
  body: string,
  index: number
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [data, setData] = useState<FormData[]>([])
  const [isOpenModal, setModal] = useState(false)
  const [formData, setFormData] = useState({} as FormData)

  const loadData = async () => {
    const options = {
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
    }
    const response =  await request(options)
    setData(response?.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const onPress = (item, index) => {
    setModal(true)
    setFormData({...item, index})
  }

  const onChangeText = (field, text) => {
    setFormData({ ...formData, [field]: text })
  }

  const updateItem = () => {
    if (formData?.index === -1) return
    setData([...data.slice(0, formData?.index), formData, ...data.slice(formData?.index + 1)])
    setModal(false)
  }

  const renderData = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={[styles.row, styles.bottomWidth]}>
          <View style={styles.categoryContainer}>
            <Text>ID</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text>{item?.id}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.bottomWidth]}>
          <View style={styles.categoryContainer}>
            <Text>User</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text>{item?.userId}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.bottomWidth]}>
          <View style={styles.categoryContainer}>
            <Text>Title</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>{item?.title}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.bottomWidth]}>
          <View style={styles.categoryContainer}>
            <Text>Body</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.description}>{item?.body}</Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={styles.categoryContainer}>
            <Text>Action</Text>
          </View>
          <View style={styles.valueContainer}>
            <TouchableOpacity style={styles.button} onPress={() => onPress(item, index)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <FlatList
          contentContainerStyle={styles.containerStyle}
          data={data}
          scrollEnabled={true}
          renderItem={renderData}
          keyExtractor={(item) => item?.id.toString()}
        />
        <Modal
          visible={isOpenModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setModal(!isOpenModal)
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCloseView}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModal(!isOpenModal)}>
                <Text>x</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.item, styles.modalView]}>
              <View style={[styles.row, styles.bottomWidth]}>
                <View style={styles.categoryContainer}>
                  <Text>ID</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text>{formData.id}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.bottomWidth]}>
                <View style={styles.categoryContainer}>
                  <Text>User</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text>{formData.userId}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.bottomWidth]}>
                <View style={styles.categoryContainer}>
                  <Text>Title</Text>
                </View>
                <View style={styles.valueContainer}>
                  <TextInput
                    key={`title-${formData.id}`}
                    numberOfLines={1}
                    maxLength={50}
                    onChangeText={text => onChangeText('title', text)}
                    defaultValue={formData.title}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={[styles.row]}>
                <View style={styles.categoryContainer}>
                  <Text>Body</Text>
                </View>
                <View style={styles.valueContainer}>
                  <TextInput
                    key={`body-${formData.id}`}
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                    onChangeText={text => onChangeText('body', text)}
                    defaultValue={formData.body}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity style={[styles.button, { width: 200 }]} onPress={updateItem}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: 5,
    width: 70,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
  categoryContainer: {
    width: 50,
  },
  valueContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerView: {
    padding: 10,
    flex: 1,
  },
  containerStyle: {
    // flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
  },
  item: {
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    color: 'blue',
  },
  bottomWidth: {
    borderBottomWidth: 1
  },
  titleContainer: {
  },
  description: {
    color: 'red',
  },
  textInput: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    margin: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseView: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  modalCloseButton: {
    backgroundColor: '#bbb',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
