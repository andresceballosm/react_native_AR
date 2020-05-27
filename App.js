/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";

var defaultNavigatorType = UNSET;

const ModelItems = [
  {
    "id" : 1,
    "name": "Modern Lamp",
    "description":"Beautiful lamp to decorate your home.",
    "price":20,
    "selected": false,
    "icon_img": require("./js/res/lamp/lamp.png"),
    "obj": require("./js/res/lamp/object_lamp.vrx"),
    "materials": null,
    "animation":{name:"02", delay:0, loop:true, run:true},
    "scale": [.2, .2, .2],
    "position" : [0, 0, 0],
    "type" : "VRX",
    "physics": undefined,
    "ref_pointer": undefined,
    "resources": [
      require('./js/res/lamp/object_lamp_diffuse.png'),
      require('./js/res/lamp/object_lamp_normal.png'),
      require('./js/res/lamp/object_lamp_specular.png'),
    ],
  },
  {
    "id" : 2,
    "name": "Blue Lamp",
    "description":"Beautiful lamp to decorate your home.",
    "price":21,
    "selected": false,
    "icon_img": require("./js/res/lamp/lamp.png"),
    "obj": require("./js/res/lamp/object_lamp.vrx"),
    "materials": null,
    "animation":{name:"02", delay:0, loop:true, run:true},
    "scale": [.2, .2, .2],
    "position" : [0, 0, 0],
    "type" : "VRX",
    "physics": undefined,
    "ref_pointer": undefined,
    "resources": [
      require('./js/res/lamp/object_lamp_diffuse.png'),
      require('./js/res/lamp/object_lamp_normal.png'),
      require('./js/res/lamp/object_lamp_specular.png'),
    ],
  },
  {
    "id" : 3,
    "name": "Modern Lamp",
    "description":"Beautiful lamp to decorate your home.",
    "price":22,
    "icon_img": require("./js/res/lamp/lamp.png"),
    "obj": require("./js/res/lamp/object_lamp.vrx"),
    "scale": [.2, .2, .2],
    "position" : [0, 0, 0],
    "type" : "VRX",
    "resources": [
      require('./js/res/lamp/object_lamp_diffuse.png'),
      require('./js/res/lamp/object_lamp_normal.png'),
      require('./js/res/lamp/object_lamp_specular.png'),
    ],
  },
]

export default class ViroSample extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps,
      product: null
    }
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getEcommerce();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  _getEcommerce() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
          <Text style={localStyles.titleText}>
            Ecommerce AR
          </Text>
          <FlatList 
          keyExtractor={ (item, index) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          extraData={ModelItems}
          data={ModelItems}
          renderItem={({item}) => this.renderCard(item)} />
        </View>
      </View>
    );
  }

  renderCard = (item) => {
    return (
      <View key={item.id} style={localStyles.card}>
         <View style={{flex:1}}>
           <Image style={localStyles.image} source={item.icon_img}/>
         </View>
         <View style={{flex:1}}>
            <View style={localStyles.viewText}>
              <Text style={localStyles.name}>{item.name}</Text>
              <Text style={localStyles.price}>${item.price}</Text>
              <View style={localStyles.description}>
                <Text style={localStyles.p}>{item.description}</Text>
              </View>
            </View>
            <TouchableOpacity 
            onPress={() => this.setState({ product : item,  navigatorType : AR_NAVIGATOR_TYPE})}
            style={localStyles.button}>
                <Text style={localStyles.txtBtn}>SHOW</Text>
            </TouchableOpacity>
         </View>
      </View>
     )
  }

  close = () => {
    this.setState({ navigatorType : UNSET })
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
        <ViroARSceneNavigator 
        close={this.state.navigatorType}
        {...this.state.sharedProps}
        viroAppProps={ { product : this.state.product , close : () => this.close()}}
        initialScene={{ scene: InitialARScene }} />
    );
  }
  

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
  },
  card: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white', 
    padding:10, 
    borderRadius:10, 
    margin:10, 
    width:300,

    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,  
  },
  viewText: {
    flex:1, 
    marginTop:15, 
    paddingHorizontal:10, 
  },
  image: {
    width:70, 
    height:100, 
    resizeMode: 'stretch'
  },
  name: {
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  price:{
    fontSize:18,
    fontWeight:'bold',
    color: "#728783"
  },
  p:{
    fontSize:14,
    color:'black',
    flexWrap: 'wrap'
  },
  description: {
    flexDirection:'row', 
    padding:2, 
    marginVertical:10
  },
  button: {
    marginBottom:10,
    alignItems:'center',
    borderRadius:10,
    justifyContent:'center',
    padding:10,
    backgroundColor:'black'
  },
  txtBtn:{
    color: 'white',
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
  },
  titleText: {
    color:'black',
    fontWeight:'bold',
    paddingTop: 30,
    paddingBottom: 20,
    textAlign:'center',
    fontSize : 25
  },
});

module.exports = ViroSample
