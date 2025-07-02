import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  images: string[];
  liveUrl: string;
  technologies: string[];
  isActive?: boolean;
}

const ProjectCard = ({ title, description, images, liveUrl, technologies, isActive }: ProjectCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = images.length;
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % totalImages);

  return (
    <Card className="group bg-card border-border hover:shadow-card transition-all duration-500 hover:scale-105 overflow-hidden min-h-[28rem]">
      <div className="relative overflow-hidden">
        <img 
          src={images[currentImage]} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500"
        />
        {totalImages > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-opacity duration-200"
              style={{ backdropFilter: 'blur(2px)' }}
              aria-label="Imagen anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 transition-opacity duration-200"
              style={{ backdropFilter: 'blur(2px)' }}
              aria-label="Imagen siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </>
        )}
        {isActive && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium animate-glow">
            Active
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
            See Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;