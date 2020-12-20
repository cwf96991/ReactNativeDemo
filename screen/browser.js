import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, StyleSheet,Platform } from 'react-native'


const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center'
  }
})
const Browser =({navigation,route})=>{
    const [link, setlink] = useState(route.params.url) ;
    
    LoadingIndicatorView=()=> {
    
        return <ActivityIndicator color='#FFA500' size='large' style={styles.ActivityIndicatorStyle} />
      }

    return (
      
        <WebView
          source={{ uri: Platform.OS=='ios'?'https://www.apple.com/hk/app-store/':link }}
          renderLoading={this.LoadingIndicatorView}
          startInLoadingState={true}
        />
      )
}

export default Browser