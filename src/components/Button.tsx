"use client";

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const Buton = ({ children }: any) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full text-lg">
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default Buton;
