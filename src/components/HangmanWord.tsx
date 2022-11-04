const word = "test"
const guessedLetters = ['t']
const HangmanWord = () => {
  return (
    <div 
      style={{ 
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        textTransform: "uppercase",
        fontFamily: "monospace"
      }}
    >
      {word.split("").map((letter, index) => (
        <span style={{borderBottom: ".1em solid black"}} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter)
                  ? "visible"
                  : "hidden",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}

export default HangmanWord