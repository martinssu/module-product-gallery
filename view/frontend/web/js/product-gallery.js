/**
 * Copyright © Rob Aimes - https://aimes.eu
 */

define([
    'jquery',
    'slick'
], function ($) {
    'use strict';

    $.widget('aimes.productGallery', {

        options: {
            galleryPreviewElement: '#gallery-preview',
            galleryNavElement: '#gallery-nav',
            initialImages: {}
        },

        _init: function () {
            this.setupGalleryPreview();
            this.setupGalleryNav();

            window.initialImages = this.options.initialImages;
        },

        setupGalleryPreview: function () {
            $(this.options.galleryPreviewElement).not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                fade: false,
                asNavFor: this.options.galleryNavElement,
                lazyLoad: 'ondemand',
                infinite: false
            });
        },

        setupGalleryNav: function () {
            $(this.options.galleryNavElement).not('.slick-initialized').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: this.options.galleryPreviewElement,
                dots: false,
                focusOnSelect: true,
                centerMode: true,
                lazyLoad: 'ondemand',
                infinite: false
            });
        }
    });

    return $.aimes.productGallery;
});
