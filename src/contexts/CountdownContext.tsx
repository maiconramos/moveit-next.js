import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
           minutes: number;
            seconds: number;
            hasFinished: boolean;
            isActive: boolean;
            startCountdown: () => void;
            resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider ({children}: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown (){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60); 
        setHasFinished(false);
        setTime(25 * 60);       
    }

    useEffect(() =>{ 
        if (isActive && time > 0){   /* verify if active(button) = true and time > 0 */ 
            countdownTimeout = setTimeout(() => {    /* run a timeout of 1000 milliseconds = 1 second */
                setTime(time - 1);   /* decreases 1 second  */
            }, 1000)
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive , time]); /* while active = true he will monitor the time and will be running */

    return (
        <CountdownContext.Provider
             value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
             }}>
            {children}
        </CountdownContext.Provider>
    )
}