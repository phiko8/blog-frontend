import { useContext, useState, createContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

const blogStructure = {
  title: '',
  banner: '',
  content: [],
  tags: [],
  des: '',
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure);
  const { userAuth } = useContext(UserContext);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({isReady: false});

  // Redirect if not logged in
  if (!userAuth) {
    return <Navigate to="/signin" />;
  }

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor
      }}
    >
      {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
    </EditorContext.Provider>
  );
};

export default Editor;

