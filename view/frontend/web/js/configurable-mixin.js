define([
    'jquery',
    'aimes/productGallery',
    //'flickity'
], function ($, gallery) {
    'use strict';

    return function (widget) {

        $.widget('mage.configurable', widget, {
            options: {
                galleryPreviewElement: '#gallery-preview',
                galleryNavElement: '#gallery-nav'
            },

            _init: function () {
                this._super();
            },

            _changeProductImage: function (eventName) {
                var images = this.options.spConfig.images[this.simpleProduct];

                this._reloadGalleryImages();
                this._updateProductGallery(images);
            },

            /*
             * Reload the gallery to prepare for the new images.
             *
             * Since Flickity moves the images inside it's own markup, knockout
             * no longer recognises it and cannot track dependencies or data changes.
             *
             * Due to this, we need to remove any old images or they remain in the
             * slider indefinitely.
             */
            _reloadGalleryImages: function () {
                $('.flickity-slider .gallery-cell').remove();
                $(this.options.galleryPreviewElement).flickity('destroy');
                $(this.options.galleryNavElement).flickity('destroy');
            },

            /*
             * Give knockout the new image data and reinitialise gallery settings
             */
            _updateProductGallery: function (images) {
                var GalleryModel = new galleryModel();

                images
                    ? GalleryModel.galleryImages(images)
                    : GalleryModel.galleryImages(ko.dataFor(
                        $(this.options.galleryPreviewElement).get(0)).initialImages);

                gallery(); // Re-initialise flickity due to templating/flickity compatibility issues
            }
        });

        return $.mage.configurable;
    }
});
