import { getBlogs, getBlogsByCategories } from "@/actions/blogs";
import { getExperiences } from "@/actions/experience";
import { getProjectsByCategories } from "@/actions/projects";
import { getReviews } from "@/actions/reviews";
import { getServices } from "@/actions/services";
import { getSettings } from "@/actions/settings";
import { getSkills } from "@/actions/skills";
import AboutSection from "@/components/about-section";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import FixedSidebar from "@/components/fixed-sidebar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import ServicesListing from "@/components/ServicesListing";
import TechnicalSkills from "@/components/technical-skills";
import { Testimonials } from "@/components/Testimonials";
import VideoBackground from "@/components/video-background";
import WorkExperience from "@/components/WorkExperience";

export default async function Home() {
  const siteSettings = await getSettings();
  const projectCategories = (await getProjectsByCategories()) || [];
  const skills = (await getSkills()) || [];
  const blogCategories = (await getBlogsByCategories()) || [];
  const services = (await getServices()) || [];
  const experiences = (await getExperiences()) || [];
  const reviews = (await getReviews())?.data || [];
  return (
    <div className="overflow-x-hidden">
      <VideoBackground />
      <div className="container py-4 px-0">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="grid lg:col-span-4 col-span-full ">
            <FixedSidebar siteSettings={siteSettings} />
          </div>
          <div className="grid gap-6 col-span-full lg:col-span-8  ">
            <AboutSection siteSettings={siteSettings} />
            <Projects projectCategories={projectCategories} />
            <TechnicalSkills skills={skills} />
            {/* <ToolsStack /> */}
            {/* <GeneralSkills /> */}
            <ServicesListing services={services} />
            {/* <Pricing /> */}

            <WorkExperience experiences={experiences} />
            <Testimonials reviews={reviews} />
            <Blogs blogCategories={blogCategories} />
            <Contact siteSettings={siteSettings} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
