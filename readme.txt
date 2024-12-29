Claude 

my-github-clone/
├── .env.local                    # Local environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Project dependencies and scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
│
├── public/                      # Static files
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── app/                     # App router directory (Next.js 13+)
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page
│   │   ├── auth/               # Authentication routes
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   └── repositories/       # Repository related routes
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   └── features/          # Feature-specific components
│   │       ├── repository/
│   │       └── profile/
│   │
│   ├── lib/                    # Utility functions and libraries
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── api.ts
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useRepository.ts
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── styles/                 # Global styles
│       └── globals.css
│
└── prisma/                     # Database (if using Prisma)
    └── schema.prisma

// Perplexity
my-nextjs-app/
├── public/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── auth/
│   ├── styles/
│   │   ├── globals.css
│   │   └── Home.module.css
│   ├── lib/
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── services/
│   │   └── api.ts
│   └── types/
├── .gitignore
├── package.json
└── README.md
