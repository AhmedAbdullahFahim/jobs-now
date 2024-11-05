import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../components/error";
import JobCard from "../../components/job-card";
import Loading from "../../components/loading";
import Sidebar from "../../components/sidebar";
import NavbarWithSearch from "../../layouts/navbar-with-search";
import { AppDispatch, RootState } from "../../store";
import { fetchJobs } from "../../store/slices/jobsSlice";
import { setSidebarContentTitle } from "../../store/slices/sidebarSlice";
import styles from "./index.module.scss";

const JobsSearch: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const dispatch = useDispatch<AppDispatch>();
  const {
    error,
    loading,
    count,
    entities: { jobs },
  } = useSelector((state: RootState) => state.jobs);

  const { list, title } = useSelector((state: RootState) => state.sidebar);

  useEffect(() => {
    dispatch(fetchJobs({ search: searchQuery ?? "" }));
  }, [searchQuery]);

  useEffect(() => {
    dispatch(setSidebarContentTitle("Search history: "));
  }, []);

  return (
    <NavbarWithSearch>
      <div className={"wrapper"}>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <section className={"jobsContainer"}>
            <h3>All Jobs ({count})</h3>
            <div className={"content"}>
              {Object.values(jobs).length ? (
                <div
                  className={"jobs"}
                  style={{
                    flex: list?.length && title.includes("history") ? 0.75 : 1,
                  }}
                >
                  {Object.values(jobs).map((item) => (
                    <JobCard
                      stylingClassName={styles.jobCard}
                      key={item.id}
                      job={item}
                    />
                  ))}
                </div>
              ) : (
                <h2>Oops, we could not find any jobs...</h2>
              )}
              {list?.length ? <Sidebar /> : null}
            </div>
          </section>
        )}
      </div>
    </NavbarWithSearch>
  );
};

export default JobsSearch;
