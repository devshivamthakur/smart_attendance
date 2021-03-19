import React, { useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert , ToastAndroid} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import AsyncStorage  from "@react-native-community/async-storage";  
import { Picker } from '@react-native-picker/picker';
import ProgressDialog from 'react-native-progress-dialog';
import NetworkUtils from '../NetworkUtils';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import  Icon2  from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
var user="Shivam";
var pass="123";
class login extends React.Component{
  state={
    is_pass_visible:true,  //this is used for check password is visible or not
    get_user_name:"",        // to store username from input
    get_user_pass:"",       // to store password form input
    check_details:false,
    selected_login_type:"teach",
    user_clicked:false,
    progress_visible:false,
    
  }

  componentWillUnmount(){
    this.setState({
      is_pass_visible:true,  //this is used for check password is visible or not
      get_user_name:"",        // to store username from input
      get_user_pass:"",       // to store password form input
      check_details:false,
      selected_login_type:"hod",
      user_clicked:false,
      progress_visible:false,
    })
  }
  async savedata(){

   var st=await AsyncStorage.getItem("sft");
  //  console.log(st)
  } 
 
  //get data from server to check user name and password
 async get_data(){
   
   const isConnected=await NetworkUtils.isNetworkAvailable();
   if(isConnected){
   try {
  if(this.state.get_user_name.trim().length==0){
    Alert.alert("please enter username")
  }
  else if(this.state.get_user_pass.trim().length===0){
    Alert.alert("please enter Password")
  }
  else{
    this.setState({
      progress_visible:true,
     
    })

    var  insertAPIURL;
   insertAPIURL="https://lit-citadel-01961.herokuapp.com/"+this.state.selected_login_type;

   console.log(insertAPIURL);
    var header={
      'Content-Type':'application/json'
    };
    
    fetch(insertAPIURL,{
      method:'POST',
      headers:header, 
      body:JSON.stringify({
        uname:this.state.get_user_name,
        password:this.state.get_user_pass,
      })
    }
    ).then((response)=>response.json())
    .then((response)=>{
    //  console.log(response.mess)
    //  var res=response[0];\
    this.setState({
      progress_visible:false
    })
    if(response!=null){
    
     console.log(response)
     if(response.mess=="matched"){
        //  console.log("servey_id"+response[0].servey_id);
         
      if(this.state.selected_login_type=="teach"){
       
         }
         else if(this.state.selected_login_type=="hod"){
        
           AsyncStorage.setItem("sft","no");  //set data
         AsyncStorage.setItem("lt","hod");
         AsyncStorage.setItem("hod_id",String(response.hod_id));
        this.props.navigation.replace("fc");
        }
    //  Alert.alert("Success full")
   
     }else if(response.mess=="notmatched"){
       ToastAndroid.show("Username and Password doesn't match",ToastAndroid.LONG);
     }
    }
  }
    ).catch((error)=>{
      ToastAndroid.show(error,ToastAndroid.SHORT);
      console.log(error)
      this.setState({
        progress_visible:false
      })
    })
    
  } 

   } catch (error) {
    console.log(error)

    ToastAndroid.show(error,ToastAndroid.SHORT);
    this.setState({
      progress_visible:false
    })

   }
 
  }else{
    ToastAndroid.show("Internet is not Available !", ToastAndroid.SHORT);
  }
  
return false;
  }

