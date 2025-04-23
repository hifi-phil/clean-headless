"use client";
import { IApiElementModel, ImageCarouselRowPropertiesModel, ImageCarouselRowSettingsPropertiesModel } from "@/api/model";
import { getSpacingClass } from "@/helpers/spacing";
import { ImagesToImagesMap } from "@/helpers/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { TranslationModel } from "@/api-clean/model";

export const ImageCarouselRow = (props: { dictionary: TranslationModel[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {
    
    const content = props.content?.properties as ImageCarouselRowPropertiesModel;
    const settings = props.settings?.properties as ImageCarouselRowSettingsPropertiesModel;

    if (settings?.hide ?? false) return null;
    if (!content?.images || content?.images.length === 0) return null;

    const images = ImagesToImagesMap(content?.images);
    const spacingClasses = getSpacingClass(props.settings);

    return (
        <div className={`row clearfix ${spacingClasses}`}>
            <div className="col-md-12 column">
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="custom-swiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Image src={image.src!} alt={image.alt!} width={856} height={600} loading="lazy" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
