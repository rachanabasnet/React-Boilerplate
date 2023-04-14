import React, { Suspense } from 'react';
import { useOutlet, useNavigate } from 'react-router-dom';
import config from '../../../config';
import routes from '../routes';
import { getToken } from '../../utils/token';


const UnAuthenticatedRoute = (props: any) => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const token = getToken({ name: config.tokenName });


  if (token) {
    navigate(routes.home.path);
  }


  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            {outlet}
        </Suspense>
    </div>
  );
};

export default UnAuthenticatedRoute;
