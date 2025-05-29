import { User } from '@/types';

interface AuthorCardProps {
    author: User;
}

export default function AuthorCard({ author }: AuthorCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {author.name.charAt(0)}
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{author.name}</h1>
                <p className="text-gray-600">@{author.username}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-gray-800">Contact</h3>
                    <p className="text-gray-600">{author.email}</p>
                    <p className="text-gray-600">{author.phone}</p>
                    {author.website && (
                        <a href={`http://${author.website}`} className="text-blue-600 hover:underline">
                            {author.website}
                        </a>
                    )}
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">
                        {author.address.street}, {author.address.suite}<br />
                        {author.address.city}, {author.address.zipcode}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800">Company</h3>
                    <p className="text-gray-600 font-medium">{author.company.name}</p>
                    <p className="text-gray-500 text-sm">{author.company.catchPhrase}</p>
                </div>
            </div>
        </div>
    );
}