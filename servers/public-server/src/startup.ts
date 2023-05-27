import path from "path";
import fs from "fs";

export const createStorageFolder = () => {
  const file_path = path.join(__dirname, "/../files");

  fs.access(file_path, (error) => {
    const profile_path = path.join(file_path, "./Profile");
    if (error) {
      fs.mkdir(file_path, (error) => {
        if (error) {
          console.log(error);
        } else {
          fs.mkdir(profile_path, (error) => {
            if (error) {
              console.log("Failed to create folder.");
            } else {
              console.log("Profile folder created successfully.");
            }
          });
        }
      });
    } else {
      fs.access(profile_path, (error) => {
        if (error) {
          fs.mkdir(profile_path, (error) => {
            if (error) {
              console.log("Failed to create profile folder");
            } else {
              console.log("Profile folder created successfullly");
            }
          });
        }
      });
    }
  });
};
