interface SkillBadgeProps {
  skill: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const SkillBadge = ({ skill, level = 'intermediate' }: SkillBadgeProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-gradient-secondary text-accent-foreground';
      case 'advanced':
        return 'bg-gradient-primary text-primary-foreground';
      case 'intermediate':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${getLevelColor(level)}`}>
      {skill}
    </div>
  );
};

export default SkillBadge;