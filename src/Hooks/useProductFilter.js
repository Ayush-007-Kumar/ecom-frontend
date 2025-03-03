import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../Store/Action';

function useProductFilter() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("searchParams", searchParams)
        const params = new URLSearchParams();
        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber", currentPage-1) 
        const sortOrder = searchParams.get("sortBy") || "asc";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        params.set("sortBy", "price")
        params.set("sortOrder", sortOrder)

        if(categoryParams){
            params.set("category", categoryParams)
        }
        if(keyword){
            params.set("keyword", keyword)
        }

        const queryString = params.toString();
        // console.log("dispatch", dispatch)
        
        console.log("queryString", queryString)
        dispatch(fetchProducts(queryString))

    }, [searchParams, dispatch])
}

export default useProductFilter