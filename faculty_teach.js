import React, { Component } from 'react';
import {  View ,StyleSheet,DrawerLayoutAndroid,Text,Image, Alert, ToastAndroid,Pressable} from 'react-native';
import {NavigationContainer  } from "@react-navigation/native";
import {  createStackNavigator} from "@react-navigation/stack";
import  Icon  from 'react-native-vector-icons/Ionicons';
import  Icon2  from 'react-native-vector-icons/MaterialIcons';
import  Icon4  from 'react-native-vector-icons/FontAwesome';
import AsyncStorage  from "@react-native-community/async-storage";  
import { Avatar } from 'react-native-paper';

import { useRef } from 'react';
import NetworkUtils from './NetworkUtils';
import ProgressDialog from 'react-native-progress-dialog';
import dashboard from './component/faculty/teacher/dashboard';
import dashboard_hod from "./component/faculty/hod/dashboard_hod";

// const drawer;
const Stack=createStackNavigator();
// const visible=false;
export class faculty_hod extends Component {
  constructor(args){
    super(args)
    this.drawer=null;
  } 
  state={
    visible:false,
    drawer:"",
    location:"bhopal",
    name:"SHIVAM KUMAR",
    branch:"CSE",
    progress_visible:false,
    profile_uri:null,
    initialRouteName:"dashboard",
    verified:false
  }
  initialize_drawer(){
    const drawer1=useRef(null);
   this. drawer=drawer1;
   }

   componentWillUnmount(){

    this.setState({
      visible:false,
      drawer:"",
      location:"bhopal",
      name:"",
      survey_reg_id:"",
      progress_visible:false,
      profile_uri:null,
      initialRouteName:"dashboard",
      verified:false
    })

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
      <Icon2 name="verified" size={this.state.verified?20:0} color="yellow"  />
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
    <View
    style={{
      flexDirection:"row",
      marginLeft:10
    }}
    >
     <Icon2  name="contact-support" color="black" size={25}  style={{marginTop:4}}/>
     <Text style={styles.txt5}> Support </Text>
    </View>
   
    <View
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
    </View>
  
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
    }
  )
}


  //getting survey details like name,survey registration details 
 async get_survey_details(){
  
  this.setState(
    {
      survey_reg_id:await AsyncStorage.getItem("survey_reg_id"),
    }
  )
  const isConnected = await NetworkUtils.isNetworkAvailable();
  // const isConnected =false;
  if(isConnected){
      var servey_id=await AsyncStorage.getItem("servey_id");
      // console.log("id"+servey_id);
      // var insertAPIURL="https://unimportuned-dozens.000webhostapp.com//faculty_hod_db/get_all_survey_data.php";
      var  insertAPIURL="http://government.crtd.in/android/phpdb/faculty_hod_db/get_all_survey_data.php";

      var header={
        'Accept':'application/json',
        'Content-Type':'application/json'
      };
      
      fetch(insertAPIURL,{
          method:'POST',
          headers:header,
          body:JSON.stringify({

              servey_id: Number(servey_id),
          })
      }
      ).then((response)=>response.json())
      .then((response)=>{
            // console.log(response)
            if(response[0]!="not"){

         
            }
      }).catch((error)=>{
          // console.log(error)
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
   
            this.props.navigation.replace("Login");
  }

  componentDidMount(){
    // this.setState({
    //   progress_visible:true
    // })
    // this.get_survey_details()
  }
 
  //side menu and icon
side_menu =()=>{
  let _menu = null;
  return(
      <View
      style={{
        flexDirection:'row',
      //   backgroundColor:'red',
      margin:5   
      }}
      >
        <Avatar.Image size={50} source={require("./images/main_logo.jpg")} onTouchStart={()=>{this.refs['DRAWER'].openDrawer();}} />
     
     </View>   
  );
}

 
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
            
            >
               <ProgressDialog visible={this.state.progress_visible} />
            <NavigationContainer
           independent={true}
           >
              <Stack.Navigator
              initialRouteName="dashboard_teach"
              
              >
                  <Stack.Screen
                  name="dashboard_teach"
                  component={dashboard}
                  options={{
                    headerRight:()=>(<this.side_menu/>),
                    headerStyle:{
                      backgroundColor:'#005a9e'
                    },
                    headerTitleStyle:{
                      fontWeight:'bold',
                      color:"white",
                      width:100,
                      fontSize:16
                    },
                    headerLeft:()=>(<this.left_menu/>),
                    
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
