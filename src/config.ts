export const siteConfig = {
  name: "Paolo Roncaglioni",
  title: "M.Sc. Computer Science Engineer · Tech Lead, Agentic AI & GenAI",
  description: "Tech Lead building agentic GenAI systems — Paolo Roncaglioni",
  accentColor: "#16324f",
  photo: "/avatar.jpg",
  resume: "/resume.pdf",
  social: {
    email: "paolo.roncaglioni@gmail.com",
    linkedin: "https://linkedin.com/in/paolo-roncaglioni",
    github: "https://github.com/roncax",
  },
  aboutMe:
    "Computer Science Engineer working as a Tech Lead on GenAI and agentic AI systems in the insurance domain. Experienced in designing and delivering production multi-agent systems end-to-end, from architecture through hands-on development, while also owning business stakeholder relationships and developer onboarding. Solid background in cloud architecture, backend engineering, and machine learning. Beyond my professional endeavors, I'm a passionate rugby player and an avid home-lab/3D-printing tinkerer — teamwork, resilience, and hands-on curiosity all carry over into my professional life.",
  skills: {
    "GenAI / Agentic AI": [
      "LangGraph",
      "MCP",
      "Prompt Engineering",
      "Multi-Agent Systems",
      "OpenAI",
      "Azure OpenAI",
    ],
    "Languages / Frameworks": [
      "Java",
      "Java Spring",
      "Python",
      "PyTorch",
      "JavaScript",
      "Angular",
      "Kotlin",
      "Android",
      "C",
      "C++",
      "HTML",
      "CSS",
    ],
    "Cloud / DevOps": [
      "AWS Services",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitLab CI/CD",
      "Git",
    ],
    "Data / Integration": ["SQL", "Apache Kafka", "Camunda"],
    "Methodology / Architecture": ["Agile/Scrum", "Microservices Architecture"],
  },
  projects: [
    {
      name: "Agentic GenAI Service for Insurance Claims Analysis",
      description:
        "Led the ground-up design and delivery of a multi-agent GenAI system for insurance claims analysis, now in production. An orchestrator agent coordinates tool-calling sub-agents across domain microservices, handling document processing and prompting pipelines end-to-end. Now leading two parallel projects of this kind (~€2M combined engagement) with small, high-velocity teams — owning architecture, hands-on AI-assisted development, and business stakeholder management.",
      skills: [
        "LangGraph",
        "MCP",
        "Spring Boot",
        "Java",
        "Multi-Agent Systems",
        "OpenAI",
        "Azure OpenAI",
      ],
    },
  ],
  experience: [
    {
      company: "Accenture",
      title: "Enterprise Architect Consultant",
      dateRange: "06/2024 - Present",
      bullets: [
        "Claims-Analysis GenAI Service: Tech Lead for the ground-up design and delivery of a multi-agent GenAI service for insurance claims analysis. Architected an orchestrator agent coordinating tool-calling sub-agents across domain microservices, using LangGraph, Spring Boot/Java, MCP, and document-processing/prompting pipelines — now in production.",
        "Current Engagements: Leading two parallel projects of this kind (~€2M combined engagement) with Italian teams of 3-4 engineers each: owning architecture decisions, hands-on AI-assisted development, business stakeholder management, and developer onboarding.",
        "Internal Initiative: Full-stack engineer (DevOps, Backend, Frontend) for a paper-to-web digitalization webservice — Angular, Java Spring, AWS.",
      ],
    },
    {
      company: "Accenture",
      title: "Enterprise Architect Analyst",
      dateRange: "02/2022 - 05/2024",
      bullets: [
        "Insurance Platform: Software Developer on a multi-country microservices platform (Agile) for a major insurance company.",
        "Internal Initiative: Lead developer for an image-to-text serverless OCR orchestrator (AWS Lambda, Step Functions, Azure ML).",
      ],
    },
    {
      company: "STMicroelectronics",
      title: "Developer Intern",
      dateRange: "11/2021 - 02/2022",
      bullets: [
        "Internal Initiative: Python database management and data presentation for an internal project.",
      ],
    },
  ],
  education: [
    {
      school: "Politecnico di Milano",
      degree: "Master's Degree - Computer Science and Engineering",
      dateRange: "2021",
      achievements: [
        "Significant studies on software engineering and machine learning.",
        "Thesis: \"Ensemble methods for multi-organ semantic segmentation\" — semantic segmentation of organs in medical images with neural networks.",
        "Final grade: 100/110.",
      ],
    },
    {
      school: "Politecnico di Milano",
      degree: "Bachelor's Degree - Computer Science and Engineering",
      dateRange: "2018",
      achievements: [],
    },
  ],
};
