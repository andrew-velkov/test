const initialState = {
  data: [],
};

export default function other(params = '') {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case `other/${params}/ADD`:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
}
