/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import styles from "./../../admin.module.css";
import { Book, Dashboard, DashboardOutlined, Face, Face2, MenuBook, Mood, People, PermMedia, Settings } from '@mui/icons-material';
import Image from 'next/image';
import DynamicLink from './DynamicLink';

function Sidebar() {

    // let ext = ".html";
    let ext = "";

    return (
        <>
        <Box 
            p={1} pr={2} pl={2}
            display={"flex"} 
            justifyContent={"space-between"} 
            alignItems={"center"}
            sx={{
                width: '100%', height: "60px",
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
            }}
        >
            <Link href="#" style={{display: "flex", alignItems: "center"}}>
                {/* <Image
                    src="/NIELogo.png"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
                <Typography variant="h6" p={2}>NIE Smart Library</Typography> */}
                <img 
                    style={{width: "auto", height: '55px'}}
                    src="/NIELogo_pinkpink.png"
                    alt='' 
                />
            </Link>
        </Box>
        <Box p={2} 
            sx={{
                width: 280, 
                bgcolor: "#fff",
                borderRight: '1px solid gray',
                height: "100vh",
            }}
        >
            <Typography pb={1}>
                Home
            </Typography >
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Link 
                    className={styles.link} 
                    href={"/admin/dashboard" + ext} replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Dashboard />
                        <Typography pl={2}>Dashboard</Typography>
                    </Box>
                </Link>
            </Box>
            <Typography pb={1}>
                Contents
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Link 
                    className={styles.link}
                    href={"/admin/books" + ext} replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <MenuBook/>
                        <Typography pl={2}>Books</Typography>
                    </Box>
                </Link>
                <Link 
                    className={styles.link} 
                    href={"/admin/students" + ext} replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Face2/>
                        <Typography pl={2}>Students</Typography>
                    </Box>
                </Link>
                <Link 
                    className={styles.link} 
                    href={"/admin/001" + ext} 
                    replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <People/>
                        <Typography pl={2}>Borrowers</Typography>
                    </Box>
                </Link>
                <Link 
                    className={styles.link} 
                    href={"/admin/001" + ext} 
                    replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Mood/>
                        <Typography pl={2}>Guests</Typography>
                    </Box>
                </Link>
                <Link 
                    className={styles.link}
                    href={"/admin/media" + ext} 
                    replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <PermMedia/>
                        <Typography pl={2}>Media</Typography>
                    </Box>
                </Link>
                <Link 
                    className={styles.link}
                    href={"/admin/001" + ext} 
                    replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Face/>
                        <Typography pl={2}>Users</Typography>
                    </Box>
                </Link>
            </Box>
            <Typography pb={1}>
                Category Type
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <DynamicLink/>
            </Box>
            <Typography pb={1}>
                Settings
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Link 
                    className={styles.link} 
                    href={"/admin/001" + ext} 
                    replace
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Settings/>
                        <Typography pl={2}>Settings</Typography>
                    </Box>
                </Link>
            </Box>
        </Box>
        </>
    )
}

export default Sidebar