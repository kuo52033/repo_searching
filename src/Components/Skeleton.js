import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";

const Skeleton = () => {
  return (
    <Card className="mb-3 p-3 w-75" style={{ height: "130px" }}>
      {["15", "50", "35"].map((value, index) => (
        <Placeholder
          key={index}
          animation="wave"
          className="mb-3 rounded"
          style={{
            width: `${value}%`,
            height: "20px",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        />
      ))}
    </Card>
  );
};

export default Skeleton;
