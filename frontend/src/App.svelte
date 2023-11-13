<script lang="ts">
    import { gql } from "@apollo/client/core";
    import { onMount } from "svelte";
    import Users from "./lib/Users.svelte";
    import { client } from "./client";

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

    const CREATE_USER = gql`
        mutation CreateUser($username: String!) {
            createUser(username: $username) {
                id
                username
            }
        }
    `;
    let users;
    let pagination;
    let loading;

    let page = 1;
    let pageSize = 10;

    async function loadUsers(page, pageSize) {
        const response = await client.query({
            query: GET_USERS,
            variables: { page, pageSize },
        });
        users = response.data.Users.data;
        pagination = response.data.Users.meta.pagination;
        loading = response.loading;
        return;
    }

    async function handleSubmit(e) {
        const formData = new FormData(e.target);

        try {
            const response = await client.mutate({
                mutation: CREATE_USER,
                variables: { username: formData.get("username") },
            });
            console.log({ response });
        } catch (e) {
            alert("failed to create user");
            console.log({ e });
        }
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
                if (pagination && pagination.totalOfPage > page) {
                    await loadUsers(page + 1, pageSize);
                    page = page + 1;
                }
            }}>{">"}</button
        >
        <form on:submit|preventDefault={handleSubmit}>
            <label for="username">Username</label>
            <input placeholder="username" id="username" name="username" />
            <button type="submit">Create user</button>
        </form>
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
