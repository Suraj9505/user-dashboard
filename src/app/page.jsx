"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from '@/store/useUserStore';
import { Loader2 } from "lucide-react";
import Link from 'next/link';

const Dashboard = () => {
    const {
        users,
        isUserLoading,
        isPostsLoading,
        selectedUser,
        selectedUserPost,
        setSelectedUser,
        getUsers,
        getPosts,
    } = useUserStore();

    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUsers();
        getPosts();
    }, []);

    // Filter users based on search query
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Users Section */}
                <div className="md:col-span-1 bg-gray-800 p-4 rounded-lg shadow-md overflow-hidden h-[calc(100vh-300px)] md:h-auto">
                    <h2 className="text-xl font-bold text-blue-300 mb-4">Users</h2>
                    <Input
                        type="text"
                        placeholder="Search users..."
                        className="w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {isUserLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <Loader2 className="animate-spin text-blue-400" size={24} />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <p className="text-gray-400">No users found.</p>
                    ) : (
                        <ScrollArea className="h-[calc(100vh-220px)]">
                            <div className="grid grid-cols-1 gap-4">
                                {filteredUsers.map((user) => (
                                    <Card
                                        key={user.id}
                                        className={`hover:shadow-lg transition-shadow cursor-pointer bg-gray-700 text-white ${selectedUser?.id === user.id ? 'border-blue-500' : ''}`}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <CardHeader>
                                            <CardTitle className="truncate">

                                                <Link href={`/users/${user.id}`} onClick={() => setSelectedUser(user)}>{user.name}</Link>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-300 truncate ">Id: <span className='font-semibold'>{user.id}</span></p>
                                            <p className="text-sm text-gray-300 truncate">Email: <span className='font-semibold'>{user.email}</span></p>
                                            <p className="text-sm text-gray-300 truncate">
                                                Address: <span className='font-semibold'>{user.address.street}, {user.address.suite}, <br /> {user.address.city}, {user.address.zipcode}</span>
                                            </p>
                                            <p className="text-sm text-gray-300 truncate">Company: <span className='font-semibold'>{user.company.name}</span></p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {/* Posts Section */}
                <div className="md:col-span-3 bg-gray-800 p-4 rounded-lg shadow-md overflow-hidden h-[calc(100vh-300px)] md:h-auto">
                    <h2 className="text-xl font-bold text-blue-300 mb-4">Posts</h2>
                    {isPostsLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <Loader2 className="animate-spin text-blue-400" size={24} />
                        </div>
                    ) : selectedUser ? (
                        selectedUserPost.length > 0 ? (
                            <ScrollArea className="h-[calc(100vh-150px)] ">
                                <div className="grid grid-cols-1 gap-4">
                                    {selectedUserPost.map((post, index) => (
                                        <Card key={index} className="bg-gray-700 text-white shadow-md">
                                            <CardHeader>
                                                <CardTitle className="truncate">{post.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-300 truncate">{post.body}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : (
                            <p className="text-gray-400">No posts available for this user.</p>
                        )
                    ) : (
                        <p className="text-gray-400">Select a user to see their posts.</p>
                    )}
                </div>
            </div>
        </div>


    );
};

export default Dashboard;
