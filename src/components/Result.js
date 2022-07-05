import React from "react";
import { useSelector } from "react-redux";

function Result(){

    const data = useSelector((state)=> state.type);

    const trueWords = data.trueWords;
    const wrongWords = data.wrongWords;
    
    const percantage = () => {
        return ((trueWords.length / (trueWords.length+wrongWords.length))*100)
    }

    return (
        <div className="result">
            <div className="score">
                Score
            </div>
            <div className="score-board">
                <div className="completed">
                    Speed: 
                    <div className="completed-score">
                    {(trueWords.length+wrongWords.length)/1} W/PM
                    </div>
                </div>
                <div className="correctness-rate">
                    Correctness rate: 
                    <div className="correctness-rate-score">
                    % {percantage().toFixed(2)}
                    </div>
                </div>
                <div className="correct">
                    Correct: 
                    <div className="correct-score">
                    {trueWords.length}
                    </div>
                </div>
                <div className="wrong">
                    Wrong: 
                    <div className="wrong-score">
                    {wrongWords.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result;