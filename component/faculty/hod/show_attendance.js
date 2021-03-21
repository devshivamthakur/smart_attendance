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

    }

  
 async  get_data(){

//   console.log(  get_total_team_());
        var branch_id=  await AsyncStorage.getItem("branch_id");
        var tag="";
        var tag1="";

                if(branch_id=='1'||branch_id=='2'){
                    tag="MIT_Student_info";
                    tag1="MIT_Student_attendance";
                }else{
                tag="MITS_Student_info";
                tag1="MITS_Student_attendance";

                } 
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
            tag1:tag1
           })
       } 
       ).then((response)=>response.json())
       .then((response)=>{
          console.log(response)
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
    // this.props.navigation.replace("hv");
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
                     <Text style={style.txt_1}>Branch</Text>
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
                     <Text style={style.txt_2}>{item.pfsem}</Text>
                     <Text style={style.txt_2}>{item.pssem}</Text>
                     <Text style={style.txt_2}>{item.ptsem}</Text>
                     <Text style={style.txt_2}>{item.pfrsem}</Text>
                     <Text style={style.txt_2}>{item.pfivesem}</Text>
                     <Text style={style.txt_2}>{item.psixsem}</Text>
                     <Text style={style.txt_2}>{item.psevensem}</Text>
                     <Text style={style.txt_2}>{item.pesem}</Text>
                 

                 </View>
                 <View 
                 style={{
                     padding:5,
                     width:"33%"
                 }}
                 >
                     <Text style={style.txt_1}>Absent</Text>
                     <Text style={style.txt_2}>{item.afsem}</Text>
                     <Text style={style.txt_2}>{item.assem}</Text>
                     <Text style={style.txt_2}>{item.atsem}</Text>
                     <Text style={style.txt_2}>{item.afrsem}</Text>
                     <Text style={style.txt_2}>{item.afivesem}</Text>
                     <Text style={style.txt_2}>{item.asixsem}</Text>
                     <Text style={style.txt_2}>{item.asevensem}</Text>
                     <Text style={style.txt_2}>{item.aesem}</Text>
 
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

    }
)
export default show_attendance
