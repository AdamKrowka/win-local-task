import { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { UrlObject } from "url";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export interface PageProps {
  children: ReactNode;
  pageTitle: string;
  backUrl?: UrlObject | string;
  action?: ReactNode;
}

const Page = ({ children, pageTitle, backUrl, action }: PageProps) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {backUrl && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                href={backUrl as string}
                LinkComponent={Link}
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              textAlign="center"
            >
              {pageTitle}
            </Typography>
            {action}
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          padding: "2rem",
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default Page;
