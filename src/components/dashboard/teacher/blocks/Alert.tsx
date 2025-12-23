import { Alert as A } from "@/components/ui/alert";

export default function Alert() {
  return (
    <div className="flex gap-4">
      <A type="success" message="This is a success alert." />
      <A type="error" message="This is an error alert." />
      <A type="warning" message="This is a warning alert." />
      <A type="info" message="This is an info alert." />
    </div>
  );
}
