import "./Loading.css";
function Loading() {
  return (
    <div className="loading">
      <div className="u-loading">
        <div className="u-loading__symbol">
          <img
            src="https://kaiser.kiwi/assets/kaiserkiwi-logo.svg"
            alt="Loading"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
