import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal } from 'react-native';
import { useStore } from './store';

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
      editTodo(editItemId, editItemText); // Corrected placement of editTodo
      setModalVisible(false); // Close the modal after updating the text
      setEditItemText(''); // Clear the editItemText state
    }  
  };

  const openEditModal = (id, currentText) => {
    setEditItemId(id);
    setEditItemText(currentText);
    setModalVisible(true); // Set the modal to be visible when editing
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
    <View style={styles.container}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 400 }}
        value={text}
        onChangeText={setText}
      />
      <View style={styles.add}>
        <Button title="Add" onPress={handleAddTodo} color="#99627A" />
        <View style={styles.box}>
          {todos.length === 0 ? (
            <Text style={{ textAlign: "center" }}>No ToDoList Today</Text>
          ) : (
            <FlatList
              data={todos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()} // Convert id to string
            />
          )}
        </View>
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
              style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200 }}
              value={editItemText}
              onChangeText={setEditItemText}
            />
            <Button title="Save" onPress={handleEditTodo} color="#135D66" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 400,
  },
  add: {
    marginBottom: 1000,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginRight: 10,
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
    elevation: 5
  },
});

export default ToDoList;