const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;

const initState = {
    isLoading:false,
    users:[],
    error:''
};

const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE';

const fetchUsersRequest=()=>{
    return{
        type:FETCH_USERS_REQUEST,
    }
}


const fetchUsersSuccess = users =>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}
const fetchUsersFailure = error =>{
    return {
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

const reducer=(state=initState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isLoading:true
            };
        case FETCH_USERS_SUCCESS:
            return   {
                ...state,
                isLoading:false,
                users:action.payload,
                error:''
            } ;

        case FETCH_USERS_FAILURE:
            return{
                ...state,
                isLoading:false,
                users:[],
                error:action.payload
            }    

    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users = response.data.map((user)=>{
                return {
                    id:user.id,
                    name:user.name
                }
            })
           dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
           dispatch(fetchUsersFailure(error.message))
        });

    }
}

const store = createStore(reducer,redux.applyMiddleware(thunk));
store.subscribe(()=>console.log(store.getState()));
store.dispatch(fetchUsers());


