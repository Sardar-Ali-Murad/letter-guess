import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import items from "../Cart/data"


import {
   OPEN_MODEL,
   CLOSE_MODEL,
   OPEN_SIDEBAR,CLOSE_SIDEBAR,
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


const initialState = {
     model:true,
     sidebar:false,
     Items:items,
     cartItems:null,
     totalAmount:null,

     searchValue:"",
     coctailData:[],

     Single:{},
     product:false,
     developer:false,
     company:false,

     first:"",
     second:"",
     sign:"",
     result:"",
     isFirstNumber:true
}


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  function openSidebar(){
    dispatch({type:OPEN_SIDEBAR})
  }
  
  function closeSidebar(){
    dispatch({type:CLOSE_SIDEBAR})
  }
  
  function openModel(){
    dispatch({type:OPEN_MODEL})
  }
  
  function closeModel(){
    dispatch({type:CLOSE_MODEL})
  }

  function increase(id){
    dispatch({type:INCREASE,payload:{id:id}})
    count()
    total()
  }
  
  function decrease(id){
    dispatch({type:DECREASE,payload:{id}})
    count()
    total()
  }
  
  function remove(id){
    dispatch({type:REMOVE,payload:{id}})
    count()
    total()
  }
  
  function clearAll(){
    dispatch({type:CLEAR_ALL})
    count()
    total()
  }
  
  function count(){
    dispatch({type:COUNT_AMOUNT})
  }

  function total(){
    dispatch({type:TOTAL_AMOUNT})
  }
  
  React.useEffect(()=>{
     count()
     total()
  },[])


  function change(value){
      dispatch({type:CHANGE,payload:{value:value}})
  }


  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='


  let start=async ()=>{
    try {
      let data=await fetch(url)
      let realData=await data.json()
      dispatch({type:COCTAIL_DATA,payload:{data:realData.drinks}})
    } catch (error) {
       console.log(error)
    }
     
   }
   
   
   
   function single(id){
     dispatch({type:SINGLE,payload:{id:id}})
    }
    
    React.useEffect(()=>{
      start()
   },[])




   function openDev(){
    dispatch({type:OPEN_DEVELOPER})
   }
  

   function closeDev(){
    dispatch({type:CLOSE_DEVELOPER})
   }
  

   function openPro(){
    dispatch({type:OPEN_PRODUCT})
   }
  

   function closePro(){
    dispatch({type:CLOSE_PRODUCT})
   }


   function openCom(){
    dispatch({type:OPEN_COMPANY})
   }


   function closeCom(){
    dispatch({type:CLOSE_COMPANY})
   }


   function Number(num){
    if(state.isFirstNumber){
      dispatch({type:FIRST_NUMBER,payload:{data:num}})
    }


    else{
      dispatch({type:SECOND_NUMBER,payload:{data:num}})
    }
   }

   function Sign(sign){
    if(state.first!==""){
      dispatch({type:GET_SINGN,payload:{data:sign}})
    }
   }


   function deleteAll(){
    dispatch({type:DELETE_ALL})
   }

   function deleteLast(){
    dispatch({type:DELETE_LAST})
   }


   function Result(){
    dispatch({type:RESULT})
   }
  
  return (
    <AppContext.Provider
    value={{
      ...state,
      openSidebar,closeSidebar,openModel,closeModel,
        increase,
        decrease,
        remove,
        clearAll,
        total,
        change,
        single,
        openCom,
        closeCom,
        openDev,
        closeDev,
        openPro,
        closePro,
        Number,
        Sign,
        deleteAll,
        deleteLast,
        Result
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
