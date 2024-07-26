import PropTypes from "prop-types";
import Menu from "./Menu";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <main className="p-4">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
