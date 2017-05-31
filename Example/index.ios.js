import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import api from './Utilities/api';

import ChartsListScreen from './app/ChartsListScreen';

class Example extends React.Component {
  constructor(props){
     super(props);
     this.state = {
      aquaDataExm : []
     }
      // this.AquaDataFromAPI();
  }

  componentWillAquaData(){
    api.getAquaData().then((res) =>{
      this.setState({
          aquaDataExm : res.aquaData
      })
      });
  }

  // AquaDataFromAPI(){
  //     fetch("https://bonytx6ltd.execute-api.us-east-1.amazonaws.com/dev/9542514040/2017-05-19",{"method":"GET"})
  //     .then((response) => response.json())
  //     .then((responseData) =>{
  //         var tempValuesArray = this.state.tempValuesArray,phValuesArray = this.state.tempValuesArray, humudiValArray = this.state.tempValuesArray;
  //
  //         var valuesArray = responseData.values;
  //         for (var i =0; i<valuesArray.length;i++){
  //             tempValuesArray.push(valuesArray[i].Temp);
  //             phValuesArray.push(valuesArray[i].Ph);
  //             humudiValArray.push(valuesArray[i].Humidity);
  //         }
  //         this.setState({
  //             tempValuesArray : tempValuesArray,
  //             phValuesArray: phValuesArray,
  //             humudiValArray: humudiValArray
  //         });
  //         console.log(tempValuesArray);
  //
  //     })
  //     .done();
  // }
  render() {
      return (

      <ChartsListScreen>
      </ChartsListScreen>
    );
  }
}
AppRegistry.registerComponent('Example', () => Example);

