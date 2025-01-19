import { useEffect, useRef, useState } from "react";
import { IProduct } from "../../common/model/product.ts";
import { MessagesService } from "../../common/messages.ts";
import { HttpService } from "../../common/httpService.ts";


const useStoreProduct = ()=>{
    const[size,] = useState(6);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const hasFetched = useRef(false);
    const [apiCallsCount, setApiCallsCount] = useState<number>(0);

    async function fillProducts() {

        try{
          const result = await retreiveProducts();
          setCount(result["@odata.count"]);
            setProducts((prevProducts) => [...prevProducts, ...result.value]);
            const newPage = page + 1;
            setPage(newPage);
        }
        catch(e){
            setProducts([]);
          console.log(e);
          new MessagesService().sendErrorMessage('Communication Error....');
        }
      }

    function setPagingQuery(): string {
        const maxPage = count / size + 1;
        setPage((previousVal) =>
          previousVal > maxPage ? maxPage - 1 : previousVal
        );
        const skip = page * size;
        const result = `$top=${size}&$skip=${skip}&$count=true`;
        return result;
      }
      async function retreiveProducts() : Promise<any> {
        if (page * size >= count && apiCallsCount > 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setApiCallsCount((previousVal) => previousVal + 1);
        const api = new HttpService<IProduct>(`product`);
        const result = await api.GetOdata(setPagingQuery());
        return result;
      }
      async function fetchData() {
      return  await fillProducts();
      }
      return {fetchData, fillProducts, products, hasMore}
}

export default useStoreProduct;