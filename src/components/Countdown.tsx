import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){
    const { 
             minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
     } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = 
    String(minutes) /* transform number minutes em string 25 ->'25' */
    .padStart(2 , '0') /* verify string has two characters, if not add '0' - Example: '5' -> '05' */
    .split(''); /* split a string into characters '25' -> '2' '5' */

    const [secondsLeft , secondsRight] = String(seconds).padStart(2 , '0').split('');
    
    return (
        <div>
            <div className={ styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
            
            {hasFinished ? (
                <button
                disabled
                type="button"
                className={styles.countdownButton}
                >
                Ciclo encerrado
            </button>
            ) : (
                <>
                { isActive ? (
                <button
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    >
                    Abandonar ciclo
                </button>
            ) : (
                <button
                    type="button"
                    className={ styles.countdownButton}
                    onClick={startCountdown}
                    >
                       Iniciar um ciclo
                </button>
            )}
                </>
            )}
    
        </div>
    )
}