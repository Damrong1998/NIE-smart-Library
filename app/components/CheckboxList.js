import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getData } from '../db/function/CRUD';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function CheckboxList({collection, label}) {
    const [open, setOpen] = React.useState(true)

    const [value, setValue] = React.useState([])

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        const getPosts = async (params) => {
            const data = await getData(collection)
        
            if (data) {
                console.log("data", data)
                setPosts(data)
            }
        }
        getPosts()

    }, [collection])

    console.log("Open", open)
    console.log("Value", value)
    
    const handleChange = (data) => {
        setValue([...value, data.name])

    }

    return (
        <Box>
            <Button 
                fullWidth 
                sx={{display: "flex", justifyContent: "space-between", textTransform: "none"}} 
                onClick={() => setOpen(!open)}
            >
                <Typography>{label}</Typography>
                { open? <KeyboardArrowDown />: <KeyboardArrowUp />}
            </Button>
            {open && 
                <FormGroup>
                    {posts.length > 0
                        ? 
                        posts.map((data) => (
                            <FormControlLabel
                                key={data.id} 
                                control={
                                    <Checkbox onChange={(e) => handleChange(data)} />
                                } 
                                label={data.name}
                            />
                        ))
                        :
                        <>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        </>
                    }
                </FormGroup>
            }
        </Box>
    );
}