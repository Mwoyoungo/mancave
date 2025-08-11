import { COMETCHAT_CONSTANTS } from '../config/cometChatConfig';

const BASE_URL = `https://${COMETCHAT_CONSTANTS.APP_ID}.api-${COMETCHAT_CONSTANTS.REGION}.cometchat.io/v3`;

export interface CreateUserData {
  uid: string;
  name: string;
  avatar?: string;
}

export interface AuthTokenResponse {
  data: {
    authToken: string;
  };
}

export interface CreateUserResponse {
  data: {
    uid: string;
    name: string;
    avatar: string;
    createdAt: number;
  };
}

// Create a new user in CometChat
export const createUser = async (userData: CreateUserData): Promise<CreateUserResponse> => {
  console.log('Creating user:', userData);
  console.log('API URL:', `${BASE_URL}/users`);
  
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': COMETCHAT_CONSTANTS.AUTH_KEY,
    },
    body: JSON.stringify(userData),
  });

  console.log('Create user response status:', response.status);

  if (!response.ok) {
    const error = await response.text();
    console.error('Create user error:', error);
    throw new Error(`Failed to create user: ${response.status} ${error}`);
  }

  return response.json();
};

// Generate auth token for existing user
export const createAuthToken = async (uid: string): Promise<AuthTokenResponse> => {
  console.log('Creating auth token for UID:', uid);
  
  const response = await fetch(`${BASE_URL}/users/${uid}/auth_tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': COMETCHAT_CONSTANTS.AUTH_KEY,
    },
    body: JSON.stringify({
      force: true
    }),
  });

  console.log('Auth token response status:', response.status);

  if (!response.ok) {
    const error = await response.text();
    console.error('Auth token error:', error);
    throw new Error(`Failed to create auth token: ${response.status} ${error}`);
  }

  return response.json();
};

// Check if user exists
export const getUser = async (uid: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': COMETCHAT_CONSTANTS.AUTH_KEY,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null; // User doesn't exist
    }
    const error = await response.text();
    console.error('Get user error:', error);
    throw new Error(`Failed to get user: ${response.status} ${error}`);
  }

  return response.json();
};