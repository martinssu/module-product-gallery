/**
 * Copyright © Rob Aimes - https://aimes.eu
 */
define([
    'jquery',
    'ko',
    'Aimes_ProductGallery/js/lib/flickity/flickity.pkgd.min', // Using map doesn't work..?
], function ($, ko, Flickity) {
    'use strict';

    $.widget('aimes.productGallery', {

        options: {
            galleryPreviewElement: '#gallery-preview',
            galleryNavElement: '#gallery-nav'
        },

        _init: function () {
            var self = this;

            // jQuery Bridget is packaged within flickity
            // Load plugins that extend Flickity object
            require([
                'jquery-bridget/jquery-bridget',
                'Aimes_ProductGallery/js/lib/flickity/plugin/sync',
                'Aimes_ProductGallery/js/lib/flickity/plugin/fullscreen'
            ], function(jQueryBridget) {
                jQueryBridget( 'flickity', Flickity, $ );

                self.setupGalleryPreview();
                self.setupGalleryNav();
            });
        },

        setupGalleryPreview: function () {
            var self = this;

            $(self.options.galleryPreviewElement).flickity({
                fullscreen: true,
                lazyLoad: true
            });
        },

        setupGalleryNav: function () {
            var self = this;

            $(self.options.galleryNavElement).flickity({
                sync: '#gallery-preview',
                lazyLoad: true
            });
        }
    });

    return $.aimes.productGallery;
});
