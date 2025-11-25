import DevelopmentCreator from "@/components/developments/DevelopmentCreator";

export default function NewDevelopmentPage() {
  return (
    <div className="h-full dark:bg-slate-950 px-8 py-6">
      <DevelopmentCreator
        onSubmit={(dev) => {
          console.log("SUBMIT DEV", dev);
          // TODO Supabase insert plus tard
        }}
      />
    </div>
  );
}
