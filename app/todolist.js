import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, ScrollView, Image, TouchableOpacity } from 'react-native'; // Added ScrollView, Image, TouchableOpacity
import { useStore } from './store';
import { FIREBASE_AUTH } from '../firebaseConfig';

const ToDoList = () => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');

  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const editTodo = useStore((state) => state.editTodo);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      addTodo({
        id: Math.random().toString(),
        text: text.trim(),
      });
      setText('');
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleEditTodo = () => {
    if (editItemText.trim() !== '') {
      editTodo(editItemId, editItemText);
      setModalVisible(false);
      setEditItemText('');
    }  
  };

  const openEditModal = (id, currentText) => {
    setEditItemId(id);
    setEditItemText(currentText);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete"
          onPress={() => handleDeleteTodo(item.id)}
          color="#99627A"
        />
        <View style={{ width: 10 }} />
        <Button
          title="Edit"
          onPress={() => openEditModal(item.id, item.text)}
          color="#99627A"
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>ToDoList</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image source={require("../assets/jessa.png")} style={styles.idPicture} />
            <View style={styles.profileInfo}>
              <View style={styles.column}>
                <Text style={styles.name}>Name: Abarquez, Jessa Mae A. </Text>
                <Text style={styles.id}>School ID: 20211629</Text>
                <Text style={styles.section}>Section Code: IT35 B</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.sd}>Course Description: Application Development</Text>
                <Text style={styles.cm}>Course Name: BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</Text>
                <Text style={styles.ay}>Academic Year: 2024-2025</Text>
                <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <Button title="Add" onPress={handleAddTodo} color="#99627A" />
        </View>
        <View style={styles.box}>
          {todos.length === 0 ? (
            <Text style={styles.emptyText}>No ToDoList Today</Text>
          ) : (
            <FlatList
              data={todos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setEditItemText('');
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                value={editItemText}
                onChangeText={setEditItemText}
              />
              <Button title="Save" onPress={handleEditTodo} color="#135D66" />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E7CBCB",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  boxContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  headerBox: {
    backgroundColor: '#643843',
    padding: 10,
    marginBottom: 11,
    alignSelf: 'stretch',
    justifyContent: 'center', // Align the text vertically at the center
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  idPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    marginBottom: 50,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align the two columns horizontally
    marginLeft: 10,
    marginBottom: 40,
  },
  column: {
    flex: 1, // Each column should take half of the available space
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  id: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  section: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  sd: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  cm: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  ay: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  addButtonContainer: {
    marginBottom: 10,
    borderRadius: 5,
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ToDoList;
