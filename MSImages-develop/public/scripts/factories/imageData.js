app.factory('imageData', ['$q',  function ($q)  {
        var cont = 3;
        var images =  [
            {
                name:'Flowers 1',
                description:'Description of image 1',
                id:'1',
                tags:[
                    { text: 'Tag1' },
                    { text: 'Tag2' },
                    { text: 'Tag3' }
                ],
                logotype:'uploads/descarga.png'
            },
            {
                name:'Flowers 2',
                description:'Description of image 2',
                id:'2',
                tags: [{text: 'blue'}],
                logotype:'uploads/1465355_390814357716435_1044122934_n.png'
            },
            {
                name:'Flowers 3',
                description:'Description of image 3',
                id:'3',
                tags:[{text: 'green'}],
                logotype:'uploads/descarga.jpg'
            }];
    return {
        //init object created
        getByName:function(ImageName){
            var deferred = $q.defer();
            var promise = deferred.promise;
            var result = [];
            result.push(_.find(images, function(itemImage){
                    return itemImage.name == ImageName
                })
            )
            deferred.resolve(result);
            return promise
        }}
    }]
);