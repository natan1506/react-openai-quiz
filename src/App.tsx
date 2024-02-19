import OpenAI from 'openai'
import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [apiResponse, setApiResponse] = useState<string | null>('')
  const [loading, setLoading] = useState(false)

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      setLoading(true)
      const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        max_tokens: 4000,
        messages: [{ role: 'user', content: `${prompt}` }],
      })
      console.log(result.choices[0].message)
      console.log('response', result.choices[0].message.content)
      setApiResponse(result.choices[0].message.content)
    } catch (e) {
      console.log(e)
      setApiResponse('Something is going wrong, Please try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={prompt}
            placeholder="Please ask to openai"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button disabled={loading || prompt.length === 0} type="submit">
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )}
    </>
  )
}

export default App
