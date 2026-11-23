import defaultImage from '../assets/no-image-icon.png'
import { describeItem } from '../utils/describeItem';
import { daysFromToday } from '../utils/daysFromToday';

const ProductInfo = ({status, product, myProduct, onRetry}) => {
    const info = describeItem(product, myProduct);
    return (
        <div>
            {status === 'loading' && <div>Looking up product...</div>}
            {status === 'error' && <div>Could not connect to database</div>} 
            {(status === 'found' || status === 'not-found') && 
                <div>
                    <img src={product?.image_front_small_url || defaultImage} alt={product?.product_name || 'No image available'} />
                    <div>Brand: {info.brand || "Unknown Brand"}</div>
                    <div>Name: {info.name || "Unknown Name"}</div>
                    <div>Shelf Life: {info.shelfLifeDays || "???"}{info.shelfLifeDays && " days"}</div>
                    <div>Use By: {daysFromToday(info.shelfLifeDays) || "???"}</div>
                </div>
            }
        </div>
    );
}
 
export default ProductInfo;