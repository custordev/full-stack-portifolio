export type ContactProps = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type SettingProps = {
  phone?: string;
  email?: string;
  location?: string;
  cvUrl?: string;
  imageUrl?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  youTube?: string;
  profileName?: string;
  animatedText?: string;
  profileDescription?: string;
  profileLineOne?: string;
  profileLineTwo?: string;
  profileLineThree?: string;
  yearsOfExperience?: number;
  clients?: number;
};

export type ProjectProps = {
  title: string;
  slug: string;
  imageUrl: string;
  tags: string;
  description: string;
  categoryId: string;
  github: string;
  hostedLink: string;
};
export type SkillProps = {
  title: string;
  slug: string;
  icon: string;
  percent: number;
};

export type ServiceProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  slogan: string;
};
export type ExperienceProps = {
  period: string;
  title: string;
  company: string;
  description: string;
};
