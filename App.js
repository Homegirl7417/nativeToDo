import React from 'react';
import ToDo from './ToDo';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  Platform,
  AsyncStorage
} from 'react-native';

import 'react-native-get-random-values';
import { v1 as uuidv1 } from "uuid";
const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  }
  componentDidMount() {
    this._loadToDos();
  }
  // if (!loadedToDos) return 
  // expo의 AppLoading을 대체할 수 있는 기능이 뭘까
  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"}
            value={newToDo}
            placeholderTextColor={"#999"}
            onChangeText={this._crontollNewToDo}
            returnKeyType={"done"}
            autoCorrect={false} // 자동완성
            onSubmitEditing={this._addToDo} // 완료 눌렀을 때
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo 
                key={toDo.id}
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                updateToDo={this._updateToDo}
                {...toDo}
              />
            ))}
          </ScrollView>           
        </View>
      </View>
    );
  }
  _crontollNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    })
  }

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID] : {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    }
  }
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    })
  }
  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    })
  }
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    })
  }
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], text: text }
        }
      }
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _saveToDos = (newToDos) => {
    console.log("newToDos:",JSON.stringify(newToDos));
    const saveToDos = AsyncStorage.setItem("toDos",JSON.stringify(newToDos));
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: "center"
  },
  title : {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,// only ios shadow
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation : 3 // only android shadow
      }
    }), 
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
  },
  toDos: {
    alignItems: "center"
  }
});