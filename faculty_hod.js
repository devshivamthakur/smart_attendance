import React, { Component } from 'react';
import {  View ,StyleSheet,DrawerLayoutAndroid,Text,Image, Alert, ToastAndroid,Pressable} from 'react-native';
import {NavigationContainer  } from "@react-navigation/native";
import {  createStackNavigator} from "@react-navigation/stack";
import  Icon  from 'react-native-vector-icons/Ionicons';
import  Icon2  from 'react-native-vector-icons/MaterialIcons';
import  Icon4  from 'react-native-vector-icons/FontAwesome';
import AsyncStorage  from "@react-native-community/async-storage";  

import { useRef } from 'react';
import NetworkUtils from './NetworkUtils';
import ProgressDialog from 'react-native-progress-dialog';
import dashboard_hod from "./component/faculty/hod/dashboard_hod";
import class_branch from "./component/faculty/class_branch";
import takeattendance from './component/faculty/takeattendance';
import show_attendance from './component/faculty/hod/show_attendance';
import show_attendance1 from './component/faculty/show_attendance1';

// const drawer;
const Stack=createStackNavigator();
// const visible=false;
export class faculty_hod extends Component {
  constructor(args){
    super(args)
    this.drawer=null;
  } 
  state={

    name:"",
    branch:"",
    progress_visible:false,
 
  }
  initialize_drawer(){
    const drawer1=useRef(null);
   this. drawer=drawer1;
   }

   navigation_view_drawer=()=>(
    <View
    style={{
     width:"75%",
     height:"100%"
    }}
    >
    <View
    style={{
      width:350,
      backgroundColor:"#00695c",
         height:"30%",
       
    }}
    >
  <Image source={require("./images/main_logo.jpg")} style={styles.img_drawer_logo} />
    </View>
  <View
  style={{
    backgroundColor:"#26a69a",
    // width:"100%"
    width:"120%",
    paddingBottom:10,
    paddingTop:5
  }}
  >
 <View
    style={{
      flexDirection:"row",
      alignSelf:"center",
    }}
    >
      <Text style={styles.txt_drawer} >Name:</Text>
      <Text style={styles.txt_drawer} > {this.state.name} </Text>
    </View>
    <View
    style={{
      flexDirection:"row",
      alignSelf:"center"
    }}
    >
    <Text style={[styles.txt_drawer],styles.txt_sur_id}>Branch :</Text>
      <Text style={styles.txt_sur_id} > {this.state.branch} </Text>
    </View>
    
  </View>
   
    <Pressable
    style={{
      flexDirection:"row",
      // justifyContent:"space-between"
      margin:10
    }}
    >
     <Icon4   name="user-o" color="black" size={25} style={{marginTop:4}} 
       />
     <Text style={styles.txt5} > Profile </Text>
    </Pressable>
   
   
    <Pressable
    style={{
     flexDirection:"row",
    position: 'absolute',
    bottom:20,   
    elevation:1.5 
  }}
  onTouchStart={() => {  Alert.alert(
    "Do you Want to Logout","",[
      {
        text:"Yes",
        onPress:()=>{this.logout_fun()}
        
      },
      {
        text:"NO"
      }
    ]
  )}}
    >
      <Icon2 name="logout" size={30} 
      style={{
        marginLeft:10
      }}
      />
      <Text 
      style={{
        textAlign:"right",
        width:"85%"
      }}
      >Logout</Text>
    </Pressable>
  
    </View>
  )
 
componentWillUnmount(){

  this.setState(
    {
      visible:false,
      drawer:"",
      name:"",
      branch:"",
      // initialRouteName:"dashboard"
      progress_visible:false,
    }
  )
}


