<script setup>
import { computed } from 'vue'

const props = defineProps({
    // SVG图标名称或在线URl
    name: {
        type: String,
        required: true
    },
    // 图标类名
    class: {
        type: String,
        default: ''
    }
})

const isOnlineSvg = computed(() => /^(https?:)/.test(props.name))
const className = computed(() => props.class)
</script>

<template>
    <div v-if="isOnlineSvg" :style="{ '--svg-icon-url': `url(${name})` }" class="svg-icon svg-icon-online"
        :class="className">
    </div>
    <svg v-else class="svg-icon" :class="className" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<style lang="less" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}

.svg-icon-online {
    background-color: currentColor;
    mask-image: var(--svg-icon-url);
    -webkit-mask-image: var(--svg-icon-url);
    mask-size: cover;
    -webkit-mask-size: cover;
    display: inline-block;
}
</style>
