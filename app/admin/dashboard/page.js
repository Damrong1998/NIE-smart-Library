import Header from '@/app/components/frontend/Header'
import React from 'react'
import Sidebar from '../layouts/Sidebar'
import { Box, Container, Grid, Typography } from '@mui/material'
import { Face2, MenuBook } from '@mui/icons-material'


function Card({icon, number, name}) {
    return (
        <Box p={2} sx={{bgcolor: "#fff", }}>
            {icon}
            <Typography variant='h4'>{number} <span style={{fontSize: "14px"}}>{name}</span></Typography>
        </Box>
    )
}

function Dashboard() {
    return (
        <Container>
            <Typography variant='h5' pb={2} pt={2}>Dashboard</Typography>
                
                <Box sx={{ mb: 2}} >
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} md={6}>
                            <Card 
                                icon={<MenuBook color={"info"} sx={{fontSize: "45px"}}/>}
                                number="219"
                                name={"books"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card 
                                icon={<Face2 color={"info"} sx={{fontSize: "45px"}}/>}
                                number="593"
                                name={"students"}
                            />
                        </Grid>

                    </Grid>
                </Box>
        </Container>
    )
}

export default Dashboard