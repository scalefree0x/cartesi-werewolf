
from os import environ
import logging
import jsonpickle
import requests
from werewolf.model import Game


# from werewolf.model import Game

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = "http://localhost:8080/rollup"
if "ROLLUP_HTTP_SERVER_URL" in environ:
    rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]

logger.info(f"HTTP rollup_server url is {rollup_server}")


def handle_advance(data):
    logger.info(f"Received advance request data {data}")
    logger.info("Adding notice")
    data["payload"] = data["payload"][2:]
    g.handle_advance(data)
    notice = {"payload": "0x7878"}
    response = requests.post(rollup_server + "/notice", json=notice)
    logger.info(
        f"Received notice status {response.status_code} body {response.content}")
    return "accept"


def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    logger.info("Adding report")
    state = g.handle_inspect().encode().hex()
    report = {"payload": "0x" + state}
    response = requests.post(rollup_server + "/report", json=report)
    logger.info(f"Received report status {response.status_code}")
    return "accept"


handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}
g = Game()

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]

        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])
