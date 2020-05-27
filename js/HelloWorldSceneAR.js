'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroButton,
  ViroConstants,
  Viro3DObject,
  ViroNode,
  ViroAmbientLight
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    this.state = {
      text : "Loading...",
      position: [0, -3, -3],
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    let product = this.props.arSceneNavigator.viroAppProps.product;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        
        <ViroText 
        text={this.state.text} 
        scale={[.5, .5, .5]} 
        position={[0, 0, -1]} 
        style={styles.helloWorldTextStyle} />
        
        <ViroAmbientLight color="#FFFFFF" />

          <ViroNode 
          position={this.state.position} 
          dragType="FixedToWorld" 
          onDrag={( data )=>  this.setState({ position : data })} >

            <Viro3DObject source={product.obj}
             resources={product.resources}
             position={[0, 0, 0]}
             scale={[1, 1, 1]}
             type="VRX"/>    

          </ViroNode>

          <ViroButton
          source={require("./res/icon_arrow.png")}
          transformBehaviors={["billboard"]}
          position={[0, .6, -3]}
          height={.5}
          width={.5}
          onClick={this._onExitViro}
          onGaze={this._onButtonGaze} />

      </ViroARScene>
    );

  }

  _onExitViro = () => {
		this.props.arSceneNavigator.viroAppProps.close()
	}

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : ""
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
