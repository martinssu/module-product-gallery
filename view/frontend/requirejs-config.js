/**
 * Copyright © Rob Aimes - https://aimes.eu
 */

var config = {
    map: {
        '*': {
            'aimes/product-gallery': 'Aimes_ProductGallery/js/product-gallery',
            'aimes/gallery-model': 'Aimes_ProductGallery/js/model/gallery'
        }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Aimes_ProductGallery/js/swatch-renderer-mixin': true
            },
            'Magento_ConfigurableProduct/js/configurable': {
                'Aimes_ProductGallery/js/configurable-mixin': true
            }
        }
    }
};
