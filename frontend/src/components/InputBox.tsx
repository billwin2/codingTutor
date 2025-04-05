import React from 'react';

interface InputBoxProps {
    question: string;
    setQuestion: (value: string) => void;
    task: string;
    setTask: (value: string) => void;
    language: string;
    setLanguage: (value: string) => void;
    onSubmit: () => void;
    loading: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ question, setQuestion, task, setTask, language, setLanguage, onSubmit, loading }) => {
    return (
        <div className="flex flex-col space-y-4">

            {/* Task Selection */}
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1">
                    <input type="radio" value="ask" checked={task === 'ask'} onChange={(e) => setTask(e.target.value)} />
                    <span>Ask a question</span>
                </label>
                <label className="flex items-center space-x-1">
                    <input type="radio" value="debug" checked={task === 'debug'} onChange={(e) => setTask(e.target.value)} />
                    <span>Debug my code</span>
                </label>
                <label className="flex items-center space-x-1">
                    <input type="radio" value="review" checked={task === 'review'} onChange={(e) => setTask(e.target.value)} />
                    <span>Review my code</span>
                </label>
            </div>

            {/* Language Select */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Language</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">-- Choose Language --</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="c++">C++</option>
                    <option value="c#">C#</option>
                    <option value="typescript">TypeScript</option>
                    <option value="go">Go</option>
                    <option value="ruby">Ruby</option>
                    <option value="php">PHP</option>
                    <option value="swift">Swift</option>
                </select>
            </div>

            {/* Input Textarea */}
            <textarea
                placeholder={task === 'ask' ? "Ask your coding question..." : "Paste your code here..."}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full border rounded-lg p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Processing...' : 'Submit'}
            </button>
        </div>
    );
};

export default InputBox;
