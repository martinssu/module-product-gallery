define([
    'jquery',
    'aimes/productGallery',
    'slick'
], function ($, gallery) {
    'use strict';

    return function (widget) {

        $.widget('mage.configurable', widget, {
            // TODO: Logic to replace images
        });

        return $.mage.configurable;
    }
});
