import React, { Component,useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image, Button,FlatList, ToastAndroid,Pressable,ScrollView,RefreshControl } from 'react-native'
import { Card } from 'react-native-shadow-cards';


export default class dashboard extends Component {
     constructor(args){
         super(args)
       this.drawer=null;
     }
 

    render() {
      const { replace } = this.props.navigation;

        return (
            <SafeAreaView
            >
               
                 <SafeAreaView
            style={styles.main_container}  
            >
                 <Image
                    style={styles.img_logo}
                    source={{uri:"https://github.com/itsprogrammingwithme/myproject/blob/master/img_main_logo.jpeg?raw=true"}}
                    />
                     
                        <Card  // contain all card (attendance,show today attendance)
                        style={styles.Card}
                        >
                    <View   //this view contain only attendance and today attendance
                    style={{
                          flexDirection:'row',
                          height:120,
                          justifyContent:'space-evenly',   
                         marginTop:"2%",
                        //  backgroundColor:"red"
                        }}
                        
                    >
                       <Pressable    // attendance view
                       style={
                           {
                               marginLeft:10,
                               flex:1
                           }}      
                    //    onPress={()=>{
                    //        this.props.navigation.replace("addnh");
                    //    }}
                       >
                         <Card   // attendance View
                    style={styles.card_defi1}
                    >
                         <Image
                    style={styles.img_add_home}
                    source={require("../../../images/add_home.png")}
                    />
                    <Text
                    style={styles.txt}
                    >Take attendance</Text> 
                    </Card>                  
                 </Pressable> 
                   <Pressable    // today attendance view
                       style={
                           {
                               marginLeft:10,
                               flex:1
                           }}      
                    //    onPress={()=>{
                    //        this.props.navigation.replace("addnh");
                    //    }}
                       >
                         <Card   // today attendance View
                    style={styles.card_defi1}
                    >
                         <Image
                    style={styles.img_add_home}
                    source={require("../../../images/add_home.png")}
                    />
                    <Text
                    style={styles.txt}
                    >Show attendance</Text> 
                    </Card>                  
                 </Pressable> 
                  
                     </View>
                     <View   //this view contain only attendance and today attendance
                    style={{
                          flexDirection:'row',
                          height:120,
                          justifyContent:'space-evenly',   
                         marginTop:"2%",
                        //  backgroundColor:"red"
                        }}
                        
                    >
                       <Pressable    // attendance view
                       style={
                           {
                               marginLeft:10,
                               flex:1
                           }}      
                    //    onPress={()=>{
                    //        this.props.navigation.replace("addnh");
                    //    }}
                       >
                         <Card   // attendance View
                    style={styles.card_defi1}
                    >
                         <Image
                    style={styles.img_add_home}
                    source={require("../../../images/add_home.png")}
                    />
                    <Text
                    style={styles.txt}
                    >Take attendance</Text> 
                    </Card>                  
                 </Pressable> 
                   <Pressable    // today attendance view
                       style={
                           {
                               marginLeft:10,
                               flex:1
                           }}      
                    //    onPress={()=>{
                    //        this.props.navigation.replace("addnh");
                    //    }}
                       >
                         <Card   // today attendance View
                    style={styles.card_defi1}
                    >
                         <Image
                    style={styles.img_add_home}
                    source={require("../../../images/add_home.png")}
                    />
                    <Text
                    style={styles.txt}
                    >Search Student</Text> 
                    </Card>                  
                 </Pressable> 
                  
                     </View>
                   
                    </Card>

               
                 </SafeAreaView>
                 </SafeAreaView>
         )
    }
}
const styles=StyleSheet.create(
    {
       Card:{
           alignSelf:'center',
           backgroundColor:'#fafafa',
           borderRadius:18,
           paddingLeft:7,
          justifyContent:'center',
           marginTop:"15%",
           elevation:20,
        height:"45%",
       },
   
       txt:{
          margin:7,
           fontSize:19,
           fontWeight:'bold',
           color:'white',
          textAlign:'center',
          alignSelf:'center'
       },
       main_container:{
           backgroundColor:"#2b88d8",
           height:"100%",
        //    padding:50,
       },
     


    

   img_logo:{
    resizeMode: "cover",
       width:"100%",
       height:150,
   },

  img_add_home:{
      marginTop:13
  },
  card_defi1:{
    alignItems:'center',
    width:"87%",
 elevation:20,
 height:"100%",
 justifyContent:'space-evenly',
 marginRight:10,
 backgroundColor:'#005a9e',
 borderRadius:18,
  },


 

 
    },
    
)
