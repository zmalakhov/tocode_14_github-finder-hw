<template>
    <div class="wrapper-content wrapper-content--fixed">
        <section>
            <div class="container">
                <!--errors-->
                <div class="error" v-if="error">
                    <p> {{ error }} </p>
                </div>

                <!--search-->
                <search
                        :value="search"
                        placeholder="Type user name"
                />
<!--                <search-->
<!--                        :value="search"-->
<!--                        placeholder="Type user name"-->
<!--                        @search="search = $event"-->
<!--                />-->

                <button v-if="!repos" class="btn btnPrimary" @click="getRepos">Search</button>
                <button v-else class="btn btnPrimary" @click="getRepos">Search Again</button>

                <!--user__wrapper-->
                <div class="user__wrapper" v-if="user">
                    <div class="user-avatar"><img :src="user.avatar_url" :alt="user.name"></div>
                    <div class="user-info">
                        <p>Name: {{ user.name }} </p>
                        <p>public_repos: {{ user.public_repos }} </p>
                    </div>
                </div>

                <!--repos__wrapper-->
                <div class="repos__wrapper" v-if="repos">
                    <!--repo-item-->
                    <div class="repos-item" v-for="repo in repos" :key="repo.id">
                        <div class="repos-info">
                            <a class="link" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
                            <span>{{ repo.stargazers_count }}  ⭐</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    import search from '@/components/Search'
    import axios from 'axios'

    export default {
        components: {search},
        data() {
            return {
                // search: '',
                //error: null,
                user: null,
                repos: null
            }
        },
        computed:{
            error(){
                return this.$store.getters.getError
            },
            search(){
                return this.$store.getters.getSearch
            }
        },
        methods: {
            getRepos() {
                axios.all([axios.get(`https://api.github.com/users/${this.$store.getters.getSearch}`),
                    axios.get(`https://api.github.com/users/${this.search}/repos`)])
                    .then(axios.spread((userResponse, reposResponse) => {
                        // console.log(userResponse.data,reposResponse.data);
                        // this.error = null
                        this.$store.dispatch('setError', null)
                        this.user = userResponse.data
                        this.repos = reposResponse.data

                    }))
                    .catch(error => {
                        // console.log(error)
                        this.repos = null
                        this.user = null
                        // this.error = 'Can`t find this user'
                        this.$store.dispatch('setError', 'Can`t find this user')
                    });


            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    button {
        margin-top: 40px;
    }

    .repos__wrapper {
        width: 400px;
        margin: 30px 0;
    }

    .repos-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #dbdbdb;
    }

    .user__wrapper {
        width: 400px;
        margin: 30px 0 0;
        display: flex;
        /*align-items: center;*/
        justify-content: center;
    }

    .user-avatar{
        width: 25%;
    }
    .user-info {
        /*width: 75%;*/
        p{
            padding: 10px 20px;
        }
    }

    .error {
        margin-bottom: 20px;
    }
</style>
