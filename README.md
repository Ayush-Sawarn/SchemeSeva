<p align="center">
  <img src="assets/images/SchemeSeva.jpeg" alt="SchemeSeva Logo" width="600" height="300"/>
</p>

# SchemeSeva

SchemeSeva is a mobile application developed as part of the course **IC-202P Design Practicum**. The primary goal of this project was to design and build an app that helps disseminate government schemes and policies to the people who need them most.

## Project Background & Motivation

Every year, the government releases thousands of schemes and policies aimed at supporting various sections of society, such as poor farmers, small businessmen, and marginalized communities. However, the information about these schemes often fails to reach the intended beneficiaries due to lack of awareness, education, and accessibility. Many people remain unaware of the benefits and opportunities available to them simply because they do not know these schemes exist.

**SchemeSeva** addresses this critical gap by providing a user-friendly platform that makes government schemes accessible and understandable to everyone, especially those who are less educated or have limited access to information. Our app not only lists the latest government schemes but also generates short, easy-to-understand videos in Hindi, ensuring the information reaches a wider audience in their native language.

## Key Features

- **Latest Government Schemes:** Stay updated with the most recent schemes released by the government.
- **Personalized Recommendations:** Find schemes relevant to your profile and eligibility.
- **Short Explainer Videos:** Watch automatically generated videos (in Hindi) that explain the scheme, its benefits, eligibility, and application process.
- **Detailed Scheme Information:** Access comprehensive details about each scheme, including eligibility criteria, benefits, and how to apply.
- **User Authentication:** Secure login and personalized experience.
- **Eligibility Checker:** Instantly check which schemes you are eligible for.
- **Easy-to-use Interface:** Designed for accessibility and simplicity, targeting users from all backgrounds.

## How It Works

1. **Discover:** Users can search for and discover the latest government schemes relevant to them.
2. **Understand:** For each scheme, a short video is generated in Hindi, making it easy for users to understand the scheme details regardless of their literacy level.
3. **Access:** Users can view detailed information and check their eligibility for each scheme.

## Tech Stack

- **Frontend:**
  - React Native
  - Expo (SDK 52)
  - TypeScript
  - React Native Paper
- **Backend:**
  - FastAPI (Python)
  - Uvicorn (ASGI server)
  - Boto3 (AWS S3 integration for video storage)
  - SymSpellPy (spelling correction)
  - FFmpeg (video processing and merging)
  - AWS S3 (cloud storage for videos)
  - Supabase (database and authentication)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Python 3.8+
- FFmpeg installed and accessible in PATH
- AWS credentials for S3 access

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ayush-Sawarn/SchemeSeva
cd schemeseva
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your device:
   - Press 'a' for Android
   - Press 'i' for iOS
   - Scan QR code with Expo Go app on your mobile device

### Backend Setup

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Start the FastAPI server:

```bash
uvicorn video:app --host 0.0.0.0 --port 8000
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
