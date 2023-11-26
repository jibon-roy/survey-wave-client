
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
// import { useEffect, useState } from 'react';
import Cards from './Cards';
import { useQuery } from '@tanstack/react-query';

export default function Slider() {

    const { data: client, isLoading } = useQuery({
        queryKey: ['client'],
        queryFn: async () => {
            const data = await fetch('./testimonial.json');
            return data.json()

        }
    })

    if (isLoading) {
        return <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        </svg>
    }
    return (
        <>
            <Swiper

                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                navigation={true}
                modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    client?.map(data => <SwiperSlide className='my-8' key={data?.id}><Cards data={data}></Cards></SwiperSlide>)
                }

            </Swiper>
        </>
    );
}
