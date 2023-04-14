import {  Suspense } from "react";
import {Navigate, useOutlet} from "react-router-dom";
import { getToken } from "../../utils/token";
import config from "../../../config";
import routes from "../routes";


const AuthenticatedRoute = (props:any) => {
  const outlet = useOutlet();
  const token = getToken({ name: config.tokenName });

  if (!token) {
    return <Navigate to={routes.login.path} />;
  }
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            {outlet}
        </Suspense>
    </div>
  );
};

export default AuthenticatedRoute;
