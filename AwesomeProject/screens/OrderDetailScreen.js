import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button,Tile} from 'react-native-elements';

import { MonoText } from '../components/StyledText';

import { ListItem,FlatList } from 'react-native-elements';


const orderDetail = 
    {
      payment:'1000円',
      sheet:'1枚',
      username:"お好み",
      address:"広島県広島市"
    }

export default class OrderDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        console.log(this.state);

        // this.state = { list:[],animating: true};
        // const {} = this.props;
        //  this.state
      }
      componentWillMount(){
        let orderData = [];
    //     firebase.firestore().collection("orders").where("userId","==",this.state.userId)
    //        .get()
    //        .then(function(querySnapshot) {
    //           querySnapshot.forEach(function(doc) {
    //               // doc.data() is never undefined for query doc snapshots
    //               console.log(doc.data());
    //               orderData.push({
    //                 'shopAdress': doc.data().shopAdress,
    //                 'userId': doc.data().userId,
    //               })
    //               console.log(orderData);
    //            });
    //        })
    //        .catch(function(error) {
    //        console.log("Error getting documents: ", error);
    //    });
    
    //    setTimeout(() => {
    //       this.setState({animating:false}); 
    //       this.setState({list:orderData});
    //    }, 2000)
      };

  render(){
  return (

<View style={styles.container}>


<ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        
            <View>
                <Text h2>総額：{orderDetail.payment}</Text>
            </View>
            <View>
                <Text h2>枚数：{orderDetail.sheet}</Text>
            </View>
            <View>
                <Text h2>名前：{orderDetail.username}</Text>
            </View>
            <View>
                <Text h2>住所：{orderDetail.address}</Text>
            </View>
    </ScrollView>
    <Button
        title="受ける"
        type="solid"
        color="blue"
        onPress={() => {this.props.navigation.navigate('OrderManagement')}}
    />
</View>
  );
}
}

OrderDetailScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
