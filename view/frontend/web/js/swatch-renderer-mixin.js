define([
    'jquery',
    'ko',
    'aimes/productGallery',
    'Aimes_ProductGallery/js/model/gallery',
    'Aimes_ProductGallery/js/lib/flickity/flickity.pkgd.min'
], function ($, ko, gallery, galleryModel, Flickity) {
    'use strict';

    return function (widget) {

        $.widget('mage.SwatchRenderer', widget, {
            options: {
                galleryPreviewElement: '#gallery-preview',
                galleryNavElement: '#gallery-nav'
            },

            _init: function () {
                this._super();
            },

            _loadMedia: function (eventName) {
                if (this.options.useAjax) {
                    this._debouncedLoadProductMedia();
                }  else {
                    var images = this.options.jsonConfig.images[this.getProduct()];

                    if (!images) {
                        images = this.options.mediaGalleryInitial;
                    }

                    //this._reloadGalleryImages();
                    this._updateProductGallery(images);
                }
            },

            _updateProductGallery: function (images) {
                var GalleryModel = new galleryModel();

                typeof images[0].isMain !== 'undefined' ? GalleryModel.galleryImages(images) : GalleryModel.galleryImages(ko.dataFor($('#gallery-preview').get(0)).initialImages);
            },

            _reloadGalleryImages: function () {
                // jQuery Bridget is packaged within flickity
                // Load plugins that extend Flickity object
                require([
                    'jquery-bridget/jquery-bridget',
                ], function(jQueryBridget) {
                    jQueryBridget( 'flickity', Flickity, $ );

                    $('#gallery-preview').flickity('destroy');
                    $('#gallery-nav').flickity('destroy');
                });
            }
        });

        return $.mage.SwatchRenderer;
    }
});
