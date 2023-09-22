
export const getPets=()=>{
    return{
        type:'PETS'
    }
}

export const singleCustomer=(id:number)=>{
    return{
        type:'SINGLE_CUSTOMER',
        payload:id
    }
}

export const createOwner=(data:any)=>{
    return{
        type:'CREATE_OWNER',
        payload:data
    }
}

export const subscription=()=>{
    return{
        type:'SUBSCRIPTION',
        
    }
}

export const petAddedFromSubscription=(data:any)=>{
    return{
        type:'PET_ADDED_FROM_SUBSCRIPTION',
        payload:data
    }
}