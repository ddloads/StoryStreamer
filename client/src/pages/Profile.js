 // client/src/pages/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile">
      <h1>{user.username}</h1>
      <p>Completed Titles: {user.completedTitles}</p>
      <p>Total Time Listened: {user.totalTimeListened} minutes</p>
    </div>
  );
};

export default Profile;