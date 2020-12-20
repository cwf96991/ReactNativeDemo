LoadData = async() => {
    var resultList = list ?? [];
    axios
      .get(
        'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json'
      )
      .then(function (response) {
        var data = response['data']['feed']['entry'];

        data.forEach((element) => {
          var id = element['id']['attributes']['im:id'];
          var appDetail = 'https://itunes.apple.com/hk/lookup?id=' + id;
          var category = element['category']['attributes']['label'];
          var imageUrl = element['im:image'][1]['label'];
          var appName = element['im:name']['label'];
          var rating = '';
          var ratingCount = '';
          var detailUrl = '';
          axios.get(appDetail).then(function (result) {
            rating = result.data['results'][0]['averageUserRatingForCurrentVersion'];
            
            detailUrl = result.data['results'][0]['trackViewUrl'];
            ratingCount = result.data['results'][0]['userRatingCountForCurrentVersion'];
            var app = new AppModel(
              appName,
              category,
              imageUrl,
              rating,
              ratingCount,
              detailUrl
            );

            resultList = [...resultList, app];
            // setList(resultList);

          });
        });
        return resultList;
        
        
       
      })
      .catch(function (error) {
        console.log(error);
      });
    

  };
  export default LoadData;