app.service('imageService', ['$http','$q', function ($http, $q) {

    //Get all images
    this.getImages = function () {
        return $http.get("/api/images");
    };

    //Get all contributors
    this.getContributors = function(){
      return $http.get("/api/images/contributors");
    }
    //Get all Albums
    this.getAlbums = function(){
        return $http.get("/api/images/albums");
    }
    //Get all Tags
    this.getTags = function(){
        return $http.get("/api/images/tags");
    }

    this.getShapes = function(){
        return $http.get("/api/images");
    }

    this.getDimensions = function(){
          return $http.get("/api/images");
    }

    //Get Image by Id
    this.getByImageId = function (ImageId) {
        return $http.get("/api/images/"+ImageId);
    };

    //Get Image by Name
    this.getImageByName = function (ImageName) {
       return $http.get("/api/images/"+ImageName);
        //Get /images); item por page and pageNumber 1 los siguientes
    };

    //Create a new Image
    this.create = function (imageName, imageDescription, imageContributor, imageTags, imageFile, imageAlbum) {
        var fd = new FormData();
        fd.append('name', imageName);
        fd.append('description', imageDescription);
        fd.append('contributor',imageContributor);
        fd.append('album',imageAlbum);
        console.log(imageAlbum);
        angular.forEach(imageTags, function(tag){
            fd.append('tags', tag.text);
        });
        fd.append('file', imageFile);
        return $http.post("/api/images", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };

    // Update Image
    this.updateImage = function (imageId, imageName, imageDescription, imageContributor, imageTags, imageAlbum) {
        var formattedTags = [];
        var tags = [];

        angular.forEach(imageTags, function(tag) {
            formattedTags.push(tag.text);
        });
        var updatedImage = {
            name: imageName,
            contributor: imageContributor,
            description: imageDescription,
            tags : formattedTags,
            album: imageAlbum

        }
        return $http.put("/api/images/"+imageId, updatedImage);

    };

    //Delete Image of DB //Parameter ID_Image
    this.deleteImage = function (id) {
        return $http.delete("/api/images/"+id);
    };

    //Download an image
    this.downloadImage = function(id){
        return $http.get("api/images/download/"+id);
    }

}]);
