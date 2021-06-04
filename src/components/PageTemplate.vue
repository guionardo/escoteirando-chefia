<template>
    <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
            <q-breadcrumbs-el :label="title" />
        </q-breadcrumbs>
        <q-page class="row items-center justify-evenly">
            <slot></slot>
        </q-page>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style>

</style>