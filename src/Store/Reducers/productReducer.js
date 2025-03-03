const initialState = {
  products: null,
  categories: null,
  pagination: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      // console.log("payload", action.payload);
      // console.log("total Pages",action.totalPages);
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

      case "FETCH_CATEGORIES":
      // console.log("payload", action.payload);
      // console.log("total Pages",action.totalPages);
      return {
        ...state,
        categories: action.payload,
        pagination: {
            ...state.pagination,
            pageNumber: action.pageNumber,
            pageSize: action.pageSize,
            totalElements: action.totalElements,
            totalPages: action.totalPages,
            lastPage: action.lastPage,
          },
      };

    default:
      return state;
  }
};


