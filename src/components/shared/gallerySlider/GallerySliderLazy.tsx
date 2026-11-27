"use client";

import dynamic from "next/dynamic";

/**
 * The gallery slider behind a lazy boundary: the slider and animation
 * libraries are downloaded only by pages that actually show a gallery.
 */
const GallerySliderLazy = dynamic(() => import("./GallerySlider"));

export default GallerySliderLazy;
