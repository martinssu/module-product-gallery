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
            galleryNavElement: '#gallery-nav',
            galleryCellSelector: '.gallery-cell'
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
                sync: '#gallery-nav',
                lazyLoad: true,
                imagesLoaded: true,
                wrapAround: true,
                cellSelector: self.options.galleryCellSelector
            });
        },

        setupGalleryNav: function () {
            var self = this;

            $(self.options.galleryNavElement).flickity({
                sync: self.options.galleryPreviewElement,
                lazyLoad: 2,
                pageDots: false,
                imagesLoaded: true,
                cellSelector: self.options.galleryCellSelector,
                contain: true, // Prevent misalignment
                cellAlign: 'left'
            });

            self._setupNavClicks();
        },

        _setupNavClicks: function () {
            var self = this;

            $(self.options.galleryNavElement).on('staticClick.flickity',
                function(event, pointer, cellElement, cellIndex) {
                    if (cellElement) {
                        $(self.options.galleryPreviewElement).flickity('select', cellIndex);
                    }
                }
            );
        }
    });

    return $.aimes.productGallery;
});
