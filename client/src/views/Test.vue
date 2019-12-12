<template>
    <div class="test">
        <h3>Test</h3>

        <div class="racer">
            <div class="string"><label>Nickname: </label><span>{{race.racer.nickname}}</span></div>
            <div class="string"><label>Result: </label><span>{{race.racer.result}}</span></div>
            <div class="string">
                <div class="btn" @click="this.startRun" v-bind:disabled="isRunning">Run</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {
        SOCKET_RUN_FINISHED, SOCKET_RUN_RESULT,
        SOCKET_START_RUN
    } from "../../../shared/constants/socketActions";

    export default {
        name: 'Test',
        computed: mapGetters(['race']),
        data() {
            return {
                isRunning: false
            }
        },
        methods: {
            ...mapActions(['setResult']),
            startRun() {
                if (!this.isRunning) {
                    this.isRunning = true;
                    this.$socket.emit(SOCKET_START_RUN)
                }
            }
        },
        mounted() {
            this.$socket.emit('init', this.race.racer.id);
            this.sockets.subscribe(SOCKET_RUN_RESULT, ({id, result}) => {
                if (id) {
                    this.setResult(result);
                }
            });
            this.sockets.subscribe(SOCKET_RUN_FINISHED, ({id, result}) => {
                if (id) {
                    this.isRunning = false;
                    this.setResult(result);
                }
            })
        }
    }

</script>

<style scoped>

    h3 {
        margin: 15px auto;
        text-align: center;
    }

    .racer {
        padding: 15px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .racer .string {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
    }

    label {
        font-weight: bold;
        width: 15%;
    }

    .btn {
        background: #333;
        color: #fff;
        padding: 5px;
        border-radius: 2px;
        cursor: pointer;
    }

    .btn[disabled] {
        opacity: 0.4;
    }


</style>