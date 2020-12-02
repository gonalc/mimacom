import React, { useEffect, useState } from 'react';
import './App.scss';
import DesktopHeader from './components/DesktopHeader/DesktopHeader';
import Loader from './components/Loader/Loader';
import MobileHeader from './components/MobileHeader/MobileHeader';
import Cart from './containers/Cart/Cart';
import Main from './containers/Main/Main';
import { fetchGroceries } from './data';
import useScreenSize from './hooks/screen-size';
import { IProduct } from './models/product';

function App() {
  const { isDesktop } = useScreenSize();
  const [loading, setLoading] = useState<boolean>(true);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartList, setCartList] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFavOn, setIsFavOn] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, [isFavOn]);

  /**
   * Fetch products from the server.
   * Fetch only favorites if selected.
   */
  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchGroceries(isFavOn ? '?favorite=1' : '');
      setProducts(result);
    } catch (err) {
      console.error('Error fetching products: ', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a product to the cart.
   * Add one to amount if already there if stock enough.
   * @param product {Object} Product to add to the cart.
   */
  const addProduct = (product: IProduct) => {
    const provProducts = cartList;
    const index = provProducts.findIndex((prod) => prod.id === product.id);
    if (index >= 0) {
      // The product is already in the cart.
      // Check if there is stock enough
      if (provProducts[index].stock > provProducts[index].amount!) {
        // Add one to the amount
        provProducts[index].amount! += 1;
      }
    } else {
      // This product is not in the list.
      // Add with amount set to 1.
      const parsedProduct = {
        ...product,
        amount: 1,
      };
      provProducts.push(parsedProduct);
    }
    setCartList([...provProducts]);
  };

  /**
   * Subtracts one from the selected amount.
   * Take it out if it is the last one.
   * @param product {Object} Product to take out of the cart. 
   */
  const removeProduct = (product: IProduct) => {
    const provProducts = cartList;
    const index = provProducts.findIndex((prod) => prod.id === product.id);
    if (index >= 0) {
      // The product is in the list, subtract one.
      // If new value = 0, then take it out the list.
      // Subtract one.
      provProducts[index].amount! -= 1;
      if ((provProducts[index].amount! === 0)) {
        // Take the product out of the list.
        provProducts.splice(index, 1);
      }
    }
    setCartList([...provProducts]);
  };

  return (
    <div className="App">
      {isDesktop ? (
        <DesktopHeader
          favOn={isFavOn}
          toggleFav={() => setIsFavOn(!isFavOn)}
        />
      ) : (
          <MobileHeader
            toggleCart={() => setShowCart(!showCart)}
            title={showCart ? 'Shopping Cart' : 'Product List'}
            cartOn={showCart}
            toggleFav={() => setIsFavOn(!isFavOn)}
            favOn={isFavOn}
          />
        )}
      {loading ? (
        <Loader />
      ) : (
          <div className="content">
            <Main
              addProduct={(product) => addProduct(product)}
              removeProduct={(product) => removeProduct(product)}
              cartOn={showCart}
              products={products}
              cartList={cartList}
            />
            <Cart
              show={isDesktop || showCart}
              toggleCart={() => setShowCart(!showCart)}
              items={cartList}
              addProduct={(product) => addProduct(product)}
              removeProduct={(product) => removeProduct(product)}
            />
          </div>
        )}
    </div>
  );
}

export default App;
