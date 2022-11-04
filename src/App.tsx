import { useState } from 'react'
import words from "./wordList.json"
import HangmanDrawing from './components/HangmanDrawing'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'

function App() {
  //Get a random word from our word list
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  //Track and store guessed letters in an array of Strings 
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  //Grab the letters that are not in the word to guess
  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

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
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters}/>
      <HangmanWord />
      <div style={{ alignSelf: "stretch"}} >
        <Keyboard />
      </div>
    </div>
  )
}

export default App
