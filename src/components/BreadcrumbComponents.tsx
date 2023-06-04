import { Breadcrumb } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbComponents() {
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((item) => item != "");
  return (
    <Breadcrumb aria-label={location.pathname.toString()}>
      <Link to="/">
        <Breadcrumb.Item>
          <p className="text-sm">Home</p>
        </Breadcrumb.Item>
      </Link>
      {pathArray.map((path, i) => (
        <Breadcrumb.Item key={i}>
          <Link to={`/${path}`} className="text-sm">
            {path}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
