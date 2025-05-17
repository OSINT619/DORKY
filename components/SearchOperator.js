function SearchOperator({ operator, value, onChange }) {
    try {
        return (
            <div 
                data-name="operator-item"
                className="p-6 neuomorphic rounded-xl"
            >
                <label 
                    className="block text-lg font-medium text-gray-700 mb-2"
                    data-name="operator-label"
                >
                    {operator.label}
                    <span className="block text-sm text-gray-500 font-normal mt-1">
                        {operator.description}
                    </span>
                </label>
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(operator.id, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl search-input text-gray-700"
                    placeholder={`Enter ${operator.label} value...`}
                    data-name="operator-input"
                />
            </div>
        );
    } catch (error) {
        console.error('SearchOperator component error:', error);
        reportError(error);
        return null;
    }
}
