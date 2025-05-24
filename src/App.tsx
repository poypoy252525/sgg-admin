import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const string = await window.electron.getStudents();
      setData(string);
    })();
  }, []);
  return <div>{data}</div>;
};

export default App;
