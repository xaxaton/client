<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { PlayCircleOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { useReviewsStore } from '@/store/reviews';
import { formatDate } from '@/utils/format';

const reviewsStore = useReviewsStore();

const getYoutubeVideoId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : null;
};
</script>

<template>
  <a-skeleton v-if="reviewsStore.loading" />

  <Carousel
    v-else
    :class="$style.carousel"
    wrap-around
    pause-autoplay-on-hover
    :autoplay="5000"
    :items-to-show="3"
  >
    <Slide
      v-for="review in reviewsStore.reviews"
      :key="review.id"
    >
      <a-space direction="vertical">
        <a-tooltip>
          <template #title>{{ review.text }}</template>

          <a-typography-text :class="$style.text">{{ review.text }}</a-typography-text>
        </a-tooltip>

        <a-typography-text type="secondary">
          <a-tooltip>
            <template #title>{{ formatDate(review.date) }}</template>

            <a-typography-text type="secondary">
              {{ dayjs(review.date).fromNow() }}
            </a-typography-text>
          </a-tooltip>
        </a-typography-text>

        <a-image
          v-if="review.image"
          :width="200"
          :src="review.image"
        />

        <a
          v-if="review.video"
          :class="$style.video"
          :href="review.video"
          target="_blank"
        >
          <PlayCircleOutlined />

          <img
            :src="`https://i.ytimg.com/vi/${getYoutubeVideoId(review.video)}/hqdefault.jpg`"
            :alt="review.video"
          />
        </a>
      </a-space>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination :class="$style.pagination" />
    </template>
  </Carousel>
</template>

<style module lang="scss">
.carousel {
  margin-bottom: 48px;
}

.text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.video {
  position: relative;
  display: block;
  width: 200px;
  margin: 0 auto;

  &::after {
    position: absolute;
    inset: 0;
    content: '';
    background-color: #000;
    opacity: 0.4;
  }

  :global(.anticon) {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    font-size: 48px;
    color: #fff;
    transform: translate(-50%, -50%);
  }
}

.pagination {
  padding-left: 0;
}
</style>
