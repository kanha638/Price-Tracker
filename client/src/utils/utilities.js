/* Getting the server URL */

import { backendEnv } from "../environment/config";

export const serverURL =
  backendEnv.production === true
    ? backendEnv.productionServer
    : backendEnv.devlopmentServer;

export const getProfilePicImageURL = (key) => {
  if (key.split("/").length > 1) {
    return key;
  }
  return `${serverURL}/api/file/img/${key}`;
};
