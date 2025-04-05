import React from 'react';

interface OutputBoxProps {
    response: string;
    error: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ response, error }) => {
    return (
        <div className="w-full">
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-2">
                    {error}
                </div>
            )}
            {response && (
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm">
                    <h3 className="text-lg font-semibold text-white mb-2">Response:</h3>
                    <pre className="whitespace-pre-wrap break-words">{response}</pre>
                </div>
            )}
        </div>
    );
};

export default OutputBox;
