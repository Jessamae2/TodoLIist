import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import ToDoList from '../todolist/app/todolist';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>ToDoList</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image source={require("./assets/jessa.jpg")}style={styles.idPicture} /> 
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
              </View>
            </View>
          </View>
        </View>
        <ToDoList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E7CBCB",
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
});

export default App;