Claude 
Project details

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

various colors will be using 
White text: text-white
Cyan/teal text: text-cyan-400
Light green text: text-green-400
Yellow text: text-yellow-400
Background: bg-black or bg-slate-950
Red underlines: decoration-red-500
White text: text-white
Red text ("waiting"): text-red-500
Blue text ("distributed web"): text-blue-500
Purple/Pink text ("Break through the static"): text-fuchsia-500
Black background: bg-black
Red underlines: decoration-red-500
