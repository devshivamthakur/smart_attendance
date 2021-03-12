import React,{useEffect} from 'react';
import {NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import login from "./component/login";
import AsyncStorage   from "@react-native-community/async-storage";  
import {  ImageBackground } from 'react-native';
import faculty_hod from './faculty_hod';
import faculty_teach from './faculty_teach';

var isfirsttime;
var lt="login";

const Stack=createStackNavigator();
 class App extends React.Component{

  state={
    loading:true
  }

   constructor(args){
     super(args)
    setTimeout(()=>{
        this.setState({
          loading:false
        })
    },4000)
   }
 

  splash=()=>{
    return(
              <ImageBackground 
              source={require("./images/main_logo.jpg")}
              resizeMode="contain"
              style={{
                // flex:1,
                // alignSelf:"center",
                // justifyContent:"center",
                width:"100%",
                height:"100%",
                backgroundColor:"#102027"
              
              }}
              />
    );
  }

render(){
  const AppNavigation=  () =>{
    // const [getft,setft] = useState(true);  // getft used for check data is getted from storage or not 
   
    const ct= async()=>{  //this method get data (is already loged in or not )
      try {
        var check = await AsyncStorage.getItem("sft")  //get data
        var get_lt = await AsyncStorage.getItem("lt")  //get login type
        if(check==null||get_lt==null){
          isfirsttime=true;
          lt="Login";
          // setft(false)
        }
       else if(check.length==0||get_lt.length==0){
        //  console.log("hello 1");
         isfirsttime=true;
         lt="Login";
            // setft(false)
        
        }
        if(check==='yes'){
          lt="Login";
         isfirsttime=true;
        //  setft(false)
        }
        else if(check==='no'){
           if(get_lt==""){
             lt="Login";
           }else if(get_lt=="hod"){
             lt="fc";
           }else if(get_lt=="teach"){
             lt="fc_t";
           }
          isfirsttime=false;
          // setft(false)
        }
      } catch (error) {
        // Alert.alert(error.message)
      }
      
    }
   useEffect(() => {  //it is used to get data before start app
     ct()               //calling function
   },[]);
   
    if(!this.state.loading){
      // console.log(isfirsttime)
      // lt="addnh";
      return(
        <NavigationContainer>
          <Stack.Navigator

          // initialRouteName={isfirsttime?"Sur":"Login"}  //if isfirsttime is true than call login page or if false call emp page
          initialRouteName={isfirsttime?lt:lt}  //if isfirsttime is true than call login page or if false call emp page

          //  initialRouteName={"Emp"}
          >
             <Stack.Screen
            options={{headerShown:false}}
             name="Login"
             component={login}
             /> 
             <Stack.Screen
              options={{headerShown:false}}
             name="fc"
             component={faculty_hod}
             /> 
              <Stack.Screen
              options={{headerShown:false}}
             name="fc_t"
             component={faculty_teach}
             />
             
          </Stack.Navigator>
        </NavigationContainer>
      );
       
    }
    else{
      return(
        <this.splash/>
      );
    } 
    
    }
  return(
    <AppNavigation/>
  );
}
}

export default App;
