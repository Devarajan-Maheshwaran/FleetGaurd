# Rule-based error detection and action mapping

ERROR_RULES = {
    "GPS_DISCONNECTED": "restart_gps",
    "NETWORK_FAILURE": "reconnect_network",
    "ROUTE_MISMATCH": "reroute"
}

def detect_error(log_line):
    for err_str in ERROR_RULES.keys():
        if err_str in log_line:
            return err_str
    return None

def resolve_action(error):
    # Map error to function name in recovery.py
    return ERROR_RULES.get(error, "default_action")
