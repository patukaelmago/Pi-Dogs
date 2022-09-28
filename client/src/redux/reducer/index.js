import {  FILTER_CREATED,
    FILTER_BY_TEMPERAMENT, 
    GET_DETAIL, 
    GET_DOGS, 
    GET_DOGS_BY_NAME, 
    GET_TEMPERAMENTS, 
    POST_DOGS, 
    SORT_BY_NAME, 
    SORT_BY_WEIGHT,
    CLEAR_DETAIL  } from "../actions";


const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
    temperaments: []
}

function rootReducer (state = initialState, action){
    /* let dogFilter = []; // Array auxiliar para guardar los perros filtrados */
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_DOGS_BY_NAME:
            return  {
                ...state,
                dogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
        const allDogs = [...state.allDogs];
        console.log(allDogs.map(d=>d.temperaments))
        const temperamentsFilter = action.payload === 'all' ? allDogs : 
        allDogs.filter(d => d.temperaments?.find(t => t.name === action.payload || t === action.payload))
        
        return {
            ...state,
            dogs: temperamentsFilter
        }
        case FILTER_CREATED:
            const dogFilter = state.allDogs
console.log(dogFilter,action.payload)
            let dogFound = []
             if(action.payload === "api"){
                const dogApi = dogFilter.filter(dog => dog.createdInDb === false )
                 dogFound = dogApi; 
            } else {
                const dogDb = dogFilter.filter(dog => dog.createdInDb === true )
                dogFound = dogDb;
            }
            return{
                ...state,
                dogs: dogFound
            }
           
        case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                console.log(sortedName)
            return {
                ...state,
                    dogs: sortedName
            }
            case SORT_BY_WEIGHT:
                    const doggi = state.dogs
                    const sortedWeight = action.payload === 'asc'?
                   /*  state.dogs.sort(function (a,b) {
                        return parseInt(a.weight)-parseInt(b.weight);
                    }):
                     state.dogs.sort(function (a,b) {
                        return parseInt(b.weight)-parseInt(a.weight);
                    }); */
                    doggi.sort(function(a,b) {
                        return a.weightMin - b.weightMin;
                    }):
                    doggi.sort(function(a,b) {
                        return b.weightMin - a.weightMin;
                    })
            return {
                ...state,
                    dogs: sortedWeight,
            }
            case POST_DOGS:
                return {
                    ...state,
                }

            case GET_DETAIL:
                return {
                    ...state,
                        detail: action.payload,
                }
            case CLEAR_DETAIL:
                return {
                    ...state,
                        detail: []
                }
        default:
            return state;
    }
}

export default rootReducer;