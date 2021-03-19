import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View,ImageBackground,ToastAndroid } from 'react-native';
import {Surface,Avatar,Searchbar} from 'react-native-paper';
import { BackHandler } from 'react-native';
import NetworkUtils from './../../NetworkUtils';
import ProgressDialog from 'react-native-progress-dialog';
import RadioForm from 'react-native-simple-radio-button';
import { Button} from 'react-native-paper';
export class takeattendance extends Component {
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

    }
    set_status(value,index){
        console.log("index"+index)
    this.state.data[index].attendance_status=value;
    this.setState({
        data:this.state.data
    },
    ()=>{
        console.log(this.state.data)
    })
    

  }
    async  get_data(){
        const isConnected=await NetworkUtils.isNetworkAvailable();
    
    //   console.log(  get_total_team_());
      var branch_id=this.props.route.params.branch_id;
      var sem_id=this.props.route.params.sem_id;
      var tag=this.props.route.params.tag;
      console.log( branch_id );
      console.log( sem_id );
      console.log( tag );
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
                 
           var  insertAPIURL="https://lit-citadel-01961.herokuapp.com/student_info";
    
           var header={
             'Content-Type':'application/json'
           };
           fetch(insertAPIURL,{
               method:'POST',
               headers:header,
               body:JSON.stringify({
                branch_id: branch_id,
                sem_id:sem_id,
                tag:tag
               })
           } 
           ).then((response)=>response.json())
           .then((response)=>{
            //   response.attendance_s tatus="";
            console.log(response+"dv")
     
            //        
              if(response!=null||response.length!=0){
                var result = response.map(function(el) {
                    var o = Object.assign({}, el);
                    o.attendance_status = 0;
                    return o;
                  })
                  console.log(result)
                    //    response.attendance_status="";
                this.setState(
                    {
                        data:result
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
        back(){
            setTimeout(()=>{ this.props.navigation.replace('dashboard_fc')    }, 1000);
        }
        async submit(){
         
    
           const isConnected=await NetworkUtils.isNetworkAvailable();
    
              var tag=this.props.route.params.tag;
                    if(tag=="MIT_Student_info"){
                        tag="MIT_Student_attendance";
    
                    }else{
                        tag="MITS_Student_attendance";
    
                    }
              console.log( "sdfsd55'"+tag );
              console.log( tag );
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
    
                    if(isConnected){
                    
                        this.setState(
                            {
                                progress_visible:true
                            }
                        )
                         
                   var  insertAPIURL="https://lit-citadel-01961.herokuapp.com/take_attendance";
            
                   var header={
                     'Content-Type':'application/json'
                   };
                   fetch(insertAPIURL,{
                       method:'POST',
                       headers:header,
                       body:JSON.stringify({
                        tag:tag,
                        data:this.state.data,
                        date:date
                       })
                   } 
                   ).then((response)=>response.json())
                   .then((response)=>{
                    //   response.attendance_s tatus="";
                    this.setState(
                        {
                            progress_visible:false,
                            
                        }
                    )
                    //        
                      if(response!=null||response.length!=0){
                       if(response.mess=="s"){
                           console.log("hii")
                        this.back()
    
                       }else{
                        // console.log("hii2")
    
                        alert("no successfull")
    
                       }
                      }
                       
                     
            
                   }).catch((error)=>{
                    this.back()

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
                        initial={item.attendance_status}
                        onPress={(value) => {this.set_status(value,index)}}
                        formHorizontal={true}
                        // labelColor="yellow"
                        // buttonColor="yellow"
      
                        />
                       </View>
                     
                       </Surface>
      
          </Surface>
        
      );
      }
      handleBackButtonClick=()=> {
        this.props.navigation.replace("dashboard_fc");
         return true;
        }
      componentDidMount(){
        this.get_data()
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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

                        <View>
                        <Button
              mode="contained"
              labelStyle={{
                  color:'white'
              }}
              style={
                 {
                     width:90,
                     alignSelf:'center',
                     marginTop:14,
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
            

                        </View>
            
            
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
export default takeattendance
