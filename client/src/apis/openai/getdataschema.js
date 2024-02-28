export const get_pf_data_schema = {
    "name": "get_pf_data",
    "parameters": {
        "type": "object",
        "properties": {
            "address": {
                "type": "string",
                "description": "The address of the location to get data for",
            },
            "country": {
                "type": "string",
                "description": "The country of location to get data for",
            },
            "warming_scenario": {
                "type": "string",
                "enum": ["1.0", "1.5", "2.0", "2.5", "3.0"],
                "description": "The warming scenario to get data for. Default is 1.5",
            }
        },
        "required": ["address", "country"],
    },
    "description": "This is the API call to the probable futures API to get predicted climate change indicators for a location"
}