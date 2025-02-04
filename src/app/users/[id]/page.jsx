"use client";

import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDetail = () => {
    const { selectedUser, selectedUserPost } = useUserStore();
    const [mounted, setMounted] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            {/* User Details Section */}
            <Card className="bg-gray-800 text-white mb-6 shadow-md">
                <CardHeader>
                    <CardTitle className="text-blue-400 text-3xl">{selectedUser.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Email: <span className="text-gray-300">{selectedUser.email}</span></p>
                    <p>Address: <span className="text-gray-300">{`${selectedUser.address.street}, ${selectedUser.address.city}`}</span></p>
                    <p>Company: <span className="text-gray-300">{selectedUser.company.name}</span></p>
                </CardContent>
            </Card>

            {/* User Posts Section */}
            <Card className="bg-gray-800 text-white shadow-md">
                <CardHeader>
                    <CardTitle className="text-blue-300 text-2xl">Posts by {selectedUser.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    {selectedUserPost.length > 0 ? (
                        <ul className="space-y-4">
                            {selectedUserPost.map((post) => (
                                <li key={post.id} className="border border-gray-700 bg-gray-700 p-4 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-bold text-blue-400 truncate">{post.title}</h3>
                                    <p className="text-gray-300">{post.body}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No posts found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;
