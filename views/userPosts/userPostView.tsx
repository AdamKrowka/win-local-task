import { useCommentsQuery, usePostQuery } from "@/api/endpoints";
import Page from "@/components/page";
import { useAppContext } from "@/context/appContext";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import sitemap from "@/sitemap";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card/Card";

export default function UserPostView() {
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const { currentUser } = useAppContext();
  const currentUserId = router.query.id as string | undefined;
  const currentPostId = router.query.post_id as string | undefined;
  const { data } = usePostQuery(currentPostId ?? skipToken);
  const { data: comments } = useCommentsQuery(currentPostId ?? skipToken, {
    skip: !showComments,
  });

  if (!data || !currentUser) return null;
  return (
    <Page
      pageTitle={currentUser.name}
      backUrl={{
        pathname: sitemap.user,
        query: {
          id: currentUserId,
        },
      }}
    >
      <Typography variant="h5" align="center">
        {data.title}
      </Typography>
      <Typography variant="body1" align="center">
        {data.body}
      </Typography>
      <Typography variant="h1" align="center">
        <Button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
      </Typography>

      {comments && showComments && (
        <Box>
          {comments.map((comment) => (
            <Card
              key={comment.id}
              sx={{
                marginTop: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                <Typography variant="body1" align="center">
                  {comment.name}
                </Typography>
                <Typography variant="body1" align="center">
                  {comment.email}
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "1rem",
                }}
              >
                <Typography variant="body1">{comment.body}</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Page>
  );
}
