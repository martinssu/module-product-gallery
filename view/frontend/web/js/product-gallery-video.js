/**
 * Copyright © Rob Aimes - https://aimes.eu
 */
define([
    'jquery',
    'vimeo/player'
], function ($, Vimeo) {
    'use strict';

    $.widget('aimes.productGalleryVideo', {
        options: {
            galleryPreviewElement: '#gallery-preview',
        },

        _init: function () {
            var self = this;

            $(self.element).on('galleryLoaded', function() {
                self.setupVideoEvents();
            });
        },

        setupVideoEvents: function () { // Pause video when slide is changed
            var self = this;

            $(self.options.galleryPreviewElement).on('change.flickity', function() {
                $('.vimeo-gallery-embed').each(function () {
                    var iframe = new Vimeo(this);
                    iframe.pause();
                });
                $('.youtube-gallery-embed').each(function () {
                    this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
                });
            });
        }
    });

    return $.aimes.productGalleryVideo;
});
