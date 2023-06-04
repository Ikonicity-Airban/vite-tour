type Props = {
  title?: string;
  rate?: string;
  price?: string;
  source: string;
};

function PremiumCard({
  source,
  price = "#45000",
  rate = "4.5",
  title = "Enugu",
}: Props) {
  return (
    <div className="rounded overflow-hidden border bg-white mb-2 text-sm">
      <img className="img-fluid" src={source} alt="" />
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <small className="m-0">
            <i className="fa fa-map-marker-alt text-primary mr-2"></i>
            {title}
          </small>
          <small className="m-0">
            <i className="fa fa-calendar-alt text-primary mr-2"></i>3 days
          </small>
          <small className="m-0">
            <i className="fa fa-user text-primary mr-2"></i>2 Person
          </small>
        </div>
        <a className="text-decoration-none" href="">
          Discover amazing places of the world with us
        </a>
        <div className="border-t-2 mt-4 pt-4">
          <div className="flex justify-between">
            <h6 className="m-0">
              <i className="fa fa-star text-primary mr-2"></i>
              {rate} <small>(250)</small>
            </h6>
            <h5 className="m-0">{price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;
