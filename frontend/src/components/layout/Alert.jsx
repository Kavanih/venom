import { useContext } from "react";
import AlertContext from "../../Context/AlertContext/AlertContext";

const Alert = () => {
  const alertCon = useContext(AlertContext);
  const { alert } = alertCon;

  if (alert.length < 1) {
    return;
  }

  return (
    <div className="alert">
      {alert.map((ale) => (
        <div key={ale.id} className="ale">
          {ale.text}
        </div>
      ))}
    </div>
  );
};

export default Alert;
