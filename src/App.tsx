import React, { useState, useEffect } from "react";

const App = (): JSX.Element => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes",
      );
      const json = await res.json();
      console.log(json);
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {data.map(({ name }) => (
        <li>{name}</li>
      ))}
    </ul>
  );
};

export default App;
