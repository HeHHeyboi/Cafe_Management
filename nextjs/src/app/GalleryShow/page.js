import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './GalleryShow.module.css';

'use client';

export default function GalleryShow() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await fetch('/api/gallery');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            }
        };

        fetchGalleryImages();
    }, []);

    return (
        <div className={styles.galleryContainer}>
            <h1>Gallery</h1>
            <div className={styles.imageGrid}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageItem}>
                        <Image
                            src={image.url}
                            alt={image.title || `Gallery image ${index + 1}`}
                            width={300}
                            height={200}
                            layout="responsive"
                            objectFit="cover"
                        />
                        {image.title && <p>{image.title}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}