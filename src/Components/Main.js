import { useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Repo from "./Repo";
import Skeleton from "./Skeleton";

const Main = ({ states, searchTerm, params, setPage }) => {
  const lastnode = useRef();

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        const el = entries[0];
        if (el.isIntersecting) {
          setPage((pre) => pre + 1);
          observe.unobserve(el.target);
        }
      },
      {
        rootMargin: "550px",
      }
    );
    lastnode.current && observe.observe(lastnode.current);
  }, [states.repos, setPage]);

  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: "10vh" }}
    >
      {states.repos.length !== 0 && states.repos[0]?.owner?.avatar_url && (
        <>
          <div className="d-flex align-items-center mb-3 w-75">
            <a
              href={states.repos[0].owner.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                roundedCircle
                thumbnail
                src={states.repos[0].owner.avatar_url}
                style={{ width: "50px" }}
              />
            </a>
            <div className="fs-2 ms-2">{states.repos[0].owner.login}</div>
          </div>
          <div className="w-75 mb-3">
            Results for
            <span className="fw-bold">{` ${params.type} `}</span>
            repositories sorted
            <span className="fw-bold">{` ${params.direction} `}</span>
            by
            <span className="fw-bold">{` ${params.sort}`}</span>
          </div>
        </>
      )}

      {states.repos?.map((repo) => {
        return <Repo key={repo.id} repo={repo} />;
      })}

      {!searchTerm && (
        <div className="fs-3">Searching for organization repositories </div>
      )}

      {states.error && (
        <div className="fs-3">{`Couldn’t find any organizations matching ${searchTerm}`}</div>
      )}

      {!states.noMore && states.repos.length !== 0 && (
        <div ref={lastnode} className="d-flex justify-content-center w-100">
          <Skeleton />
        </div>
      )}

      {states.noMore && states.repos.length === 0 && (
        <div className="fs-3">
          This organization doesn’t have any repositories that match.
        </div>
      )}

      {states.noMore && states.repos.length !== 0 && (
        <div className="fs-3">End</div>
      )}
    </Container>
  );
};

export default Main;
