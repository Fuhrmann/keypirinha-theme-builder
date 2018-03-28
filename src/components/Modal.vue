<template>
    <div class="modal" tabindex="-1" role="dialog" @click="closeOutside">
        <div class="modal-dialog" role="document">
            <div class="modal-content" ref="modalcontent">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="header">
                            Modal title
                        </slot>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <p>Modal body text goes here.</p>
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-primary">Save</button>
                    </slot>
                    <button type="button" class="btn btn-secondary" @click="close" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'modal',
        methods: {
            close(e) {
                this.$emit('close');
            },
            closeOutside(e) {
                const el = this.$refs.modalcontent;
                const target = e.target;
                if (el !== target && !el.contains(target)) {
                    this.close()
                }
            }
        },
    };
</script>
<style>
    .modal {
        background-color: rgba(0, 0, 0, 0.3);
        display: block;
    }
</style>
