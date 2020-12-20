import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import React from "react"
import {FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import GrossingAppCard from './grossingCard'
const GrossFlatList =(props)=>{
    const{data,isLoading} =props
  
     grossPlaceholder=()=> {
        var placeholder = [];
        for (let index = 0; index < 4; index++) {
          placeholder.push({
            flexDirection: 'column',
            marginLeft: 16,
            children: [
              {key: 'image', ...styles.grossingImage},
              {key: 'name', ...styles.loadingName},
              {key: 'category', ...styles.loadingCategory},
            ],
          });
        }
        return placeholder;
      }
      renderGrossingItem = ({item, index}) => {
        return (
          <TouchableOpacity onPress={() => detailPage(item.detailUrl)}>
          <GrossingAppCard
          item ={item}
          />
            </TouchableOpacity>
        );
      };
      detailPage = (url) => {
        props.navigation.navigate('Detail', { url: url });
      };
    return(
        <SkeletonContent
              containerStyle={{flexDirection: 'row'}}
              isLoading={isLoading}
              layout={grossPlaceholder()}>
              <FlatList
                data={data}
                
                horizontal={true}
                renderItem={(item,index)=>this.renderGrossingItem(item,index)}
                keyExtractor={(item, index) => item.name}
                onEndReachedThreshold={0}
              />
            </SkeletonContent>
        
    )
}

  const styles = StyleSheet.create({
    
    loadingName: {
      height: 15,
      width: 60,
      marginTop: 8,
      marginBottom: 8,
    },
    loadingCategory: {
      height: 10,
      width: 30,
    },
    
   
    grossingImage: {
        width: 85,
        height: 85,
        borderRadius: 20,
      },
  });
export default GrossFlatList