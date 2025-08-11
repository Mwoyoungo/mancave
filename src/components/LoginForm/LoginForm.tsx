import React, { useState } from 'react';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { COMETCHAT_CONSTANTS } from '../../config/cometChatConfig';
import './LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    uid: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { uid, name } = formData;

      if (!uid.trim() || !name.trim()) {
        setError('Both UID and name are required');
        return;
      }

      // Try to login first to see if user exists
      try {
        await CometChatUIKit.login(uid.trim());
        onLoginSuccess();
        return;
      } catch (loginError: any) {
        console.log('User not found, creating new user...');
      }

      // If login fails, create the user using CometChat SDK
      const user = new CometChat.User(uid.trim());
      user.setName(name.trim());

      try {
        await CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY);
        console.log('User created successfully');
        
        // Now login with the newly created user
        await CometChatUIKit.login(uid.trim());
        onLoginSuccess();
      } catch (createError: any) {
        console.error('Create user error:', createError);
        throw new Error(createError.message || 'Failed to create user');
      }
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <img src="/src/assets/logo1.png" alt="Mancave Amatyma" className="mancave-logo-img" />
        <h2>Welcome to ManCave Chat</h2>
        <p>Enter your details to start chatting</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="uid">User ID</label>
            <input
              id="uid"
              name="uid"
              type="text"
              value={formData.uid}
              onChange={handleChange}
              placeholder="Enter unique user ID"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Display Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              disabled={isLoading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};