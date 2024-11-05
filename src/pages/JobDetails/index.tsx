import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/error";
import Loading from "../../components/loading";
import SkillCard from "../../components/skill-card";
import NavbarWithSidebar from "../../layouts/navbar-with-sidebar";
import { AppDispatch, RootState } from "../../store";
import { fetchJobById } from "../../store/slices/jobSlice";
import { setSidebarContentList, setSidebarContentTitle } from "../../store/slices/sidebarSlice";
import styles from "./index.module.scss";

const JobDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.uuid;
  const { job, loading, error } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    if (id) dispatch(fetchJobById(id));
  }, [id]);

  // useEffect(() => {
  //   if (job.id)
  //     dispatch(
  //       setSidebarContentList(
  //         job?.relationships?.skills?.map((item) => item.id)
  //       )
  //     );
  // }, [job]);

  // useEffect(() => {
  //   dispatch(
  //     setSidebarContentTitle("Related Jobs: ")
  //   );
  // }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <NavbarWithSidebar title={job?.attributes?.title}>
      <div className={styles.container}>
        <h5>Related Skills: </h5>
        <div className={styles.skillsContainer}>
          {job.relationships.skills.map((skill) => (
            <SkillCard key={skill.id} id={skill.id} />
          ))}
        </div>
      </div>
    </NavbarWithSidebar>
  );
};

export default JobDetails;
