import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

import { FILTER } from "../Constants";

const Header = ({
  searchTerm,
  setSearchTerm,
  params,
  setParams,
  setPage,
  loading,
}) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilters = (key, value) => {
    setParams({ ...params, [key]: value });
    setPage(1);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      return;
    }
  };

  const renderFilter = () => {
    const render = [];
    for (const [key, array] of Object.entries(FILTER)) {
      render.push(
        <Dropdown
          key={key}
          onSelect={(value) => handleFilters(key, value)}
          className="me-2"
        >
          <Dropdown.Toggle>{key}</Dropdown.Toggle>
          <Dropdown.Menu>
            {array.map((value, i) => (
              <Dropdown.Item
                key={i}
                eventKey={value}
                active={params[key] === value}
              >
                {value}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return render;
  };

  return (
    <Navbar className="bg-secondary p-2" fixed="top">
      <Container className="d-flex flex-column flex-md-row">
        <Navbar.Brand className="fw-bolder">
          Repositories Searching
        </Navbar.Brand>
        <Form className="d-flex align-items-center ms-md-auto me-2">
          <div className="me-3">
            {loading && <Spinner animation="border" size="sm" />}
          </div>
          <Form.Control
            type="search"
            placeholder="Organization"
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeypress}
          />
        </Form>
        <div className="d-flex align-items-center mx-2 mt-2 mt-md-0">
          <div className="me-2 fw-bolder">Filter</div>
          {renderFilter()}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
