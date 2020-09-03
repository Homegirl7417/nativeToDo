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
  ShadowPropTypesIOS
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'; 

import { v1 as uuidv1 } from "uuid";
const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
  }
  componentDidMount() {
    this._loadToDos();
  }
  // if (!loadedToDos) return 
  // expo의 AppLoading을 대체할 수 있는 기능이 뭘까
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View>
          <View style={styles.card}>
            <TextInput 
              style={styles.input} 
              placeholder={"New To Do"}
              placeholderTextColor={"#999"}
              onChange={this._controNewToDo}
              returnKeyType={"done"}
              autoCorrect={false} // 자동완성
              onSubmitEditing={this._addToDo} // 완료 눌렀을 때
            />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"hi"}/>
          </ScrollView>            
          </View>
        </View>
      </View>
    );
  }
  _controNewToDo = text => {
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
      this.setState({
        newToDo: ""
      });
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
        }
        return { ...newState };
      });
      
    }
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