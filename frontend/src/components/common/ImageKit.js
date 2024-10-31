"use client";
import React, { useEffect } from 'react';
import { IKImage } from 'imagekitio-next';

const imagekitURL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const projectName = 'OrtusRealty';

const ImageKit = (props) => {
  useEffect(()=>{
    console.log('path:', `${projectName}/${props.pathName}`)
  }, [])
  return (
    <IKImage 
        urlEndpoint={imagekitURL}
        path={`${projectName}/${props.pathName}`}
        {...props}
    />
  )
}

export default ImageKit