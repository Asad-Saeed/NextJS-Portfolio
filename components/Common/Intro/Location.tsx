import { DETAILS } from "../../../constants/constants";

const Location = ({ profile }: { profile?: any }) => {
  const details = profile
    ? {
        Residence: profile.residence,
        Nationality: profile.nationality,
        City: profile.city,
        Age: profile.age,
      }
    : DETAILS;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      {Object.entries(details).map(([key, value], index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-Snow text-xs font-bold">{key}</span>
          <span className="text-xs text-LightGray">{value as string}</span>
        </div>
      ))}
    </div>
  );
};

export default Location;
