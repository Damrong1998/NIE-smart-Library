import { Menu } from '@mui/icons-material'
import { Avatar, Box, Container, Typography } from '@mui/material'
import React from 'react'

function Navbar() {
    return (
        <Box
            p={1} pr={4} pl={4}
            sx={{
                width: '100%', 
                height: "60px",
                bgcolor: "#fff",
                borderBottom: "1px solid gray",
                position: 'fixed',
                top: 0,
                zIndex: 9999,
            }}
        >
            <Box 
                display={"flex"} 
                justifyContent={"space-between"} 
                alignItems={"center"}
                sx={{width: '100%'}}
            >
                <Box
                    display={"flex"} 
                    justifyContent={"space-between"} 
                >
                    <Menu/>
                    <Typography ml={2}>Home</Typography>
                </Box>
                <Avatar/>
            </Box>
        </Box>
    )
}

export default Navbar