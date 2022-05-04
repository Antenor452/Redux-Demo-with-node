const redux = require("redux");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.logger;
const createStore = redux.createStore;
const reducerCombo = redux.combineReducers;

const initCakeState = {
  numberOfCakes: 10,
};
const initIceCreamState = {
  numberOfIceCream: 10,
};
const BUY_CAKE = "BUY_CAKE";
const MAKE_CAKE = "MAKE_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
const MAKE_ICECREAM = "MAKE_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
  };
}
function makeCake() {
  return {
    type: MAKE_CAKE,
  };
}
function buyIceCream(e) {
  return {
    type: BUY_ICECREAM,
    info: "First redux action",
  };
}
function makeIceCream() {
  return {
    type: MAKE_ICECREAM,
  };
}

const cakeReducer = (state = initCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    case MAKE_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };

    case MAKE_ICECREAM:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream + 1,
      };

    default:
      return state;
  }
};
const combinedReducer = reducerCombo({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(combinedReducer,redux.applyMiddleware(logger));
const unsubscribe = store.subscribe(() =>{});
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
unsubscribe();
