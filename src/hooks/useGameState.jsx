
import { useState, useEffect } from "react";
import utils from "../math-utils";
const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvaiableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        // console.log("Rendered...");
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                // console.log("Rendered...");
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            // console.log(timerId);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) === stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailalbleNums = availableNums.filter(
                (n) => !newCandidateNums.includes(n)
            );

            // redraw the number
            setStars(utils.randomSumIn(newAvailalbleNums, 9));

            setAvaiableNums(newAvailalbleNums);
            setCandidateNums([]);
        }
    };

    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

export default useGameState;