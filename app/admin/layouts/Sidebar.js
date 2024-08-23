import Link from 'next/link'
import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import styles from "./../../admin.module.css";
import { Book, People, Settings } from '@mui/icons-material';
import Image from 'next/image';

function Sidebar() {
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
            <Image
                src="/NIELogo.png"
                width={50}
                height={50}
                alt="Picture of the author"
            />
            <Typography variant="h6" p={2}>NIE Smart Library</Typography>
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
            <Link className={styles.link} href="/admin" replace>
                Dashboard
            </Link>
        </Box>
        <Typography pb={1}>
            Contents
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Link className={styles.link} href="/admin/docs" replace>
                <Box display={"flex"} alignItems={"center"}>
                    <Book/>
                    <Typography pl={2}>Books</Typography>
                </Box>
            </Link>
            <Link className={styles.link} href="/admin/students" replace>
                <Box display={"flex"} alignItems={"center"}>
                    <People/>
                    <Typography pl={2}>Students</Typography>
                </Box>
            </Link>
            <Link className={styles.link} href="/admin/students" replace>
                <Box display={"flex"} alignItems={"center"}>
                    <People/>
                    <Typography pl={2}>Users</Typography>
                </Box>
            </Link>
        </Box>
        <Typography pb={1}>
            Settings
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Link className={styles.link} href="/admin" replace>
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