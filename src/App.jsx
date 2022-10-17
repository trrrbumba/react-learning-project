import React, { useState, useMemo } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "зз" },
    { id: 2, title: "bb 2", body: "яя" },
    { id: 3, title: "cc 3", body: "гг" },
  ]);
  const [filter, setFilter] = useState({ sort: "", query: "" });

  function getSortedPosts() {
    console.log("отработала ф-я сотрет постс");
  }

  const sortedPosts = useMemo(() => {
    console.log("отработала ф-я сотрет постс");
    if (filter.sort != 0) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title="Посты про JS"
      />
    </div>
  );
}

export default App;
