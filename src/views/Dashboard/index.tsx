import { TokenCard } from "components";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import API from "services/api.service";

import "./styles.css";

const PER_PAGE = 10;
const Dashboard: FC = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(["fetch_token", page, PER_PAGE], API.fetchTokens);

  const handleShowPrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleShowNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Nicollas Test</h1>
      {data && data.map((token) => <TokenCard token={token} key={token.id} />)}
      <div className="pagination">
        <a onClick={handleShowPrevPage}>PREV</a>
        <span>PAGE: {page}</span>
        <a onClick={handleShowNextPage}>NEXT</a>
      </div>
    </div>
  );
};

export default Dashboard;
