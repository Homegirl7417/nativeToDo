import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Dimensions
} from 'react-native';

import 'react-native-get-random-values';
const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    }

    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleToDo}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle
                        ]}/>
                    </TouchableOpacity>
                    {
                        isEditing ? (
                            <TextInput 
                                style={[
                                    styles.text,
                                    styles.input,
                                    isCompleted ? styles.completedText : styles.uncompletedText
                                ]} 
                                value={toDoValue} 
                                multiline={true}
                                onChange={this._controllInput}
                                returnKeyType={"done"}
                                onBlur={this._finishEditing}
                            />
                        ) : (
                            <Text 
                                style={[
                                    styles.text,
                                    isCompleted ? styles.completedText : styles.uncompletedText
                                ]}
                            >
                                {text}
                            </Text>
                        )
                    }
                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText} onPress={this._startEdition}>✏️</Text>
                            </View>
                        </TouchableOpacity>                            
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    _toggleToDo = () => {
        this.setState(prevState => {
            return ({
                isCompleted: !prevState.isCompleted
            });
        })
    }
    _startEdition = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        })
    }
    _finishEditing = () => {
        this.setState({
            isEditing: false
        })
    }
    _controllInput = text => {
        this.setState({
            toDoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width : width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20,
    },
    completedCircle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "#f23657",
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 15
    }
})