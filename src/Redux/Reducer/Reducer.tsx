const initialState: any = {
  pets: [],
 
  };

  export const graphql = (state: any = initialState, action: any) => {
    switch (action.type) {
      // case "LOGIN_REDUCER":
      //   return {
      //     ...state,
      //     login: true,
      //   };

      case "FETCH_ALL_PETS":
        return{
          ...state,
          pets:action.payload
        }

        case 'PET_ADDED_FROM_SUBSCRIPTION':
          console.log(action.payload);
          return{
            ...state,
            pets:[...state.pets,{name:action.payload}]
          }

  
      default:
        return state;
    }
  };