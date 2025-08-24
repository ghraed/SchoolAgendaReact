import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import DutiesScreen from './screens/DutiesScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';


export default function App() {
  // return <DutiesScreen />;
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
  // return (
  //   <View style={styles.container}>
  //     <Text className='text-3xl'>Open up App.tsx to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
