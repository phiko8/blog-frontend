import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);

  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/latest-blogs`
      );
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error("Error fetching latest blogs:", err);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={["home", "trending blogs"]}
            defaultActiveIndex={0}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.map((blog, i) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <BlogPostCard 
                      content={blog} 
                      author={blog.author?.personal_info || {}} 
                    />
                  </AnimationWrapper>
                ))
              )}
              <h1>Trending blog here</h1>
            </>
          </InPageNavigation>
        </div>
        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;