  //getting survey details like name,survey registration details 
 async get_hod_details(){
  
  this.setState(
    {
      hod_id:await AsyncStorage.getItem("hod_id"),
    }
  )
  const isConnected = await NetworkUtils.isNetworkAvailable();
  // const isConnected =false;
  if(isConnected){
      var hod_id=await AsyncStorage.getItem("hod_id");

    var  insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/user_registration.php";

       var header={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
       
      fetch(insertAPIURL,{ 
          method:'POST',
          headers:header,
          body:JSON.stringify({

            hod_id: Number(hod_id),
            selected_login_type:"info"
          })  
      } 
      ).then((response)=>response.json())
      .then((response)=>{
            console.log(response)
            this.setState({
              progress_visible:false
            })
            if(response.length!=0){

              AsyncStorage.setItem("branch_name",response.branch);
              AsyncStorage.setItem("branch_id",String(response.branch_id));
              this.setState(
                {
                  name:response.name,
                  branch:response.branch
                }
              )
         
            }
      }).catch((error)=>{
          console.log(error)
          this.setState({
            progress_visible:false
          })
      })

   }else{
        ToastAndroid.show("Internet is Required to get Surveyus Data",ToastAndroid.LONG);
        this.setState({
          progress_visible:false
        })
    }
     }
  //logout 
  logout_fun(){
    AsyncStorage.setItem("sft","yes");  //set data
    AsyncStorage.setItem("lt","Login");
    AsyncStorage.removeItem("hod_id");
           this.props.navigation.replace("Login");
  }

  componentDidMount(){
    this.setState({
      progress_visible:true
    })
    this.get_hod_details()
  }
 
  //side menu and icon


 
    left_menu=()=>{
      return(
             <View
             style={
               {
                 flexDirection:'row'
               }
             }
             >
            <Icon name="reorder-three" color="white"  size={45}  
            onPress={()=>{this.refs['DRAWER'].openDrawer();}}
         />
         
     </View>
            ); 
      
          }
            
         
    render() {
        return (
          <DrawerLayoutAndroid
             ref={'DRAWER'}
            drawerPosition={"left"}
            renderNavigationView={this.navigation_view_drawer}
            style={{ flex: 1 }}
            >
               <ProgressDialog visible={this.state.progress_visible} />
            <NavigationContainer
           independent={true}
           >
              <Stack.Navigator
              initialRouteName="dashboard_fc"
              >
                   
                  <Stack.Screen
                  name="dashboard_fc"
                  component={dashboard_hod}
                  
                  options={{
                    headerStyle:{
                      backgroundColor:'#005a9e'
                    },
                    headerTitleStyle:{
                      fontWeight:'bold',
                      color:"white",
                      width:100,
                      fontSize:16
                    },
                    title:"Dashboard",
                    headerLeft:()=>(<this.left_menu/>),
                    
                  }}
                  />
                  
                  <Stack.Screen
                  name="class_branch"
                  component={class_branch}
                  options={{
                    title:"Class and Branch",
                    headerStyle:{
                      backgroundColor:'#bc5100'
                    },
                    headerTitleStyle:{
                      fontWeight:'bold',
                      color:"white",
                      // width:100,
                      fontSize:16
                    },
                  }}
                  />
                 
                  <Stack.Screen
                  name="take_at"
                  component={takeattendance}
                  options={{
                    title:"Take Attendance",
                    headerStyle:{
                      backgroundColor:'#bc5100'
                    },
                    headerTitleStyle:{
                      fontWeight:'bold',
                      color:"white",
                      // width:100,
                      fontSize:16
                    },
                  }}
                   />
                  <Stack.Screen
                  name="show_att"
                  component={show_attendance}
                  options={{
                    title:"show Attendance",
                    headerStyle:{
                      backgroundColor:'#bc5100'
                    },
                    headerTitleStyle:{
                      fontWeight:'bold',
                      color:"white",
                      // width:100,
                      fontSize:16
                    },
                  }}
                   />
                 <Stack.Screen
                  name="show_att1"
                  component={show_attendance1}
                  options={{
                    title:"show Attendance",
                    headerStyle:{
                      backgroundColor:'#bc5100'
                    },
                    headerTitleStyle:{
                      fontWeight:'bold',
                      color:"white",
                      // width:100,
                      fontSize:16
                    },
                  }}
                   />
              </Stack.Navigator>
             
           </NavigationContainer>
          
           </DrawerLayoutAndroid>
           )
    }
}
const styles=StyleSheet.create(
    {
      
      img_side_menu:{
        borderWidth:1,
        borderColor:"black",
        width:50,
        height:50,
    borderRadius:25,
    position:'relative'
      },
      open_menu_style:{
      //  backgroundColor:"red",
       height:"100%",
      textAlignVertical:'center'
      
      },
      img_location:{
        alignSelf:"center",
        // backgroundColor:"red"
        marginLeft:5
      },
      img_drawer_logo:{
        height:"97%",
        width:"55%",
        // alignSelf:'center',
        marginTop:"1%",
        marginLeft:"15%"
        // backgroundColor:"red"
      },
      txt_drawer:{
        fontSize:16,
      // textAlign:"center"
      },
      txt_sur_id:{
        fontSize:16,
        //  backgroundColor:"#e0f2f1"
      },
      txt5:{
        fontSize:20,
        marginLeft:30
      }
    }
  )
export default faculty_hod
