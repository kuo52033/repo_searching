import { useState } from "react";

import Header from "./Components/Header";
import Main from "./Components/Main";

import useFetchRepo from "./Hook/useFetchRepo";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState({
    type: "all",
    sort: "created",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const states = useFetchRepo(searchTerm, params, page);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        params={params}
        setParams={setParams}
        setPage={setPage}
        loading={states.loading}
      />
      <Main
        states={states}
        searchTerm={searchTerm}
        params={params}
        setPage={setPage}
      />
    </>
  );
};

export default App;
