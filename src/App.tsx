import React from 'react';
import PermissionGroup from './PermissionGroup';
import PermissionContextWrapper from './Context/PermissionsContext';

function App() {
  return (
    <div className="App">
      <PermissionContextWrapper>
        <PermissionGroup />
      </PermissionContextWrapper>
    </div>
  );
}

export default App;
