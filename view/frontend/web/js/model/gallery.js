/**
 * Copyright © Rob Aimes - https://aimes.eu
 */

define([
    'uiElement',
    'ko',
    'jquery',
], function(Component, ko, $) {
    'use strict';

    return Component.extend({
        galleryImages: ko.observable(),
        youtubeEmbedUrl: 'https://www.youtube.com/embed/',
        vimeoEmbedUrl: 'https://player.vimeo.com/video/',
        galleryContainerElement: '#gallery-container',

        initialize: function () {
            var self = this;

            this._super();
            this.galleryImages(self.initialImages);
        },

        getVideoEmbedUrl: function (url) {
            var videoId;

            if (url.indexOf('vimeo.com') !== -1) {
                videoId = url.split('vimeo.com/').pop();
                return this.vimeoEmbedUrl + videoId +'?api=1&title=false'
            }

            if (url.indexOf('youtube.com') !== -1) {
                videoId = url.split('?v=').pop();
                return this.youtubeEmbedUrl + videoId + '?enablejsapi=1&rel=0&showinfo=0'
            }

            if (url.indexOf('youtu.be') !== -1) {
                videoId = url.split('youtube.be/').pop();
                return this.youtubeEmbedUrl + videoId + '?enablejsapi=1&rel=0&showinfo=0'
            }
        },

        initFlickity: function() {
            $(this.galleryContainerElement).trigger('gallery.dataBound');
        },

        getService: function(url) {
            if (url.indexOf('vimeo.com') !== -1) {
                return 'vimeo-gallery-embed';
            }

            if (url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1) {
                return 'youtube-gallery-embed';
            }
        }
    });
});