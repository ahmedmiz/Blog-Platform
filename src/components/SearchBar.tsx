interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search posts..." }: SearchBarProps) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}