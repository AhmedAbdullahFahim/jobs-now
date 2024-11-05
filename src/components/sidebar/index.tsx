import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchJobs } from "../../store/slices/jobsSlice";
import RelatedJobLink from "../related-link/RelatedJobLink";
import styles from "./index.module.scss";
import RelatedSkillLink from "../related-link/RelatedSkillLink";

const Sidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { list, title } = useSelector((state: RootState) => state.sidebar);

  const isSearch = location.pathname.endsWith("search");
  const isJob = location.pathname.includes("job");
  const isSkill = location.pathname.includes("skill");

  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = (item: string) => {
    dispatch(fetchJobs({ search: item }));
    setSearchParams({ query: item });
  };

  return (
    <aside className={styles.sidebar}>
      <h6>{title}</h6>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {isSearch ? (
              <button onClick={() => handleSearch(item)}>{item}</button>
            ) : isJob ? (
              <RelatedJobLink id={item} />
            ) : (
              <RelatedSkillLink id={item} />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
