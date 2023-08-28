/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import SingleCategory from './miscellaneous/Category/SingleCategory'
import { Box, IconButton } from '@mui/material'
import { categories } from '../constants/categories'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Categories = () => {
    const scrollContainerRef = useRef(null)
    const [leftButtonVisible, setLeftButtonVisible] = useState(false)
    const [rightButtonVisible, setRightButtonVisible] = useState(false)
    useEffect(() => {
        updateButtonVisibility();
    }, [])
    const updateButtonVisibility = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const scrollWidth = scrollContainerRef.current.scrollWidth;
            const clientWidth = scrollContainerRef.current.clientWidth;
            setLeftButtonVisible(scrollLeft > 0);
            setRightButtonVisible(scrollLeft < scrollWidth - clientWidth - 100);
        }
    };
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 200;
        }
        updateButtonVisibility();

    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 200;
        }
        updateButtonVisibility();

    };
    const buttonStyle = {
        position: 'sticky',
        color: 'white',
        zIndex: 4,
        top: "50%",
        backgroundColor: '#FF7373',
        height: '2.3rem',
        width: '2.3rem',
        "&:hover": {
            backgroundColor: '#FF7373',

        },
        transition: "all ease-in 0.3s",

    }
    return (
        <Box ref={scrollContainerRef} maxWidth={'100vw'} sx={{
            overflowX: "scroll", display: 'flex', gap: 8, py: 2, "&::-webkit-scrollbar": {
                height: 0,
            }, position: 'relative',
        }}>
            <IconButton onClick={scrollLeft} sx={{ ...buttonStyle, left: 10, display: { md: leftButtonVisible ? "block" : "none", xs: 'none' } }}  ><ArrowBackIosIcon /></IconButton>
            <>
                {
                    categories.map(x =>
                        (<SingleCategory key={x.id} category={x} background={x.background} />))
                }
            </>
            <IconButton onClick={scrollRight} sx={{ ...buttonStyle, right: 10, display: { md: rightButtonVisible ? "block" : "none", xs: 'none' }, }}  ><ArrowForwardIosIcon /></IconButton>
        </Box>
    )
}

export default Categories
