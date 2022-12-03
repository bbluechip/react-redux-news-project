import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getNews, clearNewsList } from "../features/newsSlice";
import { useEffect } from "react";
import loadinGif from "../assets/loading.gif";

const News = () => {
  const { newsList, loading, error } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());

    //! Cleanup function (ComponentDidUnmount)
    //! State'de kalan news bilgilerini news sayfasidan ayrildiktan sonra sil.
    return () => {
      dispatch(clearNewsList());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {error && (
        <Typography variant="h3" color="error" align="center" mt={20}>
          {error}
        </Typography>
      )}
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={loadinGif} alt="loading" />
        </Box>
      )}
      {!loading && (
        <Box
          xs={{ d: "flex" }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {newsList?.map((item, index) => (
            <Card
              sx={{ maxWidth: 345, m: 5, maxHeight: 600, overflow: "auto" }}
              key={index}
              raised="true"
            >
              <CardMedia
                component="img"
                height="250"
                image={item?.image}
                alt="img"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  href={item?.url}
                  target="_blank"
                  fullWidth="true"
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Detail
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default News;
