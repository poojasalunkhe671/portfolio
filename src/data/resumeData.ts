export interface Project {
  id: string;
  name: string;
  description: string;
  details: string[];
  techStack: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  website?: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  score: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    role: string;
    location: string;
    phone: string;
    email: string;
    linkedIn: string;
    summary: string;
  };
  skills: {
    languagesAndFrameworks: string[];
    databasesAndPlatforms: string[];
    toolsAndOther: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  awards: string[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "POOJA SALUNKHE",
    role: "Software Developer",
    location: "Satara, Maharashtra",
    phone: "8983420321",
    email: "poojasalunkhe671@gmail.com",
    linkedIn: "linkedin.com/in/poojasalunkhe30",
    summary: "Motivated and adaptable Software Developer with hands-on experience building responsive, user-focused web applications. Skilled in developing efficient solutions, integrating systems, and improving application performance. Passionate about delivering impactful results while continuously learning and contributing to innovative, growth-oriented teams."
  },
  skills: {
    languagesAndFrameworks: ["HTML", "CSS", "JavaScript", "React JS", "PHP"],
    databasesAndPlatforms: ["MySQL", "Firebase", "WordPress", "CodeIgniter", "Shopify (Basic)"],
    toolsAndOther: ["API Development", "Capacitor", "Git and GitHub", "Bootstrap"]
  },
  experience: [
    {
      role: "Software Developer",
      company: "IDealocean Technologies",
      location: "Satara",
      period: "Present",
      website: "idealocean.tech/idealocean",
      responsibilities: [
        "Developing responsive, user-focused web applications and integrations.",
        "Refining and optimizing internal products and APIs."
      ]
    },
    {
      role: "Web Development Intern",
      company: "Agrosan Adhar",
      location: "Satara",
      period: "Jan 2024 - Apr 2024",
      responsibilities: [
        "Worked on the design, development, and optimization of web pages and web applications.",
        "Gained extensive hands-on experience with HTML, CSS, JavaScript, and APIs.",
        "Developed responsive and interactive user interfaces."
      ]
    }
  ],
  projects: [
    {
      id: "01",
      name: "AI-Based Learning Management System",
      description: "A comprehensive student management platform integrated with real-time features and AI assistance.",
      techStack: ["React JS", "PHP", "MySQL", "API Development"],
      details: [
        "Developed a comprehensive student management system with AI-powered chatbot support for student interaction and doubt resolution.",
        "Implemented features for tracking student attendance and managing academic activities efficiently.",
        "Built a live classroom module enabling real-time interaction between students and teachers.",
        "Designed modules for managing exams, assignments, courses, notes, and video content.",
        "Enabled role-based access for admin, teachers, and students to streamline system operations."
      ]
    },
    {
      id: "02",
      name: "Loyalty / Points Management System",
      description: "A transactional system that rewards customer registration and billing with automated calculations and alerts.",
      techStack: ["PHP", "CodeIgniter", "MySQL"],
      details: [
        "Developed a loyalty management system to handle customer registration, billing, and reward points.",
        "Implemented dynamic point allocation based on admin-defined slabs and purchase value.",
        "Built billing functionality integrated with automatic point calculation and updates.",
        "Designed modules for tracking point history and transaction history for each customer.",
        "Implemented automated notifications for birthdays, promotional offers, and expiring loyalty points, improving customer engagement."
      ]
    },
    {
      id: "03",
      name: "Admin Dashboard with CRUD Operations",
      description: "An interactive operations panel built to retrieve, search, and store user credentials and settings.",
      techStack: ["PHP", "MySQL", "HTML", "CSS"],
      details: [
        "Built an interactive admin dashboard using PHP with full CRUD operations for managing user data.",
        "Connected to a MySQL database to store and retrieve dynamic content."
      ]
    },
    {
      id: "04",
      name: "E-commerce Management System",
      description: "A complete backend and admin control system designed for managing online inventory, pricing, and discount slabs.",
      techStack: ["PHP", "MySQL", "Bootstrap"],
      details: [
        "Developed an e-commerce management system to handle product listings, pricing, and discounts.",
        "Built admin panel functionality to add, update, and manage products with images and details.",
        "Implemented dynamic pricing with discount management for better sales control.",
        "Designed backend system for efficient product data handling and storage."
      ]
    },
    {
      id: "05",
      name: "User Location Tracking Feature",
      description: "A real-time mapping feature integrating geolocation and visual coordinate markers.",
      techStack: ["JavaScript", "OpenStreetMap", "Capacitor"],
      details: [
        "Implemented user location tracking using OpenStreetMap and geolocation functionality.",
        "Developed map-based visualization to display user location and movement."
      ]
    }
  ],
  education: [
    {
      degree: "M.Voc (Software Developer)",
      institution: "Yashwantrao Chavan Institute of Science, Satara",
      location: "Satara",
      score: "81.41% (CGPA 9.28)"
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "Yashwantrao Chavan Institute of Science, Satara",
      location: "Satara",
      score: "83.38% (CGPA 9.51)"
    },
    {
      degree: "HSC",
      institution: "Chhatrapati Shahu Academy, Satara",
      location: "Satara",
      score: "88.17%"
    },
    {
      degree: "SSC",
      institution: "Nirmala Convent High School, Satara",
      location: "Satara",
      score: "81.40%"
    }
  ],
  certifications: ["React JS"],
  awards: ["Meritorious Research Award"]
};
