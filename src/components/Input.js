import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffleWords,setSpaceCount, setCurrentword, setTrueWords, setWrongWords, restart } from "../redux/typeSlice";
import Result from "./Result";


function Input(){

    const [text,setText]=useState("");
    const [count,setCount]=useState(0);
    const [seconds,setSeconds] = useState(60);
    const [wordCount,setWordCount]=useState(0);
    const [correct,setCorrect]=useState(0);
    const [wrong,setWrong]=useState(0);
    const [isActive, setIsActive] = useState(false);

    const data = useSelector((state)=>state.type);
    const dispatch = useDispatch();
        
    function reset() {
    setSeconds(60);
    setIsActive(false);
    }

   

    useEffect(() => {
    let interval = null;
    if(seconds === 0){
        setIsActive(false);
    }
    if (isActive) {
        interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        }, 1000);
    } else if (!isActive && seconds === 0) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [isActive, seconds]);

    const handleSpace= (e) => {
        if (e.keyCode === 32) {
          if(text.trim().toLowerCase() === data.data[wordCount].targetWord.toLowerCase() ||text.trim().toLowerCase() === data.data[wordCount].englishWord.toLowerCase()){
              setCorrect(correct+1);
              dispatch(setTrueWords(text.trim().toLowerCase()));
          }else{
              setWrong(wrong+1);
              dispatch(setWrongWords(text.trim().toLowerCase()));
          }
          setWordCount(wordCount+1);
          if(wordCount !== 0 && wordCount%9 === 0){
              dispatch(shuffleWords());
              setWordCount(0);
          }
          dispatch(setSpaceCount(wordCount+1))
          setText("");
        }      
      };

    const handleChange =(e)=>{
        setText(e.target.value);
        dispatch(setCurrentword(e.target.value));
        setCount(count+1)
        if(count>0){
            setIsActive(true);
        }
    }
    
    function newGame(){
        dispatch(restart());
        dispatch(shuffleWords());
        setWordCount(0);
        setCount(0);
        reset();
        setText("");
    }
  return (
    <>
      <div className="InputBtn-Container">
          <div width="80%" className="InputBtn-field">
              <input 
              className="input-text" 
              value={text} 
              disabled={(seconds === 0) ? true : false}
              onChange={(e)=>{handleChange(e)}}
              onKeyDown={handleSpace}/>
              <button className="btn-timer">{seconds}</button>
              <button className="btn-res" onClick={()=>newGame()}>
              {
                (seconds === 0 ) ? "Replay" : 
                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M400 148l-21.12-24.57A191.43 191.43 0 00240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 00181.07-128"></path>
                      <path d="M464 97.42V208a16 16 0 01-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"></path>
                  </svg> 
              }
              </button>
          </div>
      </div>
      {
        seconds === 0 && <Result/>
      }
    </>
    
  )
}

export default Input
