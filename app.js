function App() {
    try {
        const [searchTerms, setSearchTerms] = React.useState({});
        const [generatedQuery, setGeneratedQuery] = React.useState('');

        const handleInputChange = (operatorId, value) => {
            setSearchTerms(prev => ({
                ...prev,
                [operatorId]: value
            }));
        };

        const handleGenerateQuery = () => {
            const query = operators
                .map(op => searchTerms[op.id] ? `${op.label}${searchTerms[op.id]}` : '')
                .filter(Boolean)
                .join(' ');
            setGeneratedQuery(query);
        };

        return (
            <div className="min-h-screen bg-[#e0e5ec] py-8 px-4 sm:px-6 lg:px-8" data-name="app-container">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12" data-name="header">
                        <GooeyTitle text="Google Dorking Tool" />
                        <p className="text-xl text-gray-600">Advanced search query generator</p>
                    </div>

                    <div className="mb-8" data-name="operators-section">
                        <div className="operator-grid">
                            {operators.map(operator => (
                                <SearchOperator
                                    key={operator.id}
                                    operator={operator}
                                    value={searchTerms[operator.id]}
                                    onChange={handleInputChange}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mb-8">
                        <button
                            onClick={handleGenerateQuery}
                            className="px-8 py-4 rounded-xl text-lg font-medium text-gray-700 neuomorphic-button"
                            data-name="generate-button"
                        >
                            Generate Dork
                        </button>
                    </div>

                    {generatedQuery && <DorkingResult query={generatedQuery} />}
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
