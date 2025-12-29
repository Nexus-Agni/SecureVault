# 🔐 SecureVault - Password Manager

A modern, secure, and feature-rich password management system built with React and Appwrite. SecureVault helps you manage, generate, and monitor your passwords with military-grade security.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19-61dafb)
![Appwrite](https://img.shields.io/badge/Appwrite-Backend-f02e65)

## ✨ Features

### 🔑 Authentication & Security

- **Email/Password Authentication**
  - Secure user registration with validation
  - Email-based login system
  - Password reset functionality via email recovery
  
- **Google OAuth 2.0**
  - One-click Google sign-in
  - Seamless account creation via Google
  
- **Two-Factor Authentication (2FA/MFA)**
  - TOTP-based authentication via authenticator apps (Google Authenticator, Authy, etc.)
  - QR code generation for easy setup
  - Manual secret key entry option
  - Recovery codes system (backup authentication)
  - MFA requirement for both email and OAuth logins
  - Secure challenge-response verification

### 🗄️ Password Vault

- **Password Management**
  - Add, edit, and delete password entries
  - Secure storage with Appwrite database
  - Password visibility toggle (show/hide)
  - Copy to clipboard functionality
  - Password strength indicator (Weak, Medium, Strong, Very Strong)
  - Automatic strength calculation and storage
  
- **Categorization**
  - Organize passwords by categories: Social, Email, Banking, Work, Other
  - Custom category icons
  - Filter passwords by category
  
- **Search & Filter**
  - Real-time search across titles and URLs
  - Filter by category
  - Filter by password strength level
  - Sort by date (newest/oldest) or strength
  
- **View Modes**
  - Grid view for visual browsing
  - List view for detailed information
  
- **Pagination**
  - Configurable items per page (12 items default)
  - Navigation controls

- **Password Details**
  - Title/Account name
  - URL/Website
  - Username/Email
  - Password with strength indicator
  - Category
  - Notes field
  - Creation date
  - Favorites/starred passwords

### 📊 Dashboard & Analytics

- **Key Statistics**
  - Total passwords count
  - Security score (0-100%)
  - Duplicate passwords count
  
- **Password Strength Distribution**
  - Interactive bar chart showing Very Strong, Strong, Medium, and Weak passwords
  - Click-to-filter navigation to vault
  - Visual strength breakdown
  
- **Recent Activity Timeline**
  - Last 10 passwords added
  - Time-ago formatting (e.g., "2 hours ago")
  - Quick navigation to vault
  - Category badges
  
- **Password Health Insights**
  - Duplicate password detection (actual password comparison)
  - Old password alerts (6+ months)
  - Password age distribution area chart
  - Health recommendations
  
- **Category Distribution**
  - Interactive pie chart with percentages
  - Click-to-filter by category
  - Category count badges
  - Visual category breakdown
  
- **Data Visualization**
  - Recharts integration for professional charts
  - Interactive tooltips
  - Responsive chart layouts
  - Click-through navigation from charts

### 🔐 Password Generator

- **Customizable Generation**
  - Adjustable password length (8-50 characters)
  - Include/exclude uppercase letters
  - Include/exclude lowercase letters
  - Include/exclude numbers
  - Include/exclude special symbols
  
- **Password Analysis**
  - Real-time strength indicator
  - Visual strength meter
  - Strength level badge (Weak, Medium, Strong, Very Strong)
  
- **User-Friendly Features**
  - One-click copy to clipboard
  - Regenerate password button
  - Password visibility toggle
  - Save directly to vault

### 🛡️ Security Features

- **Password Breach Checking**
  - Check if passwords have been compromised
  - Integration with breach databases
  - Security recommendations
  
- **Password Strength Analysis**
  - Advanced strength calculation algorithm
  - Factors: length, character variety, patterns
  - Score-based evaluation (0-4)
  - Detailed feedback and suggestions
  
- **Data Security**
  - End-to-end encryption ready
  - SOC2 compliant infrastructure (Appwrite)
  - Secure session management
  - Protected routes with authentication guards
  - Automatic session timeout handling

### 👤 User Profile Management

- **Account Settings**
  - Update display name
  - Change email address (with password verification)
  - Change password (with current password verification)
  - Enable/Disable 2FA
  
- **Profile Information**
  - Display name
  - Email address
  - Account creation date
  - User avatar (icon-based)

### 🎨 User Interface

- **Design System**
  - Dark theme optimized for eye comfort
  - Custom color palette (red accent theme)
  - JetBrains Mono monospace font
  - Consistent component styling
  
- **Navigation**
  - Fixed sidebar navigation
  - Active page indicators
  - Quick access to all features
  - Responsive layout (mobile-friendly)
  
- **Interactive Elements**
  - Smooth transitions and animations
  - Hover effects and shadows
  - Loading states with custom loader
  - Toast notifications (success, error, info)
  - Modal dialogs for actions
  
- **Accessibility**
  - Semantic HTML
  - ARIA labels
  - Keyboard navigation support
  - Focus indicators

### 📱 Responsive Design

- **Mobile Optimization**
  - Responsive grid layouts
  - Touch-friendly buttons
  - Adaptive navigation
  - Mobile-first approach
  
- **Desktop Experience**
  - Multi-column layouts
  - Sidebar navigation
  - Keyboard shortcuts ready
  - Optimized spacing

### ⚡ Performance

- **Data Optimization**
  - Custom hook with sessionStorage caching (5-minute expiry)
  - Lightweight mode for dashboard (no password values)
  - Full mode for vault (complete password data)
  - Auto-refetch capability
  - Efficient data fetching
  
- **Code Optimization**
  - React 19 with optimized rendering
  - Memoized calculations (useMemo)
  - Lazy loading ready
  - Minimal re-renders

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Navigation and routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Recharts** - Data visualization library
- **React Icons** - Icon library

### Backend & Services
- **Appwrite** - Backend as a Service
  - Authentication (Email, OAuth, MFA)
  - Database (TablesDB)
  - Avatars API (QR codes)
  
### State Management
- Custom hooks (usePasswordData)
- React useState and useEffect
- Session storage for caching

### Additional Libraries
- **Sonner** - Toast notifications
- **Appwrite SDK** - Backend integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Appwrite server instance (cloud or self-hosted)
- Google OAuth credentials (for OAuth login)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/qms.git
cd qms
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_PASSOWORD_TABLE_ID=your_password_table_id
VITE_BASE_URL=http://localhost:5173
```

4. **Set up Appwrite**

- Create a new project in Appwrite
- Create a database for passwords
- Create a collection with the following attributes:
  - `title` (string)
  - `url` (string)
  - `username` (string)
  - `password` (string)
  - `category` (enum: social, email, banking, work, other)
  - `notes` (string)
  - `strength` (enum: weak, medium, strong, veryStrong)
  - `isFavorite` (boolean)
- Enable Email/Password authentication
- Configure Google OAuth provider
- Enable 2FA/MFA in authentication settings

5. **Run the development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
QMS/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Sidebar.jsx    # Main navigation sidebar
│   │   ├── GoogleAuth.jsx # Google OAuth button
│   │   ├── CreateMFA.jsx  # 2FA setup wizard
│   │   ├── Loader.jsx     # Loading spinner
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx  # Analytics dashboard
│   │   ├── Vault.jsx      # Password vault
│   │   ├── login.jsx      # Login page
│   │   ├── signup.jsx     # Signup page
│   │   ├── PasswordGenerator.jsx
│   │   ├── CheckBreach.jsx
│   │   ├── SecondFactorAuth.jsx
│   │   ├── OAuthCallback.jsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   └── usePasswordData.js
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   │   └── passwordStrength.js
│   ├── lib/               # Library configurations
│   │   └── appwrite.js    # Appwrite client setup
│   ├── constants/         # App constants
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Keep credentials secure
2. **Use HTTPS** - Always use secure connections in production
3. **Regular backups** - Back up your Appwrite database
4. **Strong master passwords** - Use unique, strong passwords
5. **Enable 2FA** - Always enable two-factor authentication
6. **Update dependencies** - Keep packages up to date
7. **Session management** - Implement proper session timeouts
8. **Password policies** - Enforce minimum 8 characters

## 🎯 Roadmap

- [ ] Password sharing (secure sharing with other users)
- [ ] Password history tracking
- [ ] Import/Export passwords (CSV, JSON)
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Password expiration reminders
- [ ] Advanced breach monitoring
- [ ] Biometric authentication
- [ ] Team/Family plans
- [ ] Audit logs

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) - Backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Charts library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

---

**⚠️ Disclaimer**: This is a password manager application. While we implement industry-standard security practices, use at your own risk. Always maintain backups of your critical passwords.

**Built with ❤️ using React and Appwrite**
