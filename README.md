# Aimes_ProductGallery

Magento 2 module: Replace the Fotorama gallery on product pages with a [Flickity](https://flickity.metafizzy.co/) variant

### Current 'issues'

* Unable to scroll/swipe while video playing because the iframe 'steals' the event.
    * This is the same in default Magento Fotorama gallery   
* Iframe is initialised on pageload.
    * The current iframe should be replaced with the video thumbnail, and only when clicked should the iframe initialise.
        * https://www.sitepoint.com/faster-youtube-embeds-javascript/
        * https://github.com/tylerpearson/lazyyt
