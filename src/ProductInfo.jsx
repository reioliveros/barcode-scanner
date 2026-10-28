import defaultImage from './assets/no-image-icon.png'

const ProductInfo = ({product, loading, error}) => {
    return (
        <div>
            {loading && <div>Looking up product...</div>}
            {error && <div>Product not found</div>}
            {product && 
            <div>
                <img src={product.image_front_small_url || defaultImage} alt={product?.product_name || 'No image available'} />
                <div>Brand: {product.brands}</div>
                <div>Name: {product.product_name}</div>
            </div>}
        </div>
    );
}
 
export default ProductInfo;