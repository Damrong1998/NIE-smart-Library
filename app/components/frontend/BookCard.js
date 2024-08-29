import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Modal, Skeleton } from '@mui/material';
import BookSingle from './BookSingle';
import styles from "./styles.module.css"

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    // p: 4,
};

export default function BookCard({data, button, loading = false}) {

    // Modal state
    const [open, setOpen] = React.useState(false);
    const [modalStatus, setModalStatus] = React.useState("");

    // Handle Modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
        >
            <Box sx={styleModal}>
                {open && 
                data && <BookSingle data={data} />}
            </Box>
        </Modal>
        
        { loading?
            <Card sx={{ maxWidth: 380, margin: "auto"}}>
                <Skeleton variant="rectangular" height={200} />
                <Box p={2}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 4 }} />
                    <Skeleton variant="rectangular" animation="wave" height={30} width="40%" />
                </Box>
            </Card>
            :
            <Card sx={{ maxWidth: 380, margin: "auto"}}>
                <CardMedia
                    sx={{ height: 230 }}
                    image={data.imageUrl? data.imageUrl: "jpg_icon.png"}
                    title="green iguana"
                />
                <CardContent>
                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div"
                        className={styles.shortTitle}
                    >
                        {data.title? data.title : "Untitled"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{fontWeight: 600}}>Book Code: </span> {data.code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Share</Button> */}
                    <Button size="small" onClick={handleOpen}>View More</Button>
                </CardActions>
            </Card>
        }
        </>
    );
}
