import { NgModule } from '@angular/core';

import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { CommonModule } from '@angular/common';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 3
};

const HOME_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  autoplay: true,
  slidesPerView: 3,
  breakpoints: {
    1000: {
      slidesPerView: 3
    },
    478: {
      slidesPerView: 2
    },
    200: {
      slidesPerView: 1
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: SWIPER_CONFIG,
      useValue: HOME_SWIPER_CONFIG
    }
  ]
})
export class SwipperModule { }
