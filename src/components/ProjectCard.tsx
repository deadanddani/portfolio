import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  technologies: string[];
  isActive?: boolean;
}

const ProjectCard = ({ title, description, image, liveUrl, technologies, isActive }: ProjectCardProps) => {
  return (
    <Card className="group bg-card border-border hover:shadow-card transition-all duration-500 hover:scale-105 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isActive && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium animate-glow">
            Activo
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="hero" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(liveUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Ver Proyecto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;