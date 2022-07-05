import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { shuffleWords } from "../redux/typeSlice";


function Words(){
  const [buttonText, setButtonText] = useState('English');

  const data = useSelector((state)=>state.type);
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(shuffleWords());
  }, [dispatch])

    let tenwords = data.data.slice(0,10);
    let targetWord = data.spaceCount %10;
    let currentWord = data.currentWord;
    let trueWords = data.trueWords;

    const isContain = () => {
      if(buttonText === "Turkish"){
        return data.data[targetWord].targetWord.toLowerCase().startsWith(currentWord.trim().toLowerCase());
      }else{
        return data.data[targetWord].englishWord.toLowerCase().startsWith(currentWord.trim().toLowerCase());
      }
    }

    const handleClick = () => {
      if(buttonText === 'English'){
        setButtonText('Turkish');
      }else{
        setButtonText('English');
      }    
    }
  return (
    <>
      <button className="btn-lang" onClick={handleClick}>{buttonText}</button>
      <div className="word-clouds">
        {
          buttonText === "Turkish" ? 
            tenwords.map((item,i) => {
              return <span key={i} className=
              {currentWord.trim().length === 0 && i ===targetWord 
                ? "current-word"
                : i === targetWord && isContain() 
                ? "green"
                : i === targetWord && !isContain()
                ? "red"
                : i<targetWord && trueWords.indexOf(item.targetWord.toLowerCase()) !== -1 
                ? "green"
                : i<targetWord && trueWords.indexOf(item.targetWord.toLowerCase()) === -1 
                ? "red"
                :""}
                >{item.targetWord.toLowerCase()} </span>
            }) :
            tenwords.map((item,i)=>{
              return <span key={i} className=
              {currentWord.trim().length === 0 && i === targetWord 
                ? "current-word"
                : i === targetWord && isContain() 
                ? "green"
                : i === targetWord && !isContain() 
                ? "red"
                : i < targetWord && trueWords.indexOf(item.englishWord.toLowerCase()) !== -1 
                ? "green"
                : i < targetWord && trueWords.indexOf(item.englishWord.toLowerCase()) === -1 
                ? "red"
                : ""}
                >{item.englishWord.toLowerCase()} </span>
            })
        }
      </div>
    </>
  )
}

export default Words
