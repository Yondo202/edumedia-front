import React from 'react'
import styled, { keyframes } from "styled-components"

const animeSkeletonCard = keyframes`
    0%{ left:-80%; }
    100%{ left:100% }
`

export const SkeletonCard = () =>{
    return(
        <SkeletonCards><div className="item" ><div className="child" /></div> </SkeletonCards>
    )
}

export const SkeletonCards = styled.div`
    // margin:10px 0px 30px 0px; 
    display:flex;
    align-items:center;
    justify-content:center;
    gap:18px;
    background-color:#fff;
    height: 16.5rem;
    width:100%;
    border:1px solid rgba(0,0,0, 0.157);
    border-radius: 4px;
    box-shadow:1px 1px 10px -8px;
    .item{
        overflow: hidden;
        height:100%;
        width:100%;
        position:relative;
        .child{
            position:absolute;
            top:0;
            width:50%;
            height:100%;
            background-image: linear-gradient(to right, rgba(60,60,60,0), rgba(120,120,120,0.2), rgba(60,60,60,0));
            animation: ${animeSkeletonCard} 0.7s linear infinite;
        }
    }
`

import { VscArrowRight, VscArrowLeft } from "react-icons/vsc"

export const CustomArrow = ({ sliderRef, data }) => {
    const gotoNext = () => {
        sliderRef.current.slickNext();
    }
    const prev = () => {
        sliderRef.current.slickPrev();
    }
    if(data?.length > 1){
        return (
            <Arrow>
                <div onClick={gotoNext} className="buttons prev">
                    <VscArrowRight />
                </div>
                <div onClick={prev} className="buttons next">
                    <VscArrowLeft />
                </div>
            </Arrow>
        )
    }else{
        return null
    }
    
}

const Arrow = styled.div`
    .buttons{
        transition:all 0.3s ease;
        position:absolute;
        display:flex;
        align-items:center;
        justify-content:center;
        top:40%;
        border-radius:50%;
        padding:8px;
        background-color:#ffffff;
        box-shadow:0px 0px 14px -6px;
        z-index:1;
        svg{
            font-size:22px;
        }
        cursor:pointer;
        &:hover{
            background-color:#e4e6eb;
        }
    }
    .next{
        left:15px;
        &:hover{
            left:7px;
        }
    }
    .prev{
        right:15px;
        &:hover{
            right:7px;
        }
    }
    @media (max-width:500px){
        .buttons{
            padding:5px;
            svg{
                font-size:21px;
            }
        }
    }
`
