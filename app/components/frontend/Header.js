import { Avatar, Box, Container, Link, Typography } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors';
import React from 'react'
import styles from "./header.module.css"
import Image from 'next/image'

function Header() {
    return (
        <Box sx={{
            height: "80px",
            width: "100%"
        }}>
            <Box 
                sx={{
                    bgcolor: "#fff", 
                    borderBottom: "1px solid gray",
                    position: "fixed",
                    top: 0,
                    zIndex: 9999,
                    width: "100%",
                    height: "80px",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Container maxWidth="xl">
                    <div className={styles.header}>
                        
                        <div className={styles.logoBox}>
                            <Link href="#">
                                <Image
                                    src="/NIELogo.png"
                                    width={60}
                                    height={60}
                                    alt="Picture of the author"
                                />
                                <Typography variant="h6">NIE Smart Library</Typography>
                            </Link>
                        </div>
                        
                        <div className={styles.menuList}>
                            <Link href="#">Home</Link>
                            <Link href="/admin/dashboard">Dashboard</Link>
                            <Link href="/guests/new">Check In/Out</Link>
                            <Typography></Typography>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                        </div>
                    </div>
                </Container>
            </Box>
        </Box>
    )
}

export default Header