import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView ,ImageBackground, ToastAndroid} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { Button,Surface} from 'react-native-paper';
import { BackHandler } from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';
import AsyncStorage  from "@react-native-community/async-storage";  

import NetworkUtils from '../../NetworkUtils';


export class class_branch extends Component {
      
   constructor(args){
   super(args);
    // this.get_state();
    }
    state={
      
      branch_id:"",
      sem_id:"",
      sem_view_visble:"none",
      progress_visible:false,
      branch_name:"", 
    }
    handleBackButtonClick= async ()=> {
    //   console.log("type"+this.state.type)
    this.props.navigation.replace("dashboard_fc");

        return true;
      }
    
async    get_data(){
    this.setState({
        branch_id: await AsyncStorage.getItem("branch_id"),
        branch_name:  await AsyncStorage.getItem("branch_name")
        
    })
  
    }
componentDidMount(){
    this.get_data()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

}
componentWillUnmount() {
    this.setState({
        
        branch_id:"",
        sem_id:"",
        sem_view_visble:"none",
        progress_visible:false

    })
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

// this.props.route.params.parent_registration_id



    branch_picker ( itemvalue){
        this.setState({branch_id:itemvalue})
        if(itemvalue!='Select Branch '){
                 
            this.setState({
                sem_view_visble:"flex"
            })
        }
    }
  
  
  async onPress_continue(){
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if(isConnected){
            if(this.state.branch_id.trim().length==0){
                alert("Please Select Branch")

            }else if(this.state.sem_id.trim().length==0){
                alert("Please Select Semester")

            }else{
                this.setState(
                    {
                        progress_visible:true
                    }
                )
                var st=new Date();
              var day= String( st.getDate());  
              var month=String( st.getMonth()+1 );  
              var year= String(st.getFullYear()); 
              if(month.length==1){
                  month="0"+month;
              }
              if(day.length==1){
                  day="0"+day;
              }
        //   //  var start_date=day+"/"+month+"/"+year;
           var start_date= year+"-"+month+"-"+day;
    
                // alert(this.state.sem_id+" "+this.state.branch_id)
                var     insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/attendance_data.php";
    
                var header={
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                  };
           fetch(insertAPIURL,{
               method:'POST',
               headers:header,
               body:JSON.stringify({
                branch_id: this.state.branch_id,
                sem_id:this.state.sem_id,
                date:start_date
               })
           } 
           ).then((response)=>response.json())
           .then((response)=>{
            //   response.attendance_s tatus="";
            console.log(response+"dv")
     
            //        
              if(response!=null||response.length!=0){
                  if(response[0].mess=="present"){

                    alert("this branch and semester attendance has already taken")

                  }else if(response[0].mess=="s"){
                    var tag="";

                    if(this.state.branch_id=='1'||this.state.branch_id=='2'){
                            tag="MIT_Student_info";
                    }else{
                        tag="MITS_Student_info";
                    }
                    this.props.navigation.navigate("take_at",{branch_id:this.state.branch_id,sem_id:this.state.sem_id,tag:tag})
                
                  }else{

                     ToastAndroid.show("serve problem",ToastAndroid.LONG);

                  }
               
               
              }
               
              this.setState(
                {
                    progress_visible:false,
                    
                }
            )
    
           }).catch((error)=>{
               console.log("error from total survey:"+error);
               this.setState(
                {
                    progress_visible:false
                }
            )
           })
              
            }

    }else{
        ToastAndroid.show("Internet is required")
    }
   }
    render() {
       
            return(
                <ImageBackground
                style={styles.container}
                source={require("../../images/bg1.jpg")}
                >
                 <ProgressDialog 

                visible={this.state.progress_visible} />
            <ScrollView
            
            >
                <Card
                style={styles.all_picker}
                >
                    <Text
                   style= {styles.indicate}
                    >Select Branch</Text>
                    <View
                    style={styles.picker_view}
                    >
                    <Picker
                    selectedValue={this.state.branch_id}
                    style={styles.state_picker} 
                    itemStyle={styles.it}
                    onValueChange={(itemVale)=>{this.branch_picker(itemVale)}}
                  >

                  <Picker.Item label={this.state.branch_name} value={this.state.branch_name}  color="green"/>
              
                         
                    </Picker>
                    </View>
                    <View
                   
                    >
                    <Text
                 style={styles.indicate}
                > Select Semester</Text>
                <View
                      style={styles.picker_view}
                >
                    <Picker
                    selectedValue={this.state.sem_id}
                    style={styles.state_picker}
                    itemStyle={styles.it}
                    onValueChange={(itemVale)=>{this.setState({sem_id:itemVale})}}

                    >
                       <Picker.Item label="Select Semester" value=""  color="white"/>
                       <Picker.Item label="First" value="1" color="green" />
                       <Picker.Item label="Second" value="2"  color="green"/>
                       <Picker.Item label="Third" value="3" color="green" />
                       <Picker.Item label="Fourth" value="4"color="green" />
                       <Picker.Item label="Five" value="5" color="green" />
                       <Picker.Item label="six" value="6" color="green" />
                       <Picker.Item label="Seven " value="7" color="green" />
                       <Picker.Item label="eight" value="8" color="green" />
                      
                    </Picker>
                    </View>
                    </View>
                
                  
                
                    <Button 
                    onPress={()=>{
                        this.onPress_continue();
                    }}
                    mode="contained"
                    labelStyle={{
                        color:'white',
                        fontSize:16
                    }}
                    style={
                        {
                            width:150,
                            alignSelf:'center',
                            marginTop:"10%",
                            borderRadius:15,
                            backgroundColor:"#bc5100",
                            height:40
                        }
                    }
                    >
                     Continue
                    </Button>
           
                </Card>
            
            </ScrollView>

            </ImageBackground>
            );
    }
}
const styles=StyleSheet.create(
    {
        state_picker:{
            //  width:100,
           
            height:50,
            borderWidth:5,
            borderColor:'#0adeef',
            // color:'white'
        },
        indicate:{
                        fontSize:18,
                        fontWeight:'bold',
                       color:'white',
                    marginTop:10,
                   
                },
         container:{
             height:'100%',
             width:"100%",
            //  alignItems:'center'
         },
        
         all_picker:{
             padding:30,
             marginTop:"20%",
             alignSelf:'center',
             backgroundColor:'rgba(52, 52, 52, 0.8)',
             borderRadius:30,
             width:"90%",
             margin:15,
             
         } ,
         submit_txt:{
             fontSize:20,
             fontWeight:"bold",
             color:'white',
             alignSelf:'center'
         },
         picker_view:{
            borderColor:"#136a8a",
            borderWidth:2,
            borderRadius:10,
              backgroundColor:"rgba(52, 52, 52, 0.8)",
              marginTop:10
         },
         img_trans:{
            height:150,
            marginTop:"10%",
            width:"99%",
            resizeMode: "contain",
         },
         txt_h_y_c_a:{
            fontSize:16,
            fontFamily:"sans-sarif",
            marginLeft:'5%',
            marginTop:'2%',
            color:'#000'
        },
        txt_h:{
            fontSize:20,
            textAlign:"center",
    
        },
        txt_id:{
            textAlign:"center"
        },
        txtinput:{
            borderColor:"#136a8a",
            borderWidth:2,
            borderRadius:10,
              backgroundColor:"#eff6fc",
              marginTop:10,
              paddingLeft:40,
              fontSize:16
        },
        it:{
            paddingLeft:40,
              fontSize:16,
              fontWeight:'bold',
        }
    }
)

export default class_branch;
