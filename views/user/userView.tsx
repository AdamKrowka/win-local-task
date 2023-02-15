import { useDeletePostMutation, useUserPostsQuery } from "@/api/endpoints";
import Page from "@/components/page";
import { useAppContext } from "@/context/appContext";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import sitemap from "@/sitemap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AlertDialog from "@/components/dialog";
import { Post } from "@/types/api.types";
import NewPost from "./newPost";
import StyledLink from "@/components/link";

export default function UserView() {
  const router = useRouter();
  const { currentUser } = useAppContext();
  const currentUserId = router.query.id as string | undefined;
  const { data } = useUserPostsQuery(currentUserId ?? skipToken);
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = (post: Post) => {
    deletePost(post.id);
  };

  if (!data || !currentUser) return null;
  return (
    <Page
      pageTitle={currentUser.name}
      backUrl={sitemap.home}
      action={<NewPost userId={Number(currentUserId)} />}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Delete</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((post) => (
              <TableRow
                key={post.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <AlertDialog
                    buttonContent={<DeleteForeverIcon />}
                    contentText="Do you want to delete this post?"
                    onAccept={() => handleDeletePost(post)}
                    title="Remove post?"
                  />
                </TableCell>
                <TableCell>
                  <StyledLink
                    href={{
                      pathname: sitemap.post,
                      query: {
                        id: currentUserId,
                        post_id: post.id,
                      },
                    }}
                  >
                    {post.title.substring(0, 50)}
                  </StyledLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}
