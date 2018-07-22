<?php
namespace Aimes\ProductGallery\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Catalog\Helper\Image;

class Gallery extends Template
{
    /**
     * @var Registry
     */
    protected $registry;

    /**
     * @var array
     */
    protected $jsLayout;

    /**
     * @var Json
     */
    protected $json;

    /**
     * @var Image
     */
    protected $imageHelper;

    /**
     * @var \Magento\Catalog\Model\Product
     */
    protected $product;

    /**
     * Gallery constructor.
     * @param Template\Context $context
     * @param Registry $registry
     * @param Json $json
     * @param Image $imageHelper
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        Registry $registry,
        Json $json,
        Image $imageHelper,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->registry = $registry;
        $this->json = $json;
        $this->imageHelper = $imageHelper;
    }

    /**
     * Get current product
     *
     * @return \Magento\Catalog\Model\Product
     */
    public function getProduct()
    {
        if (!isset($this->product)) {
            $this->product = $this->registry->registry('current_product');

            if (!$this->product->getId()) {
                throw new LocalizedException(__('Failed to initialize product'));
            }
        }

        return $this->product;
    }

    /**
     * Get current product images
     *
     * $images \Magento\Framework\Data\Collection
     */
    private function getProductImages()
    {
        $imageArr = [];
        $images = $this->getProduct()->getMediaGalleryImages();

        foreach ($images as $image) {
            array_push($imageArr, [
                'src' => $image->getData('url'),
                'thumb' => $this->imageHelper
                    ->init($this->getProduct(), 'product_page_image_small')
                    ->setImageFile($image->getFile())
                    ->getUrl(),
                'img' => $this->imageHelper
                    ->init($this->getProduct(), 'product_page_image_medium')
                    ->setImageFile($image->getFile())
                    ->getUrl(),
                'full' => $this->imageHelper
                    ->init($this->getProduct(), 'product_page_image_large')
                    ->setImageFile($image->getFile())
                    ->getUrl(),
                'caption' => $image->getData('label')
            ]);
        }

        return $imageArr;
    }

    /**
     * Returns array of images in required js format
     *
     * @return bool|string
     */
    public function getJsImages()
    {
        return $this->json->serialize($this->getProductImages());
    }


    /**
     * @return array
     *
     * Unused, kept temporarily for reference
     */
    public function getConfigurableImages()
    {
        $childArr = [];

        foreach ($this->getProduct()->getTypeInstance()->getUsedProducts($this->getProduct()) as $childProduct) {
            $childImages = [];
            foreach ($childProduct->getMediaGalleryImages() as $image) {
                array_push($childImages, [
                    'src' => $image->getData('small_image_url'),
                    'label' => $image->getData('label')
                ]);
            }
            $childArr[$childProduct->getSku()] = $childImages;
        }

        return $childArr;
    }

}