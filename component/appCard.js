import {StyleSheet,View,Text} from "react-native"
import React from "react"
import FastImage from 'react-native-fast-image'
import {Rating} from 'react-native-elements';
const AppCard = React.forwardRef((props, ref) =>  {
    const {item,index} = props
    
     
    return (
     
        <View style={styles.appContain}>
            <View style={{width:60,alignItems:'center'}}>
          <Text style={styles.appIndexText}>{index + 1}</Text>
          </View>
          <FastImage
            source={{uri: item.imageUrl,priority: FastImage.priority.high,}}
            style={index % 2 == 1 ? styles.circleImage : styles.roundedImage}
          />
          <View style={styles.appInfo}>
            <Text style={styles.appNameText}>{item.name}</Text>
            <Text style={styles.appCategoryText}>{item.category}</Text>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              <Rating
                type="custom"
               
                startingValue={parseInt(item.rating)}
                imageSize={10}
                ratingColor="#FFA500"
                readonly={true}
              />
  
              <Text style={styles.ratingCountText}>({item.ratingCount})</Text>
            </View>
          </View>
        </View>
    
    );
  })
  const styles = StyleSheet.create({
    appContain: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 8,
    },
    appIndexText: {

        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 16,
        color: 'grey',
      },
    appInfo: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 8,
    },
    appNameText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    appCategoryText: {
      fontSize: 13,
      paddingTop: 4,
      paddingBottom: 4,
      color: 'grey',
    },
    ratingCountText: {
      fontSize: 12,
      paddingLeft: 8,
      color: 'grey',
    },
    circleImage: {
        width: 62,
        height: 62,
        borderRadius: 62 / 2,
      },
      roundedImage: {
        width: 62,
        height: 62,
        borderRadius: 10,
      },
   
  });
  export default AppCard