import React from 'react';
import Wrapper from '../components/Wrapper';
import WorkoutsList from '../components/WorkoutsList';

const AllWorkoutsScreen = () => {
  return (
    <Wrapper title="All workouts">
      <WorkoutsList type="all" />
    </Wrapper>
  );
};

export default AllWorkoutsScreen;
