import { useState, useEffect, useCallback } from 'react'
import words from "./wordList.json"
import HangmanDrawing from './components/HangmanDrawing'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'


function getWord () {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  //Get a random word from our word list
  const [wordToGuess, setWordToGuess] = useState(getWord)
  //Track and store guessed letters in an array of Strings 
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  //Grab the letters that are not in the word to guess
  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  //To check if player is a loser, lol
  const isLoser = inCorrectLetters.length >= 6
  //To check if player is a winner
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  //Return if the letter is already guessed. Otherwise add the letter to the array
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      //Regular expression that just checks for a single letter
      if (!key.match(/^[a-z]$/)) return 
      e.preventDefault()
      addGuessedLetter(key)
    }
    //Call handler once the keypress event is triggered
    document.addEventListener("keypress", handler)
    //Clean up and remove eventlistener when the useEffect is done working
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])
  

  //Refresh the game
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Loser! - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length}/>
      <HangmanWord 
        guessedLetters={guessedLetters} 
        wordToGuess={wordToGuess}
        reveal={isLoser}
      />
      <div style={{ alignSelf: "stretch"}} >
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
