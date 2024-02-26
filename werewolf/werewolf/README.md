# Werewolf backend

 This is the core logic of a werewolf board game in Cartesi Rollups framework. This DApp's back-end is written in Python, created with [Sunodo Template](https://github.com/sunodo/sunodo-templates)


To play the game, first we need to start the backend. Once the backend is up, we utilize tools in frontend-console to mimic players and interact with the backend.

## Running the back-end with Sunodo

Firstly, make sure [sunodo](https://docs.sunodo.io/guide/introduction/installing) is installed in your console. 

Run
```shell
cartesi-werewolf/werewolf$ sunodo build
```
A successful build will show the following messages:

```log
INFO:__main__:HTTP rollup_server url is http://127.0.0.1:5004
INFO:__main__:Sending finish
```

Run 
```Shell
cartesi-werewolf/werewolf$ sunodo run
```

If the backend is up successfully, you can see messages below:
```log
prompt-1     | Anvil running at http://localhost:8545
prompt-1     | GraphQL running at http://localhost:8080/graphql
prompt-1     | Inspect running at http://localhost:8080/inspect/
prompt-1     | Explorer running at http://localhost:8080/explorer/
prompt-1     | Press Ctrl+C to stop the node
```

## Interacting with the application

The frontend `client.py` application uses [frontend-console](../frontend-console) to interact with the DApp. Open up six terminals, each mimics a player. In each terminal, run (accountIndex goes from 0 to 5):

```shell
python3 -m werewolf.client [accountIndex]
```

