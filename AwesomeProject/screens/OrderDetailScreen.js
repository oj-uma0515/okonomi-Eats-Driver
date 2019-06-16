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
  ActivityIndicator,
} from 'react-native';
import { Button,Tile} from 'react-native-elements';

import { MonoText } from '../components/StyledText';

import { ListItem,FlatList } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

const _STATUS_START = 0;

export default class OrderDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailProps:this.props.navigation.state.params.orderDetail,
            orderDetail:[],
            animating: true};
      }
      componentWillMount(){
        let orderData = {};
        firebase.firestore().collection("orders").doc(this.state.orderDetailProps.documentId)
           .get()
           .then(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  orderData= {
                      'deliveryFee':doc.data().deliveryFee,
                      'driverId':doc.data().driverId,
                      'driverName':doc.data().driverName,
                      'menuName':doc.data().menuName,
                      'shopAddress':doc.data().shopAddress,
                      'shopName':doc.data().menuName,
                      'status':doc.data().status,
                      'totalPrice':doc.data().totalPrice,
                      'userAddress':doc.data().userAddress,
                      'userId':doc.data().userId,
                      'userName':doc.data().userName,
                }
               })
           .catch(function(error) {
           console.log("Error getting documents: ", error);
       });
    
       setTimeout(() => {
        this.setState({orderDetail:orderData});
          this.setState({animating:false}); 
       }, 2000)
      };

    setDriverData(){
        firebase.firestore().collection("orders").doc(this.state.orderDetailProps.documentId).update({
            driverId: "ZE4C1rh8qEUKrsCIz5wz", status: _STATUS_START, driverName: "運び屋君Ａ",
            });

        this.setState({animating:true});
        
        setTimeout(() => {
        this.props.navigation.navigate('OrderManagement',{orderDetail:{orderDetail:this.state.orderDetail,
            ordersDocumentId:this.state.orderDetailProps.documentId}});
        this.setState({animating:false}); 
     }, 2000);

    }

  render(){
    const animating = this.state.animating;
    const orderDetail = this.state.orderDetail;
    return (

<View style={styles.container}>


<ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <View>
            <ListItem
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                title="店舗情報"
            />
            </View>
            <View>
                <Text h2>店舗名：{orderDetail.shopName}</Text>
            </View>
            <View>
                <Text h2>店舗住所：{orderDetail.shopAddress}</Text>
            </View>
            <View>
                <Text h2>メニュー名：{orderDetail.menuName}</Text>
            </View>
            <View>
                <Text h2>配送料：{orderDetail.deliveryFee}</Text>
            </View>
            <View>
                <Text h2>総額：{orderDetail.totalPrice}</Text>
            </View>
            <View>
            <ListItem
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                title="お届け先情報"
            />
            </View>
            <View>
                <Text h2>お名前：{orderDetail.userName}</Text>
            </View>
            <View>
                <Text h2>ご住所：{orderDetail.userAddress}</Text>
            </View>
            <View>
        <ActivityIndicator
           animating = {animating}
           color = '#0000aa'
           size = "large"
           style = {styles.activityIndicator}/>
        </View>
    </ScrollView>
    <Button 
        title="受ける"
        type="solid"
        color="blue"
        onPress={() => {this.setDriverData()}}
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
