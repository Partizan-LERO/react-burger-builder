import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.6
};

const addIngredient = (state, action) => {
  const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updateIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    building: true,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      meat: action.ingredients.meat,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
    },
    error: false,
    building: false,
    totalPrice: 4
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true});
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
      case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
      case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
      case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);
      default: return state;
    }
};

export default burgerBuilder;