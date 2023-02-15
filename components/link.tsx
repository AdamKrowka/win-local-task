import Link from "next/link";

import { experimentalStyled as styled } from "@mui/material/styles";
const StyledLink = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

export default StyledLink;
