import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    isUserLoading: false,
    users: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("users")) || [] : [],
    isPostsLoading: false,
    posts: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("posts")) || [] : [],
    selectedUser: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("selected-user")) || null : null,
    selectedUserPost: typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("selected-user-post")) || [] : [],
    setSelectedUser: (user) => {
        set({ selectedUser: user });
        const filteredPosts = get().posts.filter((post) => post.userId === user.id);
        set({ selectedUserPost: filteredPosts });
        sessionStorage.setItem("selected-user", JSON.stringify(get().selectedUser));
        sessionStorage.setItem("selected-user-posts", JSON.stringify(get().selectedUserPost));
    },

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            set({ users: response.data });
            sessionStorage.setItem("users", JSON.stringify(response.data));
            toast.success("Users fetched successfully");

        } catch (error) {
            console.log("Error fetching users:", error);
            toast.error("Error fetching users");
        } finally {
            set({ isUserLoading: false })
        }
    },

    getPosts: async () => {
        set({ isPostsLoading: true });
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            set({ posts: response.data });
            sessionStorage.setItem("posts", JSON.stringify(response.data));
            toast.success("Posts fetched successfully");
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Error fetching posts");
        } finally {
            set({ isPostsLoading: false })
        }
    },
}))
