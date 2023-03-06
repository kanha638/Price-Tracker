import Typography from "@mui/material/Typography";
export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <a href="#" style={{ color: "inherit" }}>
        Keemat Dekho
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
