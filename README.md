Copyright (c) 2025 sena-r.
# Gallery & Slideshow Website Package

## Overview

This package provides a website feature that automatically fetches images from all articles of a specified blog or website URL, displaying them as a slideshow and gallery.  
Images with the class `toS` are shown in the slideshow, while images with the class `toG` are displayed in the gallery.

---

## Features

- Crawls all articles starting from the specified URL to fetch images automatically  
- Displays images in a slideshow using [Swiper.js](https://swiperjs.com/)  
- Displays images in a responsive grid gallery using [Macy.js](https://github.com/bigbite/macy.js)  
- Shows gallery images in a modal window with captions and links  
- Caches gallery images for improved performance  
- Automatically follows “next page” links to gather images from all pages

---

## Usage

1. Set the `firstURL` variable to the blog or website URL where crawling starts.  
2. Include required HTML elements for the gallery container, slideshow wrapper, and modal structure.  
3. Load the JavaScript; images will be fetched and displayed automatically on page load.

---

## Dependencies

- [Swiper.js](https://swiperjs.com/) — slideshow functionality  
- [Macy.js](https://github.com/bigbite/macy.js) — grid layout for gallery  
- [imagesLoaded](https://imagesloaded.desandro.com/) — detects when images finish loading  
- [MicroModal](https://micromodal.vercel.app/) — modal dialog management  

Load these libraries via CDN or package manager.

---

## Configuration

- `showArticleTitle` (0 or 1) — Whether to show the article title as a caption in the modal.  
- `jumpArticleToClickImage` (0 or 1) — Whether clicking a gallery image links to the original article.

---

## Important Notes

- Always check the target website’s terms of service and `robots.txt` before crawling.  
- Avoid excessive requests to prevent overloading the target server.

---

## Redistribution Policy

**This package and its source code are strictly for personal or internal use only. Redistribution, resale, or sharing of this package or its code in any form, whether modified or unmodified, is strictly prohibited without explicit written permission from the author.**

---

## Example

```js
const firstURL = "https://example-blog.com";
const siteTitle = "My Photo Site";
const userName = "John Doe";
const showArticleTitle = 1;
const jumpArticleToClickImage = 1;
