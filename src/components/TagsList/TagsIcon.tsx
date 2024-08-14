import React from "react";
import CharityIcon from "../../media/TAGS/CHARITY.png";
import CommunityProjectsIcon from "../../media/TAGS/COMMUNITY-PROJECTS.png";
import ArtCultureIcon from "../../media/TAGS/ART-CULTURE.png";
import HealthWellnessIcon from "../../media/TAGS/HEALTH-WELLNESS-02.png";
import TechnologyInnovationIcon from "../../media/TAGS/TECHNOLOGY-INNOVATION.png";
import SocialEnterpriseIcon from "../../media/TAGS/SOCIAL-ENTERPRISE.png";
import EducationLearningIcon from "../../media/TAGS/EDUCATION-LEARNING.png";
import SportsRecreationIcon from "../../media/TAGS/SPORTS-RECREATION.png";
import OtherIcon from "../../media/TAGS/OTHER.png";

interface TagsIconProps {
  tag?: string; // Prop type is just string
}

const iconMap: Record<string, string> = {
  Charity: CharityIcon,
  "Community-Projects": CommunityProjectsIcon,
  "Art-Culture": ArtCultureIcon,
  "Health-Wellness": HealthWellnessIcon,
  "Technology-Innovation": TechnologyInnovationIcon,
  "Social-Enterprise": SocialEnterpriseIcon,
  "Education-Learning": EducationLearningIcon,
  "Sports-Recreation": SportsRecreationIcon,
  Other: OtherIcon,
};

const TagsIcon: React.FC<TagsIconProps> = ({ tag = "Other" }) => {
  // Find the corresponding icon or default to 'OtherIcon'
  const iconSrc = iconMap[tag] || OtherIcon;

  return <img src={iconSrc} alt={tag} className="w-[65px] h-[65px]" />;
};

export default TagsIcon;
