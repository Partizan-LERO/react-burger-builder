import * as actionTypes from '../actions/actionTypes';


const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.6
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        return {
          ...state,
          totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
          }
        };
      case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          }
        };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: {
            salad: action.ingredients.salad,
            meat: action.ingredients.meat,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
          },
          error: false,
          totalPrice: 4,
        };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true,
        };
      default:
        return state;
    }
};

export default burgerBuilder;