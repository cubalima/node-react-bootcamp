import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Ángel - React Learning</h1>

      <p>Has pulsado {count} veces.</p>

      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  )
}

export default App