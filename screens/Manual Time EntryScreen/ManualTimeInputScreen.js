import React from 'react';

import ManualTimeInput from '../../components/manualTimeInput/ManualTimeInput';

const ManualTimeInputScreen = ({ navigation, route }) => {
  return (
    <>
      <ManualTimeInput name={route.params.name} id={route.params.id} userId={route.params.userId} />
    </>
  );
};

export default ManualTimeInputScreen;
