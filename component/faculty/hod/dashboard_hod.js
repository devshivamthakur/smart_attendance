import React, { Component,useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image, ImageBackground,Pressable } from 'react-native'
import { Card } from 'react-native-shadow-cards';


export default class dashboard_hod extends Component {
     constructor(args){
         super(args)
       this.drawer=null;
     }
 
      
    render() {

        return (
            <ImageBackground
            source={require("../../../images/img_bg.png")}
            style={{
                width:"100%",
                height:"100%",
                flex: 1, 
            }}
            width="100%"
            height="100%"
            >
               
                 <SafeAreaView
            style={styles.main_container}
              
            >
                     
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
                       onPress={()=>{
                           this.props.navigation.navigate("class_branch");
                       }}
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
                       onPress={()=>{
                           this.props.navigation.navigate("show_att");
                       }}
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
                 </ImageBackground>
         )
    }
}
const styles=StyleSheet.create(
    {
       Card:{
           alignSelf:'center',
           backgroundColor:'rgba(52, 52, 52, 0.6)',
           borderRadius:18,
           paddingLeft:7,
          justifyContent:'center',
        //    marginTop:"15%",
           elevation:20,
        height:"50%",
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
        flex: 1,
           height:"100%",
        justifyContent:'center',
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
