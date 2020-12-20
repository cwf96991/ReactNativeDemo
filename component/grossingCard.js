import {StyleSheet,TouchableOpacity,View,Text,Dimensions} from "react-native"
import React from "react"
import FastImage from 'react-native-fast-image'
const screenWidth = Math.round(Dimensions.get('window').width);
const GrossingAppCard = (props)=>  {
    const {item} = props
  
    return (
      
        <View style={styles.grossingContainer}>
          <FastImage source={{uri: item.imageUrl,priority: FastImage.priority.normal,}} style={styles.grossingImage} />
  
          <Text numberOfLines={2} style={styles.grossingNameText}>
            {item.name}
          </Text>
          <Text style={styles.grossingCategoryText}>{item.category}</Text>
       
        </View>
      
    );
  }
  const styles = StyleSheet.create({
    appContain: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 8,
      },
      grossingContainer: {
        width: screenWidth / 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
      },
      grossingImage: {
        width: 85,
        height: 85,
        borderRadius: 20,
      },
      grossingNameText: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8,
      },
      grossingCategoryText: {
        fontSize: 12,
        color: 'grey',
      },
  });
  export default GrossingAppCard