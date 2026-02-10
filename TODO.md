# Signup Functionality Implementation Plan

## Backend Changes

### 1. Fix User Model (Backend/model/users.js)
- [x] Remove confirmPassword from schema (only for validation, not storage)
- [x] Add isAdmin field
- [x] Add pre-save hook for password hashing with bcrypt

### 2. Fix User Controller (Backend/controllers/userControllers.js)
- [x] Fix model reference from User to Users
- [x] Add JWT token generation
- [x] Improve error handling
- [x] Remove confirmPassword from user creation

### 3. Clean Up Server (Backend/server.js)
- [x] Remove duplicate signup endpoint
- [x] Keep only controller-based routes

## Frontend Changes

### 4. Update Signup Component (client/src/Signup.tsx)
- [x] Add loading state
- [x] Add form validation (email format, password strength, matching passwords)
- [x] Fix credentials to use 'include'
- [x] Add navigation after successful signup
- [x] Improve error handling with specific messages
- [x] Add visual feedback for validation errors
- [x] Store JWT token in localStorage

### 5. Install Required Dependencies
- [x] Backend: bcryptjs, jsonwebtoken
- [x] Frontend: Already has required dependencies

## Testing
- [ ] Test signup functionality end-to-end
- [ ] Verify error handling works correctly
- [ ] Test navigation flow after signup
- [ ] Verify JWT token is properly generated and stored
