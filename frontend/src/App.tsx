import React, { useState } from 'react';
import InputBox from './components/InputBox.tsx';
import OutputBox from './components/OutputBox';
import Spinner from './components/Spinner';

const App: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [task, setTask] = useState('ask');
    const [language, setLanguage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
      if (!question.trim()) {
          setError('Please enter a question or code.');
          return;
      }
      if (!language) {
          setError('Please select a programming language.');
          return;
      }
  
      setLoading(true);
      setError('');
      setResponse('');
  
      try {
          const endpointMap: { [key: string]: string } = {
              ask: '/ask',
              debug: '/debug',
              review: '/review'
          };
  
          const endpoint = endpointMap[task];
  
          const payload = task === 'ask'
              ? { question, language }
              : { code: question, language };
  
          const res = await fetch(`http://localhost:8000${endpoint}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
          });
  
          if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
  
          const data = await res.json();
          console.log('Received from backend:', data);
  
          // Handle different possible keys safely
          if (data.answer) {
              setResponse(data.answer);
          } else if (data.response) {
              setResponse(data.response);
          } else {
              setResponse('No answer received.');
          }
  
      } catch (err: unknown) {
          if (err instanceof Error) {
              setError(err.message);
          } else {
              setError('Something went wrong. Please try again.');
          }
      } finally {
          setLoading(false);
      }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <h1 className="text-3xl font-bold text-center text-blue-600">Welcome to Coding Tutor!</h1>

            <InputBox
                question={question}
                setQuestion={setQuestion}
                task={task}
                setTask={setTask}
                language={language}
                setLanguage={setLanguage}
                onSubmit={handleSubmit}
                loading={loading}
            />

            {loading && <Spinner />}

            <OutputBox
                response={response}
                error={error}
            />
        </div>
    </div>
    );
};

export default App;
