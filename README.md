# Cinetica 🎬

Welcome to **Cinetica**, a movie and TV show discovery platform built with [Next.js](https://nextjs.org). This project leverages modern technologies to deliver a fast, scalable, and responsive web application. Explore popular movies, top-rated TV shows, and much more!

## 📋 Features

- 🔒 **Authentication**: User login using `next-auth` with credential-based authentication.
- 🎥 **Movie and TV Show Discoveries**: Browse movies and shows, categorized by `Now Playing`, `Popular`, and `Top Rated`.
- 🌗 **Dark Mode**: Integrated dark mode for a seamless user experience.
- 🔄 **Session Management**: Protect routes and manage user sessions dynamically.
- 🚀 **Fast Performance**: Optimized with `next/font` for seamless font integration.
- 🛠️ **Developer Experience**: Hot reloading and a modular architecture for easy development.

---

## 🛠️ Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: Version 16 or higher.
- **npm** or **yarn**: For package management.
- **Git**: To clone the repository.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cinetica.git
   cd cinetica
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file at the root of the project and add the following environment variables:

   ```env
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

   Replace `your-secret` with a secure key. You can generate one using:

   ```bash
   openssl rand -base64 32
   ```

---

## 🚀 Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

---

## 🧪 Testing

Run the test suite to ensure everything is working correctly:

```bash
npm run test
# or
yarn test
```

---

## 📦 Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com). Follow these steps:

1. Push your project to a Git repository.
2. Go to [Vercel](https://vercel.com) and import your repository.
3. Configure the environment variables in the Vercel dashboard as specified in `.env.local`.
4. Deploy!

For detailed instructions, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

---

## 🛡️ Security & Authentication

This project uses `next-auth` for secure session management. Key features include:

- Middleware to protect routes like `/dashboard`.
- Automatic redirections based on authentication status.
- Secure session tokens stored on the client side.

To learn more, check out the [NextAuth.js Documentation](https://next-auth.js.org).

---

## 🛠️ Technologies Used

- **Next.js**: React framework for building server-rendered apps.
- **NextAuth.js**: Authentication library for Next.js.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Typed JavaScript for better developer experience.
- **Vercel**: Deployment and hosting platform.

---

## 🖥️ Folder Structure

```plaintext
cinetica/
├── app/                     # Application code
│   ├── api/                 # API routes (e.g., authentication)
│   ├── dashboard/           # Protected dashboard pages
│   ├── login/               # Login page
│   └── middleware.ts        # Middleware for route protection
├── components/              # Reusable UI components
├── public/                  # Static assets
├── styles/                  # Global styles
├── .env.local               # Environment variables
└── next.config.js           # Next.js configuration
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request with a detailed explanation of your changes.

---

## 📖 Learn More

To learn more about the tools and technologies used in this project, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)


