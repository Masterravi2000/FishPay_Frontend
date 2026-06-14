import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const CheckoutProductCards = () => {
  return (
    <View style={styles.mainView}>
        <Image/>
        <View style={{borderWidth: 1, borderColor:'black'}}>

        </View>
    </View>
  )
}

export default CheckoutProductCards

const styles = StyleSheet.create({
    mainView:{
        width:'100%', 
        backgroundColor:'black',
        flexDirection:'row', 
        paddingVertical: 20, 
        justifyContent:'space-between'
    }
})