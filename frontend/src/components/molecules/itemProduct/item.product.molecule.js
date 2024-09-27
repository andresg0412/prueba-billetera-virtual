import styles from './item.product.module.css';
import Titulo4 from '@/components/atoms/text/titulo4.atoms';
import Text from '@/components/atoms/text/text.atoms';
import Price from '@/components/atoms/text/price.atoms';
import Button from '@/components/atoms/button/button.component';
function ItemProduct({ product, handleSelectedProduct }) {

    function handleClick() {
        handleSelectedProduct(product);
    }

    return (
        <>
            <div className={styles.info}>
                <Titulo4>{product.name}</Titulo4>
                <Text>{product.description}</Text>
                <Price>${product.price}</Price>
                <Button onClick={handleClick}>Comprar</Button>
            </div>
        </>
    )
};

export default ItemProduct;