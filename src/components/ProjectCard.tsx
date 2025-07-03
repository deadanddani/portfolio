import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const mouseStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) { // Swipe right
      prevImage();
    } else if (deltaX < -50) { // Swipe left
      nextImage();
    }
    isDragging.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent image selection/dragging
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent default browser drag behavior
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const mouseEndX = e.clientX;
    const deltaX = mouseEndX - mouseStartX.current;

    if (deltaX > 50) { // Swipe right
      prevImage();
    } else if (deltaX < -50) { // Swipe left
      nextImage();
    }
    isDragging.current = false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % totalImages);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [totalImages]);

  return (
    <Card className="group bg-card border-border hover:shadow-card transition-all duration-500 hover:scale-105 overflow-hidden min-h-[28rem]">
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // End drag if mouse leaves the element
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} image ${index + 1}`}
              className="w-full h-48 object-cover flex-shrink-0"
            />
          ))}
        </div>
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