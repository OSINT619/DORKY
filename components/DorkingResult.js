function DorkingResult({ query }) {
    try {
        const [copied, setCopied] = React.useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(query).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        };

        const handleSearch = () => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        };

        const handleImageSearch = () => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank');
        };

        return (
            <div className="neuomorphic p-6 rounded-xl" data-name="result-container">
                <div className="flex items-center justify-between mb-4" data-name="result-header">
                    <h3 className="text-xl font-medium text-gray-800">Generated Query</h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleCopy}
                            className="neuomorphic-button p-3 rounded-xl text-gray-700"
                            title="Copy to clipboard"
                            data-name="copy-button"
                        >
                            <i className={`fas fa-${copied ? 'check' : 'copy'}`}></i>
                        </button>
                        <button
                            onClick={handleSearch}
                            className="neuomorphic-button p-3 rounded-xl text-gray-700"
                            title="Search on Google"
                            data-name="search-button"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                        <button
                            onClick={handleImageSearch}
                            className="neuomorphic-button p-3 rounded-xl text-gray-700"
                            title="Search on Google Images"
                            data-name="image-search-button"
                        >
                            <i className="fas fa-images"></i>
                        </button>
                    </div>
                </div>
                <div 
                    className="p-4 rounded-xl neuomorphic-inset break-all"
                    data-name="query-display"
                >
                    <code className="text-gray-700">{query}</code>
                </div>
            </div>
        );
    } catch (error) {
        console.error('DorkingResult component error:', error);
        reportError(error);
        return null;
    }
}
