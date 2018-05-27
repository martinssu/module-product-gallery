define([
    'jquery',
    'aimes/productGallery',
    'slick'
], function ($, gallery) {
    'use strict';

    return function (widget) {

        $.widget('mage.SwatchRenderer', widget, {
            options: {
                galleryPreviewElement: '#gallery-preview',
                galleryNavElement: '#gallery-nav'
            },

            _init: function () {
                this._super();

                this.options.mediaGalleryInitial = window.initialImages;
            },

            _loadMedia: function (eventName) {
                if (this.options.useAjax) {
                    this._debouncedLoadProductMedia();
                }  else {
                    var images = this.options.jsonConfig.images[this.getProduct()];

                    if (!images) {
                        images = this.options.mediaGalleryInitial;
                    }

                    this._updateProductGallery(images);
                }
            },

            _updateProductGallery: function (images) {
                var self = this;

                $(this.options.galleryPreviewElement).slick('unslick').empty();
                $(this.options.galleryNavElement).slick('unslick').empty();

                $.each(images, function (index, value) {
                    $('<div><img data-lazy="' + value.img + '" alt="' + value.caption + '"/></div>')
                        .appendTo(self.options.galleryPreviewElement);
                    $('<div><img data-lazy="' + value.thumb + '" alt="' + value.caption + '"/></div>')
                        .appendTo(self.options.galleryNavElement);
                });

                gallery();
            }
        });

        return $.mage.SwatchRenderer;
    }
});
