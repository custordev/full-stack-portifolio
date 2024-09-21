import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactUpdateForm from "@/components/Dashboard/Forms/ContactUpdateForm";
import { getSettings } from "@/actions/settings";
import CreateSettings from "@/components/Dashboard/Forms/CreateSettings";
import SocialLinksUpdateForm from "@/components/Dashboard/Forms/SocialLinksUpdateForm";
import HeroAreaUpdateForm from "@/components/Dashboard/Forms/HeroAreaUpdateForm";
import ProfileImageUpdate from "@/components/Dashboard/Forms/ProfileImageUpdate";

export default async function page() {
  const settings = await getSettings();
  return (
    <>
      {settings?.id ? (
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList>
            <TabsTrigger value="contacts">Contact Settings</TabsTrigger>
            <TabsTrigger value="socials">Social Links Settings</TabsTrigger>
            <TabsTrigger value="hero">Hero Area Settings</TabsTrigger>
            <TabsTrigger value="profile">Profile Image Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="contacts">
            <div className="py-6">
              <ContactUpdateForm settings={settings} />
            </div>
          </TabsContent>

          <TabsContent value="socials">
            <div className="py-6">
              <SocialLinksUpdateForm settings={settings} />
            </div>
          </TabsContent>
          <TabsContent value="hero">
            <div className="py-6">
              <HeroAreaUpdateForm settings={settings} />
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <div className="py-6">
              <ProfileImageUpdate settings={settings} />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="create" className="w-full">
          <TabsList>
            <TabsTrigger value="create">Create Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="py-6">
              <CreateSettings settings={settings} />
            </div>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
