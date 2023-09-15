import { Link } from "react-router-dom";
import { Section } from "../components";

function FourOhFour() {
  return (
    <Section
      title="Where are you going?"
      subtitle="Oops the page you want can't be found"
    >
      <div className="flex items-center justify-center">
        <Link to="/">
          <i className="fa fa-arrow-left"></i>
          <span className="text-sm">Go Back home</span>
        </Link>
      </div>
    </Section>
  );
}

export default FourOhFour;
