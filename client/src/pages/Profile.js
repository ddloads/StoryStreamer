import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // You might need to adjust this API endpoint based on your backend setup
        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  if (!userProfile) {
    return <p className="text-center text-gray-600 text-xl mt-8">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{user.displayName || 'User Profile'}</h1>
      <div className="space-y-4">
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        {userProfile.completedTitles !== undefined && (
          <p className="text-lg">
            <span className="font-semibold">Completed Titles:</span> {userProfile.completedTitles}
          </p>
        )}
        {userProfile.totalTimeListened !== undefined && (
          <p className="text-lg">
            <span className="font-semibold">Total Time Listened:</span> {userProfile.totalTimeListened} minutes
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;