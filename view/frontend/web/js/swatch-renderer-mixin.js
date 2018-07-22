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

                    this._reloadGalleryImages();
                    this._updateProductGallery(images);
                }
            },

            /*
             * Reload the gallery with the new images.
             *
             * Since Flickity moves the images inside it's own markup, knockout
             * no longer recognises it and cannot track dependencies or data changes.
             *
             * Due to this, we need to remove any old images or they remain in the
             * slider indefinitely.
             */
            _reloadGalleryImages: function () {
                $('.flickity-slider .gallery-cell').remove();
                $('#gallery-preview').flickity('destroy');
                $('#gallery-nav').flickity('destroy');
            },

            /*
             * Give knockout the new image data and reinitialise gallery settings
             */
            _updateProductGallery: function (images) {
                var GalleryModel = new galleryModel();

                typeof images[0].isMain !== 'undefined'
                    ? GalleryModel.galleryImages(images)
                    : GalleryModel.galleryImages(ko.dataFor($('#gallery-preview').get(0)).initialImages);

                gallery(); // Re-initialise flickity due to comment above
            }
        });

        return $.mage.SwatchRenderer;
    }
});
