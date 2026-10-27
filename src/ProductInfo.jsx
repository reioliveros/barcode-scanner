const ProductInfo = ({product, loading, error}) => {
    return (
        <div>
            {loading && <div>Looking up product...</div>}
            {error && <div>Product not found</div>}
            {product && 
            <div>
                <img src={product.image_front_small_url} alt={product.product_name} />
                <div>Brand: {product.brands}</div>
                <div>Name: {product.product_name}</div>
            </div>}
        </div>
    );
}
 
export default ProductInfo;