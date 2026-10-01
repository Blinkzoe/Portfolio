export const projects = [
  // =========================================================
  // PROFESSIONAL PROJECTS
  // =========================================================

  {
    id: 'callidus-migration-validation',
    title: 'Callidus Cloud Migration & Compensation Validation',
    type: 'professional',
    category: 'Enterprise Systems',
    description:
      'Built a local validation and analysis solution to support a complex Callidus Cloud migration and verify compensation data before production use.',
    problem:
      'A large compensation migration required extensive validation across datasets, calculations and business rules. Multiple teams were involved in configuration and data preparation, increasing the risk of inconsistencies and delayed validation.',
    solution:
      'Developed a local Python-based solution combining data processing, database operations and dashboards to compare, validate and analyze compensation information before it was used for payment processes.',
    role:
      'Designed and developed the technical solution, performed data analysis and validation, and worked with compensation stakeholders to investigate discrepancies and accelerate the migration process.',
    impact:
      'Reduced manual validation effort and provided a practical way for compensation teams to identify discrepancies and verify migration results.',
    technologies: [
      'Python',
      'SQL',
      'Data Analysis',
      'Data Validation',
      'Dashboards',
      'Callidus Cloud'
    ],
    businessDomain: [
      'Sales Compensation',
      'Financial Operations',
      'Enterprise Systems'
    ],
    featured: true
  },

  {
    id: 'callidus-pipeline-automation',
    title: 'Sales Compensation & Payment Automation',
    type: 'professional',
    category: 'Automation',
    description:
      'Designed automation workflows supporting sales compensation data processing, validation and payment operations.',
    problem:
      'Sales compensation processes involved multiple data sources, manual activities and validation steps that had to be completed accurately within strict pay-cycle timelines.',
    solution:
      'Developed and maintained automated workflows for extracting, transforming, validating and consolidating compensation information across enterprise systems.',
    role:
      'Designed automation logic, implemented data processing solutions, investigated exceptions and collaborated with business and IT teams.',
    impact:
      'Improved process consistency, reduced repetitive manual work and supported reliable pay-cycle operations.',
    technologies: [
      'Python',
      'SQL',
      'ETL',
      'REST APIs',
      'Automation',
      'Data Validation'
    ],
    businessDomain: [
      'Sales Compensation',
      'Payments',
      'Finance'
    ]
  },

  {
    id: 'anaplan-sales-letters',
    title: 'Anaplan Sales Letters — Mass Download Automation',
    type: 'professional',
    category: 'Automation',
    description:
      'Automated the mass retrieval and processing of sales compensation letters from Anaplan.',
    problem:
      'Downloading large numbers of sales letters manually was time-consuming and difficult to scale during compensation cycles.',
    solution:
      'Created an automation workflow capable of navigating the enterprise application, retrieving documents in bulk and organizing the resulting files for downstream use.',
    role:
      'Designed and implemented the automation, handled file processing and validated the resulting documents.',
    impact:
      'Converted a repetitive manual process into a repeatable automated workflow that could handle large document volumes more efficiently.',
    technologies: [
      'Python',
      'Automation',
      'Anaplan',
      'File Processing',
      'Web Automation'
    ],
    businessDomain: [
      'Sales Compensation',
      'Enterprise Operations'
    ]
  },

  {
    id: 'claims-management-automation',
    title: 'Claims Management & Research Automation',
    type: 'professional',
    category: 'Enterprise Automation',
    description:
      'Developed tools to manage, investigate and automate sales compensation claims and related research activities.',
    problem:
      'Claims investigation required analysts to gather information from multiple sources, compare compensation data and manually document findings.',
    solution:
      'Built internal applications and automation workflows to organize claims, retrieve relevant information, perform data comparisons and support investigation activities.',
    role:
      'Designed the solution, implemented automation and data-processing logic, and worked directly with compensation analysts.',
    impact:
      'Centralized claim-related information and reduced repetitive investigation activities while improving traceability.',
    technologies: [
      'Python',
      'SQL',
      'Automation',
      'Data Analysis',
      'Web Automation'
    ],
    businessDomain: [
      'Sales Compensation',
      'Claims',
      'Finance'
    ]
  },

  {
    id: 'manual-feeds-data-governance',
    title: 'Manual Feeds & Data Governance Automation',
    type: 'professional',
    category: 'Data Engineering',
    description:
      'Automated and improved validation of manual data feeds used by enterprise compensation processes.',
    problem:
      'Manual feeds could introduce inconsistent formats, missing information or data-quality issues before entering downstream systems.',
    solution:
      'Implemented validation and processing workflows to inspect incoming files, identify issues, transform data and prepare consistent outputs.',
    role:
      'Designed validation rules, implemented processing logic and supported users during feed troubleshooting.',
    impact:
      'Improved data quality and reduced the amount of manual checking required before data entered compensation workflows.',
    technologies: [
      'Python',
      'SQL',
      'ETL',
      'Data Validation',
      'Data Quality',
      'Excel / VBA'
    ],
    businessDomain: [
      'Data Governance',
      'Sales Compensation',
      'Enterprise Operations'
    ]
  },

  {
    id: 'sales-comp-scorecard',
    title: 'Sales Compensation ScoreCard',
    type: 'professional',
    category: 'Data & Analytics',
    description:
      'Created analytical dashboards and reporting solutions to provide visibility into sales compensation processes and performance.',
    problem:
      'Business stakeholders needed consolidated information to analyze compensation results, identify exceptions and understand operational trends.',
    solution:
      'Combined data extraction, transformation and visualization to create analytical views that made complex compensation information easier to investigate.',
    role:
      'Performed data analysis, designed reporting logic and translated business requirements into analytical solutions.',
    impact:
      'Improved visibility into compensation data and provided stakeholders with a more structured way to analyze operational information.',
    technologies: [
      'SQL',
      'Python',
      'Power BI',
      'Data Analysis',
      'ETL',
      'Excel'
    ],
    businessDomain: [
      'Sales Compensation',
      'Business Intelligence',
      'Finance'
    ]
  },

  {
    id: 'claims-research-mycomp',
    title: 'Claims Research Tool — MyComp',
    type: 'professional',
    category: 'Enterprise Systems',
    description:
      'Developed a research-oriented tool to help compensation analysts investigate historical and transactional information.',
    problem:
      'Researching compensation issues required analysts to navigate large amounts of information and manually correlate records.',
    solution:
      'Created a structured tool for retrieving and organizing relevant information, allowing analysts to investigate cases more efficiently.',
    role:
      'Designed the application workflow, data retrieval logic and supporting analysis capabilities.',
    impact:
      'Made compensation research more structured and reduced repetitive information-gathering activities.',
    technologies: [
      'Python',
      'SQL',
      'Data Analysis',
      'Enterprise Applications'
    ],
    businessDomain: [
      'Sales Compensation',
      'Claims Research'
    ]
  },

  {
    id: 'international-splits',
    title: 'International Splits Management & Automation',
    type: 'professional',
    category: 'Automation',
    description:
      'Automated processes supporting international compensation splits and related data management.',
    problem:
      'International split scenarios required careful handling of business rules and multiple data relationships.',
    solution:
      'Implemented data-processing and validation workflows to organize split information and support consistent downstream processing.',
    role:
      'Developed automation logic, validated business rules and supported operational users.',
    impact:
      'Reduced manual processing and improved consistency when handling complex compensation split scenarios.',
    technologies: [
      'Python',
      'SQL',
      'Automation',
      'Data Validation'
    ],
    businessDomain: [
      'Sales Compensation',
      'International Operations'
    ]
  },

  {
    id: 'assignment-changes',
    title: 'Assignment Changes Import Automation',
    type: 'professional',
    category: 'Data Engineering',
    description:
      'Automated the preparation and processing of assignment changes for enterprise compensation systems.',
    problem:
      'Employee and organizational assignment changes required controlled processing to prevent downstream compensation inconsistencies.',
    solution:
      'Created data-processing and validation workflows for preparing assignment changes and identifying potential issues before import.',
    role:
      'Developed the automation, implemented validation rules and investigated processing exceptions.',
    impact:
      'Improved reliability of assignment-change processing and reduced repetitive manual preparation.',
    technologies: [
      'Python',
      'SQL',
      'ETL',
      'Data Validation'
    ],
    businessDomain: [
      'Sales Compensation',
      'HR Data',
      'Enterprise Systems'
    ]
  },

  // =========================================================
  // PERSONAL / TECHNICAL PROJECTS
  // =========================================================

  {
    id: 'career-brain-rag',
    title: 'Career Brain — Local AI & RAG',
    type: 'personal',
    category: 'AI & Modern Technology',
    description:
      'Built a local AI-powered career knowledge system using embeddings, vector search and LLMs to organize and retrieve professional knowledge.',
    problem:
      'Professional experience, projects, technical notes and evidence can become difficult to search as the amount of information grows.',
    solution:
      'Built a local RAG architecture combining document storage, embeddings, Qdrant vector search and local LLMs to make career information searchable and contextual.',
    role:
      'Designed and implemented the architecture, containers, data pipeline and local AI workflow.',
    impact:
      'Created a private searchable knowledge base that can support CV generation, project documentation and technical knowledge retrieval.',
    technologies: [
      'Python',
      'RAG',
      'Qdrant',
      'Embeddings',
      'LLMs',
      'Ollama',
      'Docker'
    ],
    businessDomain: [
      'AI',
      'Knowledge Management',
      'Career Automation'
    ],
    featured: true
  },

  {
    id: 'distributed-spark-cluster',
    title: 'Distributed Apache Spark Cluster',
    type: 'personal',
    category: 'Data Engineering',
    description:
      'Built a multi-worker Apache Spark environment across Linux systems to experiment with distributed data processing and workload distribution.',
    problem:
      'Wanted hands-on experience with distributed data processing beyond a single-machine development environment.',
    solution:
      'Configured a small distributed environment with Spark workers and explored data-processing workloads, worker utilization and cluster behavior.',
    role:
      'Designed and configured the environment and experimented with distributed processing workloads.',
    impact:
      'Built practical experience with distributed computing, Spark architecture and resource utilization.',
    technologies: [
      'Apache Spark',
      'PySpark',
      'Linux',
      'Distributed Systems',
      'Docker'
    ],
    businessDomain: [
      'Data Engineering',
      'Distributed Computing'
    ],
    featured: true
  },

  {
    id: 'raspberry-pi-home-lab',
    title: 'Raspberry Pi Self-Hosted Home Lab',
    type: 'personal',
    category: 'Infrastructure',
    description:
      'Built a self-hosted Linux environment running multiple containerized services for automation, monitoring, AI and experimentation.',
    problem:
      'Wanted a persistent personal infrastructure platform capable of running real services rather than isolated development experiments.',
    solution:
      'Configured a Raspberry Pi 5 as a multi-service Docker host running Home Assistant, n8n, Frigate, Mosquitto, Syncthing, APIs and other services.',
    role:
      'Designed, deployed and maintained the infrastructure, containers, networking, monitoring and integrations.',
    impact:
      'Created a practical home infrastructure platform for automation, IoT, AI experiments and distributed services.',
    technologies: [
      'Raspberry Pi',
      'Linux',
      'Docker',
      'Docker Compose',
      'Home Assistant',
      'n8n',
      'MQTT'
    ],
    businessDomain: [
      'Infrastructure',
      'Automation',
      'IoT'
    ]
  },

  {
    id: 'iot-water-monitoring',
    title: 'IoT Water Tank Monitoring',
    type: 'personal',
    category: 'IoT',
    description:
      'Built an ESP32-based water-level monitoring system integrated with MQTT and Home Assistant.',
    problem:
      'Needed a way to monitor water level remotely and receive alerts when the tank reached predefined thresholds.',
    solution:
      'Implemented an ESP32 sensor system that publishes telemetry through MQTT and integrates with Home Assistant for monitoring and notifications.',
    role:
      'Designed the sensor logic, MQTT communication, Home Assistant integration and alert rules.',
    impact:
      'Created real-time remote monitoring with automated threshold alerts and recovery notifications.',
    technologies: [
      'ESP32',
      'MQTT',
      'Home Assistant',
      'IoT',
      'REST APIs'
    ],
    businessDomain: [
      'IoT',
      'Home Automation',
      'Real-Time Monitoring'
    ]
  },

  {
    id: 'computer-vision-home-monitoring',
    title: 'Computer Vision Home Monitoring',
    type: 'personal',
    category: 'AI & IoT',
    description:
      'Built a local camera-monitoring system using Frigate and computer-vision-based motion detection.',
    problem:
      'Wanted local monitoring capabilities without depending entirely on external cloud services.',
    solution:
      'Configured Frigate with IP cameras, detection zones and event processing integrated into the home automation environment.',
    role:
      'Configured the cameras, detection zones, Docker services and Home Assistant integration.',
    impact:
      'Created a local event-driven monitoring system capable of detecting activity and triggering automation workflows.',
    technologies: [
      'Frigate',
      'Docker',
      'Computer Vision',
      'RTSP',
      'Home Assistant'
    ],
    businessDomain: [
      'Computer Vision',
      'IoT',
      'Home Automation'
    ]
  },

  {
    id: 'local-ai-lab',
    title: 'Local AI Development Lab',
    type: 'personal',
    category: 'AI & Modern Technology',
    description:
      'Built a local AI development environment using an NVIDIA GPU, Ollama and multiple open-source language models.',
    problem:
      'Wanted to experiment with AI-assisted development and local LLM workloads without depending on external APIs for every task.',
    solution:
      'Configured a Linux workstation with GPU acceleration, Ollama, local models and supporting tools for coding, automation and AI experimentation.',
    role:
      'Designed and maintained the local AI environment and integrated models into development workflows.',
    impact:
      'Created a private local environment for experimenting with LLMs, coding assistants and AI-powered automation.',
    technologies: [
      'Linux',
      'NVIDIA GPU',
      'Ollama',
      'LLMs',
      'Docker',
      'Python'
    ],
    businessDomain: [
      'Artificial Intelligence',
      'Developer Productivity',
      'Automation'
    ]
  },

  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Platform',
    type: 'personal',
    category: 'Software Engineering',
    description:
      'Designed and built this portfolio as a full-stack application with React, Tailwind CSS and FastAPI.',
    problem:
      'Needed a professional platform capable of presenting career experience, technical projects and skills while also providing basic usage analytics.',
    solution:
      'Built a React frontend with reusable components, a FastAPI backend and database-backed analytics.',
    role:
      'Full-stack developer responsible for architecture, frontend, backend, styling, deployment and analytics.',
    impact:
      'Created a maintainable platform that can evolve from a static portfolio into a richer career and project knowledge system.',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'SQLite',
      'Docker'
    ],
    businessDomain: [
      'Full-Stack Development',
      'Personal Branding'
    ]
  },

  {
    id: 'automation-news-platform',
    title: 'Local News Automation Platform',
    type: 'personal',
    category: 'AI & Automation',
    description:
      'Built an automated workflow for collecting news, generating summaries with local AI and preparing content for publication.',
    problem:
      'Manually processing multiple news sources and preparing summaries is repetitive and time-consuming.',
    solution:
      'Combined automation workflows, web content processing and local language models to transform source material into structured summaries.',
    role:
      'Designed the automation pipeline, model integration and processing workflow.',
    impact:
      'Created an end-to-end experimentation platform for AI-assisted content processing and automation.',
    technologies: [
      'Python',
      'Ollama',
      'LLMs',
      'n8n',
      'Automation',
      'APIs'
    ],
    businessDomain: [
      'AI',
      'Content Automation',
      'Workflow Automation'
    ]
  }
];
