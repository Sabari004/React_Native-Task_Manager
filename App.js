import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,SafeAreaView, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import Task from './Task.js';
import React, { useState,useEffect} from 'react';
import Axios from 'axios';
export default function App() {
  const[task,setTask]=useState("");
  const[taskItems,setTaskItems]=useState([]);
  const handleAddTask=()=>{
    Keyboard.dismiss();
    console.log(task);
    setTaskItems([...taskItems,task])
    setTask("");
  }
  const completeTask=(index)=>{
   let itemsCopy=[...taskItems];
   itemsCopy.splice(index,1);
   setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item,index)=>{
              return(
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>

               <Task  key={index} text={item}/>
                </TouchableOpacity>
            )
              
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView 
      behavior={Platform.OS==="ios"?"padding":"height"}
      style={styles.writeTaskWrapper}
      >
      <TextInput style={styles.input}  placeholder={'Write a Task'} defaultValue={task} onChangeText={(t)=>{setTask(t);}}></TextInput>
      <TouchableOpacity onPress={()=>handleAddTask()}>
        <View style={styles.addWrapper}>

          <Text style={styles.addText}></Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',

  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold',
  },
  items:{
    marginTop:30
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:30,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    paddingLeft:20,
    backgroundColor:'#FFF',
    borderColor:'#C0C0C0',
    borderRadius:60,
    borderWidth:1,
    width:250,
    marginLeft:20
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'#FFF',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderRadius:60,
    borderWidth:1,
    marginRight:30,
    
  },
  addText:{

  },
});
