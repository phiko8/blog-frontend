import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { uploadImage } from "../common/aws";
import { useContext, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import { tools } from "./tools.component";
import axios from "axios";

const BlogEditor = () => {
  const blogBannerRef = useRef();
  const navigate = useNavigate();

  const {
    blog,
    blog: { title, banner, content },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  // Initialize EditorJS dynamically
  useEffect(() => {
    import("@editorjs/editorjs").then(({ default: EditorJS }) => {
      if (!textEditor?.isReady) {
        setTextEditor(
          new EditorJS({
            holder: "textEditor",
            data: content,
            tools: tools,
            placeholder: "Let's write a blog",
          })
        );
      }
    });
  }, []);

  // Handle banner upload (optional)
  const handleBannerUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const loadingToast = toast.loading("Uploading...");

    try {
      const url = await uploadImage(img);
      toast.dismiss(loadingToast);

      if (url) {
        toast.success("Image uploaded successfully!");
        blogBannerRef.current.src = url;
        setBlog({ ...blog, banner: url });
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to upload image");
    }
  };

  // Publish blog (title-only validation)
  const handlePublishEvent = () => {
    if (!title?.length) return toast.error("Please fill in the title to publish it");

    if (textEditor?.isReady) {
      textEditor.isReady
        .then(() => {
          textEditor.save().then((data) => {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
            toast.success("Blog ready to publish!");
          }).catch(err => console.error("Save error:", err));
        })
        .catch(err => console.error("Editor not ready:", err));
    }
  };

  // Save draft (title-only validation)
  const handleSaveDraft = async (e) => {
    if (!title?.length) return toast.error("Please fill in the title to save draft");

    const blogObj = { ...blog, draft: true };

    try {
      await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj);
      toast.success("Draft saved successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save draft");
    }
  };

  // Prevent Enter key in title
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // Update blog title dynamically
  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  return (
    <>
      <nav className="navbar flex items-center p-4">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="Logo" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full text-center">
          {title?.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            Save draft
          </button>
        </div>
      </nav>

      <Toaster />

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner" className="cursor-pointer">
                <img
                  ref={blogBannerRef}
                  src={banner || defaultBanner}
                  alt="Blog banner"
                  className="w-full h-full object-cover z-20"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              value={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
