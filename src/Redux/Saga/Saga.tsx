import { call, put, takeLatest } from "redux-saga/effects";
import { createOwnerQuery, queryfunc, singleCustomerQuery, subscriptionQuery } from '../../components/Query';
import { ApolloQueryResult, SubscriptionOptions } from "@apollo/client";



export function* pets(){
    try{

       const resp:ApolloQueryResult<any> =  yield call(queryfunc)
        yield put({type:'FETCH_ALL_PETS',payload:resp.data.getAllPets})

    }
    catch(err){

    }
}

export function* singleCustomer(action:any){
    try{
        const resp:ApolloQueryResult<any>=yield call(singleCustomerQuery,{id:action.payload})
    }
    catch(err){

    }
}

export function* createOwner(action:any){
    try{
        const resp:ApolloQueryResult<any>=yield call(createOwnerQuery,action.payload);
    }
    catch(err){

    }
}

export function* subscription(){
    try {
        console.log("subscription from saga started");

     const sub:ApolloQueryResult<any>=   yield call(subscriptionQuery)
        console.log("subscription from saga",sub);
    } catch (error) {
        
    }
}

export function* watcher(){
    yield takeLatest("PETS",pets)
    yield takeLatest("SINGLE_CUSTOMER",singleCustomer)
    yield takeLatest("CREATE_OWNER",createOwner)
    yield takeLatest("SUBSCRIPTION",subscription)
}