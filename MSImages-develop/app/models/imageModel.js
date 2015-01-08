"use strict";

module.exports = function() {
    var Mongoose = require('mongoose');
    var sizeOf = require('image-size');
    var uuid = require('node-uuid');

    var defaultSort = 'name';

    var ImageSchema = new Mongoose.Schema({
        _id: {type: String},
        name: {type: String, required: true},
        album: {type: String},
        contributor: {type: String},
        description: {type: String},
        tags: [
            {type: String}
        ],
        downloads: {type: Number, default: 0},
        views: {type: Number, default: 0},
        uploadedOn: { type: Date, default: Date.now },
        lastDownload: {type: Date},
        mimeType: {type: String},
        size: {type: String},
        dimensions: {
            height: {type: Number},
            width: {type: Number}
        },
        shape: {type: String},
        path: {type: String},
        absolutPath: {type: String},
        fileName: {type: String}
    });

    ImageSchema.pre('save', function (next) {
        if (this._id === undefined) {
            this._id = uuid.v1();
        }

        this.path = this.absolutPath.substring(this.absolutPath.indexOf("uploads"), this.absolutPath.length);

        next();
    });

    ImageSchema.statics.createImage = function(imageData, imageFile, path, callback) {
        var image = new this(imageData);
        image.size = imageFile.size;
        image.mimeType = imageFile.type;
        image.absolutPath = path;
        sizeOf(path, function (error, dimensions) {
            image.dimensions.height = dimensions.height;
            image.dimensions.width = dimensions.width;
            if(image.dimensions.height == image.dimensions.width)
                image.shape = "square";
            else if(image.dimensions.height < image.dimensions.width)
                image.shape = "landscape";
            else image.shape = "portrait";
            image.save(function (error, image) {
                callback(error, image);
            });
        });
    };

    ImageSchema.statics.getImages = function(options, callback) {
        var sort = {};
        if(options.sortBy) {
            sort[options.sortBy] = options.sortDir === 'desc' ? -1 : 1;
        } else {
            sort[defaultSort] = 1;
        }

        this
            .find()
            .skip(options.itemsPerPage * (options.pageNumber - 1))
            .limit(options.itemsPerPage)
            .sort(sort)
            .exec(function(error, images){
                callback(error, images);
            });
    };

    ImageSchema.statics.getAlbums = function(callback){
        this
            .find()
            .select('album')
            .sort('album')
            .distinct('album', function(error, albums){
                callback(error, albums);
            });
    };

    ImageSchema.statics.getContributors = function(callback){
        this
            .find()
            .select('contributor')
            .sort('contributor')
            .distinct('contributor', function(error, contributors){
                callback(error, contributors);
            });
    };

    ImageSchema.statics.getTags = function(callback){
        this
            .find()
            .select('tags')
            .sort('tags')
            .distinct('tags', function(error, tags){
                callback(error, tags);
            });
    };

    return {
        name: "ImageModel",
        model: Mongoose.model('Image', ImageSchema)
    };
};
