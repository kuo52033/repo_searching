import React from "react";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { BiGitRepoForked, BiStar } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

const Repo = ({ repo }) => {
  return (
    <Card className="mb-3 w-75">
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <Card.Title className="text-primary fw-bold mb-0 me-3">
            <a
              href={repo.html_url}
              target="_blank"
              className="text-decoration-none"
              rel="noreferrer"
            >
              {repo.name}
            </a>
          </Card.Title>
          <Badge className="bg-secondary">
            {repo.private ? "private" : "public"}
          </Badge>
        </div>
        <Card.Text className="fs-6">{repo.description}</Card.Text>
        <div className="d-flex mb-2 flex-wrap">
          {repo.topics.map((topic, index) => {
            return (
              <Badge key={index} className="bg-info me-1 mb-1">
                {topic}
              </Badge>
            );
          })}
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <div
            className="me-3 rounded px-1"
            style={{ backgroundColor: "#e6e6e6" }}
          >
            {repo.language}
          </div>
          {[
            { Icon: BiGitRepoForked, info: repo.forks },
            { Icon: BiStar, info: repo.stargazers_count },
            { Icon: AiOutlineEye, info: repo.watchers },
          ].map(({ Icon, info }, index) => {
            return (
              <div key={index} className="me-3 d-flex align-items-center">
                <Icon className="me-1" />
                {info}
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Repo;
