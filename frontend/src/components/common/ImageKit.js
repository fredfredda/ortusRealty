"use client";
import React from 'react';
import { IKImage } from 'imagekitio-next';

const imagekitURL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const ImageKit = (props) => {
  
  return (
    <IKImage 
        urlEndpoint={imagekitURL}
        path={props.pathName}
        {...props}
    />
  )
}

export default ImageKit