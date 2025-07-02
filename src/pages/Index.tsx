import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Calendar, Code, Globe, Smartphone, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const projects = [
    {
      title: "Find Me Today",
      description: "A daily geography challenge where you must find random locations around the world each day. Minimalist design with intuitive interface.",
      image: "/api/placeholder/400/240",
      liveUrl: "https://www.findmetoday.es",
      technologies: ["React", "TypeScript", "CSS", "Geolocation API"],
      isActive: true
    },
    {
      title: "Trip Planner AI",
      description: "Smart travel planning application using AI. Allows creating personalized itineraries based on user preferences.",
      image: "/api/placeholder/400/240", 
      liveUrl: "https://www.tripplannerai.es",
      technologies: ["React", "AI/ML", "JavaScript", "API Integration"],
      isActive: true
    }
  ];

  const skills = [
    { skill: "Angular", level: "advanced" as const },
    { skill: "React", level: "advanced" as const },
    { skill: "Salesforce", level: "intermediate" as const },
    { skill: "Datadog", level: "intermediate" as const },
    { skill: "Git", level: "advanced" as const },
    { skill: "AI Integration", level: "intermediate" as const }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
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
                Senior Developer
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Daniel Vadillo
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Full Stack Developer specialized in creating innovative web applications 
                with React, TypeScript and AI technologies. I transform ideas into exceptional digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Projects
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                >
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
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a passionate developer dedicated to creating digital solutions that make a difference. 
              With experience in frontend and backend development, I specialize in React, TypeScript and 
              artificial intelligence technology integration to create innovative applications.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Spain
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Full Stack Developer
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Available for projects
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              My Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here is a selection of my most outstanding projects, where I combine 
              creativity and technology to create unique experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I master to create robust and scalable applications.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
              {skills.map((skill, index) => (
                <div 
                  key={skill.skill}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Do you have a project in mind?
            </h2>
            <p className="text-lg text-muted-foreground">
              I am always open to new opportunities and collaborations. 
              Do not hesitate to contact me!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => window.open('https://www.linkedin.com/in/daniel-vadillo-rand-8b95b11b6/', '_blank')}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('mailto:contact@danielvadillo.dev', '_blank')}
              >
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
            <p>&copy; 2024 Daniel Vadillo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;