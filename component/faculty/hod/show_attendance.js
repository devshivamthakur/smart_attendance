import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,ImageBackground } from 'react-native';
import {Surface} from 'react-native-paper';
import { BackHandler } from 'react-native';
import NetworkUtils from '../../../NetworkUtils';
import ProgressDialog from 'react-native-progress-dialog';
import AsyncStorage  from "@react-native-community/async-storage";  
import { Button} from 'react-native-paper';

// import  *as tt  from "./total_survey";
export class show_attendance extends Component {
    state={
        visible:false,
        progress_visible:false,
         data:[],
         branch_name:"",
         tag:"",
         tag1:"",
         branch_id:""


    }

    onPress_semester(faculty_id,sem_id,attendance_status,from_where){

        console.log("faculty_id"+attendance_status)
        if(from_where!='0'||from_where!=0){

            this.props.navigation.navigate("show_att1",{faculty_id:faculty_id,tag:this.state.tag,tag1:this.state.tag1,branch_id:this.state.branch_id,sem_id:sem_id,attendance_status:attendance_status})

        }


    }
  
 async  get_data(){

//   console.log(  get_total_team_());
        var branch_id=  await AsyncStorage.getItem("branch_id");
        this.setState({
            branch_name:await AsyncStorage.getItem("branch_name"),
            branch_id:branch_id
        })
            
        var tag="";
        var tag1="";

                if(branch_id=='1'||branch_id=='2'){
                    tag="MIT_Student_info";
                    tag1="MIT_Student_attendance";
                }else{
                tag="MITS_Student_info";
                tag1="MITS_Student_attendance";

                } 
                this.setState({
                    tag:tag,
                    tag1:tag1,
                })
        const isConnected=await NetworkUtils.isNetworkAvailable();
        if(isConnected){
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
     
        //  var start_date=day+"/"+month+"/"+year;
         var start_date= year+"-"+month+"-"+day;
            this.setState(
                {
                    progress_visible:true
                }
            )
            
       var hod_id=await AsyncStorage.getItem("hod_id");
    //    console.log("date   :"+servey_id)
    var     insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/show_attendance.php";

       var header={
         'Accept':'application/json',
         'Content-Type':'application/json'
       };
       fetch(insertAPIURL,{
           method:'POST',
           headers:header,
           body:JSON.stringify({
            hod_id: Number(hod_id),
            from_where:tag,
            date:start_date,
            branch_id:branch_id,
            tag1:tag1,
            type:"st1"  
           })   
       }  
       ).then((response)=>response.json())
       .then((response)=>{
          console.log("sadf"+response)
          if(response!=null||response.length!=0){
                   
            this.setState(
                {
                    data:response 
                }
            )
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
    }else{
        ToastAndroid.show("internet is not Available ",ToastAndroid.SHORT);
        this.setState(
            {
                progress_visible:false
            }
        )
    } 
    }
    handleBackButtonClick=()=> {
    this.props.navigation.replace("dashboard_fc");
     return true;
    }
  componentWillUnmount() {
      this.setState(
          {
            visible:false,
            sur_mg_reg_id:"",
            progress_visible:false,
             data:[],
             selfs:""
          }
      )
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  _renderItem= ({item,index})=>{

return(

    <Surface
    style={{
        backgroundColor:"#005a9e",
        padding:8,
        borderRadius:12,
        margin:10
    }}
    >
        
        <Surface
         style={{
             padding:4,
             margin:5,
             borderRadius:12,
             flexDirection:"row",
             justifyContent:"space-evenly"
         }}
         >
             <Text style={style.cnt_text}>#{index+1}</Text>
             <View>
             <Text style={style.txt_h} >Teacher  Name</Text>
             <Text style={style.txt_id} >{item.name}</Text>
             </View>
            
         </Surface>
         <Surface
             style={{
                 // flexDirection:"row",
                 borderRadius:12,
                 // flex:1
                 padding:5,
                 marginTop:10
             }}
             >

             <Surface
             style={{
                 // flexDirection:"row",
                 borderRadius:12,
                 // flex:1
                 padding:5,
                 marginTop:10
             }}
             >
                 <View
                 style={{
                     flexDirection:"row",
                     borderRadius:12,
                     // flex:1
                     padding:5
                 }}
                 >
                    <View 
                 style={{
                     padding:5,
                     width:"33%"
                 }}
                 >
                     <Text style={style.txt_1}>Semester</Text>
                     <Text style={style.txt_1}>First</Text>
                     <Text style={style.txt_1}>Second</Text>
                     <Text style={style.txt_1}>Third</Text>
                     <Text style={style.txt_1}>Fourth</Text>
                     <Text style={style.txt_1}>Fifth</Text>
                     <Text style={style.txt_1}>Sixth</Text>
                     <Text style={style.txt_1}>Seventh</Text>
                     <Text style={style.txt_1}>Eighth</Text>

                 </View> 
                 <View 
                 style={{
                     padding:5,
                     width:"33%"
                 }}
                 >
                     <Text style={style.txt_1}>Present</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,1,1,item.pfsem)}} >{item.pfsem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,2,1,item.pssem)}}>{item.pssem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,3,1,item.ptsem)}}>{item.ptsem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,4,1,item.pfrsem)}}>{item.pfrsem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,5,1,item.pfivesem)}}>{item.pfivesem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,6,1,item.psixsem)}}>{item.psixsem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,7,1,item.psevensem)}}>{item.psevensem}</Text>
                     <Text style={style.txt_2} onPress={()=>{this.onPress_semester(item.id,9,1,item.pesem)}}>{item.pesem}</Text>
                 

                 </View>
                 <View 
                 style={{
                     padding:5,
                     width:"33%"
                 }}
                 >
                     <Text style={style.txt_1}>Absent</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,1,0,item.afsem)}}>{item.afsem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,2,0,item.assem)}}>{item.assem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,3,0,item.atsem)}}>{item.atsem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,4,0,item.afrsem)}}>{item.afrsem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,5,0,item.afivesem)}}>{item.afivesem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,6,0,item.asixsem)}}>{item.asixsem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,7,0,item.asevensem)}}>{item.asevensem}</Text>
                     <Text style={style.txt_2}  onPress={()=>{this.onPress_semester(item.id,8,0,item.aesem)}}>{item.aesem}</Text>
 
                 </View>
              
                 </View>
                
                    </Surface>

                 </Surface>

    </Surface>
  
);
}
  componentDidMount(){
      this.get_data()
    //   this.get_total_team_()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
   }
    render() {
        return (
            <ImageBackground
                style={style.container}
                source={require("../../../images/bg1.jpg")}
                >
                <ProgressDialog visible={this.state.progress_visible} />
                <Surface
         style={{
             padding:4,
             margin:5,
             borderRadius:12,
             flexDirection:"row",
             justifyContent:"space-evenly",
             backgroundColor:"#005a9e",
         }}
         >
             <View>
             <Text style={style.txt_h1}  >Branch : {this.state.branch_name}</Text>
             </View>
            
         </Surface>
               
                <FlatList
                        data={this.state.data}            //set data on list
                        renderItem={this._renderItem}
                        keyExtractor={item=>item.name}
                        />
               <Surface>

               </Surface>
            </ImageBackground>
        )
    }
}
const style=StyleSheet.create(
    {
        txt_heading:{
            fontSize:17,
            padding:20
        },
        txt_name:{
            // paddingLeft:"5%",
            fontSize:14,
            width:"50%",
        },
        txt_cnt:{
        
            // backgroundColor:"red",
            // width:80,
            textAlign:"right",
            fontSize:14,
            // paddingLeft:4
            textAlign:"center",
            
            paddingRight:"8%",
            // alignSelf:"center"

        } ,txt_heading1:{
            fontSize:17,
            // padding:20
            padding:5,
            // textAlign:"center"
        },
        txt_cnt1:{
        
            textAlign:"right",
            fontSize:14,
          

        },
        cnt_text:{
            fontSize:18,
            fontWeight:"bold",
            color:"blue",
            top:"2%"
        },
        txt_id:{
            textAlign:"center"
        },
        txt_h:{
            fontSize:20,
            textAlign:"center",
    
        },txt_h1:{
            fontSize:20,
            textAlign:"center",
            color:"white",
            padding:5
    
        },txt_1:{
            fontSize:16,
            color:"blue",
            margin:5,
            fontWeight:"bold",
            textAlign:"center"

        },
        txt_2:{
            fontSize:16,
            margin:5,
            textAlign:"center"
        },
        container:{
            height:'100%',
            width:"100%",
           //  alignItems:'center'
        },
        txt_h1:{
            fontSize:20,
            textAlign:"center",
            color:"white",
            padding:5
    
        }

    }
)
export default show_attendance
