import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Calendar, Code, Globe, Smartphone, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import northiusLogo from "/public/northius_logo.jfif";
import coverwalletLogo from "/public/CoverWallet_Logo.png";
import izertisLogo from "/public/izertis-log.png";

const Index = () => {
  const projects = [
    {
      title: "Find Me Today",
      description: "A daily geography challenge where you must find random locations around the world each day to try to beat your fiends.",
      images: [
        `${import.meta.env.BASE_URL}InicioFindMeToday.png`,
        `${import.meta.env.BASE_URL}FindMeTodayResultadoBien.png`,
        `${import.meta.env.BASE_URL}juegoFindMeTodayBien.png`,
      ],
      liveUrl: "https://www.findmetoday.es",
      technologies: ["Angular", "TypeScript", "Astro", "Geolocation API"],
      isActive: true,
    },
    {
      title: "Trip Planner AI",
      description: "Smart travel planning application using AI. Allows creating personalized itineraries based on user preferences.",
      images: [
        `${import.meta.env.BASE_URL}inicioTripPlannerAI.png`,
        `${import.meta.env.BASE_URL}loadingScrennTripPlannerAI.png`,
        `${import.meta.env.BASE_URL}TripPlannerViajes.png`,
      ],
      liveUrl: "https://www.tripplannerai.es",
      technologies: ["React", "Node.js", "AI"],
      isActive: true,
    },
  ];

  const skills = [
    { skill: "Angular", level: "intermediate" as const },
    { skill: "React", level: "intermediate" as const },
    { skill: "Node.js", level: "intermediate" as const },
    { skill: "Salesforce", level: "advanced" as const },
    { skill: "Architecture", level: "advanced" as const },
    { skill: "Datadog", level: "advanced" as const },
    { skill: "Git", level: "advanced" as const },
    { skill: "AI Integration", level: "intermediate" as const },
  ];

  const experience = [
    {
      name: "Northius",
      period: "2023 - Actualidad",
      skills: "Salesforce, Arquitectura, IA",
      logo: <img src={northiusLogo} alt="Northius Logo" className="w-12 h-12 rounded-full" />,
    },
    {
      name: "CoverWallet (Aon)",
      period: "2020 - 2023",
      skills: "Salesforce, Arquitectura, IA, Agile",
      logo: <img src={coverwalletLogo} alt="CoverWallet Logo" className="w-12 h-12 rounded-full" />,
    },
    {
      name: "Izertis",
      period: "2018 - 2022",
      skills: "Salesforce, Incidencias",
      logo: <img src={izertisLogo} alt="Izertis Logo" className="w-12 h-12 rounded-full" />,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="max-w-4xl space-y-6 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Salesforce Technical Architect</span>
                <br />
                Daniel Vadillo
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experienced in leading large-scale Salesforce projects from design to delivery. building scalable and maintainable solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={() => scrollToSection("projects")}>
                  View My Projects
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
                  <Mail className="w-4 h-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a passionate developer dedicated to creating digital solutions that make a difference. With experience in frontend and backend
              development, I specialize in React, TypeScript and artificial intelligence technology integration to create innovative applications.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Spain
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Salesforce developer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">My Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here is a selection of my most outstanding projects, fell free to leave feed back.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <div key={project.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A brief overview of my professional journey and key skills acquired.</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            {experience.map((exp, idx) => (
              <div key={exp.name} className="bg-card rounded-lg shadow p-6 flex flex-col items-center border border-border text-center">
                <div className="mb-4">{exp.logo}</div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{exp.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                <p className="text-base text-foreground">{exp.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Technical Skills</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I master to create robust and scalable applications.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
              {skills.map((skill, index) => (
                <div key={skill.skill} style={{ animationDelay: `${index * 0.1}s` }}>
                  <SkillBadge {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Do you have a project in mind?</h2>
            <p className="text-lg text-muted-foreground">I am always open to new opportunities and collaborations. Do not hesitate to contact me!</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={() => window.open("https://www.linkedin.com/in/daniel-vadillo-rand-8b95b11b6/", "_blank")}>
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open("mailto:contact@danielvadillo.dev", "_blank")}>
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p>Have a good day :)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
