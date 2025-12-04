import toast, { Toaster } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublishForm = () => {
  const CHARACTER_LIMIT = 200;
  const TAG_LIMIT = 10;

  const {
    blog,
    blog: { banner, title, tags, des, content },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);

  let navigate = useNavigate();

  const tagInputRef = useRef(null);

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

  const handleBlogDesChange = (e) => {
    setBlog({ ...blog, des: e.target.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = e.target.value.trim();

      if (!tag) return;

      if (tags.includes(tag)) {
        toast.error("Tag already exists");
      } else if (tags.length >= TAG_LIMIT) {
        toast.error(`You can add max ${TAG_LIMIT} tags`);
      } else {
        setBlog({ ...blog, tags: [...tags, tag] });
      }

      e.target.value = "";
    }
  };

  const publishBlog = (e) => {
    if (e.target.classList.contains("disable")) return;

    if (!title.length) return toast.error("Write blog title before publishing");
    if (!des.length || des.length > CHARACTER_LIMIT)
      return toast.error(
        `Please write the blog description (max ${CHARACTER_LIMIT} characters)`
      );
    if (!tags.length) return toast.error("Enter at least one tag");

    let loadingToast = toast.loading("Publishing...");
    e.target.classList.add("disable");

    const blogObj = { title, banner, des, content, tags, draft: false };

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Published");
        setTimeout(() => navigate("/"), 500);
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        toast.error(response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        e.target.classList.remove("disable");
      });
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-15 lg:gap-4 relative">
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] mx-auto">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="Blog Banner" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">{title}</h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{des}</p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">Short description about your blog</p>
          <textarea
            maxLength={CHARACTER_LIMIT}
            value={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDesChange}
            onKeyDown={handleTitleKeyDown}
          />
          <p className="mt-1 text-dark-grey text-sm text-right">
            {CHARACTER_LIMIT - (des?.length || 0)} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topics (helps in searching and ranking your blog)
          </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              ref={tagInputRef}
              type="text"
              placeholder="Enter a tag and press Enter or Comma"
              className="stick input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag, i) => (
                <Tag tag={tag} key={i} />
              ))}
            </div>
            <p className="mt-1 text-dark-grey text-sm text-right">
              {TAG_LIMIT - tags.length} Tags left
            </p>
          </div>

          <button className="btn-dark px-8 mt-4" onClick={publishBlog}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
