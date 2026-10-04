"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Edit2, Trash2, Link as LinkIcon, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author?: string;
}

async function fetchPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, "blog_posts"), orderBy("created_at", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((snapshot) => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: typeof data.title === "string" ? data.title : "Untitled",
      slug: typeof data.slug === "string" ? data.slug : "",
      author: typeof data.author === "string" ? data.author : undefined,
    };
  });
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchPosts()
      .then((fetchedPosts) => {
        if (active) setPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "blog_posts", id));
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    }
  };

  return (
    <div className="bg-mist p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-ink">Blog Management</h1>
            <p className="text-steel">Create, edit, and manage your company insights.</p>
          </div>
          <button 
            className="btn-primary flex items-center gap-2"
            onClick={() => alert("Editor integration requires additional CMS setup (e.g. TipTap or block editor).")}
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        <div className="bg-white border border-steel/20 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-steel/20">
              <tr>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium">Post Details</th>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium">Author</th>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium">Status</th>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium w-48 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-steel">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-steel flex flex-col items-center">
                    <p className="mb-4">No dynamic blog posts found in Firestore.</p>
                    <p className="text-sm">Currently serving static content from <code>src/data/blog.ts</code>.</p>
                  </td>
                </tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-ink mb-1">{post.title}</p>
                      <p className="text-sm text-steel">/{post.slug}</p>
                    </td>
                    <td className="p-4 text-sm text-ink">{post.author || "Admin"}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-sm">Published</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-steel hover:text-accent transition-colors"><LinkIcon className="w-4 h-4" /></button>
                        <button className="text-steel hover:text-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(post.id)} className="text-steel hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
