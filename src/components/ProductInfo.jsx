import defaultImage from '../assets/no-image-icon.png'

const ProductInfo = ({status, product}) => {
    return (
        <div>
            {(() => {
                switch (status) {
                    case 'loading':
                        return <div>Looking up product...</div>

                    case 'not-found':
                        return <div>Product not found</div>

                    case 'error':
                        return <div>Could not connect to database</div>

                    case 'found':
                        return (<div>
                                    <img src={product.image_front_small_url || defaultImage} alt={product?.product_name || 'No image available'} />
                                    <div>Brand: {product.brands}</div>
                                    <div>Name: {product.product_name}</div>
                                </div>)
                    default:
                        return null;
                }
            })()}
        </div>
    );
}
 
export default ProductInfo;