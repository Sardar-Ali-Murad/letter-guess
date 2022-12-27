import { CollectionsBookmarkOutlined, FlashOnOutlined } from '@mui/icons-material'
import { act } from 'react-dom/test-utils'
import Coctails from '../Coctails/Coctails'
import {
   OPEN_SIDEBAR,
   CLOSE_MODEL,
   CLOSE_SIDEBAR,
   OPEN_MODEL,
   INCREASE,
   DECREASE,
   REMOVE,
   CLEAR_ALL,
   COUNT_AMOUNT,
   TOTAL_AMOUNT,
   CHANGE,
   COCTAIL_DATA,
   SINGLE,
   OPEN_COMPANY,
   CLOSE_COMPANY,
   OPEN_DEVELOPER,
   CLOSE_DEVELOPER,
   OPEN_PRODUCT,
   CLOSE_PRODUCT,
   FIRST_NUMBER,
   SECOND_NUMBER,
   RESULT,
   GET_SINGN,
   DELETE_ALL,
   DELETE_LAST
} from './actions'

const reducer = (state, action) => {
    if(action.type===CLOSE_SIDEBAR){
      return{
        ...state,
        sidebar:false
      }
    }
    if(action.type===OPEN_SIDEBAR){
      return{
        ...state,
        sidebar:true
      }
    }
    if(action.type===OPEN_MODEL){
      return{
        ...state,
        model:true
      }
    }
    if(action.type===CLOSE_MODEL){
      return{
        ...state,
        model:false
      }
    }

    if(action.type===INCREASE){
      return{
        ...state,
        Items:state.Items.map((all)=>all.id===action.payload.id?{...all,amount:all.amount+1}:all)
      }
    }

    if(action.type===DECREASE){
      return{
        ...state,
        Items:state.Items.map((all)=>all.id===action.payload.id?{...all,amount:all.amount-1}:all)
      }
    }

    if(action.type===REMOVE){
      return{
        ...state,
        Items:state.Items.filter((all)=>all.id!==action.payload.id)
      }
    }

    if(action.type===CLEAR_ALL){
      return{
        ...state,
        Items:[]
      }
    }

    if(action.type===COUNT_AMOUNT){
      return{
        ...state,
        cartItems:state.Items.map((all)=>all?.amount).reduce(function(acc, val) { return acc + val; }, 0)
      }
    }

    if(action.type===TOTAL_AMOUNT){
      return{
        ...state,
        totalAmount:state.Items.map((all)=>all.price * all.amount ).reduce(function(acc, val) { return acc + val; }, 0)
      }
    }

    if(action.type===CHANGE){
      return{
        ...state,
        searchValue:action.payload.value
      }
    }


    if(action.type===COCTAIL_DATA){
      return{
        ...state,
        coctailData:action.payload.data
      }
    }


    if(action.type===SINGLE){
      return{
        ...state,
        Single:state.coctailData.find((all)=>all.idDrink==action.payload.id)
      }
    }

    if(action.type===OPEN_COMPANY){
      return{
        ...state,
        company:true
      }
    }


    if(action.type===CLOSE_COMPANY){
      return{
        ...state,
        company:false
      }
    }


    if(action.type===CLOSE_PRODUCT){
      return{
        ...state,
        product:false
      }
    }


    if(action.type===OPEN_PRODUCT){
      return{
        ...state,
        product:true
      }
    }

    if(action.type===OPEN_DEVELOPER){
      return{
        ...state,
        developer:true
      }
    }

    if(action.type===CLOSE_DEVELOPER){
      return{
        ...state,
        developer:false
      }
    }

    if(action.type===FIRST_NUMBER){

      if(state.isFirstNumber && (action.payload.data==="." && state.first==="")){
        return{
          ...state
        }
      }

      if(state.isFirstNumber && (action.payload.data==="." && state.first.includes("."))){
        return{
          ...state
        }
      }

      if(state.isFirstNumber && state.result!==""){
        return{
          ...state,
          result:"",
          first: `${state.first || ""}${action.payload.data}`
        }
      }

      else{ 
        return{
          ...state,
          first: `${state.first || ""}${action.payload.data}`
        }
      }


    }

    if(action.type===SECOND_NUMBER){
      if(!state.isFirstNumber && (action.payload.data==="." && state.second==="")){
        return{
          ...state
        }
      }

      if(!state.isFirstNumber && (action.payload.data==="." && state.second.includes("."))){
        return{
          ...state
        }
      }

      else{
        return{
          ...state,
          second:state.second+action.payload.data,
        }
      }


    }
    
    
    
    if(action.type===GET_SINGN){
      return{
        ...state,
        sign:action.payload.data,
        isFirstNumber:false
    }
   }   

   if(action.type===DELETE_ALL){
    return{
      ...state,
      first:"",
      second:"",
      sign:"",
      result:"",
      isFirstNumber:true
    }
   }
  

   if(action.type===DELETE_LAST){
     if(state.isFirstNumber){
        return{
          ...state,
          first:state.first.substring(0,state.first.length-1)
        }
     }

     if(!state.isFirstNumber && state.second===""){
        return{
          ...state,
          sign:"",
          isFirstNumber:true
        }
     }

     if(!state.isFirstNumber && state.second!==""){
      return{
        ...state,
        second:state.second.substring(0,state.second.length-1)
      }
     }

   }


   if(action.type===RESULT){
     if(state.first!=="" && state.second!=="" && state.sign!==""){

        let result;
        if(state.sign==="+"){
            result=Number(state.first) + Number(state.second)
        }

        if(state.sign==="-"){
            result=Number(state.first) - Number(state.second)
        }

        if(state.sign==="/"){
            result=Number(state.first) / Number(state.second)
        }


        if(state.sign==="*"){
            result=Number(state.first) * Number(state.second)
        }

        return {
          ...state,
          result:result,
          first:"",
          second:"",
          sign:"",
          isFirstNumber:true
        }

     }

     else{
      return{
        ...state
      }
     }

   }


  throw new Error(`no such action : ${action.type}`)
}

export default reducer
