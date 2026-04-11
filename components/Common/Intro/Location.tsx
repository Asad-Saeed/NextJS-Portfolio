import { Profile } from "@/types";

const Location = ({ profile }: { profile?: Partial<Profile> }) => {
  const details: Record<string, string | undefined> = {
    Residence: profile?.residence,
    Nationality: profile?.nationality,
    City: profile?.city,
    Age: profile?.age,
  };

  const entries = Object.entries(details).filter(([, value]) => value);

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      {entries.map(([key, value], index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-Snow text-xs font-bold">{key}</span>
          <span className="text-xs text-LightGray">{value as string}</span>
        </div>
      ))}
    </div>
  );
};

export default Location;
