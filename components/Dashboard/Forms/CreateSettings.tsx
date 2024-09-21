"use client";

import { Settings } from "@prisma/client";
import { createSettings, updateSettings } from "@/actions/settings";
import { SettingProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export type ContactSettingsProps = {
  email: string;
  phone: string;
  location: string;
};
export default function CreateSettings({
  settings,
}: {
  settings: Settings | null;
}) {
  const [loading, setLoading] = useState(false);
  async function handleCreate() {
    setLoading(true);
    try {
      const data = {};
      await createSettings(data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      {loading ? (
        <Button variant={"secondary"} disabled>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Initializing Please wait...
        </Button>
      ) : (
        <Button onClick={handleCreate}>Initialize Settings</Button>
      )}
    </>
  );
}
