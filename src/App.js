import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        setUserNotFound(true);
        setUserData(null);
        return;
      }
      const data = await response.json();
      setUserNotFound(false);
      setUserData(data);
    } catch (error) {
      console.error(error);
      setUserNotFound(true);
      setUserData(null);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <div className="p-4 ">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">GitHub User Card</h1>
          <div className="mb-4 mt-5">
            <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">
              Enter GitHub Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {userData && !userNotFound && (
          <div className="p-4 border-t border-gray-300">
            <h2 className="text-xl font-semibold mb-2">{userData.name || username}</h2>
            <div className="flex items-center space-x-4">
              <img
                className="w-20 h-20 rounded-full border-4 border-white"
                src={userData.avatar_url}
                alt="Avatar"
              />
              <div>
                <p className="text-gray-600">@{username}</p>
                <p className="text-gray-600">
                  Joined GitHub on{' '}
                  {new Date(userData.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">{userData.public_repos}</span> Public Repositories
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">{userData.public_gists}</span> Public Gists
              </p>
            </div>
          </div>
        )}
        {userNotFound && (
          <div className="p-4 border-t border-gray-300 text-red-500">
            User not found: {username}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


