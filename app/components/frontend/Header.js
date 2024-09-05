/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Container, Link, Typography } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors';
import React from 'react'
import styles from "./styles.module.css"
import Image from 'next/image'

function Header() {
    return (
        <Box sx={{
            height: "65px",
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
                    height: "65px",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Container maxWidth="xl">
                    <div className={styles.header}>
                        
                        <div className={styles.logoBox}>
                            <Link href="#">
                                {/* <Image
                                    src="/NIELogo.png"
                                    width={60}
                                    height={60}
                                    alt="Picture of the author"
                                /> */}
                                <img 
                                    style={{width: "auto", height: '55px'}}
                                    src="/NIELogo_pinkpink.png"
                                    alt='' 
                                />
                                {/* <Typography variant="h6">NIE Smart Library</Typography> */}
                            </Link>
                        </div>
                        
                        <div className={styles.menuList}>
                            <Link href="/">Home</Link>
                            <Link href="/admin">Admin</Link>
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