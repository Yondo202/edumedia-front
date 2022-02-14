import React from 'react';
import { MenuContext } from '@/global/ContextMenuProvider';
import Signup from '@/components/auth/tech/Signup';

const signup = () => {
  const { completelyLoaded } = React.useContext(MenuContext)

  console.log(`completelyLoaded`, completelyLoaded)

  return(
      completelyLoaded ? <Signup /> : null
  )
};

export default signup;
