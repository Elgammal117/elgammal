export const cv = {
  person: {
    name: "Mohammed Hasan Elgammal",
    preferredName: "Mohammed",
    role: "Flutter Developer",
    location: "Egypt",
    timezone: "Africa/Cairo",
  },
  contact: {
    email: "elgammalm071@gmail.com",
    phone: "+20 1146207493",
    linkedin: "[TBD]",
    github: "[TBD]",
  },
  summary:
    "Flutter Developer with hands-on experience building and deploying mobile applications for freelance clients. Skilled in Flutter, Dart, Firebase, REST APIs, BLoC, Provider, MVVM, and Clean Architecture.",
  bio: [
    "Flutter Developer with hands-on experience building and deploying mobile applications for freelance clients. I work across the full mobile stack: responsive UI, state management, backend integration, and shipping to real users.",
    "I treat architecture as a non-negotiable: MVVM, Clean Architecture, BLoC or Provider depending on what the project needs. Three apps already in production for clients, six total projects covering health, food, e-commerce, real-time messaging, location, and content.",
  ],
  education: [
    {
      institution: "Shorouk Academy",
      degree: "B.Sc.",
      field: "Computer Science",
      startYear: 2022,
      endYear: 2026,
      gpa: "3.5 / 4.0",
    },
  ],
  certifications: [
    "Flutter Advanced Course: BLoC and MVVM Pattern (Jul 2025)",
    "Complete Flutter & Dart Development Course: Tharwat Samy (May 2025)",
  ],
  expertise: [
    {
      label: "Mobile Engineering",
      description:
        "Production Flutter apps shipped to real users. Responsive UI, platform-native feel, performance-conscious.",
      icon: "Smartphone",
    },
    {
      label: "Architecture",
      description:
        "MVVM, Clean Architecture, separation of concerns. Code that scales with the product, not against it.",
      icon: "Layers",
    },
    {
      label: "State Management",
      description:
        "BLoC and Provider, chosen by what the project needs. Predictable state, testable, debuggable.",
      icon: "GitBranch",
    },
    {
      label: "Backend Integration",
      description:
        "Firebase (Auth, Firestore, RTDB, Storage) and REST APIs. Real-time data, secure storage, clean error handling.",
      icon: "Database",
    },
  ],
  skillGroups: [
    {
      category: "Mobile",
      icon: "Smartphone",
      skills: ["Flutter", "Dart", "Responsive UI", "Platform Channels"],
    },
    {
      category: "State & Architecture",
      icon: "Layers",
      skills: ["BLoC", "Provider", "MVVM", "Clean Architecture", "Repository Pattern"],
    },
    {
      category: "Backend & APIs",
      icon: "Database",
      skills: ["Firebase Auth", "Cloud Firestore", "Realtime Database", "Firebase Storage", "REST APIs"],
    },
    {
      category: "Languages",
      icon: "Code2",
      skills: ["Dart", "C#", "JavaScript", "HTML", "CSS"],
    },
    {
      category: "Tools",
      icon: "Wrench",
      skills: ["Git", "GitHub", "Figma", "Adobe XD"],
    },
    {
      category: "Core",
      icon: "BookOpen",
      skills: ["Object-Oriented Programming", "Data Structures", "Design Patterns"],
    },
  ],
  projects: [
    {
      id: "01",
      title: "Healthy Meal Planner & Recipe App",
      role: "Flutter Developer",
      stack: "Flutter · Dart · REST API · BLoC · Provider",
      description:
        "Health-focused mobile application that calculates daily calorie needs, generates personalized diet plans, tracks food intake, and monitors user progress over time.",
      impact: "End-to-end product: from API integration to state architecture to UX.",
      link: "[TBD · GitHub]",
    },
    {
      id: "02",
      title: "Restaurant App",
      role: "Flutter Developer",
      stack: "Flutter · Dart · Firebase · REST APIs · Provider",
      description:
        "Food ordering application with menu browsing, product details, and online ordering functionality. Client-deployed.",
      impact: "Deployed for a freelance client; live in production.",
      link: "[TBD · GitHub]",
    },
    {
      id: "03",
      title: "E-Commerce Mobile App",
      role: "Flutter Developer",
      stack: "Flutter · Dart · Firebase · REST APIs · Provider",
      description:
        "Shopping application with product browsing, cart management, and online purchase workflows.",
      impact: "Full purchase flow: catalog → cart → checkout.",
      link: "[TBD · GitHub]",
    },
    {
      id: "04",
      title: "Real-Time Chat App",
      role: "Flutter Developer",
      stack: "Flutter · Dart · Firebase Realtime Database",
      description:
        "Real-time messaging and live data synchronization using Firebase Realtime Database.",
      impact: "Live bidirectional sync with sub-second delivery.",
      link: "[TBD · GitHub]",
    },
    {
      id: "05",
      title: "Weather App",
      role: "Flutter Developer",
      stack: "Flutter · Dart · Firebase · OpenWeatherMap API · Provider",
      description:
        "Weather application displaying location-based weather data using the OpenWeatherMap API.",
      impact: "Location-aware data, async loading, error states.",
      link: "[TBD · GitHub]",
    },
    {
      id: "06",
      title: "News App",
      role: "Flutter Developer",
      stack: "Flutter · Dart · REST APIs · Firebase · Provider",
      description:
        "News aggregation application with category filtering, article viewing, and saved articles functionality.",
      impact: "Saved state, filter UX, multi-source aggregation.",
      link: "[TBD · GitHub]",
    },
  ],
  experience: [
    {
      id: "01",
      title: "Freelance Flutter Developer",
      company: "Self-Employed",
      location: "Egypt",
      startDate: "2025-11",
      endDate: "present",
      highlights: [
        "Developed and deployed 3 mobile applications for freelance clients, all in production.",
        "Built responsive user interfaces using Flutter with attention to platform-native feel and accessibility.",
        "Integrated Firebase and REST APIs across full app lifecycles: auth, real-time data, storage, error handling.",
        "Collaborated with clients to gather requirements, scope work, and deliver solutions on time.",
      ],
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional working" },
  ],
  interests: ["Mobile UX", "Design Systems", "Open Source", "Clean Code"],
} as const;
