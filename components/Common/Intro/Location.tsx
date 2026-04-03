import { DETAILS } from "../../../constants/constants";
import { getObjectKeys } from "../../../utils/utils";

const Location = () => {
  const keys = getObjectKeys(DETAILS);
  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      {keys.map((key, index) => {
        return (
          <div key={index} className="flex items-center justify-between">
            <span className="text-Snow text-xs font-bold">{key}</span>
            <span className="text-xs text-LightGray">{DETAILS[key as keyof typeof DETAILS]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Location;
