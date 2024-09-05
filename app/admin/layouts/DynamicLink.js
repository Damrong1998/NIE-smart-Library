"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { getData } from '@/app/db/function/CRUD';
import Link from 'next/link';
import styles from "./../../admin.module.css";

function DynamicLink() {
    
    const [posts, setPosts] = useState([])

    // let ext = ".html";
    let ext = "";

    useEffect(() => {
        const getFirst = async (params) => {
            const data = await getData('category_types')
            setPosts(data)
        }

        getFirst()
    }, [])


    return (
        <>
        {posts.length > 0 &&
            posts.map((post) => (
                <Link 
                    key={post.id}
                    className={styles.link}
                    href={{
                        pathname: "/admin/categories" + ext,
                        query: {
                            typeId: post.id,
                        }
                    }} 
                    replace
                >
                    {post.name}
                </Link>
            ))
        }
        </>
    )
}

export default DynamicLink