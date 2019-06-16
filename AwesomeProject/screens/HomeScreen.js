import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { MonoText } from '../components/StyledText';

import { ListItem,FlatList} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Permissions,Notifications } from 'expo';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { list:[],animating: true};
    
  }

  componentWillMount(){
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      saveDeviceToken(token);
    }

    const saveDeviceToken = async (token) => {
      try {
        const db = firebase.firestore();
        const matchResults = token.match(/ExponentPushToken\[(.*)\]/);
        const actualToken = matchResults[1];
        if (!actualToken) return;
        const user = await firebase.auth().currentUser;
        const userRef = db.collection('drivers').doc('ZE4C1rh8qEUKrsCIz5wz');
        const userDoc = await userRef.get();
        const userInfo = userDoc.data();
        const currentTokens = userInfo.tokens || [];
        if(!currentTokens[actualToken]) {
          currentTokens[actualToken] = true;
          await userRef.update({ tokens: { ...currentTokens }});
        }
      } catch (err) {
        console.error(`device token save error: ${err}`);
      }
    };
    registerForPushNotificationsAsync();

    let orderData = [];
    firebase.firestore().collection("orders")
       .get()
       .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              orderData.push({
                'documentId':doc.id,
                'totalPrice':doc.data().totalPrice,
                'shopName': doc.data().shopName,
                'shopAdress': doc.data().shopAdress,
                'userName': doc.data().userName,
                'userId': doc.data().userId,
              })
           });
       })
       .catch(function(error) {
       console.log("Error getting documents: ", error);
   });

   setTimeout(() => {
      this.setState({animating:false}); 
      this.setState({list:orderData});
   }, 2000)
  };
  
  setList(orderData){
    this.setState({list:orderData});
  };

  render() 
  {
    const list = this.state.list;
    const animating = this.state.animating;
    return (
      <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}>
          <View>
          {
          list.map((l, i) => (
              <ListItem
              onPress={() => {this.props.navigation.navigate('OrderDetail',{orderDetail:{documentId:l.documentId,shopAdress:l.shopAdress,userId:l.userId}})}}
                key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.shopName}
                rightSubtitle={'¥'+l.totalPrice}
                subtitle={l.shopAdress}
            />
            ))
          }
          </View>
          <View>
        <ActivityIndicator
           animating = {animating}
           color = '#0000aa'
           size = "large"
           style = {styles.activityIndicator}/>
      </View>
          </ScrollView>
          </View>
        );
  }
  
}

HomeScreen.navigationOptions = {
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
