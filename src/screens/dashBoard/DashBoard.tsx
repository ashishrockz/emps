import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header'
interface DashBoardProps {
  logout: () => void;
}
const DashBoard: React.FC<DashBoardProps> = ({logout}) => {

  return (
    <SafeAreaView style={{backgroundColor:'#4070f4'}}>
      <Header logout={logout}/>
    </SafeAreaView>
  )
}

export default DashBoard

const styles = StyleSheet.create({})