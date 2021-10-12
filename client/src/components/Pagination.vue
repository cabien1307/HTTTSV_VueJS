<template>
    <ul class="list-none flex items-center justify-end">
        <li
            class="pagination-item"
            :class="[isInFirstPage ? 'bg-gray-400 px-2 py-1 rounded-md' : '']"
        >
            <button
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage"
            >
                First
            </button>
        </li>
        <li class="pagination-item">
            <button
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage"
                :class="[isInFirstPage ? 'cursor-not-allowed' : '']"
            >
                &#xab; Previous
            </button>
        </li>
        <!-- Range of pages -->
        <li
            v-for="(page, index) in pages"
            :key="index"
            :class="[
                isPageActive(page.name)
                    ? 'bg-blue-500 px-3 py-1 text-white'
                    : '',
            ]"
            class="pagination-item"
        >
            <button
                type="button"
                @click="onClickPage(page.name)"
                :disabled="page.isDisabled"
            >
                {{ page.name }}
            </button>
        </li>
        <li class="pagination-item">
            <button
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage"
                :class="[isInLastPage ? 'cursor-not-allowed' : '']"
            >
                Next &#xbb;
            </button>
        </li>
        <li
            class="pagination-item"
            :class="[isInLastPage ? 'bg-gray-400 px-2 py-1 rounded-md' : '']"
        >
            <button
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage"
            >
                Last
            </button>
        </li>
    </ul>
</template>

<script>
import { toRefs, computed } from "vue";

export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        perPage: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit("pagechanged", { crtPage: 1 });
        },
        onClickPreviousPage() {
            this.$emit("pagechanged", {
                crtPage: this.currentPage - 1,
            });
        },
        onClickPage(crtPage) {
            this.$emit("pagechanged", { crtPage });
        },
        onClickNextPage() {
            if (this.currentPage + 1 > this.totalPages) {
                this.currentPage.totalPages;
            } else {
                this.$emit("pagechanged", { crtPage: this.currentPage + 1 });
            }
        },
        onClickLastPage() {
            this.$emit("pagechanged", { crtPage: this.totalPages });
        },
    },
    setup(props) {
        const { maxVisibleButtons, totalPages, currentPage } = toRefs(props);
        const startPage = computed(() => {
            // First Page
            if (currentPage.value === 1) {
                return 1;
            }

            // When on last page
            if (currentPage.value === totalPages.value) {
                return totalPages.value - maxVisibleButtons.value + 1;
            }

            // When between
            return currentPage.value - 1;
        });
        const pages = computed(() => {
            const range = [];
            for (
                let i = startPage.value;
                i <=
                Math.min(
                    startPage.value + maxVisibleButtons.value - 1,
                    totalPages.value
                );
                i += 1
            ) {
                range.push({
                    name: i,
                    isDisabled: i === currentPage.value,
                });
            }
            return range;
        });
        const isInFirstPage = computed(() => {
            return currentPage.value === 1;
        });
        const isInLastPage = computed(() => {
            return currentPage.value === totalPages.value;
        });

        function isPageActive(page) {
            return currentPage.value === page;
        }
        return {
            startPage,
            pages,
            isInFirstPage,
            isInLastPage,
            isPageActive,
        };
    },
};
</script>

<style scoped>
.pagination-item {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 3px;
}
</style>
