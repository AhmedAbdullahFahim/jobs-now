import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { fetchJobById } from "../../store/slices/jobSlice";
import styles from "./index.module.scss";

type Props = {
  id: string;
};

const RelatedJobLink: React.FC<Props> = ({ id }: Props) => {
  const job = useSelector(
    (state: RootState) => state.jobs.entities.jobs[id] ?? state.job.job
  );

  useEffect(() => {
    if (id && !job?.id) {
      fetchJobById(id);
    }
  }, [job, id]);

  return (
    <Link className={styles.link} to={`/job/${id}`}>
      {job?.attributes?.title}
    </Link>
  );
};

export default RelatedJobLink;
