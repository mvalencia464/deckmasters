# The "Shared Secret" Auth Pattern
**For Simple, Low-Maintenance Admin Tools**

This document outlines the architecture and implementation of the lightweight "Shared Secret" authentication used in this project. It is designed for internal tools where simplicity and zero-maintenance are prioritized over granular user management.

## 🎯 Use Case
**Best for:**
- Internal admin panels (CMS, Dashboards).
- Small teams (1-5 people).
- Projects where data sensitivity is low (e.g., website content vs. medical records).
- "Headless" sites hosted on Netlify/Vercel.

**Why use this?**
- **Zero Config:** No Auth0/Firebase/Cognito setup.
- **Free:** No monthly active user limits.
- **Portable:** Works on any platform that supports serverless functions.

---

## 🏗 Architecture

1.  **The Secret:** A single password string stored in an Environment Variable (`ADMIN_PASSWORD`).
2.  **The Client (Frontend):** 
    - Stores the entered password in memory (Context API).
    - Sends the password as a custom header (`X-Admin-Password`) with every privileged API request.
3.  **The Server (Backend Functions):**
    - A reusable middleware/utility checks the incoming header against the environment variable.
    - Returns `401 Unauthorized` if they don't match.

---

## 🛠 Step-by-Step Implementation

### Phase 1: The Backend (The Gatekeeper)

#### 1. Define the Utility
Create a reusable verification function. This prevents you from writing the same `if (password !== env)` logic in every function.

**File:** `netlify/functions/utils/verify.ts` (or `lib/verify.ts`)
```typescript
export const verifyAuth = (headers: { [key: string]: string | undefined }): boolean => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  // The client sends the password in this custom header
  const providedPassword = headers['x-admin-password'];

  // Simple string comparison
  return !!adminPassword && providedPassword === adminPassword;
};
```

#### 2. Protect a Function
Use the utility at the very top of your serverless function.

**File:** `netlify/functions/save-project.ts`
```typescript
import { verifyAuth } from './utils/verify';

export const handler = async (event) => {
  // 1. GATEKEEPING
  if (!verifyAuth(event.headers)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized: Invalid Password' }),
    };
  }

  // 2. ACTUAL LOGIC
  // ... perform database writes, git operations, etc.
  return { statusCode: 200, body: 'Success' };
};
```

---

### Phase 2: The Frontend (The State)

#### 1. The Context (State Management)
Create a context to hold the password globally so you don't have to pass it around.

**File:** `src/context/AuthContext.tsx`
```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean; // Returns success/fail immediately
  authToken: string | null; // The password itself is the token
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Note: We "optimistically" log them in on the frontend.
  // The REAL security happens when the API rejects a wrong password.
  const login = (password: string) => {
    if (password) {
      setAuthToken(password);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!authToken, login, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

#### 2. Sending the "Token"
When making requests, attach the password from your context to the headers.

**File:** `src/services/api.ts`
```typescript
const saveProject = async (data: any, password: string) => {
  const response = await fetch('/.netlify/functions/save-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': password, // <--- THE KEY
    },
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    throw new Error('Invalid Password');
  }
};
```

---

### Phase 3: The UI (Login Modal)

A simple component that pops up when a user tries to access admin features.

**File:** `src/components/AdminLoginModal.tsx`
```tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminLoginModal = ({ onClose, onSuccess }) => {
  const [input, setInput] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In this simple pattern, we just save it to state.
    // If it's wrong, the next API call will fail.
    login(input);
    onSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Admin Access</h2>
        <input 
          type="password" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Enter Admin Password"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Unlock
        </button>
      </form>
    </div>
  );
};
```

---

## 🔒 Security & Deployment

1.  **Set the Environment Variable:**
    *   In Netlify/Vercel Dashboard: Settings > Environment Variables.
    *   Key: `ADMIN_PASSWORD`
    *   Value: `YourSuperSecretPassword123!`

2.  **HTTPS is Mandatory:**
    *   Never use this over HTTP. The password is sent in headers, which are visible in plain text if not encrypted by SSL. Netlify/Vercel provide HTTPS by default.

3.  **Limitations:**
    *   **No "User" Identity:** You can't tell *who* made a change, only that they had the password.
    *   **No Password Rotation:** If you change the password, everyone gets logged out immediately.

## 🚀 Reusability
To use this in another project:
1.  Copy `verify.ts` to your backend.
2.  Copy `AuthContext.tsx` to your frontend.
3.  Wrap your App in `<AuthProvider>`.
4.  Add the `X-Admin-Password` header to your API calls.
