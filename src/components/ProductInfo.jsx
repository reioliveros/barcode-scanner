import defaultImage from '../assets/no-image-icon.png'

const ProductInfo = ({status, product, onRetry}) => {
    return (
        <div>
            {(() => {
                if(status === 'loading') return <div>Looking up product...</div>;
                else if (status === 'error') return (
                    <div>Could not connect to database
                        <button className='tryAgainBtn' onClick={onRetry}>Try Again</button>
                    </div>
                )
                else if (status === 'not-found') return <div>Product not found</div>;
                else if (status === 'found') return (
                    <div>
                        <img src={product.image_front_small_url || defaultImage} alt={product?.product_name || 'No image available'} />
                        <div>Brand: {product.brands || "Missing Brand"}</div>
                        <div>Name: {product.product_name || "Missing Name"}</div>
                    </div>
                )
                return null;
            })()}
        </div>
    );
}
 
export default ProductInfo;