import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Skill, SkillsState } from "../../../types";
import { getSkillById } from "../../network/apis";

export const fetchSkillById = createAsyncThunk<Skill, string>(
  "skills/fetchSkillById",
  async (skillId) => {
    const response = await getSkillById(skillId);

    const skillData = response.data.data.skill.attributes;
    const relatedJobs = response.data.data.skill.relationships.jobs;
    const relatedSkills = response.data.data.skill.relationships.skills;

    return {
      id: skillId,
      name: skillData.name,
      type: skillData.type,
      importance: skillData.importance,
      level: skillData.level,
      relationships: {
        jobs: relatedJobs,
        skills: relatedSkills,
      },
    };
  }
);

const initialState: SkillsState = {
  entities: { skills: {} },
  loading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkillById.fulfilled,
        (state, action: PayloadAction<Skill>) => {
          state.entities.skills[action.payload.id] = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load skill";
      });
  },
});

export default skillsSlice.reducer;
