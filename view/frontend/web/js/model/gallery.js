/**
 * Copyright © Rob Aimes - https://aimes.eu
 */

define([
    'uiElement',
    'ko'
], function(Component, ko) {
    'use strict';

    return Component.extend({
        galleryImages: ko.observable(),

        initialize: function () {
            var self = this;

            this._super();
            this.galleryImages(self.initialImages);
        }

    });
});