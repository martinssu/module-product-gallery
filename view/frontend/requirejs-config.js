/**
 * Copyright © Rob Aimes - https://aimes.eu
 */

var config = {
    map: {
        '*': {
            "slick": "Aimes_ProductGallery/js/lib/slick.min",
            "aimes/productGallery": "Aimes_ProductGallery/js/product-gallery"
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
