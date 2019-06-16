import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen'
import OrderManagementScreen from '../screens/OrderManagementScreen'

const headerNavigationOptions = {
  headerStyle: {
    backgroundColor: 'deepskyblue',
    marginTop: (Platform.OS === 'android' ? 24 : 0)
  },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

const HomeStack = createStackNavigator({
  home:{
    screen: HomeScreen,
    navigationOptions: {
      ...headerNavigationOptions,
      headerTitle: 'okonomiEatsDriver',
      headerBackTitle: 'Home'
    },
  },
  OrderDetail:{
    screen: OrderDetailScreen
  },
  OrderManagement:{
    screen: OrderManagementScreen
  }
  });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack
});
