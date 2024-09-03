import React, { useEffect, useState } from 'react';
import Navbar from '../nav';
import Swal from 'sweetalert2';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User token is not available.');
        }

        const response = await fetch('http://localhost:5000/api/profile/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User token is not available.');
      }

      const response = await fetch('http://localhost:5000/api/profile/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been changed successfully.',
      });

      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to change password.',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className='pt-32'></div>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md ">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {profile ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{profile.username}</h1>
              <p className="text-gray-700">Email: {profile.email}</p>
              {/* Render other profile details here */}
            </div>
            <button
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </button>
            {isChangingPassword && (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
