const initialState = {
  loaded: false,
  loading: false,
  data: [],
};

export default function products(param = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `products/${param}/REQUEST`:
        return {
          ...state,
          loading: true,
          loaded: false,
        };
      case `products/${param}/SUCCESS`:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.payload,
        };
      case `products/${param}/FAILURE`:
        return {
          ...state,
          loading: false,
          loaded: false,
        };
      default:
        return state;
    }
  };
}
