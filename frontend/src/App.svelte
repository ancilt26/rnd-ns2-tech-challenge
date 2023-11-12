<script lang="ts">
    import { gql } from "@apollo/client/core";
    import { onMount } from "svelte";
    import Users from "./lib/Users.svelte";
    import { ApolloClient, InMemoryCache } from "@apollo/client/core";

    const GET_USERS = gql`
        query getUsers($page: Int!, $pageSize: Int!) {
            Users(pagination: { page: $page, pageSize: $pageSize }) {
                data {
                    id
                    username
                    companies {
                        id
                        name
                    }
                }
                meta {
                    pagination {
                        totalOfPage
                        page
                        totalOfRecord
                        pageSize
                    }
                }
            }
        }
    `;
    let users;
    let pagination;
    let loading;

    let page = 1;
    let pageSize = 10;

    async function loadUsers(page, pageSize) {
        console.log("loading users ", { page, pageSize });
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        const response = await client.query({
            query: GET_USERS,
            variables: { page, pageSize },
        });
        console.log({ response });
        users = response.data.Users.data;
        pagination = response.data.Users.meta.pagination;
        loading = response.loading;
        console.log("after state update", page);
        return;
    }
    onMount(async () => loadUsers(page, pageSize));
</script>

<main>
    <h1>Harvest Tech Challenge</h1>
    {#if users}
        <Users {users} />
        <button
            on:click={async () => {
                if (page > 0) {
                    await loadUsers(page - 1, pageSize);
                    page = page - 1;
                }
                return;
            }}>{"<"}</button
        >
        <span>{pagination.page} of {pagination.totalOfPage}</span>
        <button
            on:click={async () => {
                console.log("firing onclick handler", {
                    totalOfPage: pagination.totalOfPage,
                    page,
                });
                if (pagination && pagination.totalOfPage > page) {
                    await loadUsers(page + 1, pageSize);
                    page = page + 1;
                }
            }}>{">"}</button
        >
    {:else}
        <p>Loading...</p>
    {/if}
</main>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
        color: #888;
    }
</style>
