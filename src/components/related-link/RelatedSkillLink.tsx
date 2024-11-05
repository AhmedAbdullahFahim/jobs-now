import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchJobById } from "../../store/slices/jobSlice";
import styles from "./index.module.scss";
import { fetchSkillById } from "../../store/slices/skillsSlice";

type Props = {
  id: string;
};

const RelatedSkillLink: React.FC<Props> = ({ id }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const skill = useSelector(
    (state: RootState) => state?.skills?.entities?.skills?.[id]
  );

  useEffect(() => {
    if (id && !skill?.id) {
      dispatch(fetchSkillById(id));
    }
  }, [skill, id]);

  return (
    <Link className={styles.link} to={`/skill/${id}`}>
      {skill?.name}
    </Link>
  );
};

export default RelatedSkillLink;
