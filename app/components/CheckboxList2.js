import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, colors, Skeleton, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { getData } from '@/app/db/function/CRUD';

export default function CheckboxList2({collection}) {
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

    console.log("Value", value)
    
    const handleChange = (data) => {
        setValue([...value, data.name])

    }

    return (
        <Box
            // pt={2} 
            pb={2}
            sx={{ display: 'flex'}}
        >
            {/* <FormGroup> */}
                <Checkbox
                    icon={
                        <Button  
                            variant="outlined" size='small'
                        >
                            All
                        </Button>
                    } 
                    checkedIcon={
                        <Button  
                            variant="contained" size='small'
                        >
                            All
                        </Button>
                    }
                    // onChange={(e) => handleChange(data)}
                />

                {posts.length > 0 
                    ? 
                    posts.map((data) => (
                        <Checkbox
                            key={data.id} 
                            icon={
                                <Button  
                                    variant="outlined" size='small'
                                >
                                {data.name}
                                </Button>
                            } 
                            checkedIcon={
                                <Button  
                                    variant="contained" size='small'
                                >
                                    {data.name}
                                </Button>
                            }
                            onChange={(e) => handleChange(data)}
                        />

                    ))
                    :
                    <>
                        <Skeleton variant="rectangular" animation="wave" height={32} width={80} sx={{margin: 1, borderRadius: 1}} />
                        <Skeleton variant="rectangular" animation="wave" height={32} width={80} sx={{margin: 1, borderRadius: 1}} />
                        <Skeleton variant="rectangular" animation="wave" height={32} width={80} sx={{margin: 1, borderRadius: 1}} />
                        <Skeleton variant="rectangular" animation="wave" height={32} width={80} sx={{margin: 1, borderRadius: 1}} />
                    </>
                }
            {/* </FormGroup> */}
        </Box>
    );
}