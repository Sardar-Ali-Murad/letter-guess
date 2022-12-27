import "./app.css"
import React from 'react'
import Words from "./Words.txt"
let arr=[
  {
    value:"",
    id:0
  },
  {
    value:"",
    id:1
  },
  {
    value:"",
    id:2
  },
  {
    value:"",
    id:3
  },
  {
    value:"",
    id:4
  },
]

const App = () => {

  let key1=[" Q","W","E","R","T","Y","U","I","O","P"]
  let key2=["A","S","D","F","G","H","J","K","L"]
  let key3=["Z","X","C","V","B","N","M"]

    let [randomWord,setRandomWord]=React.useState([])
    let [remaining,setRemaining]=React.useState(10)
    let [win,setWin]=React.useState(false)
    let [wrong,setWrong]=React.useState([])
    let [currentLetter,setCurrentLetter]=React.useState("")
    let [Arr,setArr]=React.useState(arr)
    let [lose,setLose]=React.useState(false)
    let [cond,setCond]=React.useState(true)

    
    let start=async ()=>{
      let data=await fetch(Words)
      let final=await data.text()
      final=final.split("\n")
      let random=Math.floor(Math.random()*final.length-1)
      let randomWord=final[random].split("").slice(0,-1)
     setRandomWord(randomWord)
    }
    

    React.useEffect(()=>{
       start()
      },[])
      
      function reset(){
         start()
         setRemaining(10)
         setWin(false)
         setLose(false)
         setWrong([])
         setCurrentLetter("")
         setArr(arr)
         setCond(true)
      }


      // console.log(randomWord)

      function Letter(word){
        setCurrentLetter(word)
        setCond((pre)=>!pre)
      }


     React.useEffect(()=>{
      if(randomWord.length!==0 && !win===true && !lose===true && currentLetter!==""){

        if(randomWord.some((all)=>all===currentLetter.toLocaleLowerCase())){
            let AlreadyPresent=Arr.find((all)=>{
              return all.value===currentLetter.toLowerCase()
            })
            
            console.log(AlreadyPresent)
            // 
            if(AlreadyPresent){
              let newIndex=randomWord.indexOf(currentLetter.toLocaleLowerCase(),AlreadyPresent.id+1)
               if(newIndex!==-1){
                setArr((pre)=>{
                  return pre.map((all)=>all.id===newIndex?{...all,value:currentLetter.toLocaleLowerCase()}:all)
                 })
               }
            }
            // 
            // 

            else{ 
              let index=randomWord.indexOf(currentLetter.toLocaleLowerCase())
              setArr((pre)=>{
                return pre.map((all)=>all.id===index?{...all,value:currentLetter.toLocaleLowerCase()}:all)
              })
            }
            // 
        }
        
        else if(!randomWord.some((all)=>all===currentLetter.toLocaleLowerCase())){
          setRemaining((pre)=>pre-1)
          setWrong((pre)=>[...pre,currentLetter])
          console.log("The Word is not present")
        }
      }
      },[currentLetter,cond])


      
      React.useEffect(()=>{
      if(randomWord.length!==0){
        let Win=randomWord.every((all,i)=>all===Arr[i].value)
        if(Win===true){
           setWin(true)
          }
          else{
            setWin(false)
          }
          
        }
        },[Arr])

        console.log(win)

        React.useEffect(()=>{
          if(remaining===0){
            setLose(true)
          }
        },[remaining])
        
        console.log(currentLetter)
        console.log(randomWord)
    

  return (
    <div>

    <div  className="div-center-50" style={{marginTop:"30px",marginBottom:"30px"}}>
      <h1>Guess The Word</h1>
      <div style={{display:"flex"}}>
       {
         Arr.map((all)=><div className="key" style={{width:"60px",height:"60px",border:"2px solid black",color:"white"}}><h5>{all?.value}</h5></div>)
        }
      </div>
      <h4>Remaining Guess : {remaining}</h4>
      <div style={{display:"flex"}}>
          <h4 style={{display:"flex"}}>Wrong Letters : <div style={{display:"flex",gap:"29px"}}>{[...new Set(wrong)].map((all)=><h3 style={{marginLeft:'5px'}}>{all}</h3>)}</div></h4>
      </div>
      <button onClick={reset} className="btn">Reset</button>
      {
        win && <p>You Win Reset To Play Again</p>
      }
      {
        lose && <p>Soory You Lose Correct Word  is <span style={{fontSize:"30px",color:"blue",textDecoration:"underline"}}>{randomWord} </span> Reset To Play Again</p>
      }
    </div>

      <div className='keyboard-main div-center-50'>
        {
          key1.map((all)=><div className="key" style={{cursor:"pointer"}} onClick={()=>Letter(all)}>{all}</div>)
        }
        {
          key2.map((all)=><div className="key" style={{cursor:"pointer"}} onClick={()=>Letter(all)}>{all}</div>)
        }

         {
           key3.map((all)=><div className="key" style={{cursor:"pointer"}} onClick={()=>Letter(all)}>{all}</div>)
          }
          <div  className='key single-keyboard-box-spe'><h3>Enter</h3></div>
        <div   className=' key single-keyboard-box-spe'><h3>Delete</h3></div>
        </div>
    </div>
  )
}

export default App
