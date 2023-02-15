import Page from "@/components/page";
import { useAppContext } from "@/context/appContext";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { Typography } from "@mui/material";

const Item = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  transition: theme.transitions.easing.easeInOut,
  height: "100%",
  "&:hover": {
    boxShadow: theme.shadows[5],
  },
}));

export default function HomeView() {
  const { users } = useAppContext();
  if (!users) return null;
  return (
    <Page pageTitle="">
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Item
              href={{
                pathname: "user/[id]",
                query: {
                  id: user.id,
                },
              }}
            >
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
              <Typography>Phone: {user.phone}</Typography>
              <Typography>Website: {user.website}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
