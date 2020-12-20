export default class AppModel {
    name;
    category;
    imageUrl;
    rating;
    ratingCount;
    detailUrl;
    constructor(name, category,imageUrl,rating,ratingCount,detailUrl) {
      this.name = name;
      this.category = category;
      this.imageUrl = imageUrl;
      this.rating = rating;
      this.ratingCount = ratingCount;
      this.detailUrl = detailUrl;
    }
  }
  