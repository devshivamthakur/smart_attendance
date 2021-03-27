import React, { Component } from 'react'
import { Text, View ,StyleSheet,ImageBackground} from 'react-native'
import {Surface,Searchbar} from 'react-native-paper';
import ProgressDialog from 'react-native-progress-dialog';
import RadioForm from 'react-native-simple-radio-button';
import NetworkUtils from './../../NetworkUtils';
import AsyncStorage  from "@react-native-community/async-storage";  
import { BackHandler } from 'react-native';
import { Button} from 'react-native-paper';

export class search_student extends Component {
    state={
        search_student_txt:"",
        attendance_status:0,
        progress_visible:false,
        name:"",
        father_name:"",
        enrollment_no:"",
        data:[],
        data_visible:"none",
        branch_id:"",
        branch_name:"",
        student_id:""
    }
    radio_props = [
        {label: 'Absent ', value: 0 },
        {label: 'Present', value: 1 }
      ];

      async onPress_continue(search_student_text){
          console.log(this.state.branch_id)
          console.log(this.state.branch_name)
          console.log(search_student_text)
          var tag=Number( this.state.branch_id);
          var tag1="";
          console.log(tag)
        if(tag==1||tag==2){
            console.log(typeof(tag))

            tag="MIT_Student_info"
            tag1="MIT_Student_attendance";

        }else{
            tag="MITS_Student_info"
            tag1="MITS_Student_attendance";


        }
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
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if(isConnected){
                if(search_student_text.trim().length==0){
                    alert("Please Enter Student Name")
    
                }else{
                    this.setState(
                        {
                            progress_visible:true
                        }
                    )
                   
                    // alert(this.state.sem_id+" "+this.state.branch_id)
                    var   insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/search_student.php";
        
                    var header={
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                      };
               fetch(insertAPIURL,{
                   method:'POST',
                   headers:header,
                   body:JSON.stringify({
                    branch_id: this.state.branch_id,
                    search_student_text:search_student_text,
                    fromwhere:tag,
                    tag1:tag1,
                    date:start_date
                   })
               }  
               ).then((response)=>response.json())
               .then((response)=>{
                //   response.attendance_s tatus="";
                console.log(response[0].attendance_status+"dv")
         
                       
                  if(response!=null||response.length!=0){
                      this.setState({
                          name:response[0].name,
                          attendance_status:Number( response[0].attendance_status),
                          father_name:response[0].father_name,
                          enrollment_no:response[0].enrollment_no,
                          data_visible:"flex",
                          student_id:response[0].student_id,
                          data:response[0]

                      })
                      console.log( typeof( this.state.attendance_status))
                    
                      }else{
    
                         ToastAndroid.show("serve problem",ToastAndroid.LONG);
    
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
    searchFilterFunction = text => {    
       
        // console.log(text)
          this.onPress_continue(this.state.search_student_txt)
    }
    set_status(value,index){
        console.log(this.state.attendance_status)
    this.setState({
        attendance_status:value
    })
    
  }

 async get(){
    this.setState({
        branch_id: await AsyncStorage.getItem("branch_id"),
        branch_name:  await AsyncStorage.getItem("branch_name")
        
    })
  }
  componentDidMount(){
   
    this.get()
      if(this.state.data.length!=0){
        this.setState({
            data_visible:"flex"

        })
      }
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

     
  }
  componentWillUnmount(){
      this.setState({
        search_student_txt:"",
        attendance_status:0,
        progress_visible:false,
        name:"",
        father_name:"",
        enrollment_no:"",
        data:[],
        data_visible:"none",
        branch_id:"",
        branch_name:"",
        student_id:""

      })
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

  }
  handleBackButtonClick=()=> {
    this.props.navigation.replace("dashboard_fc");
     return true;
    }

   async submit(){
    var hod_id=   await  AsyncStorage.getItem("hod_id");
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

var h1= String( st.getHours());  
var m1= String( st.getMinutes());  
var s1= String( st.getSeconds()) ;
if(h1.length==1){
    h1="0"+h1;
}
if(m1.length==1){
    m1="0"+m1;
}
if(s1.length==1){
    s1="0"+s1;
}
var stime=h1+":"+m1+":"+s1;
var date=start_date+" "+stime;
        console.log(this.state.branch_id)
        console.log(this.state.branch_name)
        var tag=Number( this.state.branch_id);
        var tag1="";
        console.log(tag)
      if(tag==1||tag==2){
          console.log(typeof(tag))

          tag="MIT_Student_info"
          tag1="MIT_Student_attendance";

      }else{
          tag="MITS_Student_info"
          tag1="MITS_Student_attendance";

      }
    
      const isConnected = await NetworkUtils.isNetworkAvailable();
      if(isConnected){
              
                  this.setState(
                      {
                          progress_visible:true
                      }
                  )
                 
                  // alert(this.state.sem_id+" "+this.state.branch_id)
                  var   insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/take_attendance.php";
      
                  var header={
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                    };
             fetch(insertAPIURL,{
                 method:'POST',
                 headers:header,
                 body:JSON.stringify({
                  student_id:this.state.student_id,
                  attendance_status:this.state.attendance_status,
                  from_where:tag1,
                  date:date,
                  type:2,
                  hod_id:hod_id
                 })
             }  
             ).then((response)=>response.json())
             .then((response)=>{
              //   response.attendance_s tatus="";
              console.log(response)
       
                     
              if(response!=null||response.length!=0){
                if(response[0].mess=="s"){
                    console.log("hii")
                    alert("successfull")

                    setTimeout(()=>{ this.props.navigation.replace('dashboard_fc')    }, 1000);

                }else{
                 // console.log("hii2")

                 alert("no successfull")

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
                
              
  
      }else{
          ToastAndroid.show("Internet is required")
      }
     }

    render() {
        return (
            <ImageBackground
            style={style.container}
            source={require("../../images/bg1.jpg")}
            >
                  <ProgressDialog visible={this.state.progress_visible} />
                 <Searchbar        
                    placeholder="Search Here"     
                    value={this.state.search_student_txt}
                    onSubmitEditing={ (text) =>{ this.searchFilterFunction()}}
                    onChangeText={text=>{this.setState({search_student_txt:text})}}
                    blurOnSubmit={true}
                    autoCorrect={false}    
                    style={style.search}
      />
      <Surface
    style={{
        backgroundColor:"#005a9e",
        padding:6,
        borderRadius:12,
        margin:10,
        display:this.state.data_visible
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
             <Text style={style.cnt_text}>#{1}</Text>
             <View>
             <Text style={style.txt_h} >Student Name</Text>
             <Text style={style.txt_id} >{this.state.name}</Text>
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
                     width:"50%"
                 }}
                 >
                     <Text style={style.txt_1}>Father Name       :</Text>
                     <Text style={style.txt_1}>Enrollment           :      No </Text>

                 </View> 
                 <View 
                 style={{
                     padding:5,
                     width:"50%"
                 }}
                 >
                     <Text style={style.txt_2}>{this.state.father_name}</Text>
                     <Text style={style.txt_2}>{this.state.enrollment_no}</Text>
                     
                  
                 </View>
              
                 </View>
                 <View
                 style={{
                     alignItems:"center"
                 }}
                 >
                 <RadioForm
                  
                  radio_props={this.radio_props}
                  initial={this.state.attendance_status}
                  formHorizontal={true}
                  // labelColor="yellow"
                  // buttonColor="yellow"
                  onPress={(value) => {this.set_status(value)}}


                  />
                 </View>
                 <Button
              mode="contained"
              labelStyle={{
                  color:'white'
              }}
              style={
                 {
                     width:90,
                     alignSelf:'center',
                     marginTop:18,
                     borderRadius:12,
                     backgroundColor:"#005a9e",
                     height:40,
                     bottom:10
                 }
             }
             onPress={()=>{this.submit()}}
             >
                 Submit
             </Button>
            

                 </Surface>

    </Surface>
  
            </ImageBackground>
        )
    }
}
const style=StyleSheet.create(
    {
        
   
        cnt_text:{
            fontSize:18,
            fontWeight:"bold",
            color:"blue",
            top:"2%"
        },
        txt_id:{
            textAlign:"center",
            fontSize:16
        },
        txt_h:{
            fontSize:20,
            textAlign:"center",
            color:"blue"
    
        },txt_h1:{
            fontSize:20,
            textAlign:"center",
            color:"white",
            padding:5
    
        },txt_1:{
            fontSize:16,
            color:"blue",
            margin:5,
            fontWeight:"bold"
        },
        txt_2:{
            fontSize:16,
            margin:5
        },
        container:{
            height:'100%',
            width:"100%",
           //  alignItems:'center'
        },
        btn:{
            width:50,
            height:60
        },
        search:{
            margin:15,
            padding:5,
            borderRadius:14
        }

    }
)
export default search_student
