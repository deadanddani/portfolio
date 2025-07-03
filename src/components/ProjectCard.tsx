import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface ProjectCardProps {
  title: string;
  description: string;
  images: string[];
  liveUrl: string;
  technologies: string[];
  isActive?: boolean;
  isMobileFormatImages?: boolean;
}

const ProjectCard = ({ title, description, images, liveUrl, technologies, isActive, isMobileFormatImages }: ProjectCardProps) => {
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);
  const [backgroundFadeIn, setBackgroundFadeIn] = useState(false);
  const [prevBackgroundImage, setPrevBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      // Cuando la imagen principal de Swiper cambia, actualiza la imagen de fondo anterior
      // y activa la transición de entrada para la nueva.
      setPrevBackgroundImage(images[currentSwiperIndex]);
      setBackgroundFadeIn(false); // Inicia la desaparición de la imagen antigua
      // Espera un breve momento antes de iniciar la aparición de la nueva para asegurar la transición
      const timer = setTimeout(() => {
        setBackgroundFadeIn(true); // Aparece la imagen nueva
      }, 50); // Pequeño retardo
      return () => clearTimeout(timer);
    }
  }, [currentSwiperIndex, images]);

  return (
    <Card className="group bg-card border-border hover:shadow-card transition-all duration-500 hover:scale-105 overflow-hidden min-h-[28rem]">
      <div
        className="relative overflow-hidden"
      >
        {isMobileFormatImages && images.length > 0 && (
          <>
            {/* Imagen anterior para el efecto de desvanecimiento */}
            {prevBackgroundImage && (
              <div className={`absolute inset-0 z-0 transition-opacity duration-500 ease-in-out ${backgroundFadeIn ? 'opacity-0' : 'opacity-100'}`}>
                <img
                  src={prevBackgroundImage}
                  alt="Fondo difuminado anterior"
                  className="w-full h-full object-cover blur-lg scale-125"
                />
                <div className="absolute inset-0 bg-black/60"></div> {/* Superposición oscura para contraste */}
              </div>
            )}
            {/* Imagen actual para el efecto de aparición */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-500 ease-in-out ${backgroundFadeIn ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={images[currentSwiperIndex]}
                alt="Fondo difuminado actual"
                className="w-full h-full object-cover blur-lg scale-125"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          </>
        )}

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          className="mySwiper relative z-10" // Asegura que el contenido de Swiper esté por encima del fondo
          onSlideChange={(swiper) => setCurrentSwiperIndex(swiper.realIndex)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${title} image ${index + 1}`}
                className={`w-full h-48 flex-shrink-0 ${isMobileFormatImages ? 'object-contain' : 'object-cover'}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {isActive && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium animate-glow z-20">
            Active
          </div>
        )}

        {!isActive && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
            Inactive
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