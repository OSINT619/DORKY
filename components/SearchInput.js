function SearchInput({ selectedOperators, onSearch }) {
    try {
        const [searchTerms, setSearchTerms] = React.useState({});

        const handleInputChange = (operatorId, value) => {
            setSearchTerms(prev => ({
                ...prev,
                [operatorId]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const query = selectedOperators
                .map(op => searchTerms[op.id] ? `${op.label}${searchTerms[op.id]}` : '')
                .filter(Boolean)
                .join(' ');
            onSearch(query);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4" data-name="search-form">
                {selectedOperators.map(operator => (
                    <div key={operator.id} className="flex flex-col space-y-2" data-name="search-input-group">
                        <label 
                            htmlFor={`input-${operator.id}`}
                            className="text-sm font-medium text-gray-700"
                            data-name="search-input-label"
                        >
                            {operator.label}
                        </label>
                        <input
                            type="text"
                            id={`input-${operator.id}`}
                            value={searchTerms[operator.id] || ''}
                            onChange={(e) => handleInputChange(operator.id, e.target.value)}
                            className="search-input px-4 py-2 rounded-lg border focus:outline-none"
                            placeholder={`Enter ${operator.label} value...`}
                            data-name="search-input-field"
                        />
                    </div>
                ))}
                {selectedOperators.length > 0 && (
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        data-name="generate-button"
                    >
                        Generate Dork
                    </button>
                )}
            </form>
        );
    } catch (error) {
        console.error('SearchInput component error:', error);
        reportError(error);
        return null;
    }
}
