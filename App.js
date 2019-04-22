/**
 * React Native App
 * https://github.com/facebook/react-native
 * @author: David Alexandre Fernandes
 * @format
 * @flow
 */

import React, {Component}  from 'react';
import {ScrollView, Platform, Button, StyleSheet, Text, TextInput, Image, TouchableOpacity, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import YTSearch from 'youtube-api-search';


const API_KEY = 'AIzaSyCL4BpNkfXQ-23IeUSN9pKAfOOjFxgnvIw';

class HomePage extends Component {
    render () {
    const { loading, videos } = this.state;
        return (
    <View style={styles.container}>

            <Image style={styleImage.img} source={require('./assets/madeinweb.png')}/>
               
          <View style={styles.entradas}>
            <TextInput placeholder="Pesquisar" style={styles.input} loading={loading} onPressSearch={this.onPressSearch} />
          </View> 
          
          <VideoList 
          videos={videos}
          />
          
          <View style={styles.button}>
            <Button title="Buscar" style={{margin: 20}} title={this.props.loading ? 'Loading...' : 'Search'} onPress={()=> this.props.onPressSearch(this.state.term)} />
          </View>
          
    </View>
        );
    }
} 

class ListaVideos  extends Component   {

    render () {

        
const ListaVideos = ({ videos }) => {
    const videoItems = videos.map(video => {
       <VideoListItem
         key={video.etag}
         video={video}
       />
});

const VideoListItem = ({ video }) => {
    const {imageStyle} = imageStyles;
    const {
        title,
        channelTitle,
        description,
        thumbnails: { medium: { url } }
} = video.snippet;


        return (
    
    <ScrollView>
    <View>
    <image 
       style={imageStyle}
       source={{ uri: url }}
       />
       <Text>{title}</Text>
       <Text>{channelTitle}</Text>
       <Text>{description}</Text>
    </View>


    <View style={styles.container}>
       
            <Image style={{resizeMode:'center', marginLeft:37}}  source={require('./assets/madeinweb.png')}/>
        
        <View style={styles.entradasLista}>
            <TextInput placeholder="Pesquisar" style={styles.inputList} />
        </View> 

        <View style={styles.buttonList}>
            <Button title="Buscar" onPress = { () => this.props.navigation.navigate('Sobre')}/>
        </View>

    <View style={{flex: 1, backgroundColor: '#F5FCFF'}}>
        {videoItems}
    </View>

    </View>
    </ScrollView>
        );
    };
  };
 }
}


class SobreVideos extends Component {
    render () {
        return (
    <View style={styles.container}>

            <Image onPress = { () => this.props.navigation.navigate('Home')} source={require('./assets/madeinweb.png')}/>
           
          <View style={{alignItems: 'center', flex:1, justifyContent: 'center'}}>
            <Text style={{fontSize: 50}}>Sobre o Video</Text>
          </View>  
     
    </View>
        );
    }
} 

const AppNavigator = createStackNavigator (
    {
        Home: {
            screen: HomePage
        },
        Lista: {
            screen: ListaVideos
        },
        Sobre: {
            screen: SobreVideos
        }
    },
    {
       initialRouteName: 'Home' 
    }
);

const AppContainer = createAppContainer (AppNavigator);

export default class AppContainer extends Component {
  
  
  state = {
      loading: false,
      videos: []
  }
  
  onPressSearch = term => {
      this.searchYT(term);
  }
  searchYT = term => {
      this.setState({ loading: true });
      YTSearch({ key: API_KEY, term}, videos => {
        console.log(videos); 
      this.setState({ 
        loading: false,
        videos
        });
      });
  }


  render () {
    return <AppContainer/>;   
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    entradas: {
        flexDirection: 'row',
    },
    entradasLista: {
        flexDirection: 'row',
    },

    inputList: {
        height: 40,
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 0.5,
        paddingLeft: 10,
        width:"70%",
        height: 35,
        left: 20,
        fontSize: 12,
        marginTop: 1,
        color: "gray"
    },

    input: {
        height: 40,
        textAlign: "center",
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 0.5,
        paddingRight: 220,
        width: "89%",
        height: 40,
        left: 20,
        fontSize: 12,
        marginTop: 230,
        color: "gray"
    },


    button: {
        bottom: 5,
        margin:20,
    },
    
    buttonList: {
        marginLeft:272,
        bottom: 35,
        width: 70,
    }

});

const styleImage = StyleSheet.create({
    img:{
        top: 140,
        left: 43
        }  
});

const imageStyles = StyleSheet.create({
    imageStyle: {
      alignSelf: 'stretch', 
      height: 180
    }
});
  

