import {useState, useEffect} from 'react';
import axios from 'axios';

const useGetProducts = (API) => {
  const [products, setProducts] = useState([ ]);

  useEffect(()=> {
    async function fecthData(){
      const res = await axios(API);
      setProducts(res.data)
    }
    fecthData();
  }, []);

  return products;
};

export default useGetProducts;
