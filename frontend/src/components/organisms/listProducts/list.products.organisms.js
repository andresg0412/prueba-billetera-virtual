import styles from './list.products.module.css';
import ItemProduct from '../../molecules/itemProduct/item.product.molecule';
function ListProducts({ products, handleSelectedProduct }) {

    return (
        <>
            <div>
                {products.map((product) => (

                    <div className={styles.container} key={product.id}>
                        <ItemProduct
                            product={product}
                            handleSelectedProduct={handleSelectedProduct}
                        />
                    </div>

                ))}
            </div>
        </>
    )
}

export default ListProducts;