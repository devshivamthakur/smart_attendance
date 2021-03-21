import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,ImageBackground,ToastAndroid } from 'react-native';
import {Surface,Avatar,Searchbar} from 'react-native-paper';
import { BackHandler } from 'react-native';
import NetworkUtils from './../../NetworkUtils';
import ProgressDialog from 'react-native-progress-dialog';
import RadioForm from 'react-native-simple-radio-button';
import { Button} from 'react-native-paper';

export class show_attendance1 extends Component {

    constructor(args){
        super(args)
        this.arrayholder =[]
    }
     radio_props = [
        {label: 'Absent ', value: 0 },
        {label: 'Present', value: 1 }
      ];
      
    state={
        visible:false,
        hod_id:"",
        progress_visible:false,
         data:[],
         branch_id:"",
         sem_id:"",
         attendance_status:""

    }
    back(){
        this.props.navigation.replace('show_att')
    }
    
 
 async  get_data(){
    const isConnected=await NetworkUtils.isNetworkAvailable();

    this.setState({
        attendance_status:this.props.route.params.attendance_status
    })
//   console.log(  get_total_team_());
  var branch_id=this.props.route.params.branch_id;
  var sem_id=this.props.route.params.sem_id;
  var tag=this.props.route.params.tag;
  var tag1=this.props.route.params.tag1;
  var hod_id=this.props.route.params.faculty_id;
  var attendance_status=this.props.route.params.attendance_status;
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
  this.setState({
      branch_id:branch_id,
      sem_id:sem_id
  })
        if(isConnected){
        
            this.setState(
                {
                    progress_visible:true
                }
            )
             
            var     insertAPIURL="https://unimportuned-dozens.000webhostapp.com/faculty/show_attendance.php";
    
            var header={
                'Accept':'application/json',
                'Content-Type':'application/json'
              };
       fetch(insertAPIURL,{
           method:'POST',
           headers:header,
           body:JSON.stringify({
            branch_id: branch_id,
            sem_id:sem_id,
            from_where:tag,
            tag1:tag1,
            hod_id:hod_id,
            date:start_date,
            attendance_status:attendance_status,
            type:"st2"
           })
       } 
       ).then((response)=>response.json())
       .then((response)=>{
        //   response.attendance_s ta tus="";
        console.log(response+"dv")
   
        //        
          if(response!=null||response.length!=0){
 
            //   console.log(result)
                //    response.attendance_status="";
            this.setState(
                {
                    data:response
                }
            )
            this.arrayholder = response;
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
    this.props.navigation.replace("show_att");
     return true;
    }


  searchFilterFunction = text => {    
      console.log(text)
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()}   
      ${item.father_name.toUpperCase()} ${item.enrollment_no.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: newData });  
  }
renderHeader = () => {    
    return (      
      <Searchbar        
        placeholder="Search Here"        
        // lightTheme        
        // round 
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}    
                 
      />    
    );  
  };

  _renderItem= ({item,index})=>{

    // this.state.data[index].attendance_status="";
    // this.setState({
    //     data:this.state.data
    // })

return(

    <Surface
    style={{
        backgroundColor:"#005a9e",
        padding:6,
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
             <Text style={style.txt_h} >Student Name</Text>
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
                     <Text style={style.txt_2}>{item.father_name}</Text>
                     <Text style={style.txt_2}>{item.enrollment_no}</Text>
                     
                  
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
                  onPress={(value) => {}}


                  />
                 </View>
               
                 </Surface>

    </Surface>
  
);
}
  componentDidMount(){
      this.get_data()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
   }
   componentWillUnmount() {
    this.setState(
        {
          visible:false,
      hod_id:"",
      progress_visible:false,
       data:[],
       branch_id:"",
       sem_id:"",
        }
    )
    this.arrayholder =[]
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
    render() {
        return (
            <ImageBackground
            style={style.container}
            source={require("../../images/bg1.jpg")}
            >
                <ProgressDialog 

                visible={this.state.progress_visible} />
              
                <FlatList
                        data={this.state.data}            //set data on list
                        renderItem={this._renderItem}
                        keyExtractor={item=>item.name}
                        ListHeaderComponent={this.renderHeader}
                        style={{marginTop:10}}

                        />

                       
            
            
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
        }

    }
)
export default show_attendance1
