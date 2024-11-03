import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertUi({ message }) {
  return (
    <Alert variant={"destructive"} className="mb-10">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Attentio !</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export default AlertUi;
