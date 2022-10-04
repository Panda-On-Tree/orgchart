import React from 'react'
import ImageGallery from 'react-image-gallery';
function ProductPartDescription() {


    const images = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ];

  return (
    <div className='product-part-main'>
        <div className='product-part-image-main'>
            <div className='product-part-image-container'>
            <ImageGallery items={images} />
            </div>
        </div>
    </div>
  )
}

export default ProductPartDescription