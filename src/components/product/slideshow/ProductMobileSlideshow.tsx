'use client';

import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import './slideshow.css';

import Image from "next/image";

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideshow = ({images, title, className }: Props) => {

  return (
    <div className={className}>

<Swiper
      style={{
        width: '100vw',
        height: '500px'
      }}
        pagination
        navigation={true}
        modules={[FreeMode, Navigation, Pagination]}
        className="mySwiper2"
      >

        {
            images.map(image => (

                <SwiperSlide key={image}>
    {/*este image tiene que ser imporatdo de next/image  */}
                <Image 
                width={500}
                height={400}
                src={`/products/${image}`}
                alt={title}
                className="object-fill"
                priority={true}
                >
                </Image>
                    
                </SwiperSlide>

            ))
        }
       
      </Swiper>
     
      
    </div>
  )
}