  async forgot_password(){
    try {
     
     } catch (error) {
    console.log(error)
      
    }
    
  }
  render(){
    return(
      <SafeAreaView 
      style={{
        width:'100%',
        height:'100%',
        backgroundColor:"#71afe5",
          }}
      > 
       <View
           style={{
            //  marginTop:"1%",
             height:20,
             backgroundColor:'#005a9e',
             borderWidth:0.5,
             borderColor:"blue"
          }}
           >
           </View>
          <ProgressDialog visible={this.state.progress_visible} />
          <Image  //it is logo 
         style={styles.img_logo}
           source={require("../images/main_logo.jpg")}
           />
           <ScrollView>
          

           <Card   //this card VIew contain all input & forgot pass 
           style={styles.main_container}
           >  
           <Card
           style={styles.heading}
           >
             <Picker
             selectedValue={this.state.selected_login_type}
             style={{
               height: 50,
                width: 200,
                color:"white"
              }}
            
             onValueChange={(itemValue, itemIndex) =>
              this.setState({selected_login_type: itemValue})
            }>
              
            <Picker.Item  label="Teacher" value="teach" />
            <Picker.Item  label="Hod" value="hod" />
            
            </Picker>
           </Card>
           <View  //this View contain all inputView(TextInput) 
        style={styles.input}>
          <Card  // input user name 
           style={{
             width:300,
            marginTop:20,
            flexDirection:'row',
           borderRadius:25,
        paddingStart:27,
            backgroundColor:"#eff6fc"
        }}>
            
            <Icon name="user-circle" size={25} color="black" style={styles.img} />
          <TextInput  //this is for email input
          value={this.state.get_user_name}
          onChangeText={(text)=>this.setState({get_user_name:text})}
           style={{
             paddingEnd:80,
             fontSize:18,
            }}
          placeholder="Email" 
            ></TextInput>
          </Card>
        

          <Card  // input password card View
          style={{
            width:300,
            marginTop:"10%",
            flexDirection:'row',
           borderRadius:25,
        paddingStart:27,
        backgroundColor:"#eff6fc"
        }}>
            <Icon2
            style={styles.img}
           name="lock"
           size={25}
           />
          <TextInput  //this is for input password
          value={this.state.get_user_pass}
          onChangeText={(text)=>this.setState({get_user_pass:String(text)})}
           secureTextEntry={this.state.is_pass_visible}
          placeholder="Password" 
          style={{paddingEnd:60,
            fontSize:18}}
                ></TextInput>
                <TouchableOpacity //this is used for show password or not show password
                style={ styles.show_password}
                 onPress={
                  this.state.is_pass_visible?()=>{
                    this.setState({is_pass_visible:false});
                  }:()=>{
                    this.setState({is_pass_visible:true});
                  }
                   
                    }
                >
                  <Image         
                source={
                  this.state.is_pass_visible?require("../images/show_password.png"): require("../images/nsp.png")
                  }
                
                />
                </TouchableOpacity>
                
          </Card>

        </View>
        <Text //this is text for forgot password
        style={{
          textAlign:'right',
          marginTop:15,
          marginRight:"8%"
        }}
        onPress={()=>{
                   Alert.alert("Do you want to forgot password ?",
                   "",[
                     {
                       text:"yes",
                       onPress:()=>{
                        this.forgot_password();
                       }
                     }, {
                       text:"no"
                     }
                   ],
                   {cancelable:false}
                   )
        }}
        > Forgot Password ?</Text>
        <View  //this view for login button
        style={{
            marginTop:"3%",
            padding:'7%'
          }}
        >
        <TouchableOpacity 
         onPress={ //this is check when we click loging button 
          ()=>{
      this.get_data();
      // console.log("hii")
         }
          }
          style={styles.bt_login}
          >
            <Text
            style={{color:'white',fontSize:18,}}
            >LOGIN</Text>
          </TouchableOpacity>
        </View>
        
           </Card>
           </ScrollView>
      </SafeAreaView>
    );
}
}
const styles=StyleSheet.create({
 top:{ //top container 
   width:"100%",
   height:"30%",
 },
 tittle:{
  flexDirection:'row-reverse',
  justifyContent:'space-evenly',
  alignSelf:'center',
  paddingRight:"50%",
 marginTop:"8%",
   height:40,
   
 }, 
 input:{ 
   
  alignItems:'center',
  // backgroundColor:'#ccc'
 },
 img:{ //image of email
 marginTop:12,
 marginEnd:10,
 },
 show_password:{
  //  backgroundColor:'red',
  marginTop:12,
   marginLeft:"90%", 
   position:'absolute'
 },
 bt_login:{
   paddingTop:13,
   alignItems:'center',
  borderRadius:25,
   backgroundColor:'#005a9e',
   width:"100%",
   height:50,
 },
 img_logo:{
  height:"27%",
 width:"50%",
 alignSelf:'center',
 marginTop:"1%"
 },
 main_container:{
  alignSelf:'center',
  marginTop:"7%",
  //  marginLeft:20,
   borderRadius:20,
  //  marginTop:20,
  backgroundColor:"white",
  // opacity:0.4

 },
 heading:{
  backgroundColor:'#005a9e'
 }
 
})

export default login;