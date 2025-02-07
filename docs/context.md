# Government Schemes and Policies App - Detailed Flow and Features

This document provides a detailed and structured explanation of the flow and features of an app designed to help users deliberate on government schemes and policies in India. The app is user-friendly and provides easy access to information about various schemes and policies.

---

## Tech Stack

Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

---
// ... existing code ...

## Database Schema

### Tables

#### 1. users

## App Flow

sql
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
preferred_language VARCHAR(50) DEFAULT 'en'
);

#### 2. schemes
sql
CREATE TABLE schemes (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
eligibility_criteria TEXT,
benefits TEXT,
application_process TEXT,
category VARCHAR(100),
icon_url VARCHAR(255),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


#### 3. scheme_translations
sql
CREATE TABLE scheme_translations (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
scheme_id UUID REFERENCES schemes(id) ON DELETE CASCADE,
language VARCHAR(50) NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
eligibility_criteria TEXT,
benefits TEXT,
application_process TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
UNIQUE(scheme_id, language)
);


#### 4. bookmarks
sql
CREATE TABLE bookmarks (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
scheme_id UUID REFERENCES schemes(id) ON DELETE CASCADE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
UNIQUE(user_id, scheme_id)
);



#### 5. notifications
sql
CREATE TABLE notifications (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---

### 1. **Welcome Screen**
   - **Purpose**: The first screen users see when they open the app.
   - **Features**:
     - App logo and name.
     - A brief tagline or description of the app (e.g., "Your Guide to Government Schemes and Policies").
     - Two buttons:
       - **Sign Up**: For new users to create an account.
       - **Login**: For existing users to log in.

### 2. **Sign-Up Screen**
   - **Purpose**: Allows new users to create an account.
   - **Features**:
     - Input fields:
       - **Name**: User's full name.
       - **Password**: Secure password entry with visibility toggle.
       - **Confirm Password**: To ensure the password is entered correctly.
     - **Sign Up Button**: Submits the details and creates the account.
     - **Login Link**: Redirects to the login screen for existing users.

### 3. **Login Screen**
   - **Purpose**: Allows existing users to log in.
   - **Features**:
     - Input fields:
       - **Name**: User's registered name.
       - **Password**: Secure password entry with visibility toggle.
     - **Login Button**: Authenticates the user and redirects to the main dashboard.
     - **Sign Up Link**: Redirects to the sign-up screen for new users.

### 4. **Main Dashboard**
   - **Purpose**: The central hub where users can explore various government schemes and policies.
   - **Features**:
     - **Search Bar**: At the top of the screen, allowing users to search for specific schemes or policies by keywords.
     - **Scheme Cards**: Displayed in a grid or list format below the search bar.
       - Each card represents a major government scheme or policy.
       - Cards include:
         - **Scheme Name**: The title of the scheme or policy.
         - **Icon/Image**: A visual representation of the scheme (e.g., a relevant icon or logo).
         - **Brief Description**: A short summary of the scheme (1-2 lines).
     - **Clickable Cards**: Tapping on a card opens a detailed view of the scheme.

### 5. **Scheme Details Screen**
   - **Purpose**: Provides in-depth information about a specific government scheme or policy.
   - **Features**:
     - **Scheme Name**: Displayed prominently at the top.
     - **Detailed Description**: A comprehensive explanation of the scheme, including:
       - Objectives.
       - Eligibility criteria.
       - Benefits.
       - Application process.
       - Relevant links or documents.
     - **Back Button**: Returns the user to the main dashboard.
     - **Share Button**: Allows users to share the scheme details via social media, email, or messaging apps.

### 6. **Search Functionality**
   - **Purpose**: Enables users to quickly find specific schemes or policies.
   - **Features**:
     - **Search Bar**: Located at the top of the main dashboard.
     - **Auto-Suggestions**: As the user types, the app suggests relevant schemes or policies.
     - **Search Results**: Displayed in a list or grid format, similar to the main dashboard cards.

### 7. **Language Support**
   - **Purpose**: Makes the app accessible to a wider audience.
   - **Features**:
     - **Language Toggle**: Users can switch between English and other regional languages (e.g., Hindi, Tamil, etc.).
     - **Localized Content**: All scheme details and app content are available in the selected language.




---

## Technical Considerations

### 1. **Backend**
   - **Database**: Store user accounts, scheme details, and bookmarks.
   - **API**: Fetch scheme details from a government database or a curated dataset.
   - **Authentication**: Secure user login and sign-up using encryption.

### 2. **Frontend**
   - **UI/UX Design**: Ensure the app is visually appealing and easy to navigate.
   - **Responsive Design**: Optimize the app for various screen sizes (mobile, tablet).

### 3. **Security**
   - **Data Encryption**: Protect user data and passwords.
   - **Secure API Calls**: Ensure all data fetched from the backend is secure.

---


## Conclusion

This app aims to simplify access to government schemes and policies in India, making it easier for users to stay informed and take advantage of available opportunities. The structured flow and features outlined above provide a clear roadmap for developers to implement the app effectively.