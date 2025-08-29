# Simulate recovery actions for various errors

def restart_gps(vehicle_id):
    # Simulate GPS service restart
    return f"GPS restarted for vehicle {vehicle_id}"

def reconnect_network(vehicle_id):
    # Simulate network reconnect
    return f"Network reconnected for vehicle {vehicle_id}"

def reroute(vehicle_id):
    # Simulate route recalculation
    return f"Route recalculated for vehicle {vehicle_id}"

def default_action(vehicle_id):
    # Generic action
    return f"No specific recovery required for {vehicle_id}"
