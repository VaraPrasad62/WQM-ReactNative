import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ActivityIndicator,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';


class LineChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      tempData: {},
      humidityData:{},
        phData:{},
        data:null,

       tempValuesArray : [],
       phValuesArray : [],
       humudiValArray : [],
        timeDataArray:[],
      marker: {
        enabled: true,
        backgroundTint: processColor('teal'),
	    markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      }
    };
     this.AquaDataFromAPI();


  }
  // //LifeCycle Method
  // componentDidMount(){
  //     this.setGraphTempData();
  //     this.setGraphpHData();
  //     this.setGraphHumidityData();
  // }
//Temprature Graph Data
  setGraphTempData() {

    this.setState(
      update(this.state, {
          data: {
          $set: {
            dataSets: [{
                values:this.state.tempValuesArray,
                valueTextColor:processColor('white'),
                label:'',
              config: {

                lineWidth: 2,
                drawCircles: true,
                circleColor:processColor('white'),
                circleRadius:5,
                highlightColor: processColor('red'),
                color: processColor('white'),
                drawFilled: false,
                fillColor: processColor('white'),
                fillAlpha: 60,
		        valueTextSize: 10,
                valueFormatter: "##℃",
                valueTextColor:processColor('white'),
              }
            }],
          }
        },
          xAxis: {
              $set: {
                  textColor:processColor('white'),
                  valueFormatter:this.state.timeDataArray,
              }
          }
      })
    );
  }
    //pHGraphData
    setGraphpHData(){
        this.setState(
            update(this.state, {
               phData : {

                    $set: {
                        dataSets: [{
                            values:this.state.phValuesArray,
                            valueTextColor:processColor('white'),
                            label:'',
                            config: {

                                lineWidth: 2,
                                drawCircles: true,
                                circleColor:processColor('white'),
                                circleRadius:5,
                                highlightColor: processColor('red'),
                                color: processColor('white'),
                                drawFilled: false,
                                fillColor: processColor('white'),
                                fillAlpha: 60,
                                valueTextSize: 10,
                                valueFormatter: "##mol/L",
                                valueTextColor:processColor('white'),
                            }
                        }],
                    }
                },
                xAxis: {
                    $set: {
                        textColor:processColor('white'),
                        valueFormatter: this.state.timeDataArray,
                    }
                }
            })
        );
    }
    //HumidtyGraphData
    setGraphHumidityData() {

        this.setState(
            update(this.state, {
                humidityData: {

                    $set: {
                        dataSets: [{
                            values:this.state.humudiValArray,
                            valueTextColor:processColor('white'),
                            label:'',
                            config: {

                                lineWidth: 2,
                                drawCircles: true,
                                circleColor:processColor('red'),
                                circleRadius:5,
                                highlightColor: processColor('red'),
                                color: processColor('white'),
                                drawFilled: false,
                                fillColor: processColor('white'),
                                fillAlpha: 60,
                                valueTextSize: 10,
                                valueFormatter: ".#%",
                                valueTextColor:processColor('white'),
                            }
                        }],
                    }
                },

                xAxis: {
                    $set: {
                        textColor:processColor('white'),
                        valueFormatter: ["12:05","12:10","12:20","12:30","12:40"],
                    }
                }
            })
        );
    }

    //Fetch Method
    AquaDataFromAPI(){
        fetch("https://bonytx6ltd.execute-api.us-east-1.amazonaws.com/dev/9542514040/2017-05-19")
            .then((response) => response.json())
            .then((responseData) =>{
                 var tempValuesArray = this.state.tempValuesArray,phValuesArray = this.state.phValuesArray, humudiValArray = this.state.humudiValArray,
                timeDataArray = this.state.timeDataArray,tempData = this.state.tempData;

                var valuesArray = responseData.values;

                for (var i =0; i<valuesArray.length;i++){
                    if(i<10){
                        tempValuesArray.push({y:parseFloat(valuesArray[i].Temp)});
                        timeDataArray.push(valuesArray[i].Time);
                        phValuesArray.push({y:parseFloat(valuesArray[i].Ph)});
                        humudiValArray.push({y:parseFloat(valuesArray[i].Humidity)});
                    }
                }
                this.setState({
                    tempValuesArray : tempValuesArray,
                    phValuesArray: phValuesArray,
                    humudiValArray: humudiValArray,
                    timeDataArray:timeDataArray
                });
                this.setGraphTempData();
                this.setGraphpHData();
                this.setGraphHumidityData();
            })
            .done();
    }
  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={styles.container}>
            <LineChart

                style={styles.chart}
                data={this.state.data}
                description={{text: ''}}

                xAxis={this.state.xAxis}
                drawGridBackground={false}
                borderColor={processColor('teal')}
                borderWidth={1}
                drawBorders={false}
                touchEnabled={true}
                dragEnabled={true}
                scaleEnabled={true}
                scaleXEnabled={true}
                scaleYEnabled={true}
                pinchZoom={true}
                doubleTapToZoomEnabled={true}

                dragDecelerationEnabled={true}
                dragDecelerationFrictionCoef={0.99}

                keepPositionOnRotation={false}
                onSelect={this.handleSelect.bind(this)}
            />
           <View
                style={styles.Viewchart}
            >
                <LineChart

                    style={styles.chart}
                    data={this.state.phData}
                    description={{text: ''}}

                    xAxis={this.state.xAxis}
                    drawGridBackground={false}
                    borderColor={processColor('teal')}
                    borderWidth={1}
                    drawBorders={false}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={true}

                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}

                    keepPositionOnRotation={false}
                    onSelect={this.handleSelect.bind(this)}
                />
            </View>
            <View

                style={styles.Viewchart}

            >
                <LineChart

                    style={styles.chart}
                    data={this.state.humidityData}
                    description={{text: ''}}
                    xAxis={this.state.xAxis}
                    drawGridBackground={false}
                    borderColor={processColor('teal')}
                    borderWidth={1}
                    drawBorders={false}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={true}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={true}
                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}
                    keepPositionOnRotation={false}
                    onSelect={this.handleSelect.bind(this)}
                />
            </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      flexDirection:'column',
      flexGrow:1,
    backgroundColor: '#2D8AD4'
  },

    chart: {
    flex: 1,
  }
  ,
    Viewchart:
        {
            flex:1,
        }
});

export default LineChartScreen;
