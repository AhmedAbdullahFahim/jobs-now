import React, { ReactNode } from "react";
import styles from "./index.module.scss";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

interface Props {
  title: string;
  children: ReactNode | string | JSX.Element | JSX.Element[];
}

const NavbarWithSidebar: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={"wrapper"}>
        <h3>{title}</h3>
        <div>
          <section>{children}</section>
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default NavbarWithSidebar;
